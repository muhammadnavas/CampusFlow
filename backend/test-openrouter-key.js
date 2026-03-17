import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testOpenRouterApiKey() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini';

  if (!apiKey) {
    console.error('❌ OPENROUTER_API_KEY not found in .env file');
    process.exit(1);
  }

  console.log(`🧪 Testing OpenRouter API Key...`);
  console.log(`📌 Model: ${model}`);
  console.log(`🔑 API Key: ${apiKey.substring(0, 10)}...${apiKey.substring(-5)}`);
  console.log('');

  try {
    const url = 'https://openrouter.ai/api/v1/chat/completions';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: 'Hello, please respond with "API key is valid!"' }
        ]
      }),
    });

    console.log(`📍 Response Status: ${response.status}`);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('❌ API Error:', errorBody);
      process.exit(1);
    }

    const result = await response.json();

    if (result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content) {
      const text = result.choices[0].message.content;
      console.log('✅ API Key is VALID!');
      console.log(`📝 Response: ${text}`);
      process.exit(0);
    } else {
      console.error('❌ Unexpected response format:', result);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Network Error:', error.message);
    process.exit(1);
  }
}

testOpenRouterApiKey();
