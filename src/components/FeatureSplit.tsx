import React, { useState } from "react";
import { Sparkles, Check, ChevronRight, Play, Compass, Cpu, Layers, GitPullRequest, ArrowRight, Slack, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FeatureSplit() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 0,
      title: "Automated Review Pipeline",
      shortDesc: "GitHub Trigger &rarr; AI Auditor &rarr; Slack Notification",
      description: "Trigger on incoming pull requests. An intelligent auditor analyzes the file changes for security vulnerabilities, formats performance metrics, and posts a comprehensive review to Slack.",
      progress: 100,
      step: 4,
      icon: GitPullRequest,
      subMockup: {
        trigger: "GitHub Pull Request",
        agentName: "AI Security Code Reviewer",
        action: "Post Slack Alert",
        model: "Omni Flash Auditor",
        status: "Deployment Completed"
      }
    },
    {
      id: 1,
      title: "Feedback Router Node",
      shortDesc: "Form Webhook &rarr; Sentiment Analysis &rarr; CRM Ticket",
      description: "Parse incoming support and review forms dynamically. Categorize user sentiment, filter high-priority bugs, and route structured tickets straight to your CRM without manual filtering.",
      progress: 65,
      step: 3,
      icon: MessageSquare,
      subMockup: {
        trigger: "Inbound Customer Form",
        agentName: "Sentiment Dispatch Agent",
        action: "Log CRM Ticket",
        model: "Omni Pro Sentiment V2",
        status: "Evaluating Feed..."
      }
    },
    {
      id: 2,
      title: "Scheduled DevOps Auditor",
      shortDesc: "Cron Trigger &rarr; Security Scan &rarr; Deploy Webhook",
      description: "Run automated pipeline compliance tests every evening. Scan Docker setups, verify workspace API keys, and signal clean deployment commands to Cloud Run or Kubernetes cluster targets.",
      progress: 30,
      step: 2,
      icon: Layers,
      subMockup: {
        trigger: "Cron Job (12:00 AM)",
        agentName: "DevOps Compliance Scanner",
        action: "Trigger Cluster Deploy",
        model: "Omni Max Compiler",
        status: "Running Cluster Scan..."
      }
    }
  ];

  const activeFeature = features[activeTab];

  return (
    <section id="features-split" className="py-24 bg-[#FAFAFC] dark:bg-[#0E1015] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#222630] transition-colors duration-300 relative">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Column: Titles and Tab Selectors */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-4">
            <span className="editorial-badge">PRESET NODES</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#14161D] dark:text-white leading-tight">
              Connect your stacks <br />with beautiful nodes.
            </h2>
            <p className="text-xs text-[#14161D]/70 dark:text-[#E2E8F0]/70 font-light leading-relaxed font-sans">
              Choose one of our production-ready pre-built workflow presets below. Observe how data moves seamlessly through triggers, AI decision nodes, and action hubs in real-time.
            </p>
          </div>

          {/* Interactive Accordion-style Tab Group */}
          <div className="space-y-3">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              const isSelected = activeTab === idx;

              return (
                <button
                  key={feat.id}
                  id={`feature-tab-${feat.id}`}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4 border transition-all duration-300 flex items-start gap-4 cursor-pointer rounded-lg ${
                    isSelected
                      ? "bg-white dark:bg-[#181B22] border-sunset-orange/40 dark:border-sunset-orange/40 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-sunset-orange/5 dark:hover:bg-sunset-orange/10"
                  }`}
                >
                  <div className={`mt-0.5 p-2 flex-shrink-0 transition-all rounded-md ${
                    isSelected ? "bg-sunset-orange text-white" : "bg-sunset-orange/10 text-sunset-orange"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <div className={`text-xs uppercase tracking-wider font-bold ${isSelected ? "text-sunset-orange" : "text-[#14161D]/80 dark:text-[#E2E8F0]/80"}`}>
                      {feat.title}
                    </div>
                    <div className="text-[11px] text-[#14161D]/55 dark:text-white/40 font-mono" dangerouslySetInnerHTML={{ __html: feat.shortDesc }} />
                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-[#14161D]/70 dark:text-[#E2E8F0]/70 mt-2 leading-relaxed pt-1 font-light font-sans"
                      >
                        {feat.description}
                      </motion.p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div
            id="features-btn-get-started"
            onClick={() => document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-4 group cursor-pointer select-none mt-6 inline-flex"
          >
            <div className="w-10 h-10 rounded-md bg-sunset-orange hover:opacity-95 text-white flex items-center justify-center transition-all duration-300 shadow-sm">
              <ArrowRight className="w-4 h-4" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-sunset-orange">
              Configure In Sandbox &rarr;
            </span>
          </div>
        </div>

        {/* Right Column: Onboarding Interactive Mockup */}
        <div className="lg:col-span-7 relative aspect-[4/3.2] overflow-hidden border border-[#E2E8F0] dark:border-[#222630] rounded-xl flex flex-col items-center justify-center p-4 sm:p-8 bg-white dark:bg-[#12151C] transition-colors duration-300">
          
          {/* Subtle connecting workflow lines inside the visual panel */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 n8n-dot-grid" />
            <svg className="w-full h-full opacity-60">
              <path
                d="M 120 100 C 220 100, 140 200, 240 200"
                fill="none"
                stroke="#EA6113"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 240 200 C 340 200, 260 300, 360 300"
                fill="none"
                stroke="#EA6113"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Setup Card Overlay Container */}
          <div className="relative w-full max-w-md bg-[#FAFAFC] dark:bg-[#181B22] p-5 sm:p-6 border border-[#E2E8F0] dark:border-[#222630] flex flex-col justify-between rounded-lg shadow-md transition-colors duration-300 z-10">
            
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#222630] pb-3 mb-4">
              <div>
                <h4 className="text-[11px] uppercase tracking-wider font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sunset-orange" />
                  Active Node Stack
                </h4>
                <p className="text-[10px] text-black/40 dark:text-white/40 font-mono mt-0.5">{activeFeature.subMockup.model}</p>
              </div>
              <span className="px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider text-sunset-orange bg-sunset-orange/10 border border-sunset-orange/20 rounded">
                INTEGRATED
              </span>
            </div>

            {/* Simulated Node Workflow Composition Cards */}
            <div className="space-y-3.5 mb-5 relative">
              
              {/* NODE A: TRIGGER */}
              <div className="p-3 bg-white dark:bg-[#12151C] border border-[#E2E8F0] dark:border-[#222630]/60 rounded-md flex items-center justify-between text-left relative shadow-xs">
                {/* Connector port */}
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-sunset-orange bg-white dark:bg-[#12151C]" />
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-sunset-orange/10 text-sunset-orange">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">Trigger Input</h5>
                    <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono font-semibold">{activeFeature.subMockup.trigger}</p>
                  </div>
                </div>
                <span className="text-[8px] font-mono font-semibold text-sunset-orange">Inbound Event</span>
              </div>

              {/* NODE B: INTELLIGENT AGENT */}
              <div className="p-3 bg-white dark:bg-[#12151C] border-2 border-sunset-orange/60 rounded-md flex items-center justify-between text-left relative shadow-xs">
                {/* Connector ports */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-sunset-orange bg-white dark:bg-[#12151C]" />
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-sunset-orange bg-white dark:bg-[#12151C]" />
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-sunset-orange text-white">
                    <Cpu className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white flex items-center gap-1">
                      AI Executor Node
                      <Sparkles className="w-3 h-3 text-sunset-orange" />
                    </h5>
                    <p className="text-[9px] text-sunset-orange font-mono font-bold">{activeFeature.subMockup.agentName}</p>
                  </div>
                </div>
                <span className="text-[8px] font-mono font-semibold bg-sunset-orange/10 text-sunset-orange px-1.5 py-0.5 rounded animate-pulse">Processing</span>
              </div>

              {/* NODE C: ACTION DELIVERY */}
              <div className="p-3 bg-white dark:bg-[#12151C] border border-[#E2E8F0] dark:border-[#222630]/60 rounded-md flex items-center justify-between text-left relative shadow-xs">
                {/* Connector port */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-sunset-orange bg-white dark:bg-[#12151C]" />
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-sunset-orange/10 text-sunset-orange">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">Action Outbound</h5>
                    <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">{activeFeature.subMockup.action}</p>
                  </div>
                </div>
                <span className="text-[8px] font-mono font-semibold text-sunset-orange">Delivery Success</span>
              </div>

            </div>

            {/* Active Feature Progress */}
            <div className="border-t border-[#E2E8F0] dark:border-[#222630]/60 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#14161D]/45 dark:text-white/40">Onboarding Process Flow</span>
                <span className="text-[10px] font-bold text-sunset-orange font-mono">{activeFeature.progress}% Synced</span>
              </div>
              <div className="w-full h-1.5 bg-[#E2E8F0] dark:bg-[#222630] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${activeFeature.progress}%` }}
                  transition={{ type: "spring", stiffness: 80 }}
                  className="h-full bg-sunset-orange rounded-full"
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">
                <span>Task Status:</span>
                <span className="text-sunset-orange font-bold uppercase">{activeFeature.subMockup.status}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
