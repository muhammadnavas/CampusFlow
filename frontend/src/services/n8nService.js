/**
 * n8n Service
 * Handles all communication with n8n webhooks
 */

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/campusflow';

/**
 * Send event details to n8n webhook
 * @param {Object} eventData - Event details
 * @param {string} eventData.title - Event title
 * @param {string} eventData.date - Event date (YYYY-MM-DD)
 * @param {string} eventData.time - Event time (HH:MM)
 * @param {string} eventData.description - Event description
 * @param {string} eventData.phoneNumber - Student phone number
 * @param {string} eventData.studentName - Student name
 * @param {string} eventData.studentEmail - Student email
 * @returns {Promise<Object>} Response from n8n
 */
export const sendEventToN8n = async (eventData) => {
  try {
    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.time) {
      throw new Error('Title, date, and time are required');
    }

    // Prepare payload
    const payload = {
      ...eventData,
      timestamp: new Date().toISOString(),
      source: 'campusflow-frontend',
    };

    console.log('🚀 Sending event to n8n:', payload);

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ n8n response:', data);
    return data;
  } catch (error) {
    console.error('❌ Error sending event to n8n:', error);
    throw error;
  }
};

/**
 * Test webhook connection
 * @returns {Promise<boolean>} Connection status
 */
export const testN8nConnection = async () => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: true }),
    });
    return response.ok;
  } catch (error) {
    console.error('❌ n8n connection test failed:', error);
    return false;
  }
};
