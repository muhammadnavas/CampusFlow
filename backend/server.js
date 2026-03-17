import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
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
      description 
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
  console.log(`\n✅ Health check: GET http://localhost:${PORT}/api/health\n`);
});
