import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Bot,
  Zap,
  Sliders,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Cpu,
  Layers,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  Eye,
  Settings
} from "lucide-react";

export default function ZapierGovernanceGrid() {
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [guardrailPii, setGuardrailPii] = useState(true);
  const [guardrailInjection, setGuardrailInjection] = useState(true);
  const [guardrailToxicity, setGuardrailToxicity] = useState(true);

  const models = [
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", speed: "Fast", status: "Active" },
    { name: "GPT-4o", provider: "OpenAI", speed: "Ultra", status: "Active" },
    { name: "Gemini 1.5 Pro", provider: "Google AI Studio", speed: "Fast", status: "Active" },
    { name: "DeepSeek R1", provider: "DeepSeek", speed: "Reasoning", status: "Active" }
  ];

  return (
    <section id="governance-grid-section" className="py-24 bg-[#FFFEFB] dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] border-b border-[#C5C0B1]/30 dark:border-[#1E2430] transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF4F00]/30 bg-[#FF4F00]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4F00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE GOVERNANCE & CONTROL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-[1.15]">
            Set the rules, give space to build, and <br />
            <span className="bg-gradient-to-r from-[#FF4F00] via-[#E04400] to-[#C5C0B1] bg-clip-text text-transparent">
              see it all in action.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Most governance is all or nothing—approve everything or block everything. Autonomic IO provides granular guardrails, model switching, and agent execution policies.
          </p>
        </div>

        {/* 4-Card Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Connect Any AI */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121620] border border-[#C5C0B1]/40 dark:border-neutral-800/80 shadow-xl space-y-6 flex flex-col justify-between group hover:border-[#FF4F00]/50 transition-all duration-300">
            <div className="space-y-3">
              <div className="w-3 h-3 rounded-full bg-[#FF4F00]" />
              <h3 className="text-xl sm:text-2xl font-bold font-display text-black dark:text-white">
                Connect any AI
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Claude, ChatGPT, Cursor, Gemini — plug in the AI you already use. One connection gives it access to 30,000+ actions across 9,000+ apps. Autonomic IO handles auth, retries, and rate limits.
              </p>
            </div>

            {/* Interactive Model Selector Card UI */}
            <div className="p-5 rounded-xl bg-[#FFFEFB] dark:bg-[#0A0D12] border border-[#C5C0B1]/30 dark:border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase">
                <span>Active Model Routing</span>
                <span className="text-[#10B981] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                  Live System
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-3 rounded-lg bg-white dark:bg-[#181E2A] border border-[#C5C0B1]/50 dark:border-neutral-700 flex justify-between items-center text-left hover:border-[#FF4F00] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-[#FF4F00]" />
                    <span className="font-bold text-neutral-900 dark:text-white">{selectedModel}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded-lg bg-white dark:bg-[#181E2A] border border-neutral-300 dark:border-neutral-700 shadow-2xl z-20 space-y-1">
                    {models.map((m) => (
                      <button
                        key={m.name}
                        onClick={() => {
                          setSelectedModel(m.name);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full p-2.5 rounded text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 flex justify-between items-center transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="font-bold text-neutral-900 dark:text-white block">{m.name}</span>
                          <span className="text-[10px] text-neutral-400">{m.provider}</span>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                          {m.speed}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2.5 rounded bg-white dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>30,000+ Native Actions</span>
                </div>
                <div className="p-2.5 rounded bg-white dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero API Key Leaks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Build Agents That Run */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121620] border border-[#C5C0B1]/40 dark:border-neutral-800/80 shadow-xl space-y-6 flex flex-col justify-between group hover:border-[#FF4F00]/50 transition-all duration-300">
            <div className="space-y-3">
              <div className="w-3 h-3 rounded-full bg-[#FF4F00]" />
              <h3 className="text-xl sm:text-2xl font-bold font-display text-black dark:text-white">
                Build agents that run
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Go beyond prompts and build AI that actually takes action, like qualifying leads, routing tickets, or handling requests — all running safely in the background across your tools.
              </p>
            </div>

            {/* Interactive Agent Flow Visualizer */}
            <div className="p-5 rounded-xl bg-[#FFFEFB] dark:bg-[#0A0D12] border border-[#C5C0B1]/30 dark:border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase">
                <span>Autonomous Agent Pipeline</span>
                <span className="text-[#FF4F00]">Running Async</span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-white dark:bg-[#181E2A] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-[#FF4F00]/20 text-[#FF4F00] flex items-center justify-center font-bold text-[10px]">
                      1
                    </div>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-[11px]">Inbound Support Ticket Trigger</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#181E2A] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-[10px]">
                      2
                    </div>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-[11px]">Autonomic AI Agent Analysis & Escalation</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="p-3 rounded-lg bg-white dark:bg-[#181E2A] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                      3
                    </div>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-[11px]">Sync Jira, Slack & CRM automatically</span>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[#FF4F00]/20 text-[#FF4F00] font-bold animate-pulse">
                    Executing...
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Keep AI Safe */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121620] border border-[#C5C0B1]/40 dark:border-neutral-800/80 shadow-xl space-y-6 flex flex-col justify-between group hover:border-[#FF4F00]/50 transition-all duration-300">
            <div className="space-y-3">
              <div className="w-3 h-3 rounded-full bg-[#FF4F00]" />
              <h3 className="text-xl sm:text-2xl font-bold font-display text-black dark:text-white">
                Keep AI safe
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Add built-in checks that catch sensitive data and unsafe inputs before anything is sent or saved, so you can use AI with absolute enterprise compliance and confidence.
              </p>
            </div>

            {/* Interactive Guardrails Switch Box */}
            <div className="p-5 rounded-xl bg-[#FFFEFB] dark:bg-[#0A0D12] border border-[#C5C0B1]/30 dark:border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase">
                <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AI Guardrails by Autonomic IO</span>
                </div>
                <span>Active Shield</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setGuardrailPii(!guardrailPii)}
                  className={`w-full p-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                    guardrailPii
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-700 text-neutral-500'
                  }`}
                >
                  <span className="text-[11px] font-bold">Detect Personally Identifiable Information (PII)</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase">{guardrailPii ? 'ENABLED' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setGuardrailInjection(!guardrailInjection)}
                  className={`w-full p-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                    guardrailInjection
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-700 text-neutral-500'
                  }`}
                >
                  <span className="text-[11px] font-bold">Detect Prompt Attacks (LLM powered)</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase">{guardrailInjection ? 'ENABLED' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setGuardrailToxicity(!guardrailToxicity)}
                  className={`w-full p-2.5 rounded-lg border flex items-center justify-between transition-all cursor-pointer ${
                    guardrailToxicity
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-neutral-200/50 dark:bg-neutral-800/50 border-neutral-300 dark:border-neutral-700 text-neutral-500'
                  }`}
                >
                  <span className="text-[11px] font-bold">Detect Toxicity & Compliance Violations</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded uppercase">{guardrailToxicity ? 'ENABLED' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Your models, your way */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#121620] border border-[#C5C0B1]/40 dark:border-neutral-800/80 shadow-xl space-y-6 flex flex-col justify-between group hover:border-[#FF4F00]/50 transition-all duration-300">
            <div className="space-y-3">
              <div className="w-3 h-3 rounded-full bg-[#FF4F00]" />
              <h3 className="text-xl sm:text-2xl font-bold font-display text-black dark:text-white">
                Your models, your way
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                Use the models that work best for you and switch as things evolve, without rebuilding your workflows or changing how everything runs across your enterprise.
              </p>
            </div>

            {/* Central Hub Graphic */}
            <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-[#FF4F00] flex items-center justify-center font-display font-extrabold text-white shadow-2xl shadow-[#FF4F00]/40 z-10 text-center text-xs leading-tight">
                AUTONOMIC<br/>HUB
              </div>
              
              {/* Radial Connected Dots */}
              <div className="absolute inset-0 border border-dashed border-neutral-700 rounded-full scale-75 animate-spin-slow pointer-events-none" />
              <div className="absolute top-3 left-4 px-2 py-1 rounded bg-neutral-800 text-[9px] font-mono text-neutral-300">
                Claude 3.5
              </div>
              <div className="absolute bottom-3 right-4 px-2 py-1 rounded bg-neutral-800 text-[9px] font-mono text-neutral-300">
                GPT-4o
              </div>
              <div className="absolute top-3 right-4 px-2 py-1 rounded bg-neutral-800 text-[9px] font-mono text-neutral-300">
                Gemini
              </div>
              <div className="absolute bottom-3 left-4 px-2 py-1 rounded bg-neutral-800 text-[9px] font-mono text-neutral-300">
                DeepSeek
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
