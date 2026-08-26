'use client';

import React from 'react';
import { ShieldCheck, Cpu, Zap, Code2 } from 'lucide-react';

export const ValuePropSection: React.FC = () => {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6 text-primary-400" />,
      title: 'Bespoke AI Orchestration',
      description: 'Custom RAG indexing, fine-tuned LLM agents, and vector similarity search built directly into your core workflow.',
    },
    {
      icon: <Zap className="w-6 h-6 text-accent-cyan" />,
      title: 'Dynamic WebGL Motion Shaders',
      description: 'Lightweight real-time browser shaders and 3D web components that elevate visual identity without heavy video lag.',
    },
    {
      icon: <Code2 className="w-6 h-6 text-accent-purple" />,
      title: 'Production-Grade Architecture',
      description: 'Next.js 14 App Router, Prisma ORM, PostgreSQL database, and cloud storage pipelines built to scale effortlessly.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Zero-Security-Compromise',
      description: 'End-to-end Zod validation, role-based access control, presigned file access, and strict rate-limiting standards.',
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent-cyan">
            OUR APPROACH
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            We don’t just build. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-accent-cyan to-accent-purple drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              We build what matters.
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Strategy. Design. Development. Growth. All under one roof.
          </p>
        </div>

        {/* Pillars Grid with Neon Column Light Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="neon-column p-7 rounded-3xl space-y-4 flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-surface border border-primary-500/40 flex items-center justify-center shadow-neon-blue group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-lg text-white group-hover:text-primary-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
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
