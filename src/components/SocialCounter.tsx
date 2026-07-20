import React, { useState, useEffect } from "react";
import { Users, Clock, Globe, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Activity {
  id: number;
  time: string;
  agent: string;
  company: string;
  desc: string;
}

export default function SocialCounter() {
  const [taskCount, setTaskCount] = useState(26900789);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, time: "Just now", agent: "Sprint Master", company: "Sisyphus", desc: "Redistributed 12 delayed issues to alternate squads" },
    { id: 2, time: "1m ago", agent: "SEO Publisher", company: "Magnolia", desc: "Automated campaign layout translations into 3 languages" },
    { id: 3, time: "3m ago", agent: "Deployment Auditor", company: "Epicurious", desc: "Executed test coverage audit & shipped master to production" }
  ]);

  // Simulate active counting up
  useEffect(() => {
    const countInterval = setInterval(() => {
      setTaskCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);

    return () => clearInterval(countInterval);
  }, []);

  // Simulate random incoming automated logs
  useEffect(() => {
    const agents = ["Resource Allocation", "Lead Sync", "Slack Responder", "Asset Optimizer", "Ticket Router"];
    const companies = ["Sisyphus", "Magnolia", "Epicurious", "Initech"];
    const descriptions = [
      "Synced active leads to support channels automatically",
      "Archived stale boards and summarized key team takeaways",
      "Drafted context-aware answers to high-priority customer chats",
      "Optimized media asset sizes and deployed static CDN caches",
      "Flagged 3 redundant workflow blocks & pinged project coordinators"
    ];

    const logInterval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now(),
        time: "Just now",
        agent: agents[Math.floor(Math.random() * agents.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        desc: descriptions[Math.floor(Math.random() * descriptions.length)]
      };

      setActivities((prev) => {
        const updated = [newActivity, ...prev.map((act) => ({
          ...act,
          time: act.time === "Just now" ? "1m ago" : act.time === "1m ago" ? "3m ago" : "5m ago"
        }))];
        return updated.slice(0, 4); // Keep last 4
      });
    }, 6000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <section id="counter-section" className="py-24 bg-white dark:bg-[#161316] px-6 sm:px-10 lg:px-12 border-b border-black/5 dark:border-[#453027]/40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Count metrics */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/40 dark:text-[#BABABA]/40 font-bold flex items-center gap-1.5">
              STUDIO TRACTION &bull; GENERAL LEDGER
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif italic tracking-tighter text-[#1A1A1A] dark:text-white leading-tight">
              Don't Just Take Our Word for It
            </h2>
            <div className="text-xs text-black/50 dark:text-white/50 font-light uppercase tracking-wider">
              <span className="text-black dark:text-white font-semibold">9,677+</span> Active Teams and Businesses
            </div>
          </div>

          {/* Huge Number Block */}
          <div className="py-6 border-y border-black/5 dark:border-[#453027]/40 space-y-2">
            <div className="text-5xl sm:text-6xl md:text-7xl font-sans font-extrabold text-[#1A1A1A] dark:text-white tracking-tighter font-mono tabular-nums">
              {taskCount.toLocaleString()}
            </div>
            <div className="text-[9px] font-bold uppercase text-black/40 dark:text-white/40 tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Tasks Completed with Autonomic I/O</span>
            </div>
          </div>

          {/* Small Feature Grid inside counter */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 border border-black/5 dark:border-[#453027]/40 bg-[#E8E6E1]/15 dark:bg-[#1C181C] rounded-none">
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] dark:text-white flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-black/40 dark:text-[#BABABA]/40" /> Globals Enabled
              </div>
              <p className="text-xs text-black/50 dark:text-[#BABABA]/50 font-light mt-1.5">Multi-region automatic failovers and server setups.</p>
            </div>
            <div className="p-5 border border-black/5 dark:border-[#453027]/40 bg-[#E8E6E1]/15 dark:bg-[#1C181C] rounded-none">
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] dark:text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-black/40 dark:text-[#BABABA]/40" /> Instant Execution
              </div>
              <p className="text-xs text-black/50 dark:text-[#BABABA]/50 font-light mt-1.5">Sub-100ms response timelines across all agent streams.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Active Terminal Live Activity Feed */}
        <div className="lg:col-span-6">
          <div className="bg-[#121012] p-5 sm:p-6 border border-black/10 dark:border-[#453027]/40 text-left font-mono rounded-none">
            {/* Terminal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] uppercase tracking-widest text-white/30 ml-2">autonomic-agent-daemon.log</span>
              </div>
              <span className="text-[8px] text-emerald-400 font-bold bg-white/5 px-2 py-0.5 uppercase tracking-widest">
                STREAMING
              </span>
            </div>

            {/* Terminal Console Rows */}
            <div className="space-y-3 min-h-[180px] text-xs">
              <AnimatePresence initial={false}>
                {activities.map((act) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-white/[0.02] border border-white/5 flex items-start gap-3 rounded-none"
                  >
                    <div className="mt-0.5 w-4 h-4 bg-white/5 flex items-center justify-center text-[8px] text-white/40">
                      AI
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-emerald-400 font-bold uppercase tracking-wider">
                          {act.agent} &bull; <span className="text-white font-light lowercase font-serif italic">{act.company}</span>
                        </span>
                        <span className="text-white/30 text-[8px]">{act.time}</span>
                      </div>
                      <p className="text-white/70 text-[11px] font-light leading-relaxed">
                        {act.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Terminal Footer */}
            <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[9px] text-white/30">
              <span>Active Agent Pools: 512,001</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <ArrowUp className="w-2.5 h-2.5" /> system load stable
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
