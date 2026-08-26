'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Code, Cpu, Zap, Palette, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ServiceDetail {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  budgetRange: string;
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string>('website-development');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const servicesList: ServiceDetail[] = [
    {
      id: 'website-development',
      name: 'Website & Web App Development',
      icon: <Code className={`w-6 h-6 ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`} />,
      tagline: 'High-performance web applications with real-time WebGL motion shaders.',
      description: 'We construct production-ready web applications using Next.js 14 App Router, Tailwind CSS, TypeScript, and Prisma ORM. Integrated with custom WebGL fragment shaders for glowing light emission graphics without dynamic video overhead.',
      deliverables: [
        'Next.js 14 App Router codebase with 100% TypeScript type safety',
        'Custom WebGL GLSL Shader light emission components',
        'Prisma ORM database schema with PostgreSQL compatibility',
        'Mobile-first responsive design down to 320px viewports',
      ],
      timeline: '4 - 8 Weeks',
      budgetRange: '$25,000 - $50,000',
    },
    {
      id: 'ai-solutions',
      name: 'Bespoke AI Solutions & RAG',
      icon: <Cpu className={`w-6 h-6 ${isDark ? 'text-primary-400' : 'text-indigo-600'}`} />,
      tagline: 'Enterprise RAG document indexing, fine-tuned LLM agents, and vector search.',
      description: 'Turn unformatted enterprise data into actionable conversational intelligence. We deploy custom Retrieval-Augmented Generation (RAG) pipelines, vector search clusters (Qdrant/Pinecone), and LLM microservices.',
      deliverables: [
        'Semantic document parser supporting PDF, DOCX, and JSON',
        'Vector similarity search API with latency under 100ms',
        'Role-based access control and security logging',
        'Custom executive AI dashboard interface',
      ],
      timeline: '6 - 10 Weeks',
      budgetRange: '$50,000 - $100,000',
    },
    {
      id: 'automation',
      name: 'Enterprise Automation Engines',
      icon: <Zap className={`w-6 h-6 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />,
      tagline: 'Autonomous IoT telemetry, real-time data sync, and workflow optimization.',
      description: 'Automate manual operational bottlenecks. We engineer custom Python ETL jobs, WebSocket event streaming pipelines, and automated reporting hubs.',
      deliverables: [
        'Real-time WebSocket data streaming engine',
        'Automated background job queues (Redis / BullMQ)',
        'Custom API integrations and webhook receivers',
        'Monitoring and error reporting integration',
      ],
      timeline: '4 - 6 Weeks',
      budgetRange: '$30,000 - $60,000',
    },
    {
      id: 'ui-ux',
      name: 'UI/UX & Motion Design Systems',
      icon: <Palette className={`w-6 h-6 ${isDark ? 'text-accent-purple' : 'text-purple-600'}`} />,
      tagline: 'State-of-the-art dark glassmorphism, micro-interactions, and design tokens.',
      description: 'Create memorable visual identities. We craft comprehensive Figma component systems, interactive Framer Motion prototypes, and dynamic color palettes built to wow users.',
      deliverables: [
        'Complete Figma design system with tokens and variants',
        'Interactive Framer Motion web prototypes',
        'Accessible color contrast and WCAG AA compliance',
        'Design handoff documentation for engineering teams',
      ],
      timeline: '3 - 5 Weeks',
      budgetRange: '$20,000 - $40,000',
    },
  ];

  const currentService = servicesList.find((s) => s.id === selectedService) || servicesList[0];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div
          className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full neon-pill text-xs font-bold tracking-wide ${
            isDark ? 'bg-surface-card/90' : 'bg-white'
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`} />
          <span
            className={`uppercase tracking-widest text-[11px] ${
              isDark ? 'text-accent-cyan' : 'text-blue-600'
            }`}
          >
            OUR SERVICES & CAPABILITIES
          </span>
        </div>
        <h1
          className={`font-display font-black text-4xl sm:text-6xl tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Capabilities Designed to{' '}
          <span
            className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(96,165,250,0.7)]'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            }`}
          >
            Scale.
          </span>
        </h1>
        <p className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Explore BreakX's core service offerings spanning high-end web development, bespoke AI systems, enterprise automation, and motion UI design.
        </p>
      </div>

      {/* Interactive Service Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {servicesList.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service.id)}
            className={`p-6 rounded-2xl text-left transition-all space-y-3 ${
              selectedService === service.id
                ? isDark
                  ? 'neon-column border-primary-400 bg-primary-950/40 text-white shadow-neon-blue scale-105'
                  : 'neon-column border-blue-500 bg-blue-50/80 text-slate-900 shadow-[0_10px_25px_rgba(37,99,235,0.2)] scale-105'
                : isDark
                ? 'bg-surface-card/80 border border-surface-border text-slate-300 hover:text-white hover:border-primary-500/50'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-blue-300 shadow-sm'
            }`}
          >
            <div
              className={`p-2.5 rounded-xl border w-fit ${
                isDark
                  ? 'bg-surface border-primary-500/30'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              {service.icon}
            </div>
            <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {service.name}
            </h3>
            <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              {service.tagline}
            </p>
          </button>
        ))}
      </div>

      {/* Selected Service Detailed View */}
      <div className="neon-column p-8 sm:p-12 rounded-3xl space-y-8">
        <div
          className={`flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b ${
            isDark ? 'border-surface-border/60' : 'border-slate-200'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div
                className={`p-3 rounded-2xl border ${
                  isDark
                    ? 'bg-primary-500/20 border-primary-400/40 shadow-neon-blue'
                    : 'bg-blue-100 border-blue-300 shadow-sm'
                }`}
              >
                {currentService.icon}
              </div>
              <h2 className={`font-display font-bold text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentService.name}
              </h2>
            </div>
            <p className={`text-sm max-w-2xl ${isDark ? 'text-slate-200' : 'text-slate-600'}`}>
              {currentService.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div
              className={`px-4 py-3 rounded-xl border text-center ${
                isDark ? 'bg-surface border-primary-500/30' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <span className={`text-[10px] uppercase font-extrabold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Est. Timeline
              </span>
              <span className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentService.timeline}
              </span>
            </div>
            <div
              className={`px-4 py-3 rounded-xl border text-center ${
                isDark ? 'bg-surface border-primary-500/30' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <span className={`text-[10px] uppercase font-extrabold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Budget Range
              </span>
              <span className={`font-extrabold text-sm ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`}>
                {currentService.budgetRange}
              </span>
            </div>
          </div>
        </div>

        {/* Deliverables */}
        <div className="space-y-4">
          <h3 className={`text-sm uppercase font-extrabold tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Core Service Deliverables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentService.deliverables.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-start space-x-3 ${
                  isDark
                    ? 'bg-surface/80 border-primary-500/30'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`} />
                <span className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Trigger */}
        <div
          className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'border-surface-border/60' : 'border-slate-200'
          }`}
        >
          <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Ready to initiate a project under{' '}
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {currentService.name}
            </span>
            ?
          </div>
          <Link
            href={`/project-request?service=${encodeURIComponent(currentService.name)}`}
            className="py-3.5 px-8 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple text-white font-bold text-xs shadow-neon-blue hover:shadow-neon-purple transition-all flex items-center space-x-2 border border-primary-400/40"
          >
            <span>Initiate Project Request</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
