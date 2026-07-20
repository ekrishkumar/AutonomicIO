import React, { useState } from "react";
import { Star, BarChart3, Dumbbell, ShieldAlert, Rocket, Plus, Send, RefreshCw, Sparkles, CheckCircle2, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  attachedFiles: string[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  openAttachModal: () => void;
}

export default function HeroSection({
  attachedFiles,
  setAttachedFiles,
  openAttachModal,
}: HeroSectionProps) {
  const [promptInput, setPromptInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Analyse");

  const tabConfig: Record<string, { prompts: string[]; placeholder: string }> = {
    Analyse: {
      prompts: [
        "Analyze this week's customer feedback metrics",
        "Generate data mapping for user sessions ledger",
        "Detect performance bottlenecks in current build",
        "Summarize support tickets from recent sprints"
      ],
      placeholder: "Describe the complex data or logs you want to analyze..."
    },
    Train: {
      prompts: [
        "Train onboarding model on user guide docs",
        "Fine-tune classifier on active feedback tickets",
        "Load workspace sprint logs into neural core",
        "Feed customer success guidelines to the assistant"
      ],
      placeholder: "Enter training objectives or specify assets to feed the model..."
    },
    Testing: {
      prompts: [
        "Run security verification and alignment checks",
        "Simulate 10k random concurrent client queries",
        "Check cryptographic audit certificate rules",
        "Verify system guardrails against prompt injection"
      ],
      placeholder: "Describe testing criteria or security guardrails to verify..."
    },
    Deploy: {
      prompts: [
        "Deploy fine-tuned workspace model to prod",
        "Integrate automated Slack update triggers",
        "Ship automated GitHub pull-request review sync",
        "Provision new sandbox model container instances"
      ],
      placeholder: "Describe the deployment target, active container, or integrations..."
    }
  };

  const currentConfig = tabConfig[activeTab] || tabConfig.Analyse;

  const triggerGeneration = async (textToSubmit: string) => {
    if (!textToSubmit.trim()) return;

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: textToSubmit,
          tab: activeTab,
          files: attachedFiles
        })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the automated AI generator. Please try again.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResponse(data.text);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (text: string) => {
    setPromptInput(text);
    triggerGeneration(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerGeneration(promptInput);
  };

  const tabs = [
    { label: "Analyse", icon: BarChart3, desc: "Process and map complex data automatically" },
    { label: "Train", icon: Dumbbell, desc: "Feed custom assets into your dedicated workspace model" },
    { label: "Testing", icon: ShieldAlert, desc: "Verify accuracy and guardrails against simulated runs" },
    { label: "Deploy", icon: Rocket, desc: "Ship polished models & automated integrations in 1-click" }
  ];

  return (
    <section id="hero-section" className="relative pt-16 pb-24 bg-[#FAFAFC] dark:bg-[#161316] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#453027]/40 transition-colors duration-300 overflow-hidden">
      {/* Subtle n8n Dotted Canvas Background overlay */}
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto text-center z-10">
        
        {/* Release Status Badge */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sunset-orange/20 bg-sunset-orange/5 text-[10px] font-mono font-bold uppercase tracking-wider text-sunset-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-sunset-orange animate-ping" />
            <span>n8n Atelier V2.0 Active</span>
          </div>
        </div>

        {/* Brand Headline */}
        <div className="mb-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-[#14161D] dark:text-white leading-[1.1] mb-6">
            Automate your workspaces <br />
            <span className="bg-gradient-to-r from-sunset-orange via-sunset-mid to-sunset-gold bg-clip-text text-transparent">with AI-native nodes.</span>
          </h1>
          <p className="max-w-xl mx-auto text-[#14161D]/70 dark:text-[#E2E8F0]/70 text-sm font-light leading-relaxed">
            Build multi-agent teams, map unstructured assets, and schedule complex operational loops. Securely connect your tools using zero-friction workflows that execute instantly.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-md bg-sunset-orange hover:opacity-95 text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_14px_rgba(234,97,19,0.35)] cursor-pointer active:scale-95"
          >
            Open Workflow Editor &darr;
          </button>
          <a
            href="#features-split"
            className="px-6 py-3 rounded-md border border-[#E2E8F0] dark:border-[#453027]/40 bg-white dark:bg-[#181B22] hover:bg-neutral-50 dark:hover:bg-[#1C202B] text-[#14161D] dark:text-[#E2E8F0] text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
          >
            View Integrations
          </a>
        </div>

        {/* Workflow Active Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                id={`hero-tab-${tab.label.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(tab.label);
                  setResponse(null);
                  setError(null);
                  setPromptInput("");
                }}
                className={`flex items-center gap-2 px-4 py-2 border rounded-md text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-sunset-orange border-sunset-orange text-white shadow-[0_4px_12px_rgba(234,97,19,0.2)]"
                    : "bg-white dark:bg-[#181B22] border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D]/60 dark:text-[#E2E8F0]/60 hover:text-sunset-orange hover:border-sunset-orange/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Node-Canvas Layout Grid */}
        <div className="relative overflow-hidden min-h-[620px] lg:min-h-[580px] border border-[#E2E8F0] dark:border-[#453027]/40 bg-white dark:bg-[#12151C] shadow-lg rounded-xl flex flex-col justify-between p-6 sm:p-8">
          
          {/* Subtle connecting workflow pipelines SVG overlay - active only on desktops */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg className="w-full h-full">
              {/* Left Line */}
              <path
                d="M 120 120 Q 200 120, 270 200"
                fill="none"
                stroke={loading ? "#EA6113" : "currentColor"}
                strokeWidth="1.5"
                className={`text-neutral-200 dark:text-neutral-800 transition-colors duration-300 ${loading ? "stroke-dasharray-[6] animate-[dash_1s_linear_infinite]" : ""}`}
              />
              {/* Right Line */}
              <path
                d="M 520 200 Q 600 120, 680 120"
                fill="none"
                stroke={response ? "#EA6113" : "currentColor"}
                strokeWidth="1.5"
                className={`text-neutral-200 dark:text-neutral-800 transition-colors duration-300 ${loading ? "stroke-dasharray-[6] animate-[dash_1s_linear_infinite]" : ""}`}
              />
            </svg>
          </div>

          {/* Canvas Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 border-b border-[#E2E8F0] dark:border-[#453027]/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sunset-orange animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                ACTIVE PIPELINE: AUTONOMIC_AGENT_CLASSIFIER
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-sunset-orange bg-sunset-orange/10 border border-sunset-orange/20 rounded">
                Node Status: Active
              </span>
            </div>
          </div>

          {/* Interactive Workflow Canvas Nodes Representation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 items-center z-10">
            
            {/* NODE 1: Trigger (Webhook) */}
            <div className="p-4 bg-neutral-50 dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#453027]/40 rounded-lg text-left relative n8n-glow-hover">
              {/* Connector ports */}
              <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded bg-sunset-orange/10 flex items-center justify-center text-sunset-orange">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">Webhook Trigger</h4>
                  <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">On Prompt Ingest</p>
                </div>
              </div>
              <p className="text-[10px] text-[#14161D]/70 dark:text-[#E2E8F0]/70 leading-normal font-sans">
                Listens to inbound customer intent, system logs, or customized workspace actions.
              </p>
            </div>

            {/* NODE 2: Active AI Agent Parser */}
            <div className={`p-4 border rounded-lg text-left relative n8n-glow-hover transition-all duration-300 ${
              loading ? "border-sunset-orange bg-sunset-orange/5" : "bg-neutral-50 dark:bg-[#181B22] border-[#E2E8F0] dark:border-[#453027]/40"
            }`}>
              {/* Connector ports */}
              <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              
              <div className="flex items-center gap-3 mb-2.5">
                <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                  loading ? "bg-sunset-orange text-white" : "bg-sunset-orange/10 text-sunset-orange"
                }`}>
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">AI Agent Parser</h4>
                  <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">Active Model</p>
                </div>
              </div>
              <p className="text-[10px] text-[#14161D]/70 dark:text-[#E2E8F0]/70 leading-normal font-sans">
                Processes guidelines, maps assets, and generates contextual outputs instantly.
              </p>
            </div>

            {/* NODE 3: Action Delivery */}
            <div className="p-4 bg-neutral-50 dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#453027]/40 rounded-lg text-left relative n8n-glow-hover">
              {/* Connector ports */}
              <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded bg-sunset-orange/10 flex items-center justify-center text-sunset-orange">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">Delivery Hub</h4>
                  <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">Integration Output</p>
                </div>
              </div>
              <p className="text-[10px] text-[#14161D]/70 dark:text-[#E2E8F0]/70 leading-normal font-sans">
                Sends automated Slack triggers, pushes commits to GitHub, or logs structured metrics.
              </p>
            </div>

          </div>

          {/* Middle Parameter & Output Panel Container */}
          <div className="max-w-xl w-full mx-auto my-4 space-y-4 z-10">
            <AnimatePresence mode="wait">
              {/* Real-time Workspace Execution Output Panel */}
              {(loading || response || error) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="bg-neutral-50 dark:bg-[#181B22] p-5 text-left rounded-lg border border-[#E2E8F0] dark:border-[#453027]/40 max-h-56 overflow-y-auto shadow-sm"
                >
                  {loading && (
                    <div className="flex items-center gap-3 text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                      <RefreshCw className="w-4 h-4 animate-spin text-sunset-orange" />
                      <span className="text-[10px] uppercase tracking-wider font-bold font-mono">Executing Active Node Pipeline...</span>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400" />
                      {error}
                    </div>
                  )}

                  {response && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-sunset-orange">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-sunset-orange" />
                          Workspace Output Success
                        </span>
                        <span className="font-mono bg-sunset-orange/10 text-sunset-orange px-2 py-0.5 rounded">200 OK</span>
                      </div>
                      <div className="text-[#14161D] dark:text-[#E2E8F0]/90 text-xs leading-relaxed font-mono whitespace-pre-wrap p-3 bg-white dark:bg-[#161316] border border-[#E2E8F0] dark:border-[#453027]/40 rounded">
                        {response}
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => { setResponse(null); setPromptInput(""); }}
                          className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/50 hover:text-sunset-orange uppercase tracking-wider font-bold flex items-center gap-1 transition-colors"
                        >
                          &times; Clear Output
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated n8n Node Settings Panel */}
            <form
              id="prompt-form"
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#181B22] p-4 shadow-md rounded-lg border border-[#E2E8F0] dark:border-[#453027]/40 flex flex-col gap-3 relative transition-all duration-300 focus-within:shadow-[0_4px_20px_rgba(234,97,19,0.08)]"
            >
              {/* Inner Node Tab Bar */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0]/80 dark:border-[#453027]/30 pb-2.5">
                <div className="flex gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sunset-orange border-b-2 border-sunset-orange pb-1 cursor-pointer">
                    Parameters
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#14161D]/40 dark:text-[#E2E8F0]/40 pb-1 hover:text-sunset-orange cursor-pointer">
                    Settings
                  </span>
                </div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#14161D]/40 dark:text-[#E2E8F0]/40">
                  Tab: {activeTab}
                </div>
              </div>

              {/* Node Input Box */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-5 h-5 rounded-full bg-sunset-orange/10 flex items-center justify-center text-sunset-orange mt-1">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="flex-1">
                  <textarea
                     value={promptInput}
                     onChange={(e) => setPromptInput(e.target.value)}
                     placeholder={currentConfig.placeholder}
                     className="w-full bg-transparent border-none outline-none text-[#14161D] dark:text-white placeholder-[#14161D]/40 dark:placeholder-white/40 text-xs py-1 font-medium min-h-[50px] resize-none"
                     disabled={loading}
                     rows={2}
                  />
                </div>
              </div>

              {/* Live Attached Files display */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-1 py-1">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 bg-sunset-orange/5 text-[9px] uppercase tracking-wider font-bold text-sunset-orange border border-sunset-orange/15 rounded"
                    >
                      <span>{file}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFiles(attachedFiles.filter(f => f !== file))}
                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Node Panel Footer controls */}
              <div className="flex items-center justify-between border-t border-[#E2E8F0]/80 dark:border-[#453027]/30 pt-3 mt-1">
                {/* File attachments */}
                <button
                  type="button"
                  onClick={openAttachModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-50 dark:bg-neutral-800/40 hover:bg-sunset-orange/5 dark:hover:bg-sunset-orange/10 border border-[#E2E8F0] dark:border-[#453027]/40 transition-colors text-[9px] uppercase tracking-wider font-bold text-[#14161D]/60 dark:text-[#E2E8F0]/60 hover:text-sunset-orange cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Attach Asset {attachedFiles.length > 0 ? `(${attachedFiles.length})` : ""}</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* Status node pill */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sunset-orange/5 text-[9px] uppercase tracking-widest text-sunset-orange font-bold font-mono border border-sunset-orange/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-sunset-orange animate-pulse" />
                    <span>Pipeline Ready</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !promptInput.trim()}
                    className="px-4 py-2 rounded-md bg-sunset-orange hover:opacity-95 text-white flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-[0_4px_12px_rgba(234,97,19,0.25)]"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Run Node</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Suggestions and Caption */}
          <div className="w-full flex flex-col items-center gap-3 mt-4 border-t border-[#E2E8F0]/60 dark:border-[#453027]/30 pt-5">
            <div className="flex flex-wrap justify-center items-center gap-2 max-w-xl">
              <span className="text-[10px] text-[#14161D]/50 dark:text-[#E2E8F0]/50 uppercase tracking-wider font-bold">Suggested Runs:</span>
              {currentConfig.prompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSampleClick(p)}
                  className="px-2.5 py-1 rounded bg-neutral-50 dark:bg-[#181B22] hover:bg-sunset-orange/5 dark:hover:bg-sunset-orange/10 text-[#14161D]/75 dark:text-[#E2E8F0]/75 hover:text-sunset-orange text-[9px] uppercase tracking-wider font-bold transition-all border border-[#E2E8F0] dark:border-[#453027]/40 hover:border-sunset-orange/30 cursor-pointer"
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="text-[#14161D]/40 dark:text-[#E2E8F0]/40 text-[9px] uppercase tracking-[0.2em] font-mono">
              Atelier Automation Sandbox Engine &bull; Pure Node Connectivity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
