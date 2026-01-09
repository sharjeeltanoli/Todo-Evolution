'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login({ email, password });
      localStorage.setItem('access_token', response.access_token);
      router.push('/tasks');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during signin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-gray-400 text-sm mt-1">Sign in to continue your progress</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="space-y-3">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={onSwitchToSignUp}
          className="text-gray-400 text-sm hover:text-white transition-colors"
        >
          Don't have an account? <span className="text-indigo-400 font-semibold hover:underline">Sign Up</span>
        </button>
      </div>
    </div>
  );
}
