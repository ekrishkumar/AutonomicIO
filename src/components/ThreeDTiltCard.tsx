import React, { useRef, useState } from "react";
import { motion } from "motion/react";

interface ThreeDTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  key?: React.Key;
}

export default function ThreeDTiltCard({
  children,
  className = "",
  glowColor = "rgba(255, 109, 41, 0.15)", // Default sunset-orange glow
}: ThreeDTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coordinates relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage from center
    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate tilt angles (max tilt of 10 degrees)
    const maxTilt = 8;
    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    
    setRotateX(tiltX);
    setRotateY(tiltY);
    
    // Glow position percentage
    const glowX = (x / width) * 100;
    const glowY = (y / height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-200 ease-out ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        className="w-full h-full relative rounded-xl"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow effect overlay */}
        <div
          className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 120px at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 70%)`,
          }}
        />
        
        {/* 3D Depth Layer */}
        <div 
          className="w-full h-full"
          style={{
            transform: isHovered ? "translateZ(10px)" : "translateZ(0px)",
            transition: "transform 0.2s ease-out",
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
