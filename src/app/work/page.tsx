'use client';

import React, { useState } from 'react';
import { LitImageEffect } from '@/components/ui/LitImageEffect';
import { sampleCaseStudies, CaseStudy } from '@/components/sections/Showcase';
import { Sparkles, ArrowRight, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const categories = ['All', 'AI Solutions', 'Web Apps', 'UI/UX', 'Automation'];

  const filteredStudies =
    activeCategory === 'All'
      ? sampleCaseStudies
      : sampleCaseStudies.filter((item) => item.category === activeCategory);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
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
            OUR WORK & PORTFOLIO
          </span>
        </div>
        <h1
          className={`font-display font-black text-4xl sm:text-6xl tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Engineering Digital{' '}
          <span
            className={`text-transparent bg-clip-text ${
              isDark
                ? 'bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(96,165,250,0.7)]'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
            }`}
          >
            Masterpieces.
          </span>
        </h1>
        <p className={`text-base sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Explore our portfolio of high-impact web applications, bespoke AI integrations, and motion design systems built with WebGL shader technology.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center items-center gap-2.5 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white shadow-neon-blue border border-primary-400/40'
                : isDark
                ? 'bg-surface-card/90 border border-surface-border text-slate-300 hover:text-white hover:border-primary-500/50'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            onClick={() => setSelectedStudy(study)}
            className="neon-column rounded-3xl overflow-hidden p-6 space-y-6 cursor-pointer group"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <LitImageEffect
                src={study.imageSrc}
                glowColorPrimary={study.glowPrimary}
                glowColorSecondary={study.glowSecondary}
                intensity={1.25}
                className="w-full h-72 sm:h-80 lg:h-96"
                alt={study.title}
              />
              <div
                className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-extrabold shadow-md ${
                  isDark
                    ? 'bg-background/90 neon-pill text-accent-cyan'
                    : 'bg-white/95 border border-blue-300 text-blue-700'
                }`}
              >
                {study.metric}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-bold ${isDark ? 'text-primary-400' : 'text-blue-600'}`}>
                  {study.client}
                </span>
                <span
                  className={`px-3 py-1 rounded-full font-semibold ${
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
                isDark ? 'border-surface-border/60' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-wrap gap-1.5">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium border ${
                      isDark
                        ? 'bg-surface border-surface-border text-slate-300'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span
                className={`inline-flex items-center space-x-1 text-xs font-bold group-hover:translate-x-1 transition-transform ${
                  isDark ? 'text-accent-cyan' : 'text-blue-600'
                }`}
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div
            className={`border rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto ${
              isDark
                ? 'bg-[#030712] border-primary-500/50 shadow-neon-blue'
                : 'bg-white border-blue-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span
                  className={`text-xs uppercase font-extrabold ${
                    isDark ? 'text-accent-cyan' : 'text-blue-600'
                  }`}
                >
                  {selectedStudy.category}
                </span>
                <h2
                  className={`font-display font-bold text-2xl mt-1 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {selectedStudy.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedStudy(null)}
                className={`p-2 rounded-full border transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-white bg-surface border-surface-border'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden">
              <LitImageEffect
                src={selectedStudy.imageSrc}
                glowColorPrimary={selectedStudy.glowPrimary}
                glowColorSecondary={selectedStudy.glowSecondary}
                intensity={1.5}
                className="w-full h-80 sm:h-96"
                alt={selectedStudy.title}
              />
            </div>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark
                    ? 'bg-surface border-surface-border'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Key Result Metric
                </span>
                <span className={`text-sm font-extrabold ${isDark ? 'text-accent-cyan' : 'text-blue-600'}`}>
                  {selectedStudy.metric}
                </span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {selectedStudy.description}
              </p>
              <div className="space-y-2">
                <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Architecture & Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        isDark
                          ? 'bg-surface border-primary-500/30 text-white'
                          : 'bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Link
                href="/project-request"
                className="py-3 px-6 rounded-full bg-gradient-to-r from-primary-600 to-accent-purple text-white font-bold text-xs shadow-neon-blue hover:scale-105 transition-transform"
              >
                Request Similar System
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
