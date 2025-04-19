// pages/ask.js

import { useState } from 'react';

export default function AskPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    setLoading(true);
    setAnswer('');
    setError('');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question }),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes.error || 'Unknown error');
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      console.error('❌ Client error:', err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1>💬 Ask the Assistant</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={5}
        style={{ width: '100%', padding: '1rem', marginBottom: '1rem' }}
        placeholder="Ask me anything about your products..."
      />

      <button onClick={handleAsk} disabled={loading} style={{ padding: '0.75rem 1.5rem' }}>
        {loading ? '⏳ Asking...' : 'Ask GPT'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>⚠️ {error}</p>}

      {answer && (
        <div style={{ marginTop: '2rem', background: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
          <strong>Assistant:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
