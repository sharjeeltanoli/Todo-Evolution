'use client';

import { getCurrentUser } from '@/lib/auth';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChatInterface from '@/components/ChatInterface';

export default function ChatPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
    
    if (!currentUser) {
      router.push('/');
    }
  }, [router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background grid and radial glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.12)_0%,transparent_50%)] pointer-events-none"></div>

      <main className="container mx-auto px-4 py-12 relative z-10 pt-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2 mb-8 border-b border-white/10 pb-4">
            <h1 className="text-4xl font-extrabold tracking-tighter text-white">AI Assistant</h1>
            <p className="text-gray-400 mt-2 text-lg">Manage your tasks using natural language.</p>
          </div>
          
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}
