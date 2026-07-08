const aiService = require('./backend/src/services/aiService');

async function test() {
  try {
    const response = await aiService.chat('Hello', { complaints: [] });
    console.log('AI Response:', response);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
