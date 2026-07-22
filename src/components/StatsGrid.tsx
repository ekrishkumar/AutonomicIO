import React, { useState } from "react";
import { ArrowUpRight, Percent, Zap, TrendingUp, Sparkles, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThreeDTiltCard from "./ThreeDTiltCard";

interface StatsGridProps {
  openVerifyModal: () => void;
}

export default function StatsGrid({ openVerifyModal }: StatsGridProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      id: 1,
      title: "Up-to",
      metric: "4x",
      label: "4x Faster Task Completion",
      detail: "Through deep task automation and parallel agent executing streams, bottlenecks are dynamically resolved.",
      color: "border-black/5 bg-[#E8E6E1]/20",
      icon: Zap,
      badge: "Sprints optimized"
    },
    {
      id: 2,
      title: "Up-to",
      metric: "96%",
      label: "96% Less Manual Work",
      detail: "All repetitive ticketing, messaging, sync loops, and reporting pipelines are safely delegated to automated agents.",
      color: "border-black/5 bg-[#E8E6E1]/20",
      icon: Percent,
      badge: "Hands-free operations"
    },
    {
      id: 3,
      title: "Up-to",
      metric: "2.5x",
      label: "2.5x Higher Efficiency",
      detail: "With unified resource utilization, engineering and ops squads achieve maximum outcomes with half the overhead.",
      color: "border-black/5 bg-[#E8E6E1]/20",
      icon: Trophy,
      badge: "Cost centers minimized"
    }
  ];

  return (
    <section id="stats-section" className="py-24 bg-[#FAFAFC] dark:bg-[#0E1015] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#222630] transition-colors duration-300 relative">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto text-center space-y-16 z-10">
        {/* Title and Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="editorial-badge">PERFORMANCE RECORD</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#14161D] dark:text-white leading-tight">
            Boost workspace productivity <br className="hidden sm:inline" />with pure node orchestration.
          </h2>
          <p className="text-xs text-[#14161D]/60 dark:text-[#E2E8F0]/60 leading-relaxed font-light">
            Designed to optimize and run repetitive triggers, message dispatches, and code integrations without constant manual oversight.
          </p>
        </div>

        {/* Three Columns Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-stretch">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const isHovered = hoveredCard === stat.id;
            const statGlow = "rgba(255, 92, 67, 0.15)";

            return (
              <ThreeDTiltCard key={stat.id} glowColor={statGlow} className="flex flex-col h-full">
                <div
                  id={`stats-card-${stat.id}`}
                  onMouseEnter={() => setHoveredCard(stat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative text-left p-8 border border-[#E2E8F0] dark:border-[#222630] bg-white dark:bg-[#181B22] transition-all duration-300 flex flex-col justify-between min-h-[320px] overflow-hidden rounded-xl group n8n-glow-hover w-full h-full"
                >
                  {/* Clean background study number */}
                  <div className="absolute right-6 bottom-6 text-[44px] font-mono font-bold opacity-[0.03] dark:opacity-[0.05] select-none pointer-events-none group-hover:opacity-[0.06] dark:group-hover:opacity-[0.1] transition-opacity">
                    No. 0{stat.id}
                  </div>

                  <div className="space-y-5 relative z-10">
                    {/* Top Header Row of Card */}
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 dark:text-white/40 font-mono">
                        {stat.title}
                      </span>
                      <div className="w-8 h-8 rounded-md bg-[#FF5C43]/10 text-[#FF5C43] flex items-center justify-center group-hover:bg-[#FF5C43] group-hover:text-white transition-colors duration-300">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Main Metric */}
                    <div className="text-5xl sm:text-6xl font-display font-extrabold text-[#FF5C43] tracking-tighter transition-all duration-300">
                      {stat.metric}
                    </div>

                    {/* Label */}
                    <div className="text-xs uppercase tracking-wider font-bold text-neutral-800 dark:text-white/90">
                      {stat.label}
                    </div>
                  </div>

                  {/* Micro-insight details sliding up */}
                  <div className="mt-8 pt-4 border-t border-[#E2E8F0] dark:border-[#222630]/60 space-y-4 relative z-10">
                    <p className="text-xs text-[#14161D]/70 dark:text-[#E2E8F0]/70 font-light leading-relaxed font-sans">
                      {stat.detail}
                    </p>

                    <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.15em] font-bold text-black/40 dark:text-white/40">
                      <span>{stat.badge}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); openVerifyModal(); }}
                        className="text-[#FF5C43] font-bold flex items-center gap-0.5 hover:underline cursor-pointer bg-transparent border-none p-0 font-mono"
                      >
                        VERIFIED <ArrowUpRight className="w-3 h-3 text-[#FF5C43]" />
                      </button>
                    </div>
                  </div>
                </div>
              </ThreeDTiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
