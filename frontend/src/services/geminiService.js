/**
 * Gemini AI Service
 * Extracts event details from raw text using Google Gemini API
 */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Extract event details from raw text using Gemini AI
 * @param {string} rawText - The raw text to parse (college notice, assignment details, etc.)
 * @returns {Promise<Object>} Extracted event details
 */
export const extractEventFromText = async (rawText) => {
  try {
    if (!rawText || rawText.trim().length === 0) {
      throw new Error('Please paste some text to parse');
    }

    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to .env.local');
    }

    console.log('🤖 Extracting event details from text using Gemini...');

    const prompt = `You are an expert at extracting event information from college notices, assignment sheets, and academic notifications.

Extract the following information from the provided text and return ONLY a valid JSON object (no markdown, no extra text):
{
  "title": "event name/title",
  "date": "YYYY-MM-DD format",
  "time": "HH:MM format (24-hour)",
  "description": "detailed description of the event"
}

Important rules:
- If date is relative (e.g., "next Monday"), calculate the actual date
- Extract submission deadline or exam date if mentioned
- If time is not explicitly mentioned, use "09:00" as default
- Keep description concise but informative
- Return ONLY valid JSON, nothing else

Text to parse:
${rawText}`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const result = await response.json();

    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }

    const responseText = result.candidates[0].content.parts[0].text;
    
    // Clean up response (remove markdown code blocks if present)
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const extractedData = JSON.parse(jsonText);

    console.log('✅ Event extracted successfully:', extractedData);

    return {
      success: true,
      data: {
        title: extractedData.title || '',
        date: extractedData.date || '',
        time: extractedData.time || '09:00',
        description: extractedData.description || '',
      },
    };

  } catch (error) {
    console.error('❌ Gemini extraction error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Validate extracted event data
 * @param {Object} eventData - Event data to validate
 * @returns {Object} Validation result with any errors
 */
export const validateExtractedEvent = (eventData) => {
  const errors = [];

  if (!eventData.title || eventData.title.trim().length === 0) {
    errors.push('Event title is required');
  }

  if (!eventData.date || eventData.date.trim().length === 0) {
    errors.push('Event date is required');
  } else {
    // Basic date format validation (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(eventData.date)) {
      errors.push('Date must be in YYYY-MM-DD format');
    }
  }

  if (!eventData.time || eventData.time.trim().length === 0) {
    errors.push('Event time is required');
  } else {
    // Basic time format validation (HH:MM)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(eventData.time)) {
      errors.push('Time must be in HH:MM format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
