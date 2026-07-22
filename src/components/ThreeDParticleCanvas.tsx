import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Particles Data
    const particleCount = 70;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions: { x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 20;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push({
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.012,
        vy: (Math.random() - 0.5) * 0.012,
        vz: (Math.random() - 0.5) * 0.012,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Material (Glowing Nodes)
    const particleTexture = createGlowTexture();
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#FF6D29"),
      size: 1.2,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Lines Material for Node Connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#CA3F16"),
      transparent: true,
      opacity: 0.18,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.005;
      mouseY = (e.clientY - windowHalfY) * 0.005;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Window Resize
    const handleResize = () => {
      if (!mount) return;
      const newWidth = mount.clientWidth || window.innerWidth;
      const newHeight = mount.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera motion
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = Math.sin(elapsedTime * 0.1) * 2 + targetX * 10;
      camera.position.y = Math.cos(elapsedTime * 0.12) * 2 - targetY * 10;
      camera.lookAt(scene.position);

      // Update particle positions
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const currentPos = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const orig = originalPositions[i];
        orig.x += orig.vx;
        orig.y += orig.vy;
        orig.z += orig.vz;

        // Bounce back if drifting too far
        if (Math.abs(orig.x) > 20) orig.vx *= -1;
        if (Math.abs(orig.y) > 15) orig.vy *= -1;
        if (Math.abs(orig.z) > 12) orig.vz *= -1;

        currentPos[i * 3] = orig.x + Math.sin(elapsedTime + i) * 0.2;
        currentPos[i * 3 + 1] = orig.y + Math.cos(elapsedTime * 0.8 + i) * 0.2;
        currentPos[i * 3 + 2] = orig.z;
      }
      posAttr.needsUpdate = true;

      // Update connecting lines between close particles
      let lineVertexIndex = 0;
      const lineArray = lineGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = currentPos[i * 3] - currentPos[j * 3];
          const dy = currentPos[i * 3 + 1] - currentPos[j * 3 + 1];
          const dz = currentPos[i * 3 + 2] - currentPos[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 48) {
            lineArray[lineVertexIndex++] = currentPos[i * 3];
            lineArray[lineVertexIndex++] = currentPos[i * 3 + 1];
            lineArray[lineVertexIndex++] = currentPos[i * 3 + 2];

            lineArray[lineVertexIndex++] = currentPos[j * 3];
            lineArray[lineVertexIndex++] = currentPos[j * 3 + 1];
            lineArray[lineVertexIndex++] = currentPos[j * 3 + 2];
          }
        }
      }

      lineGeometry.setDrawRange(0, lineVertexIndex / 3);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />;
}

// Helper canvas texture for radial soft glowing particle nodes
function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255, 109, 41, 1)");
  gradient.addColorStop(0.3, "rgba(234, 97, 19, 0.6)");
  gradient.addColorStop(0.7, "rgba(234, 97, 19, 0.15)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
