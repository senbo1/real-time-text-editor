import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

export default function Editor() {
  const { id } = useParams();
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`/ws/document/${id}`);

    const socket = socketRef.current;

    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'init') {
          setContent(data.content);
        } else if (data.type === 'update') {
          setContent(data.content);
        }
      };

      socket.onopen = () => {
        console.log('connected');
      };
    }

    return () => {
      if (socket) socket.close();
    };
  }, [id]);

  const sendMessage = (message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ type: 'update', content: message })
      );
    }
  };

  const [content, setContent] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    sendMessage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-sm border border-gray-200 min-h-[800px] relative">
            <div className="p-16">
              <textarea
                value={content}
                onChange={handleTextChange}
                className={`
                  w-full h-full min-h-[600px] resize-none border-none outline-none
                  text-gray-900 text-base leading-relaxed font-normal
                  placeholder-gray-400 bg-transparent
                `}
                spellCheck={true}
                autoComplete="off"
                autoCapitalize="sentences"
                autoFocus={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
