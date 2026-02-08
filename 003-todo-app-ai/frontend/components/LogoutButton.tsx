// frontend/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // Redirect to home page after logout
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg text-sm font-bold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all active:scale-95"
    >
      Sign Out
    </button>
  );
}
