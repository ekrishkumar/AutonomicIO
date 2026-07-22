import React, { useEffect, useState } from "react";

export default function ThreeDGridBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Perspective Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "800px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated Grid Floor */}
        <div 
          className="absolute w-[200vw] h-[200vh] origin-center opacity-65 dark:opacity-85"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 109, 41, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 109, 41, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: "center",
            transform: `rotateX(62deg) translateZ(-100px) translateY(-15%) rotateZ(${-mouse.x * 10}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.4s ease-out",
          }}
        >
          {/* Depth shader */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F3F4F5] via-transparent to-[#F3F4F5] dark:from-[#100C08] dark:via-transparent dark:to-[#100C08]"
          />
        </div>
      </div>

      {/* 3D Floating Glowing Glassmorphic Spheres */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-radial from-[#FF6D29]/10 to-transparent blur-3xl transition-transform duration-1000 ease-out"
        style={{
          top: "15%",
          left: "10%",
          transform: `translate3d(${mouse.x * 50}px, ${mouse.y * 50}px, 50px)`,
        }}
      />
      <div 
        className="absolute w-[450px] h-[450px] rounded-full bg-radial from-indigo-500/8 to-transparent blur-3xl transition-transform duration-[1200ms] ease-out"
        style={{
          bottom: "10%",
          right: "8%",
          transform: `translate3d(${-mouse.x * 60}px, ${-mouse.y * 60}px, -30px)`,
        }}
      />
    </div>
  );
}
