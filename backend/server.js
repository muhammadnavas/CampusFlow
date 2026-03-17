import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://campus-flow-flax.vercel.app',
      'https://campusflow.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean);
    
    // Allow requests with no origin (mobile apps, curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS request from ${origin} not allowed`);
      callback(null, true); // Allow anyway for development
    }
  },
  credentials: true,
}));
app.use(express.json());

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

// Test connection endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'CampusFlow Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { studentName, phoneNumber, studentEmail } = req.body;

    // Validate input
    if (!studentName || !phoneNumber || !studentEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: studentName, phoneNumber, studentEmail' 
      });
    }

    // Check if email already registered
    const { data: existingStudent, error: checkError } = await supabase
      .from('students')
      .select('id, email')
      .eq('email', studentEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is expected
      throw checkError;
    }

    if (existingStudent) {
      return res.status(409).json({
        error: 'Student already registered',
        studentId: existingStudent.id,
        message: 'This email is already registered. Please use a different email.'
      });
    }

    // Insert new student
    const { data: student, error: insertError } = await supabase
      .from('students')
      .insert([
        {
          name: studentName,
          email: studentEmail,
          phone_number: phoneNumber,
          created_at: new Date().toISOString(),
          is_active: true,
        }
      ])
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      studentId: student.id,
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phoneNumber: student.phone_number,
      }
    });

  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ 
      error: 'Registration failed',
      details: error.message 
    });
  }
});

// Login endpoint - allows existing students to login by email
app.post('/api/login', async (req, res) => {
  try {
    const { studentEmail } = req.body;

    // Validate input
    if (!studentEmail) {
      return res.status(400).json({ 
        error: 'Missing required field: studentEmail' 
      });
    }

    // Find student by email
    const { data: student, error } = await supabase
      .from('students')
      .select('id, name, email, phone_number, created_at, is_active')
      .eq('email', studentEmail)
      .single();

    if (error || !student) {
      return res.status(404).json({ 
        error: 'Student not found',
        message: 'No student registered with this email. Please register first.'
      });
    }

    if (!student.is_active) {
      return res.status(403).json({
        error: 'Account inactive',
        message: 'Your account has been deactivated. Please contact support.'
      });
    }

    res.json({
      success: true,
      message: 'Login successful',
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phoneNumber: student.phone_number,
      }
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ 
      error: 'Login failed',
      details: error.message 
    });
  }
});

// Get student info
app.get('/api/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;

    const { data: student, error } = await supabase
      .from('students')
      .select('id, name, email, phone_number, created_at, is_active')
      .eq('id', studentId)
      .single();

    if (error || !student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phoneNumber: student.phone_number,
        createdAt: student.created_at,
        isActive: student.is_active,
      }
    });

  } catch (error) {
    console.error('Error fetching student:', error.message);
    res.status(500).json({ error: 'Failed to fetch student info' });
  }
});

// Create event (after registration)
app.post('/api/events', async (req, res) => {
  try {
    const { 
      studentId, 
      title, 
      date, 
      time, 
      description,
      phoneNumber,
      studentEmail
    } = req.body;

    // Validate input
    if (!studentId || !title || !date || !time) {
      return res.status(400).json({ 
        error: 'Missing required fields: studentId, title, date, time' 
      });
    }

    // Check if student exists
    const { data: student, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('id', studentId)
      .single();

    if (studentError || !student) {
      return res.status(404).json({ error: 'Student not found. Please register first.' });
    }

    // Create event
    const eventDateTime = new Date(`${date}T${time}:00`);

    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert([
        {
          student_id: studentId,
          title,
          date,
          time,
          description: description || null,
          event_date_time: eventDateTime.toISOString(),
          created_at: new Date().toISOString(),
          status: 'pending',
        }
      ])
      .select()
      .single();

    if (eventError) {
      throw eventError;
    }

    // Send to n8n webhook (fire and forget, don't block response)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: event.id,
          studentId: studentId,
          phoneNumber: phoneNumber || null,
          studentEmail: studentEmail || null,
          title: event.title,
          date: event.date,
          time: event.time,
          description: event.description,
          timestamp: new Date().toISOString(),
          source: 'campusflow-backend',
        }),
      }).catch(err => console.warn('⚠️ n8n webhook call failed:', err.message));
    }

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      eventId: event.id,
      event: {
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        status: event.status,
      }
    });

  } catch (error) {
    console.error('Event creation error:', error.message);
    res.status(500).json({ 
      error: 'Failed to create event',
      details: error.message 
    });
  }
});

// Get all events for a student
app.get('/api/student/:studentId/events', async (req, res) => {
  try {
    const { studentId } = req.params;

    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('student_id', studentId)
      .order('event_date_time', { ascending: true });

    if (error) {
      throw error;
    }

    res.json({
      events: events.map(event => ({
        id: event.id,
        title: event.title,
        date: event.date,
        time: event.time,
        description: event.description,
        status: event.status,
        createdAt: event.created_at,
      }))
    });

  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// OpenRouter proxy endpoint (server-side) to avoid CORS and expose no API key
app.post('/api/extract-event', async (req, res) => {
  try {
    const { rawText } = req.body;
    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({ error: 'rawText missing' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'OpenRouter API key is not configured on backend' });
    }

    const prompt = `You are an expert at extracting event information from college notices, assignment sheets, and academic notifications.\n\nExtract the following information from the provided text and return ONLY a valid JSON object (no markdown, no extra text):\n{\n  \"title\": \"event name/title\",\n  \"date\": \"YYYY-MM-DD format\",\n  \"time\": \"HH:MM format (24-hour)\",\n  \"description\": \"detailed description of the event\"\n}\n\nImportant rules:\n- If date is relative (e.g., \"next Monday\"), calculate the actual date\n- Extract submission deadline or exam date if mentioned\n- If time is not explicitly mentioned, use \"09:00\" as default\n- Keep description concise but informative\n- Return ONLY valid JSON, nothing else\n\nText to parse:\n${rawText}`;

    const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';
    const openrouterUrl = 'https://openrouter.ai/api/v1/chat/completions';

    const response = await fetch(openrouterUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ]
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error('OpenRouter API error', response.status, body);
      return res.status(response.status).json({ error: body || 'OpenRouter API request failed' });
    }

    const result = await response.json();

    if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
      return res.status(502).json({ error: 'OpenRouter API returned empty output' });
    }

    const responseText = result.choices[0].message.content || '';
    return res.json({ success: true, text: responseText, raw: result });
  } catch (error) {
    console.error('OpenRouter proxy error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 CampusFlow Backend running on http://localhost:${PORT}`);
  console.log(`📊 Supabase connected to: ${process.env.SUPABASE_URL}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL}`);
});
