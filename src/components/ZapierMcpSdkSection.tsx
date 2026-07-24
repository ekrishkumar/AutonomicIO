import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  CheckCircle2,
  Lock,
  ArrowRight,
  Database,
  Globe,
  Sparkles,
  Zap
} from "lucide-react";

export default function ZapierMcpSdkSection() {
  const [activeSurface, setActiveSurface] = useState<string>("Claude");

  const clients = [
    { name: "Claude", type: "Assistant", color: "text-[#D97706]" },
    { name: "ChatGPT", type: "Assistant", color: "text-[#10B981]" },
    { name: "Any MCP Client", type: "Protocol", color: "text-blue-500" },
    { name: "Your Agent", type: "Custom", color: "text-[#FF6D29]" },
    { name: "Claude Code", type: "Dev Tool", color: "text-[#D97706]" },
    { name: "Cursor", type: "IDE", color: "text-purple-500" },
    { name: "TypeScript App", type: "SDK", color: "text-sky-500" }
  ];

  const targetApps = [
    { name: "Slack", category: "Comms" },
    { name: "HubSpot", category: "CRM" },
    { name: "Snowflake", category: "Data" },
    { name: "Microsoft Teams", category: "Comms" },
    { name: "Jira", category: "Dev" },
    { name: "Gmail", category: "Email" },
    { name: "ServiceNow", category: "ITSM" },
    { name: "+9,000 more apps", category: "Ecosystem" }
  ];

  return (
    <section id="mcp-sdk-section" className="py-24 bg-[#FFFEFB] dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] border-b border-[#C5C0B1]/30 dark:border-[#1E2430] transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Top Header Badge */}
        <div className="p-8 rounded-2xl border-2 border-[#C5C0B1]/40 dark:border-neutral-800 bg-[#FFFEFB] dark:bg-[#121620] space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4F00]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4F00] border border-[#FF4F00]/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>AUTONOMIC MCP + AUTONOMIC SDK</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-black dark:text-white leading-tight">
                Autonomic MCP and SDK. <br />
                One <span className="text-[#FF4F00]">secure</span> connection. For every AI surface.
              </h2>
            </div>
            <div className="lg:col-span-5 text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              AI assistants plug in through Model Context Protocol (MCP). Developers and coding agents plug in through the SDK. Different doors, same building — IT sees everything, auth is handled, and Autonomic's runtime does the heavy lifting.
            </div>
          </div>
        </div>

        {/* Interactive Architecture Hub Map */}
        <div className="p-8 rounded-2xl border border-[#C5C0B1]/40 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0F131C] space-y-6">
          <div className="text-center font-mono text-xs text-neutral-400 uppercase tracking-wider font-bold">
            Interactive MCP & SDK Surface Pipeline
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: AI Clients / Surfaces (4 Cols) */}
            <div className="md:col-span-4 space-y-2">
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold mb-2">
                SDK &bull; Devs & AI Agents
              </div>
              {clients.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setActiveSurface(c.name)}
                  className={`w-full p-2.5 rounded-xl border text-left flex justify-between items-center font-mono text-xs transition-all cursor-pointer ${
                    activeSurface === c.name
                      ? "bg-white dark:bg-[#1C2230] border-[#FF4F00] shadow-md text-black dark:text-white"
                      : "bg-white/60 dark:bg-[#121620]/60 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400"
                  }`}
                >
                  <span className={`font-bold ${c.name === "Your Agent" ? "text-[#FF4F00]" : c.color}`}>{c.name}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                    {c.type}
                  </span>
                </button>
              ))}
            </div>

            {/* Center Column: Autonomic MCP + SDK Core Runtime (4 Cols) */}
            <div className="md:col-span-4 p-8 rounded-2xl bg-neutral-900 text-white border-2 border-[#FF4F00] shadow-2xl text-center space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#FF4F00]/20 text-[#FF4F00] flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold font-mono text-[#FF6D29] uppercase">
                  AUTONOMIC MCP + SDK
                </h4>
                <p className="text-[11px] text-neutral-400 font-mono mt-1">
                  Unified Authentication & Policy Enforcement
                </p>
              </div>

              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Active Routing: {activeSurface}</span>
              </div>
            </div>

            {/* Right Column: Target Apps (4 Cols) */}
            <div className="md:col-span-4 space-y-2">
              <div className="text-[10px] font-mono text-neutral-400 uppercase font-bold mb-2">
                Unified App Ecosystem
              </div>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {targetApps.map((app) => (
                  <div
                    key={app.name}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between"
                  >
                    <span className="font-bold text-neutral-800 dark:text-neutral-200 text-[11px] truncate">{app.name}</span>
                    <span className="text-[8px] text-neutral-400 uppercase">{app.category}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillar Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h4 className="text-base font-bold font-display text-black dark:text-white">
              One auth layer
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              No hardcoded API keys. No broken OAuth flows. Whether it's Claude making the call or a developer tool, every credential is managed the same way.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h4 className="text-base font-bold font-display text-black dark:text-white">
              One audit trail
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Every action from any AI assistant or developer tool lands in a single admin log. Shadow IT becomes visible IT.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h4 className="text-base font-bold font-display text-black dark:text-white">
              One policy set
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              IT decides which apps and actions are available. Those rules apply across all MCP clients and SDK callers equally. No exceptions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#121620] border border-neutral-200 dark:border-neutral-800 space-y-3">
            <h4 className="text-base font-bold font-display text-black dark:text-white">
              One runtime
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Retries, error recovery, reliability. All backed by Autonomic IO's production infrastructure. Not whatever the LLM decided to write last Tuesday.
            </p>
          </div>
        </div>

        {/* Metrics Row & CTAs */}
        <div className="p-8 rounded-2xl bg-[#0A0D12] text-white border border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 grid grid-cols-3 gap-6 font-mono">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#FF6D29]">66,000+</div>
              <div className="text-[11px] text-neutral-400 uppercase mt-1">Triggers and actions</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white">9,000+</div>
              <div className="text-[11px] text-neutral-400 uppercase mt-1">App integrations</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">1</div>
              <div className="text-[11px] text-neutral-400 uppercase mt-1">Audit trail for everything</div>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
              className="py-3 px-5 rounded-xl bg-[#FF6D29] hover:bg-[#e05b1c] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
            >
              Learn more about MCP
            </button>
            <button
              onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
              className="py-3 px-5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-center border border-neutral-700"
            >
              Get started with SDK
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
