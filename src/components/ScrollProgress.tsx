import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Gradient Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#FF6D29] via-[#CA3F16] to-[#95122C] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(255,109,41,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to Top Floating Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-white/90 dark:bg-[#181B22]/90 hover:bg-[#CA3F16] dark:hover:bg-[#CA3F16] text-[#100C08] dark:text-white hover:text-white border border-[#E2E8F0] dark:border-[#2A2F3D] rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 cursor-pointer group active:scale-90"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 duration-200" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
