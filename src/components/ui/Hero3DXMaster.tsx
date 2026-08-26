'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DXMaster: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Atmosphere Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.08);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.1, 7.0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.0; // High exposure for intense white light shine
    container.appendChild(renderer.domElement);

    // 4. Main 3D Group (Fixed, Still Position matching Image 2)
    const masterGroup = new THREE.Group();
    masterGroup.position.set(0, 0.1, 0);
    masterGroup.rotation.set(0.06, -0.28, 0); // Exact steady angle
    scene.add(masterGroup);

    // 5. Dark Metallic Pedestal Base (Matching Image 2)
    const pedestalGeo = new THREE.BoxGeometry(3.6, 0.5, 2.2);
    const pedestalMat = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      metalness: 0.95,
      roughness: 0.15,
      reflectivity: 1.0,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, -2.4, 0);
    masterGroup.add(pedestal);

    // Pedestal Chrome Edge Highlight
    const pedestalFrameGeo = new THREE.BoxGeometry(3.64, 0.52, 0.1);
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.98,
      roughness: 0.05,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.5,
    });
    const pedestalFrame = new THREE.Mesh(pedestalFrameGeo, chromeMat);
    pedestalFrame.position.set(0, -2.4, 1.06);
    masterGroup.add(pedestalFrame);

    // 6. Translucent Crystal Glass 3D 'X' Sculpture
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.9,
      metalness: 0.35,
      roughness: 0.02, // Ultra slick smooth crystal surface
      transmission: 0.94,
      thickness: 2.0,
      ior: 1.85, // High refraction index
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      reflectivity: 1.0,
    });

    const barWidth = 0.95;
    const barHeight = 4.5;
    const barDepth = 0.95;

    const barGeometry = new THREE.BoxGeometry(barWidth, barHeight, barDepth);

    // Diagonal Glass Bars
    const bar1 = new THREE.Mesh(barGeometry, glassMaterial);
    bar1.rotation.z = Math.PI / 4;

    const bar2 = new THREE.Mesh(barGeometry, glassMaterial);
    bar2.rotation.z = -Math.PI / 4;

    masterGroup.add(bar1);
    masterGroup.add(bar2);

    // Metallic Chrome Edge Frames for Crisp 3D Bevels
    const frameGeometry = new THREE.BoxGeometry(barWidth * 1.03, barHeight * 1.01, barDepth * 0.35);
    const frame1 = new THREE.Mesh(frameGeometry, chromeMat);
    frame1.rotation.z = Math.PI / 4;
    const frame2 = new THREE.Mesh(frameGeometry, chromeMat);
    frame2.rotation.z = -Math.PI / 4;
    masterGroup.add(frame1);
    masterGroup.add(frame2);

    // 7. PURE WHITE INTENSE LIGHT CORE & RADIATING STARBURST FLARES (Image 2)
    const whiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Inner Solid White Core Sphere
    const coreSphere = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 32), whiteMat);
    masterGroup.add(coreSphere);

    // Inner White Light Beam Prisms
    const innerBarGeo = new THREE.BoxGeometry(barWidth * 0.45, barHeight * 0.88, barDepth * 0.45);
    const inner1 = new THREE.Mesh(innerBarGeo, whiteMat);
    inner1.rotation.z = Math.PI / 4;
    const inner2 = new THREE.Mesh(innerBarGeo, whiteMat);
    inner2.rotation.z = -Math.PI / 4;
    masterGroup.add(inner1);
    masterGroup.add(inner2);

    // Volumetric Burst Rays (12 radiating white, blue, violet light rays)
    const rayGroup = new THREE.Group();
    const rayTexture = createRayStarburstTexture();

    const rayMaterial = new THREE.MeshBasicMaterial({
      map: rayTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      opacity: 0.95,
    });

    const rayPlane = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 7.2), rayMaterial);
    rayPlane.position.z = -0.05;
    rayGroup.add(rayPlane);

    // Secondary Cross Plane for 3D Radiating Depth
    const rayPlane2 = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 7.2), rayMaterial);
    rayPlane2.rotation.y = Math.PI / 4;
    rayPlane2.position.z = -0.05;
    rayGroup.add(rayPlane2);

    masterGroup.add(rayGroup);

    // 8. Outer Thin Glowing Ring (Image 2)
    const ringGeometry = new THREE.TorusGeometry(3.2, 0.035, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 6;
    masterGroup.add(ring);

    // 9. HIGH INTENSITY LIGHTING
    // Pure White Central Point Light Burst
    const centerWhiteLight = new THREE.PointLight(0xffffff, 75, 16);
    centerWhiteLight.position.set(0, 0, 0.5);
    masterGroup.add(centerWhiteLight);

    // Key Spotlight for Specular Diamond Highlights
    const keySpot = new THREE.SpotLight(0xffffff, 40, 20, Math.PI / 3, 0.2);
    keySpot.position.set(2, 4, 6);
    keySpot.target = masterGroup;
    scene.add(keySpot);

    // Electric Cyan & Violet Rim Lights
    const cyanLight = new THREE.PointLight(0x00f0ff, 30, 15);
    cyanLight.position.set(4, 2, 2);
    scene.add(cyanLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 28, 15);
    purpleLight.position.set(-4, -1, 2);
    scene.add(purpleLight);

    const ambientLight = new THREE.AmbientLight(0x0d1527, 2.5);
    scene.add(ambientLight);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Still Render Loop with subtle pulsing white core intensity
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const render = () => {
      const time = clock.getElapsedTime();

      // Subtle light pulse (Position remains STILL)
      centerWhiteLight.intensity = 70 + Math.sin(time * 3.5) * 15;
      rayGroup.rotation.z = Math.sin(time * 0.5) * 0.05; // Gentle subtle beam shimmer

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
    <div className="relative w-full h-[440px] md:h-[550px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full" />
      {/* Background ambient radial burst glow */}
      <div className="absolute inset-0 pointer-events-none bg-radial-glow filter blur-3xl opacity-80 -z-10" />
    </div>
  );
};

// Canvas procedural ray starburst texture generator (Matching Image 2 & 3)
function createRayStarburstTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const cx = 256;
  const cy = 256;

  // Center radial glow
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 256);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.18, 'rgba(255, 255, 255, 0.9)');
  grad.addColorStop(0.4, 'rgba(59, 130, 246, 0.45)');
  grad.addColorStop(0.7, 'rgba(139, 92, 246, 0.2)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // 16 Intense white flare beams
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(245, 0);
    ctx.lineTo(0, 6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
