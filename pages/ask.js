import { useState } from 'react';

export default function Ask() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const askGPT = async () => {
    setLoading(true);
    setAnswer('');
    setError('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
      console.error('❌ Client fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Ask the Assistant</h1>
      <textarea
        rows={4}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask about your products..."
        style={{ width: '100%', marginBottom: '1rem', padding: '1rem' }}
      />
      <button onClick={askGPT} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask GPT'}
      </button>
      {answer && <p style={{ marginTop: '1rem' }}>💬 {answer}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>⚠️ {error}</p>}
    </div>
  );
}
export async function getServerSideProps() {
  return { props: {} };
}
