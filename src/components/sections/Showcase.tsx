'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LitImageEffect } from '@/components/ui/LitImageEffect';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export interface CaseStudy {
  id: string;
  title: string;
  category: 'AI Solutions' | 'Web Apps' | 'UI/UX' | 'Automation';
  client: string;
  metric: string;
  description: string;
  imageSrc: string;
  techStack: string[];
  glowPrimary: string;
  glowSecondary: string;
}

export const sampleCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'Acme Document AI Platform',
    category: 'AI Solutions',
    client: 'Acme Corp',
    metric: '+450% Processing Speed',
    description: 'Enterprise RAG indexing system processing over 50,000 PDF documents daily with instant semantic search.',
    imageSrc: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js 14', 'Python RAG', 'Vector DB', 'Tailwind'],
    glowPrimary: '#3B82F6',
    glowSecondary: '#00F0FF',
  },
  {
    id: '2',
    title: 'Pulse Telemedicine Suite',
    category: 'Web Apps',
    client: 'Pulse Health',
    metric: '99.99% HIPAA Uptime',
    description: 'Real-time doctor appointment booking and patient analytics platform with WebGL light visualization.',
    imageSrc: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React 18', 'WebGL Shaders', 'Node.js', 'Prisma'],
    glowPrimary: '#8B5CF6',
    glowSecondary: '#EC4899',
  },
  {
    id: '3',
    title: 'Spherule Crypto Protocol',
    category: 'UI/UX',
    client: 'Spherule Financial',
    metric: '$120M TVL Locked',
    description: 'Decentralized yield optimization platform featuring 3D glassmorphic cards and motion micro-interactions.',
    imageSrc: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Three.js', 'Framer Motion', 'TypeScript', 'Tailwind'],
    glowPrimary: '#10B981',
    glowSecondary: '#3B82F6',
  },
  {
    id: '4',
    title: 'Vertex Autonomous Fleet IoT',
    category: 'Automation',
    client: 'Vertex Logistics',
    metric: '10x Telemetry Ingestion',
    description: 'Mission-critical IoT monitoring interface streaming autonomous vehicle sensors with GPU lighting overlays.',
    imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js', 'WebSockets', 'Tailwind', 'Rust Core'],
    glowPrimary: '#F59E0B',
    glowSecondary: '#EF4444',
  },
];

export const ShowcaseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'AI Solutions', 'Web Apps', 'UI/UX', 'Automation'];
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const filteredStudies =
    activeCategory === 'All'
      ? sampleCaseStudies
      : sampleCaseStudies.filter((item) => item.category === activeCategory);

  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-3">
            <div
              className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? 'bg-primary-500/10 border border-primary-500/30 text-primary-400'
                  : 'bg-blue-50 border border-blue-200 text-blue-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SELECTED CASE STUDIES</span>
            </div>
            <h2
              className={`font-display font-black text-3xl sm:text-4xl tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Interactive{' '}
              <span
                className={`text-transparent bg-clip-text ${
                  isDark
                    ? 'bg-gradient-to-r from-primary-400 to-accent-cyan'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                }`}
              >
                Shader Showcase
              </span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-neon-blue'
                    : isDark
                    ? 'bg-surface-card border border-surface-border text-slate-400 hover:text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Grid with Large, Expansive Image Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden p-6 flex flex-col justify-between space-y-5 group"
            >
              <div className="relative">
                <LitImageEffect
                  src={study.imageSrc}
                  glowColorPrimary={study.glowPrimary}
                  glowColorSecondary={study.glowSecondary}
                  intensity={1.25}
                  className="w-full h-72 sm:h-80 lg:h-96"
                  alt={study.title}
                />
                <div
                  className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-extrabold shadow-lg ${
                    isDark
                      ? 'bg-background/90 border border-white/10 text-primary-400'
                      : 'bg-white/95 border border-slate-200 text-blue-700'
                  }`}
                >
                  {study.metric}
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${isDark ? 'text-primary-400' : 'text-blue-600'}`}>
                    {study.client}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${
                      isDark
                        ? 'bg-surface border border-surface-border text-slate-300'
                        : 'bg-slate-100 border border-slate-200 text-slate-700'
                    }`}
                  >
                    {study.category}
                  </span>
                </div>
                <h3
                  className={`font-display font-bold text-2xl group-hover:text-primary-500 transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {study.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {study.description}
                </p>
              </div>

              <div
                className={`pt-4 border-t flex items-center justify-between ${
                  isDark ? 'border-surface-border' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap gap-1.5">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                        isDark
                          ? 'bg-surface text-slate-300 border-surface-border'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href="/work"
                  className={`inline-flex items-center space-x-1 text-xs font-semibold transition-colors ${
                    isDark
                      ? 'text-primary-400 hover:text-accent-cyan'
                      : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
