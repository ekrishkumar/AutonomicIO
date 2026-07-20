import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function OverviewSection() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
  ];

  return (
    <section id="overview-section" className="py-24 bg-[#FAFAFC] dark:bg-[#0E1015] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#222630] transition-colors duration-300 relative">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
        {/* Large Styled Headline Statement */}
        <div className="space-y-4">
          <span className="editorial-badge">CORE ORCHESTRATION</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#14161D] dark:text-white leading-[1.15]">
            Atelier node logic ensures <br />every <span className="bg-gradient-to-r from-[#FF5C43] to-[#FF8E7C] bg-clip-text text-transparent">process, trigger,</span> and action is <span className="underline decoration-[#FF5C43]/40">executed seamlessly.</span>
          </h2>
        </div>

        {/* Dynamic CTA Banner Row */}
        <div className="bg-white dark:bg-[#181B22] p-6 sm:p-8 border border-[#E2E8F0] dark:border-[#222630] flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl shadow-md">
          {/* Left side: Avatar Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex -space-x-2 overflow-hidden">
              {avatars.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-[#181B22] object-cover filter contrast-[1.05]"
                />
              ))}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#14161D] dark:text-white flex items-center gap-1.5 justify-center sm:justify-start">
                Join thousands using AI daily
              </div>
              <div className="text-xs text-[#14161D]/60 dark:text-white/60 font-light font-sans">Activate your custom atelier workspace module in one click.</div>
            </div>
          </div>

          {/* Right side: Button matching n8n coral pattern */}
          <div
            id="overview-btn-get-assistant"
            onClick={() => document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-4 group cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-md bg-[#FF5C43] hover:bg-[#E04830] text-white flex items-center justify-center transition-all duration-300 shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FF5C43]">
              Launch Sandbox Workspace
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
