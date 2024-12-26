// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export default function HomePage() {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(); // подключится к тому же домену/порту
    setSocket(newSocket);

    newSocket.on('announcement', (msg: string) => {
      setAnnouncements(prev => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendAnnouncement = () => {
    if (socket && inputValue.trim()) {
      socket.emit('teacher:announcement', inputValue);
      setInputValue('');
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Teacher–Student App (Next.js 13)</h1>

      <section style={{ marginTop: 30 }}>
        <h2>Announcements</h2>
        <ul>
          {announcements.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
        <div>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Write announcement"
          />
          <button onClick={sendAnnouncement}>Send</button>
        </div>
      </section>
    </main>
  );
}
