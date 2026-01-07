"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError("");
    await authClient.signUp.email({
      email,
      password,
      name,
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (ctx) => {
        setError(ctx.error.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white border rounded shadow">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
        />
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
             className="w-full p-2 border rounded"
        />
        <button onClick={handleSignUp} disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-center text-sm">Already have an account? <Link href="/sign-in" className="text-blue-500">Sign In</Link></p>
      </div>
    </div>
  );
}
