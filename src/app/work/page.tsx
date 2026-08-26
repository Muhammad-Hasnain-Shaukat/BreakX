'use client';

import React, { useState } from 'react';
import { LitImageEffect } from '@/components/ui/LitImageEffect';
import { sampleCaseStudies, CaseStudy } from '@/components/sections/Showcase';
import { Sparkles, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const categories = ['All', 'AI Solutions', 'Web Apps', 'UI/UX', 'Automation'];

  const filteredStudies =
    activeCategory === 'All'
      ? sampleCaseStudies
      : sampleCaseStudies.filter((item) => item.category === activeCategory);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-surface-card/90 neon-pill text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span className="text-accent-cyan uppercase tracking-widest text-[11px]">OUR WORK & PORTFOLIO</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight">
          Engineering Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#818CF8] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(96,165,250,0.7)]">Masterpieces.</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
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
                : 'bg-surface-card/90 border border-surface-border text-slate-300 hover:text-white hover:border-primary-500/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Portfolio Items with Large, Uncompressed Image Boxes */}
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
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md neon-pill text-xs font-extrabold text-accent-cyan">
                {study.metric}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-primary-400">{study.client}</span>
                <span className="px-3 py-1 rounded-full bg-surface border border-surface-border font-semibold text-slate-300">
                  {study.category}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-white group-hover:text-primary-400 transition-colors">
                {study.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {study.description}
              </p>
            </div>

            <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {study.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-surface border border-surface-border text-[11px] font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <span className="inline-flex items-center space-x-1 text-xs font-bold text-accent-cyan group-hover:translate-x-1 transition-transform">
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
          <div className="bg-[#030712] border border-primary-500/50 rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-neon-blue max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold text-accent-cyan">
                  {selectedStudy.category}
                </span>
                <h2 className="font-display font-bold text-2xl text-white mt-1">
                  {selectedStudy.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedStudy(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-surface"
              >
                ✕
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
              <div className="p-4 rounded-2xl bg-surface border border-surface-border flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-300">Key Result Metric</span>
                <span className="text-sm font-extrabold text-accent-cyan">
                  {selectedStudy.metric}
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {selectedStudy.description}
              </p>
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400">Architecture & Technologies</span>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-surface border border-primary-500/30 text-xs font-semibold text-white"
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
