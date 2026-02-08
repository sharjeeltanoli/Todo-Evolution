'use client';

import { 
  UserPlus, 
  LayoutDashboard, 
  Zap, 
  Trophy 
} from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="w-full py-24 lg:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
            How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">Unlock your productivity potential in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Create Account", desc: "Sign up in seconds and sync your tasks across all devices.", icon: UserPlus },
            { step: "02", title: "Plan Your Day", desc: "Add tasks with descriptions and organize them by priority.", icon: LayoutDashboard },
            { step: "03", title: "Stay Focused", desc: "Filter by pending tasks and focus on what matters most right now.", icon: Zap },
            { step: "04", title: "Reach Milestones", desc: "Mark tasks as completed and track your evolution over time.", icon: Trophy }
          ].map((item, i) => (
            <div key={i} className="group relative bg-indigo-950/20 backdrop-blur-xl border border-indigo-500/40 rounded-3xl p-8 shadow-[0_0_50px_-12px_rgba(139,92,246,0.4)] hover:shadow-[0_0_70px_-10px_rgba(139,92,246,0.6)] hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-1">
               <div className="absolute top-6 right-8 text-[10px] font-black text-indigo-500/40 uppercase tracking-[0.2em]">Step {item.step}</div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
