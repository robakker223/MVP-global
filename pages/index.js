// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>Welcome to MVP Global</h1>
      <p>This is your assistant demo. Click below to try it out.</p>
      <Link href="/assistant">
        <button style={{ padding: '0.6rem 1.2rem', marginTop: '1rem' }}>
          Go to Assistant
        </button>
      </Link>
    </div>
  );
}
