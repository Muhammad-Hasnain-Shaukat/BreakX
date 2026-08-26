'use client';

import React from 'react';
import { ShieldCheck, Cpu, Zap, Code2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const ValuePropSection: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pillars = [
    {
      icon: <Cpu className={`w-6 h-6 ${isDark ? 'text-primary-400' : 'text-blue-600'}`} />,
      title: 'Bespoke AI Orchestration',
      description: 'Custom RAG indexing, fine-tuned LLM agents, and vector similarity search built directly into your core workflow.',
    },
    {
      icon: <Zap className={`w-6 h-6 ${isDark ? 'text-accent-cyan' : 'text-cyan-600'}`} />,
      title: 'Dynamic WebGL Motion Shaders',
      description: 'Lightweight real-time browser shaders and 3D web components that elevate visual identity without heavy video lag.',
    },
    {
      icon: <Code2 className={`w-6 h-6 ${isDark ? 'text-accent-purple' : 'text-purple-600'}`} />,
      title: 'Production-Grade Architecture',
      description: 'Next.js 14 App Router, Prisma ORM, PostgreSQL database, and cloud storage pipelines built to scale effortlessly.',
    },
    {
      icon: <ShieldCheck className={`w-6 h-6 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />,
      title: 'Zero-Security-Compromise',
      description: 'End-to-end Zod validation, role-based access control, presigned file access, and strict rate-limiting standards.',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div
            className={`text-xs uppercase font-extrabold tracking-widest ${
              isDark ? 'text-accent-cyan' : 'text-blue-600'
            }`}
          >
            OUR APPROACH
          </div>
          <h2
            className={`font-display font-black text-3xl sm:text-5xl tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            We don’t just build. <br />
            <span
              className={`text-transparent bg-clip-text ${
                isDark
                  ? 'bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-purple drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]'
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-[0_2px_15px_rgba(37,99,235,0.25)]'
              }`}
            >
              We build what matters.
            </span>
          </h2>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Strategy. Design. Development. Growth. All under one roof.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="neon-column p-7 rounded-3xl space-y-4 flex flex-col justify-between group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isDark
                    ? 'bg-surface border border-primary-500/40 shadow-neon-blue'
                    : 'bg-white border border-blue-200 shadow-[0_4px_15px_rgba(37,99,235,0.15)]'
                }`}
              >
                {pillar.icon}
              </div>
              <div className="space-y-2">
                <h3
                  className={`font-display font-bold text-lg group-hover:text-primary-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {pillar.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
