'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { User } from '@/types';
import LogoutButton from './LogoutButton';
import Link from 'next/link';

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [pathname]);

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/" className="text-sm font-medium hover:text-gray-300">
          Sign In
        </Link>
        <Link 
          href="/" 
          className="text-sm font-medium bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full pl-2 pr-2 py-1.5 backdrop-blur-sm">
      <div className="flex items-center gap-3 pl-1 pr-4 border-r border-white/10">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold border border-indigo-400 shadow-lg shadow-indigo-500/20">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-bold text-white hidden sm:inline tracking-tight">
          {user.name}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/tasks" className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest px-2">
          Tasks
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
