'use client';

import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Jenkins',
      title: 'VP of Engineering, Acme Corp',
      quote: 'BreakX delivered our document AI platform 2 weeks ahead of schedule. The dynamic light shader interface and search speed blew our executive team away.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'David Vance',
      title: 'CTO, Pulse Health Systems',
      quote: 'The level of motion UI polish and technical precision BreakX brought to our telemedicine suite set a new standard for our entire product organization.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Elena Rostova',
      title: 'Head of Product, Vertex Logistics',
      quote: 'From custom IoT telemetry streams to responsive mobile management tools, BreakX is hands-down the most capable digital agency we have worked with.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section className="py-20 bg-surface-card/40 border-t border-surface-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="text-xs uppercase font-extrabold tracking-widest text-accent-cyan">
            TESTIMONIALS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Trusted by leaders driving digital innovation.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="neon-column p-7 rounded-3xl flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed">
                  "{review.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-surface-border/60">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-primary-500/50"
                />
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{review.name}</h4>
                  <p className="text-slate-400 text-[11px]">{review.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
