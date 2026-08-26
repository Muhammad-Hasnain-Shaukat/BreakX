'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DX: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Environment Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06090f, 0.1);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.2, 7.2);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8; // High exposure for vibrant shine
    container.appendChild(renderer.domElement);

    // 4. STILL, ROCK-SOLID 3D X GROUP (Fixed Orientation matching reference)
    const xGroup = new THREE.Group();
    xGroup.position.set(0.2, 0.1, 0);
    xGroup.rotation.set(0.08, -0.32, 0); // Exact steady angle matching target reference image
    scene.add(xGroup);

    // High-Shine Diamond Glass Material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      metalness: 0.3,
      roughness: 0.02, // Ultra slick smooth surface for mirror reflections
      transmission: 0.92,
      thickness: 1.8,
      ior: 1.8, // High refraction like diamond/crystal
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      reflectivity: 1.0,
    });

    // Pure White Inner Core Material
    const whiteCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    // Chrome Edge Bevel Outline Material
    const chromeEdgeMaterial = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      metalness: 0.98,
      roughness: 0.05,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.6,
    });

    // Crossing Bars for 3D X Sculpture
    const barWidth = 0.95;
    const barHeight = 4.6;
    const barDepth = 0.95;

    const barGeometry = new THREE.BoxGeometry(barWidth, barHeight, barDepth);

    // Main Crystal Glass Bars
    const bar1 = new THREE.Mesh(barGeometry, glassMaterial);
    bar1.rotation.z = Math.PI / 4;

    const bar2 = new THREE.Mesh(barGeometry, glassMaterial);
    bar2.rotation.z = -Math.PI / 4;

    xGroup.add(bar1);
    xGroup.add(bar2);

    // Shiny Metallic Chrome Outline Frame
    const frameGeometry = new THREE.BoxGeometry(barWidth * 1.03, barHeight * 1.01, barDepth * 0.35);
    const frame1 = new THREE.Mesh(frameGeometry, chromeEdgeMaterial);
    frame1.rotation.z = Math.PI / 4;
    const frame2 = new THREE.Mesh(frameGeometry, chromeEdgeMaterial);
    frame2.rotation.z = -Math.PI / 4;
    xGroup.add(frame1);
    xGroup.add(frame2);

    // Inner White Light Beam Cores
    const innerBarGeo = new THREE.BoxGeometry(barWidth * 0.4, barHeight * 0.9, barDepth * 0.4);
    const inner1 = new THREE.Mesh(innerBarGeo, whiteCoreMaterial);
    inner1.rotation.z = Math.PI / 4;
    const inner2 = new THREE.Mesh(innerBarGeo, whiteCoreMaterial);
    inner2.rotation.z = -Math.PI / 4;
    xGroup.add(inner1);
    xGroup.add(inner2);

    // 5. BRIGHT WHITE CENTER BURST & RADIATING LIGHT RAYS
    const centerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 32), whiteCoreMaterial);
    xGroup.add(centerSphere);

    // Volumetric White Light Ray Flare Plane
    const beamTexture = createLightBeamTexture();
    const beamMaterial = new THREE.MeshBasicMaterial({
      map: beamTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      opacity: 0.95,
    });

    const beamPlaneGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const beamPlane = new THREE.Mesh(beamPlaneGeo, beamMaterial);
    beamPlane.position.z = -0.1;
    xGroup.add(beamPlane);

    // 6. Outer Thin Glowing Ring (Still, matching reference)
    const ringGeometry = new THREE.TorusGeometry(3.3, 0.035, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 6;
    xGroup.add(ring);

    // 7. Reflective Dark Ground Base
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x06090f,
      roughness: 0.1,
      metalness: 0.9,
      reflectivity: 1.0,
      clearcoat: 1.0,
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.4;
    scene.add(floor);

    // 8. HIGH INTENSITY SHINE LIGHTS
    // Pure White Central Point Light Burst
    const centerWhiteLight = new THREE.PointLight(0xffffff, 60, 15);
    centerWhiteLight.position.set(0, 0, 0.5);
    xGroup.add(centerWhiteLight);

    // Sharp Front Key Spotlight for Specular Reflection
    const keySpotLight = new THREE.SpotLight(0xffffff, 35, 20, Math.PI / 4, 0.2);
    keySpotLight.position.set(2, 3, 6);
    keySpotLight.target = xGroup;
    scene.add(keySpotLight);

    // Electric Cyan & Violet Rim Lights
    const cyanLight = new THREE.PointLight(0x00f0ff, 25, 15);
    cyanLight.position.set(4, 2, 2);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 22, 15);
    purpleLight.position.set(-4, -1, 2);
    scene.add(purpleLight);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x0e172a, 2.5);
    scene.add(ambientLight);

    // 9. Particle Cloud
    const particlesCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 9;
      particlePositions[i + 1] = (Math.random() - 0.5) * 9;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render Loop (Keeps 3D X STILL in place with subtle pulsing white light burst)
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const render = () => {
      const time = clock.getElapsedTime();

      // Subtle light emission pulse (position remains completely STILL)
      centerWhiteLight.intensity = 55 + Math.sin(time * 3) * 10;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial-glow filter blur-3xl opacity-75 -z-10" />
    </div>
  );
};

// Radial white light ray texture generator
function createLightBeamTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const cx = 256;
  const cy = 256;

  // Intense center white glow
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
  grad.addColorStop(0.45, 'rgba(96, 165, 250, 0.4)');
  grad.addColorStop(0.75, 'rgba(139, 92, 246, 0.15)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // 12 Sharp pure white starburst rays
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(240, 0);
    ctx.lineTo(0, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
