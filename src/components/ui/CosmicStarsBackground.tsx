'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const CosmicStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    // Minimalist subtle ambient stars
    const stars: {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      twinkleSpeed: number;
      color: string;
      pulsePhase: number;
    }[] = [];

    const darkStarColors = ['#FFFFFF', '#93C5FD', '#38BDF8', '#C084FC'];
    const lightStarColors = ['#3B82F6', '#6366F1', '#06B6D4'];
    const activeColors = isDark ? darkStarColors : lightStarColors;

    // Reduced density for clean minimalism
    for (let i = 0; i < 110; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (Math.random() * 1.2 + 0.4) * dpr,
        opacity: isDark ? Math.random() * 0.5 + 0.15 : Math.random() * 0.35 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Minimalist Twinkling Micro-stars
      for (const s of stars) {
        s.pulsePhase += s.twinkleSpeed;
        const currentOpacity = isDark
          ? Math.max(0.1, Math.min(0.7, s.opacity + Math.sin(s.pulsePhase) * 0.25))
          : Math.max(0.08, Math.min(0.45, s.opacity + Math.sin(s.pulsePhase) * 0.18));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-30 w-full h-full overflow-hidden transition-colors duration-500">
      {/* 1. Deep Obsidian / Pure Luxury Base Background */}
      <div
        className={`absolute inset-0 w-full h-full transition-colors duration-500 ${
          isDark ? 'bg-[#030712]' : 'bg-[#F8FAFC]'
        }`}
      />

      {/* 2. Soft Ambient Radial Glow (Clean and Minimalist) */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ${
          isDark
            ? 'bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,240,255,0.06),transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(37,99,235,0.07),transparent_70%)]'
        }`}
      />

      {/* 3. Subtle Stardust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
