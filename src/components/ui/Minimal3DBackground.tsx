'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export const Minimal3DBackground: React.FC = () => {
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

    // Mouse interactive coordinates with smooth easing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // 3D Geometric Grid Waves & Floating Nodes
    interface Node3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      size: number;
      speed: number;
      phase: number;
    }

    let nodes: Node3D[] = [];
    const GRID_COLS = 22;
    const GRID_ROWS = 14;

    const initNodes = () => {
      nodes = [];
      const spacingX = width / (GRID_COLS - 1);
      const spacingY = height / (GRID_ROWS - 1);

      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const x = (c - GRID_COLS / 2) * spacingX * 1.2;
          const y = (r - GRID_ROWS / 2) * spacingY * 1.2;
          const z = Math.sin(c * 0.4) * Math.cos(r * 0.4) * 180;

          nodes.push({
            x,
            y,
            z,
            baseX: x,
            baseY: y,
            baseZ: z,
            size: Math.random() * 1.8 + 1.2,
            speed: Math.random() * 0.0015 + 0.0008,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    initNodes();

    let time = 0;

    const render = () => {
      time += 0.012;

      // Smooth mouse follow interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const mouseNormX = (mouse.x / width - 0.5) * 2;
      const mouseNormY = (mouse.y / height - 0.5) * 2;

      // Clear Canvas with subtle luxury ambient gradient
      ctx.clearRect(0, 0, width, height);

      // 3D Projection parameters
      const fov = 450;
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Dynamic rotation based on time and subtle mouse parallax
      const rotY = Math.sin(time * 0.25) * 0.12 + mouseNormX * 0.18;
      const rotX = -0.38 + mouseNormY * 0.12 + Math.cos(time * 0.2) * 0.06;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Transformed and projected coordinates store
      const projected: { px: number; py: number; scale: number; alpha: number; origZ: number }[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // 3D Undulating Wave Formula
        const wave = Math.sin(time + node.phase + node.baseX * 0.003) * 60 + Math.cos(time * 0.8 + node.baseY * 0.004) * 50;
        const currentZ = node.baseZ + wave;

        // 3D Rotations
        // Rotate Y
        const x1 = node.baseX * cosY - currentZ * sinY;
        const z1 = node.baseX * sinY + currentZ * cosY;

        // Rotate X
        const y2 = node.baseY * cosX - z1 * sinX;
        const z2 = node.baseY * sinX + z1 * cosX;

        // Camera distance offset
        const zFinal = z2 + 650;

        if (zFinal > 50) {
          const scale = fov / zFinal;
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;

          // Depth-based alpha fade
          const depthAlpha = Math.max(0.1, Math.min(0.9, (1200 - zFinal) / 800));

          projected.push({
            px,
            py,
            scale,
            alpha: depthAlpha,
            origZ: zFinal,
          });
        } else {
          projected.push({ px: -9999, py: -9999, scale: 0, alpha: 0, origZ: 9999 });
        }
      }

      // 1. Draw 3D Grid Lines (Horizontal & Vertical connecting ribbons)
      ctx.lineWidth = isDark ? 0.75 : 0.65;

      for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
          const index = r * GRID_COLS + c;
          const p1 = projected[index];
          if (!p1 || p1.alpha <= 0.05) continue;

          // Connect Horizontal neighbor
          if (c < GRID_COLS - 1) {
            const pRight = projected[index + 1];
            if (pRight && pRight.alpha > 0.05) {
              const avgAlpha = (p1.alpha + pRight.alpha) * 0.5;
              ctx.strokeStyle = isDark
                ? `rgba(0, 240, 255, ${avgAlpha * 0.28})`
                : `rgba(37, 99, 235, ${avgAlpha * 0.22})`;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(pRight.px, pRight.py);
              ctx.stroke();
            }
          }

          // Connect Vertical neighbor
          if (r < GRID_ROWS - 1) {
            const pDown = projected[index + GRID_COLS];
            if (pDown && pDown.alpha > 0.05) {
              const avgAlpha = (p1.alpha + pDown.alpha) * 0.5;
              ctx.strokeStyle = isDark
                ? `rgba(96, 165, 250, ${avgAlpha * 0.24})`
                : `rgba(99, 102, 241, ${avgAlpha * 0.18})`;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(pDown.px, pDown.py);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Draw Subtle 3D Geometric Nodes / Vertices
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.alpha <= 0.08 || p.px < 0 || p.px > width || p.py < 0 || p.py > height) continue;

        const nodeRadius = Math.max(0.8, nodes[i].size * p.scale * 1.5);

        // Core Node
        ctx.fillStyle = isDark
          ? `rgba(0, 240, 255, ${p.alpha * 0.75})`
          : `rgba(37, 99, 235, ${p.alpha * 0.65})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle Ambient Glow Halo on closer nodes
        if (p.alpha > 0.45) {
          ctx.fillStyle = isDark
            ? `rgba(96, 165, 250, ${p.alpha * 0.15})`
            : `rgba(59, 130, 246, ${p.alpha * 0.12})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, nodeRadius * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Dynamic 3D Geometric Mesh Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-700"
      />

      {/* Atmospheric Minimalist Ambient Lighting Orbs */}
      <div
        className={`absolute top-1/4 -left-20 w-96 h-96 rounded-full filter blur-[120px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-cyan-500/10' : 'bg-blue-400/10'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-20 w-[30rem] h-[30rem] rounded-full filter blur-[140px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-indigo-500/10' : 'bg-purple-400/10'
        }`}
      />
      <div
        className={`absolute bottom-10 left-1/3 w-80 h-80 rounded-full filter blur-[100px] pointer-events-none transition-colors duration-700 ${
          isDark ? 'bg-blue-600/8' : 'bg-sky-400/8'
        }`}
      />

      {/* Subtle Top & Bottom Gradient Vignette for Seamless Section Transitions */}
      <div
        className={`absolute inset-x-0 top-0 h-32 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-[#030712] to-transparent'
            : 'bg-gradient-to-b from-[#F8FAFC] to-transparent'
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-36 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-t from-[#030712] to-transparent'
            : 'bg-gradient-to-t from-[#F8FAFC] to-transparent'
        }`}
      />
    </div>
  );
};
