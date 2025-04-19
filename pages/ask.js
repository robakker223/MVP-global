// pages/api/ask.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    // Check if the response was OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ OpenAI API error: ${response.status} - ${errorText}`);
      return res.status(response.status).json({ error: 'Failed to fetch from OpenAI' });
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content || 'No answer received.';

    return res.status(200).json({ answer });
  } catch (err) {
    console.error('❌ Unexpected error in /api/ask:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
