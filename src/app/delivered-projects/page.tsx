'use client';

import React from 'react';
import { ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface DeliveredProject {
  id: string;
  name: string;
  client: string;
  url: string;
  metrics: string[];
  architecture: string;
  testimonial: string;
  author: string;
}

const projects: DeliveredProject[] = [
  {
    id: '1',
    name: 'Spherule DeFi Protocol',
    client: 'Spherule Financial Inc.',
    url: 'https://spherule.finance',
    metrics: ['$120M TVL Injected', '0.4s Latency', '100k Monthly Swaps'],
    architecture: 'Next.js 14 App Router, WebGL Shaders, Tailwind CSS, Prisma, PostgreSQL',
    testimonial: 'BreakX executed our entire protocol UI and backend infrastructure flawlessly. The WebGL shader graphics created an unforgettable product impression.',
    author: 'Marcus Sterling, CEO',
  },
  {
    id: '2',
    name: 'Acme Document Intelligence Engine',
    client: 'Acme Global Technologies',
    url: 'https://acme.tech/ai',
    metrics: ['50k Daily PDFs Indexed', '99.8% Query Accuracy', '-60% Ops Overhead'],
    architecture: 'Python RAG Architecture, Qdrant Vector DB, Next.js Admin Portal',
    testimonial: 'Our internal staff efficiency skyrocketed overnight. BreakX delivered enterprise-level AI capabilities with consumer-grade simplicity.',
    author: 'Sarah Jenkins, VP Engineering',
  },
  {
    id: '3',
    name: 'Pulse Telemedicine Hub',
    client: 'Pulse Health Systems',
    url: 'https://pulsehealth.co',
    metrics: ['99.99% HIPAA Uptime', '15k Active Doctors', '4.9/5 App Rating'],
    architecture: 'React 18, WebSockets Real-Time Sync, Node.js Serverless Microservices',
    testimonial: 'BreakX understood both healthcare compliance requirements and world-class UI design seamlessly.',
    author: 'David Vance, CTO',
  },
];

export default function DeliveredProjectsPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-surface-card/90 neon-pill text-xs font-bold tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="text-accent-cyan uppercase tracking-widest text-[11px]">PROVEN CLIENT SUCCESS</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
          Delivered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(96,165,250,0.7)]">Production Systems.</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Explore completed client deployments engineered by BreakX, complete with verified performance metrics and architecture breakdowns.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="neon-column p-8 rounded-3xl space-y-6 relative overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border/60">
              <div>
                <span className="text-xs font-bold text-accent-cyan uppercase tracking-wider">
                  Client: {project.client}
                </span>
                <h2 className="font-display font-bold text-3xl text-white mt-1">{project.name}</h2>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-surface border border-primary-500/40 hover:border-primary-400 text-white text-xs font-bold transition-all hover:scale-105 shadow-neon-blue"
              >
                <span>Visit Live System</span>
                <ArrowUpRight className="w-4 h-4 text-accent-cyan" />
              </a>
            </div>

            {/* Metrics pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-surface/80 border border-primary-500/30 flex items-center space-x-3"
                >
                  <Zap className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="font-extrabold text-white text-sm">{metric}</span>
                </div>
              ))}
            </div>

            {/* Architecture & Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
                  Technical Architecture
                </h4>
                <p className="text-xs text-slate-200 font-mono bg-surface/80 p-3.5 rounded-xl border border-surface-border">
                  {project.architecture}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
                  Client Feedback
                </h4>
                <div className="p-3.5 rounded-xl bg-primary-500/10 border border-primary-500/30 text-xs text-slate-200 italic">
                  "{project.testimonial}" — <span className="font-bold not-italic text-white">{project.author}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
