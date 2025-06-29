import { OpenAI } from 'openai';

/**
 * Returns an AI-generated response (real or mock, based on env).
 * If USE_MOCK_AI=true in .env, returns a mock response.
 * Otherwise, calls OpenAI API.
 */
export async function getAIResponse(fullPrompt: string): Promise<string> {
  // Always returns a mock response
  return `Mock answer for: ${fullPrompt}`;

  /*
  // Real OpenAI API call
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Answer in a professional, clear, and concise manner.' },
      { role: 'user', content: fullPrompt }
    ],
    max_tokens: 300,
  });
  return completion.choices[0]?.message?.content || 'No response';
  */
}