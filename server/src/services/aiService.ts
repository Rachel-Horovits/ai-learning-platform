import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAIResponse(fullPrompt: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'ענה תשובה מקצועית, ברורה וקצרה ככל האפשר.' },
      { role: 'user', content: fullPrompt }
    ],
    max_tokens: 300,
  });
  return completion.choices[0]?.message?.content || 'No response';
}