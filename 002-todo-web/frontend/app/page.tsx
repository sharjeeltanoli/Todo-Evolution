'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

type AuthView = 'signin' | 'signup';

export default function Home() {
  const [authView, setAuthView] = useState<AuthView>('signin');

  return (
    <div className="h-screen w-full flex flex-col items-center bg-[#050505] font-sans text-white overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background grid and radial glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.12)_0%,transparent_50%)] pointer-events-none"></div>
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col justify-center relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full max-h-[800px] justify-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left w-full max-w-2xl lg:max-w-none justify-center">
            <div className="space-y-4 lg:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center justify-center lg:justify-start">
                <span className="px-3 py-1 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full backdrop-blur-sm">
                  Organize your life
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter text-white leading-[1.1]">
                Get things done with <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Todo Evolution</span>
              </h1>

              {/* Description */}
              <p className="max-w-lg mx-auto lg:mx-0 text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                Experience the evolution of productivity. Our lightning-fast interface 
                and secure architecture help you focus on what truly matters.
              </p>

              {/* Feature List */}
              <ul className="space-y-3 text-gray-300 font-medium text-sm sm:text-base hidden sm:block">
                {[
                  { text: "Lightning fast performance", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/20" },
                  { text: "Secure by default architecture", color: "bg-blue-500/20 text-blue-400 border-blue-500/20" },
                  { text: "Beautifully crafted user interface", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/20" }
                ].map((feature, i) => (
                  <li key={i} className="flex items-center justify-center lg:justify-start gap-3 group cursor-default">
                    <div className={`flex-shrink-0 w-6 h-6 ${feature.color} border rounded-full flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="group-hover:text-white transition-colors">{feature.text}</span>
                  </li>
                ))}
                              </ul>
                          </div>
              
                          {/* Stats Row */}
                          <div className="pt-8 border-t border-white/5 flex items-center justify-center lg:justify-start gap-8 sm:gap-12 hidden sm:flex">
                            {[
                              { label: "Secure", val: "100%" },                { label: "Uptime", val: "99.9%" },
                { label: "Speed", val: "< 100ms" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start">
                  <p className="text-2xl sm:text-3xl font-black text-white tracking-tighter">{stat.val}</p>
                  <p className="text-[10px] text-indigo-500 uppercase tracking-[0.3em] font-black">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Auth Container */}
          <div className="relative flex items-center justify-center w-full lg:pl-8 hidden md:flex h-full max-h-[600px]">
            {/* Decorative background blurs */}
            <div className="absolute top-0 -left-12 w-64 h-64 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-12 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-pulse animation-delay-2000"></div>

            <div className="relative w-full max-w-sm lg:max-w-md group h-full max-h-[500px]">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              
              <div className="relative bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl p-6 md:p-8 transition-all duration-500 h-full flex flex-col justify-center">
                
                {authView === 'signin' && (
                  <div className="h-full animate-in fade-in slide-in-from-right-4 duration-300">
                    <SignInForm onSwitchToSignUp={() => setAuthView('signup')} />
                  </div>
                )}

                {authView === 'signup' && (
                  <div className="h-full animate-in fade-in slide-in-from-right-4 duration-300">
                    <SignUpForm onSwitchToSignIn={() => setAuthView('signin')} />
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Trust Section */}
      <section className="w-full bg-black/40 border-t border-white/5 py-3 lg:py-4 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <p className="text-center md:text-left text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] whitespace-nowrap">
            Trusted by modern teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-20 grayscale invert scale-75 md:scale-90 origin-right">
             <Image src="/vercel.svg" alt="Partner 1" width={100} height={20} className="hover:opacity-100 transition-opacity" />
             <Image src="/next.svg" alt="Partner 2" width={100} height={20} className="hover:opacity-100 transition-opacity" />
             <Image src="/globe.svg" alt="Partner 3" width={28} height={28} className="hover:opacity-100 transition-opacity" />
             <Image src="/window.svg" alt="Partner 4" width={28} height={28} className="hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="w-full py-2 text-center text-gray-600 text-[9px] tracking-widest font-bold uppercase border-t border-white/5 bg-black">
        © 2026 Todo Evolution • All Rights Reserved
      </footer>
    </div>
  );
}
