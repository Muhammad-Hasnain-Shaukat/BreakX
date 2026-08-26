'use client';

import React from 'react';
import { ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full neon-pill text-xs font-bold tracking-wide ${
            isDark ? 'bg-surface-card/90' : 'bg-white'
          }`}
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`} />
          <span
            className={`uppercase tracking-widest text-[11px] ${
              isDark ? 'text-accent-cyan' : 'text-blue-600'
            }`}
          >
            PROVEN CLIENT SUCCESS
          </span>
        </div>
        <h1
          className={`font-display font-black text-4xl sm:text-6xl tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Delivered{' '}
          <span
            className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(96,165,250,0.7)]'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            }`}
          >
            Production Systems.
          </span>
        </h1>
        <p className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
            <div
              className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b ${
                isDark ? 'border-surface-border/60' : 'border-slate-200'
              }`}
            >
              <div>
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-accent-cyan' : 'text-blue-600'
                  }`}
                >
                  Client: {project.client}
                </span>
                <h2 className={`font-display font-bold text-3xl mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {project.name}
                </h2>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-surface border-primary-500/40 hover:border-primary-400 text-white shadow-neon-blue'
                    : 'bg-white border-slate-200 hover:border-blue-400 text-slate-800 shadow-sm'
                }`}
              >
                <span>Visit Live System</span>
                <ArrowUpRight className={`w-4 h-4 ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`} />
              </a>
            </div>

            {/* Metrics pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border flex items-center space-x-3 ${
                    isDark
                      ? 'bg-surface/80 border-primary-500/30'
                      : 'bg-white border-slate-200 shadow-sm'
                  }`}
                >
                  <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {metric}
                  </span>
                </div>
              ))}
            </div>

            {/* Architecture & Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h4 className={`text-xs uppercase font-extrabold tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Technical Architecture
                </h4>
                <p
                  className={`text-xs font-mono p-3.5 rounded-xl border ${
                    isDark
                      ? 'text-slate-200 bg-surface/80 border-surface-border'
                      : 'text-slate-700 bg-slate-100 border-slate-200'
                  }`}
                >
                  {project.architecture}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className={`text-xs uppercase font-extrabold tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Client Feedback
                </h4>
                <div
                  className={`p-3.5 rounded-xl border text-xs italic ${
                    isDark
                      ? 'bg-primary-500/10 border-primary-500/30 text-slate-200'
                      : 'bg-blue-50/80 border-blue-200 text-slate-700'
                  }`}
                >
                  "{project.testimonial}" —{' '}
                  <span className={`font-bold not-italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {project.author}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
