import React from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ScrollTrackerProps {
  scrollProgress: number;
}

export default function ScrollTracker({ scrollProgress }: ScrollTrackerProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG parameters for radial progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  // Calculate offset. Ensure it doesn't go below 0 or above circumference.
  const strokeDashoffset = circumference - (Math.min(Math.max(scrollProgress, 0), 100) / 100) * circumference;

  // Only show the tracker once the user has scrolled down a bit (e.g., > 5%)
  const isVisible = scrollProgress > 5;

  return (
    <div className="fixed bottom-6 left-6 z-[160] font-sans">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="relative group"
          >
            {/* Ambient Background Glow matching Autonomic premium colors */}
            <div className="absolute -inset-1.5 rounded-full bg-premium-blue/10 dark:bg-[#7EBAF1]/10 blur-md opacity-70 group-hover:opacity-100 transition-opacity" />

            <button
              onClick={handleScrollToTop}
              className="relative w-12 h-12 rounded-full bg-white/95 dark:bg-[#12151C]/95 border border-[#E2E8F0] dark:border-[#222630] shadow-xl flex items-center justify-center cursor-pointer select-none overflow-hidden transition-all duration-300 group-hover:border-premium-blue/40"
              aria-label="Scroll to top"
            >
              {/* SVG Radial Progress Ring */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 p-1 select-none pointer-events-none">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-[#E2E8F0]/30 dark:stroke-[#222630]/30"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="stroke-premium-blue dark:stroke-[#7EBAF1]"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
                />
              </svg>

              {/* Icon / Percentage state toggle */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Regular State: elegant micro icon */}
                <span className="group-hover:opacity-0 transition-opacity duration-300 transform group-hover:-translate-y-1 block text-premium-blue dark:text-[#7EBAF1]">
                  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                </span>

                {/* Hover State: numeric percentage display */}
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0 text-[10px] font-mono font-bold text-premium-blue dark:text-[#7EBAF1] select-none">
                  {Math.round(scrollProgress)}%
                </span>
              </div>
            </button>

            {/* Premium, clean Tooltip */}
            <div className="absolute bottom-14 left-0 bg-[#12151C] dark:bg-white text-white dark:text-[#12151C] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-lg opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-200 whitespace-nowrap">
              Back to Top
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
