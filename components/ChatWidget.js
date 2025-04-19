import { useState, useEffect } from 'react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .chat-widget-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 12px 16px;
        border-radius: 999px;
        cursor: pointer;
        z-index: 9999;
      }
      .chat-widget-iframe {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 400px;
        height: 600px;
        border: none;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 9999;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      <div className="chat-widget-button" onClick={() => setOpen(!open)}>
        {open ? 'Close Assistant' : 'Ask AI'}
      </div>
      {open && (
        <iframe
          src="https://YOUR-DEPLOYED-URL/assistant"
          className="chat-widget-iframe"
        />
      )}
    </>
  );
}
