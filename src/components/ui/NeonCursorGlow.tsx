'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface NeonParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  decay: number;
}

export const NeonCursorGlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth spring easing
    const mouse = {
      x: -200,
      y: -200,
      targetX: -200,
      targetY: -200,
      speed: 0,
    };

    let lastX = -200;
    let lastY = -200;
    let lastMoveTime = 0;

    const particles: NeonParticle[] = [];

    const darkNeonColors = [
      'rgba(0, 240, 255, ', // Electric Cyan
      'rgba(56, 189, 248, ', // Sky Blue
      'rgba(96, 165, 250, ', // Cobalt
      'rgba(192, 132, 252, ', // Purple Neon
    ];

    const lightNeonColors = [
      'rgba(37, 99, 235, ', // Sapphire Blue
      'rgba(79, 70, 229, ', // Indigo
      'rgba(14, 165, 233, ', // Cyan Blue
      'rgba(124, 58, 237, ', // Violet
    ];

    const activeColors = isDark ? darkNeonColors : lightNeonColors;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      lastMoveTime = performance.now();

      const dx = mouse.targetX - lastX;
      const dy = mouse.targetY - lastY;
      const dist = Math.hypot(dx, dy);
      mouse.speed = dist;

      // Emit interactive neon light particles on motion
      if (dist > 3) {
        const count = Math.min(Math.floor(dist * 0.4) + 1, 5);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * (dist * 0.15) + 0.5;
          const baseColor = activeColors[Math.floor(Math.random() * activeColors.length)];

          particles.push({
            x: mouse.targetX + (Math.random() - 0.5) * 8,
            y: mouse.targetY + (Math.random() - 0.5) * 8,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 3 + 2,
            alpha: isDark ? 0.85 : 0.7,
            color: baseColor,
            decay: Math.random() * 0.035 + 0.02,
          });
        }
      }

      lastX = mouse.targetX;
      lastY = mouse.targetY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let pulseTime = 0;

    const render = () => {
      pulseTime += 0.04;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lag for fluid light movement
      mouse.x += (mouse.targetX - mouse.x) * 0.28;
      mouse.y += (mouse.targetY - mouse.y) * 0.28;

      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;
      const idleAlpha = Math.max(0.2, 1 - timeSinceMove / 1200);

      // =========================================================================
      // 1. PRIMARY NEON LIGHT SPOTLIGHT (Following Cursor)
      // =========================================================================
      if (mouse.x > 0 && mouse.y > 0) {
        const pulse = Math.sin(pulseTime) * 12;
        const outerRadius = Math.max(120, 220 + pulse + mouse.speed * 1.5);
        const innerRadius = Math.max(10, 25 + Math.sin(pulseTime * 1.5) * 5);

        // Volumetric Outer Neon Light Bloom
        const outerGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          outerRadius
        );

        if (isDark) {
          outerGlow.addColorStop(0, `rgba(0, 240, 255, ${0.35 * idleAlpha})`);
          outerGlow.addColorStop(0.3, `rgba(59, 130, 246, ${0.18 * idleAlpha})`);
          outerGlow.addColorStop(0.7, `rgba(139, 92, 246, ${0.06 * idleAlpha})`);
          outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          outerGlow.addColorStop(0, `rgba(37, 99, 235, ${0.28 * idleAlpha})`);
          outerGlow.addColorStop(0.35, `rgba(99, 102, 241, ${0.14 * idleAlpha})`);
          outerGlow.addColorStop(0.7, `rgba(14, 165, 233, ${0.05 * idleAlpha})`);
          outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, outerRadius, 0, Math.PI * 2);
        ctx.fill();

        // Intense Core Neon Light Spark
        const coreGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          innerRadius
        );

        if (isDark) {
          coreGlow.addColorStop(0, `rgba(255, 255, 255, ${0.9 * idleAlpha})`);
          coreGlow.addColorStop(0.4, `rgba(0, 240, 255, ${0.8 * idleAlpha})`);
          coreGlow.addColorStop(1, 'rgba(0, 240, 255, 0)');
        } else {
          coreGlow.addColorStop(0, `rgba(255, 255, 255, ${0.95 * idleAlpha})`);
          coreGlow.addColorStop(0.4, `rgba(37, 99, 235, ${0.85 * idleAlpha})`);
          coreGlow.addColorStop(1, 'rgba(37, 99, 235, 0)');
        }

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, innerRadius, 0, Math.PI * 2);
        ctx.fill();

        // High-precision light point
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${0.95 * idleAlpha})`
          : `rgba(37, 99, 235, ${0.95 * idleAlpha})`;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // =========================================================================
      // 2. TRAILING NEON PARTICLES (Emanating Light Trails)
      // =========================================================================
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const particleGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius * 2
        );
        particleGrad.addColorStop(0, `${p.color}${p.alpha})`);
        particleGrad.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = particleGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
      style={{
        mixBlendMode: isDark ? 'screen' : 'multiply',
      }}
    />
  );
};
