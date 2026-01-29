'use client';

import { useState } from 'react';
import Image from "next/image";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";

type AuthView = 'signin' | 'signup';

export default function Home() {
  const [authView, setAuthView] = useState<AuthView>('signin');

  return (
    <div className="min-h-screen w-full bg-[#000000] text-white overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Top Radial Glow for Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15)_0%,transparent_70%)] pointer-events-none"></div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen w-full max-w-7xl mx-auto px-6 py-12 flex items-center">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Column: Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-indigo-400">
                    Organize your life
                  </span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[1.1]">
                  Get things done with <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Todo Evolution</span>
                </h1>
                <p className="max-w-lg mx-auto lg:mx-0 text-lg sm:text-xl text-gray-400 leading-relaxed font-medium">
                  Experience the evolution of productivity. Our lightning-fast interface 
                  and secure architecture help you focus on what truly matters.
                </p>
              </div>

              {/* Hero Stats */}
              <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-12">
                {[
                  { label: "Secure", val: "100%" },
                  { label: "Uptime", val: "99.9%" },
                  { label: "Speed", val: "< 100ms" }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start">
                    <p className="text-xl sm:text-2xl font-black text-white tracking-tighter">{stat.val}</p>
                    <p className="text-[10px] text-indigo-500 uppercase tracking-widest font-black">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Auth Card */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="w-full max-w-[450px] min-h-[550px] bg-indigo-950/20 backdrop-blur-xl border border-indigo-500/40 rounded-3xl p-8 flex flex-col shadow-[0_0_50px_-12px_rgba(139,92,246,0.4)] relative group transition-all duration-100 hover:shadow-[0_0_70px_-10px_rgba(139,92,246,0.6)] hover:border-indigo-500/50">
                <div className="relative flex-1 flex flex-col">
                  {authView === 'signin' ? (
                    <SignInForm onSwitchToSignUp={() => setAuthView('signup')} />
                  ) : (
                    <SignUpForm onSwitchToSignIn={() => setAuthView('signin')} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Powerful Features Section */}
        <FeaturesSection />

        {/* How It Works Section */}
        <HowItWorksSection />
      </main>
    </div>
  );
}
