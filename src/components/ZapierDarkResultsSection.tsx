import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Bot, MessageSquare, Sparkles, ArrowRight, TrendingUp, Cpu } from "lucide-react";

export default function ZapierDarkResultsSection() {
  const [taskCount, setTaskCount] = useState(593138979);

  // Increment task counter live to give high performance telemetry feel
  useEffect(() => {
    const interval = setInterval(() => {
      setTaskCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const marqueeTags = [
    "Qualify leads",
    "Support sales reps",
    "Answer FAQs",
    "Assist customers",
    "Repurpose content",
    "Onboard employees",
    "Resolve IT tickets",
    "Uncover sales leads",
    "Centralize leads",
    "Research leads",
    "Coach sales calls",
    "Create images",
    "Simplify code",
    "Implement IT support",
    "Help customers",
    "Reply to emails",
    "Summarize emails",
    "Get AI voice"
  ];

  return (
    <section className="py-24 bg-[#141212] text-white relative overflow-hidden border-b border-neutral-800">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#FF4F00]/15 via-[#E04400]/5 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-orange-600/10 via-amber-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 relative z-10">
        
        {/* Section Headline */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white">
            No AI hype here. <span className="text-[#FF4F00]">Just results.</span>
          </h2>
        </div>

        {/* Big Counter Banner */}
        <div className="space-y-2">
          <div className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white font-mono">
            {taskCount.toLocaleString()}
          </div>
          <p className="text-base sm:text-xl text-[#FF4F00] font-mono font-bold">
            AI tasks automated on Autonomic IO (and counting)
          </p>
        </div>

        {/* 2-Column Main Section: Left Chart & Right Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Exponential Growth Line Chart Component (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#1C1818] border border-neutral-800 space-y-6">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#FF4F00]" />
                Autonomic Task Execution Growth
              </span>
              <span className="text-emerald-400 font-bold">+1,420% YoY</span>
            </div>

            {/* SVG Chart Graphic */}
            <div className="h-48 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 150">
                {/* Subtle Grid Lines */}
                <line x1="0" y1="30" x2="300" y2="30" stroke="#332D2D" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="300" y2="75" stroke="#332D2D" strokeDasharray="3 3" />
                <line x1="0" y1="120" x2="300" y2="120" stroke="#332D2D" strokeDasharray="3 3" />

                {/* Exponential Area Fill */}
                <path
                  d="M0,140 Q 100,130 180,90 T 300,10 L 300,150 L 0,150 Z"
                  fill="url(#gradient-area)"
                  opacity="0.2"
                />

                {/* Main Smooth Line */}
                <path
                  d="M0,140 Q 100,130 180,90 T 300,10"
                  fill="none"
                  stroke="#FF4F00"
                  strokeWidth="3"
                />

                {/* Glowing Endpoint Circle */}
                <circle cx="300" cy="10" r="5" fill="#FF4F00" className="animate-ping" />
                <circle cx="300" cy="10" r="4" fill="#FFFFFF" />

                <defs>
                  <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF4F00" />
                    <stop offset="100%" stopColor="#FF4F00" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex justify-between text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-800">
              <span>Jan 2023</span>
              <span className="text-white font-bold">Today</span>
            </div>
          </div>

          {/* Right: Pitch & 4 Feature Bullets (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <p className="text-lg sm:text-2xl text-neutral-200 font-light leading-relaxed">
              Autonomic IO is where innovators put AI to work. Connect AI directly to your workflows, build your own agents, and actually deliver on your AI strategy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF4F00]/20 text-[#FF4F00] flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Connect 400+ AI tools to 9,000+ everyday apps
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Seamlessly bridge Claude, OpenAI, Gemini, and your internal APIs into any workspace stack.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Build AI agents that work while you sleep
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Autonomous agents execute multi-step triggers, parse payloads, and handle edge cases 24/7.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Deploy chatbots that solve customer problems
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Context-aware conversational assistants connected to real knowledge bases and databases.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Use built-in AI assistance to create workflows
                </h4>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Describe what you want in plain English and Autonomic IO generates the entire automation tree.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Marquee Tag Strip */}
        <div className="pt-8 border-t border-neutral-800/80 overflow-hidden relative">
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {marqueeTags.concat(marqueeTags).map((tag, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 shrink-0"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-6">
          <button
            onClick={() => document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 rounded-xl bg-[#FF4F00] hover:bg-[#E04400] text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#FF4F00]/30 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start building with Autonomic IO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
