/**
 * Event Management Service
 * Handles event creation and retrieval
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Create a new event
 * @param {string} studentId - Student ID
 * @param {Object} eventData - Event details
 * @param {string} eventData.title - Event title
 * @param {string} eventData.date - Event date (YYYY-MM-DD)
 * @param {string} eventData.time - Event time (HH:MM)
 * @param {string} eventData.description - Event description
 * @returns {Promise<Object>} Created event
 */
export const createEvent = async (studentId, eventData) => {
  try {
    // Validate required fields
    if (!studentId || !eventData.title || !eventData.date || !eventData.time) {
      throw new Error('Missing required fields: studentId, title, date, time');
    }

    console.log('📝 Creating event...', { studentId, eventData });
    console.log('🔗 API URL:', `${API_BASE_URL}/events`);

    const payload = {
      studentId,
      title: eventData.title,
      date: eventData.date,
      time: eventData.time,
      description: eventData.description || null,
    };

    console.log('📤 Sending payload:', payload);

    const response = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📥 Response status:', response.status);

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Backend error:', result);
      throw new Error(result.error || `Failed to create event: ${response.status}`);
    }

    console.log('✅ Event created successfully:', result.event);
    return result;

  } catch (error) {
    console.error('❌ Event creation error:', error);
    throw error;
  }
};

/**
 * Get all events for a student
 * @param {string} studentId - Student ID
 * @returns {Promise<Object>} Array of events
 */
export const getStudentEvents = async (studentId) => {
  try {
    if (!studentId) {
      throw new Error('Student ID is required');
    }

    const response = await fetch(`${API_BASE_URL}/student/${studentId}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch events');
    }

    console.log('✅ Events fetched:', result.events);
    return result;

  } catch (error) {
    console.error('❌ Error fetching events:', error.message);
    throw error;
  }
};

/**
 * Send event to n8n webhook for processing
 * @param {string} studentId - Student ID
 * @param {Object} eventData - Event details
 * @returns {Promise<Object>} Response from n8n
 */
export const sendEventToAutomation = async (studentId, eventData) => {
  try {
    // First save to backend
    const backendResult = await createEvent(studentId, eventData);

    // Then send to n8n webhook
    const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/campusflow';
    
    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventId: backendResult.eventId,
        ...eventData,
        timestamp: new Date().toISOString(),
        source: 'campusflow-frontend',
      }),
    });

    if (!response.ok) {
      console.warn('⚠️ n8n webhook may have failed:', response.status);
    }

    return backendResult;

  } catch (error) {
    console.error('❌ Error in event automation:', error.message);
    throw error;
  }
};
