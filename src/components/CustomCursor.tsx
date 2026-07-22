import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Position of the mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-performance fluid tracking
  const springConfig = { damping: 28, stiffness: 320, mass: 0.3 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slightly slower spring for background spotlight glow
  const spotlightConfig = { damping: 40, stiffness: 180, mass: 0.8 };
  const spotlightX = useSpring(mouseX, spotlightConfig);
  const spotlightY = useSpring(mouseY, spotlightConfig);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) {
        setIsVisible(true);
      }

      // Check if mouse is hovering over an interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = 
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.closest(".cursor-pointer") !== null ||
          target.getAttribute("role") === "button";
        
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Ambient Cursor Spotlight */}
      <motion.div
        style={{
          x: spotlightX,
          y: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-80 h-80 rounded-full bg-radial from-[#FF6D29]/10 via-[#CA3F16]/5 to-transparent blur-3xl pointer-events-none z-10 hidden md:block"
      />

      {/* Click Ripple Effect */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          initial={{ opacity: 0.8, scale: 0.2 }}
          animate={{ opacity: 0, scale: 2.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="fixed w-12 h-12 rounded-full border border-[#FF6D29] pointer-events-none z-[9998] hidden md:block"
        />
      ))}

      {/* Outer Dynamic Precision Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (isClicking ? 36 : 52) : 22,
          height: isHovered ? (isClicking ? 36 : 52) : 22,
          borderColor: isHovered 
            ? "rgba(255, 109, 41, 0.7)" 
            : "rgba(202, 63, 22, 0.3)",
          backgroundColor: isHovered 
            ? "rgba(255, 109, 41, 0.08)" 
            : "rgba(255, 109, 41, 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22, mass: 0.2 }}
        className="fixed top-0 left-0 rounded-full border border-[#CA3F16]/30 pointer-events-none z-[9999] hidden md:block backdrop-blur-[1px]"
      />

      {/* Inner Precision Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? (isClicking ? 1.2 : 1.8) : 1,
          backgroundColor: isHovered ? "#FF6D29" : "#CA3F16",
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block shadow-[0_0_8px_rgba(255,109,41,0.8)]"
      />
    </>
  );
}
