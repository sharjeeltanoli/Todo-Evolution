'use client';

import { useState, useRef, useEffect } from 'react';
import { apiFetch } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const loadLastConversation = async () => {
      try {
        const conversations = await apiFetch<any[]>('/api/chat/conversations');
        if (conversations.length > 0) {
          const lastConv = conversations[conversations.length - 1];
          setConversationId(lastConv.id);
          const history = await apiFetch<any[]>(`/api/chat/history/${lastConv.id}`);
          setMessages(history.map(m => ({ role: m.role, content: m.content })));
        }
      } catch (err) {
        console.error('Failed to load history', err);
      }
    };
    loadLastConversation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const data = await apiFetch<{ response: string; conversation_id: number }>('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: userMessage,
          conversation_id: conversationId,
        }),
      });

      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      setConversationId(data.conversation_id);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center text-white/50 mt-20">
            <p className="text-xl">Hello! How can I help you today?</p>
            <p className="text-sm">Try asking "Add a task to buy milk"</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white/20 text-white rounded-tl-none border border-white/10'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/20 text-white p-3 rounded-2xl rounded-tl-none border border-white/10 animate-pulse">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white/5 border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
