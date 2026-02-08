'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import UserMenu from './UserMenu';

export default function Navbar() {
  const pathname = usePathname();

  // Hide navbar on landing page (/)
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-zinc-950/70 backdrop-blur-md border-b border-white/10 px-6 py-4 text-white flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
      <Link href="/" className="group flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <span className="text-xl font-black tracking-tighter hover:text-indigo-400 transition-colors">
          Todo<span className="text-indigo-500">Evolution</span>
        </span>
      </Link>
      <UserMenu />
    </nav>
  );
}
