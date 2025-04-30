// pages/api/iterate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a game dev AI. When modifying code, clearly indicate changed lines using [MODIFIED] at the start of the line.' },
        { role: 'user', content: `Code:\n${code}\n\nInstruction: ${prompt}` }
      ],
      temperature: 0.3,
    });

    const result = response.choices[0].message.content;
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: 'AI processing failed' });
  }
}
