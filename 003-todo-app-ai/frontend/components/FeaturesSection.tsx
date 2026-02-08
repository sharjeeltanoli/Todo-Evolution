'use client';

import { 
  CheckCircle, 
  Target, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="w-full py-24 lg:py-32 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tighter text-white mb-6 leading-[1.1]">
            Everything you need to <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">stay productive</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Todo Evolution combines simplicity with powerful features to help you manage your tasks efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Smart Task Management", desc: "Organize tasks with intuitive controls. Mark complete, edit inline, and stay on top of your workload.", icon: CheckCircle },
            { title: "Goal Setting", desc: "Set daily and weekly goals. Watch your progress and celebrate your achievements as you evolve.", icon: Target },
            { title: "Progress Analytics", desc: "Visualize your productivity with beautiful charts and data-driven insights.", icon: BarChart3 },
            { title: "Secure & Private", desc: "Your data is encrypted and protected. We never share your personal information with third parties.", icon: ShieldCheck }
          ].map((feature, i) => (
            <div key={i} className="group relative bg-indigo-950/20 backdrop-blur-xl border border-indigo-500/40 rounded-3xl p-8 flex flex-col h-full shadow-[0_0_50px_-12px_rgba(139,92,246,0.4)] hover:shadow-[0_0_70px_-10px_rgba(139,92,246,0.6)] hover:border-indigo-500/50 transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
