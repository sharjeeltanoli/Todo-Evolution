'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCurrentUser, logout } from '@/lib/auth';
import { User } from '@/types';
import { 
  CheckSquare, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/');
  };

  // Hide navbar on landing page (/)
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 h-16 text-white flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
      <Link href="/" className="group flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <span className="text-xl font-black tracking-tighter hover:text-indigo-400 transition-colors">
          Todo<span className="text-indigo-500">Evolution</span>
        </span>
      </Link>

      <div className="flex items-center gap-3 sm:gap-4">
        {user ? (
          <div className="flex items-center gap-1 sm:gap-2 bg-white/5 border border-white/10 rounded-full px-2 py-1.5 backdrop-blur-sm shadow-inner">
            {/* Grouped Navigation Links */}
            <div className="flex items-center gap-1 sm:gap-2 pr-1 sm:pr-2 border-r border-white/10">
              <Link 
                href="/tasks" 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group ${
                  pathname === '/tasks' 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <CheckSquare size={16} className={pathname === '/tasks' ? 'text-white' : 'text-zinc-500 group-hover:text-indigo-400'} />
                <span className="text-xs font-bold hidden md:inline tracking-tight uppercase">Tasks</span>
              </Link>
              
              <Link 
                href="/chat" 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group ${
                  pathname === '/chat' 
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <MessageSquare size={16} className={pathname === '/chat' ? 'text-white' : 'text-zinc-500 group-hover:text-indigo-400'} />
                <span className="text-xs font-bold hidden md:inline tracking-tight uppercase">Chat</span>
              </Link>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 px-2 border-r border-white/10">
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black border border-indigo-400 shadow-lg shadow-indigo-500/20 shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-white hidden lg:inline tracking-tight truncate max-w-[80px]">
                {user.name}
              </span>
            </div>

            {/* Logout Action */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-95 group"
            >
              <LogOut size={16} className="text-zinc-500 group-hover:text-red-400" />
              <span className="text-xs font-bold hidden md:inline tracking-tight uppercase">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/" 
              className="text-sm font-bold bg-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-500/20 text-white"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
