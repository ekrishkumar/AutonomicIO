import React, { useState, useEffect } from "react";
import { Play, Pause, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import avatarImg from "../assets/images/quote_avatar_1784449323211.jpg";

interface QuoteSectionProps {
  openCaseStudyModal: () => void;
}

export default function QuoteSection({ openCaseStudyModal }: QuoteSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([15, 25, 45, 10, 30, 50, 20, 35, 15, 30, 45, 10, 25]);

  // Handle waves audio-alike jumping animation when isPlaying is true
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 40) + 10)
        );
      }, 150);
    } else {
      setWaveHeights([15, 25, 45, 10, 30, 50, 20, 35, 15, 30, 45, 10, 25]);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section id="quote-section" className="py-24 px-6 sm:px-10 lg:px-12 bg-white dark:bg-[#161316] border-b border-black/5 dark:border-[#453027]/40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto overflow-hidden relative aspect-[16/11] md:aspect-[16/6.8] border border-black/5 dark:border-[#453027]/40">
        {/* Technical Grid Backdrop Pattern (No Image) */}
        <div className="absolute inset-0 bg-neutral-50 dark:bg-[#161316] transition-colors duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-transparent dark:from-[#161316]/80 dark:via-transparent dark:to-transparent" />
        </div>

        {/* Inner Content Grid */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-12 z-10">
          {/* Quote Text */}
          <div className="max-w-2xl text-[#1A1A1A] dark:text-white">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/50 dark:text-white/50 mb-3 block">
              TECHNICAL STUDY No. 12 &bull; VOX POPULI
            </span>
            <blockquote className="text-xl sm:text-2xl md:text-3.5xl font-serif italic font-light leading-snug tracking-tighter">
              “Autonomic I/O has completely changed how we work. Now we manage tasks faster and stay productive 24/7.”
            </blockquote>
          </div>

          {/* Overlapping Info Card - Studio Ledger Style */}
          <div className="self-end mt-4 sm:mt-0 flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-[#1C181C] p-4 border border-black/5 dark:border-[#453027]/40 max-w-full sm:max-w-md">
            {/* Left: Avatar */}
            <div className="relative w-12 h-12 overflow-hidden flex-shrink-0 border border-black/5 dark:border-[#453027]/40">
              <img
                src={avatarImg}
                alt="Wayne Grimshaw"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 bg-[#1A1A1A]/40 hover:bg-[#1A1A1A]/60 flex items-center justify-center transition-colors text-white cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
            </div>

            {/* Middle: Custom Audio Waveform Visualizer */}
            <div className="flex items-center gap-[3px] h-10 w-24 px-1">
              {waveHeights.map((h, idx) => (
                <div
                  key={idx}
                  style={{ height: `${h}%` }}
                  className={`w-[3px] rounded-full transition-all duration-150 ${
                    isPlaying ? "bg-[#FF6D29] dark:bg-[#FF6D29]" : "bg-black/10 dark:bg-white/10"
                  }`}
                />
              ))}
            </div>

            {/* Right: Wayne Grimshaw metadata */}
            <div className="text-left leading-tight pr-2">
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] dark:text-white">Wayne Grimshaw</div>
              <div className="text-[10px] text-black/50 dark:text-white/50 font-light">Head of Operations</div>
            </div>

            {/* CTA Button: Case Study */}
            <button
              id="quote-btn-view-case-study"
              onClick={openCaseStudyModal}
              className="mt-2 sm:mt-0 px-4 py-2 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] hover:bg-black dark:hover:bg-[#EAEAEA] text-[9px] uppercase tracking-wider font-bold flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Case Study</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
