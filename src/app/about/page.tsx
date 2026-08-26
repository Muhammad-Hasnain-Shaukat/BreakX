'use client';

import React from 'react';
import { LitImageEffect } from '@/components/ui/LitImageEffect';
import { Sparkles, Milestone } from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    {
      year: '2022',
      title: 'Studio Foundation',
      description: 'BreakX was founded by senior full-stack architects with a vision to eliminate slow legacy software agencies and bring real-time 3D/WebGL experiences to enterprise web platforms.',
      badgeImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      glow: '#3B82F6',
    },
    {
      year: '2023',
      title: 'WebGL Shader Engine Launch',
      description: 'Engineered the proprietary BreakX GLSL shader layer, bringing continuous light emission, volumetric bloom, and 60 FPS GPU-accelerated motion to brand landing pages.',
      badgeImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      glow: '#8B5CF6',
    },
    {
      year: '2024',
      title: 'Bespoke AI Orchestration',
      description: 'Expanded capabilities to include enterprise RAG pipelines, fine-tuned LLM agents, and vector database integrations for fortune 500 tech partners.',
      badgeImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      glow: '#00F0FF',
    },
    {
      year: '2026',
      title: 'Global Transformation Leader',
      description: 'Scaled to over 2,000+ satisfied clients across North America, Europe, and Asia-Pacific with a 99.8% on-time delivery track record.',
      badgeImg: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
      glow: '#F59E0B',
    },
  ];

  const team = [
    {
      name: 'Alexander Vance',
      role: 'Founder & Principal Architect',
      bio: 'Ex-Google engineer specializing in WebGL shader graphics, distributed systems, and modern web frameworks.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Sophia Chen',
      role: 'VP of AI Engineering',
      bio: 'PhD in Computer Science leading our machine learning, vector indexing, and automated RAG pipeline teams.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    {
      name: 'Marcus Sterling',
      role: 'Head of Product & Motion UI',
      bio: 'Award-winning creative director crafting fluid micro-interactions, dark glassmorphism, and brand identities.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-surface-card/90 neon-pill text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="text-accent-cyan uppercase tracking-widest text-[11px]">OUR STORY & EVOLUTION</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
          Architects of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(96,165,250,0.7)]">Next Web.</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          We combine cutting-edge WebGL shader graphics, full-stack engineering discipline, and custom AI orchestration to craft digital experiences that outperform.
        </p>
      </div>

      {/* Timeline Section with Large, Uncompressed Image Boxes */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="font-display font-bold text-3xl text-white">Company Evolution & Milestones</h2>
          <p className="text-xs text-accent-cyan mt-1 font-semibold">Highlighted with BreakX LitImageEffect shader badges</p>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:left-1/2 before:-ml-px before:w-0.5 before:bg-primary-500/30">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
              className={`flex flex-col lg:flex-row items-center gap-8 ${idx % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Text Card */}
              <div className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-8">
                <div className="neon-column p-8 rounded-3xl space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold px-4 py-1.5 rounded-full bg-primary-500/20 text-accent-cyan border border-primary-500/40 shadow-neon-blue">
                      {m.year}
                    </span>
                    <Milestone className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">{m.title}</h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{m.description}</p>
                </div>
              </div>

              {/* Large, Expansive Image Box (Uncompressed 16:9 / 16:10 aspect ratio) */}
              <div className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-8">
                <div className="rounded-3xl overflow-hidden neon-pill shadow-2xl border border-primary-500/40">
                  <LitImageEffect
                    src={m.badgeImg}
                    glowColorPrimary={m.glow}
                    glowColorSecondary="#8B5CF6"
                    intensity={1.25}
                    className="w-full h-72 sm:h-80 lg:h-96 object-cover"
                    alt={m.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Bios */}
      <div className="pt-12 border-t border-surface-border space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display font-bold text-3xl text-white">Leadership & Craftsmanship</h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Engineers and designers driven by obsessive quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className="neon-column p-8 rounded-3xl space-y-5 text-center group hover:scale-[1.02] transition-transform"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto object-cover border-2 border-primary-400 ring-4 ring-primary-500/30 shadow-neon-blue group-hover:scale-105 transition-transform"
              />
              <div>
                <h3 className="font-display font-bold text-xl text-white">{member.name}</h3>
                <p className="text-xs font-extrabold text-accent-cyan mt-1">{member.role}</p>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
