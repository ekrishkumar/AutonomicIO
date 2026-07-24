import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Play,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  Activity,
  Zap,
  Globe,
  Mail,
  Slack,
  Github,
  Database,
  ArrowRight,
  ShieldCheck,
  Check,
  Briefcase,
  Terminal,
  Settings,
  Sliders,
  ChevronRight,
  Bot,
  UserCheck,
  Clock,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Eye
} from "lucide-react";
import ThreeDTiltCard from "./ThreeDTiltCard";

interface AgentNode {
  id: string;
  role: string;
  title: string;
  model: string;
  accuracy: string;
  color: string;
  avatar: string;
  status: "idle" | "processing" | "completed" | "evaluating";
  desc: string;
  tools: string[];
  metrics: { latency: string; costPerTask: string; totalRuns: string };
  prompt: string;
}

export default function AgentTeamCanvas() {
  const [activePreset, setActivePreset] = useState<"sales" | "support" | "devops" | "finance">("sales");
  const [selectedAgentId, setSelectedAgentId] = useState<string>("researcher");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(-1);
  const [simLogs, setSimLogs] = useState<{ id: string; time: string; text: string; type: "trigger" | "agent" | "tool" | "success" }[]>([]);

  // Agent team configuration
  const agentNodes: AgentNode[] = [
    {
      id: "trigger",
      role: "INGESTION TRIGGER",
      title: "Inbound Lead Webhook",
      model: "HTTP/2 Webhook API",
      accuracy: "99.9% Uptime",
      color: "#FF6D29",
      avatar: "⚡",
      status: simStep === 0 ? "processing" : simStep > 0 ? "completed" : "idle",
      desc: "Captures new website demo requests, inbound emails, and contact forms in real-time.",
      tools: ["Clearbit API", "SendGrid Listener", "Segment Webhook"],
      metrics: { latency: "12ms", costPerTask: "$0.0001", totalRuns: "420,190" },
      prompt: "Capture payload headers, parse raw JSON body, extract contact email and domain string."
    },
    {
      id: "researcher",
      role: "SPECIALIST AGENT 1",
      title: "Lead Researcher",
      model: "Gemini 3.5 Flash",
      accuracy: "98.4% Match",
      color: "#3B82F6",
      avatar: "🔬",
      status: simStep === 1 ? "processing" : simStep > 1 ? "completed" : "idle",
      desc: "Scrapes corporate website, extracts funding rounds, team size, tech stack, and key executives.",
      tools: ["LinkedIn Graph", "PitchBook API", "Perplexity Deep Research"],
      metrics: { latency: "420ms", costPerTask: "$0.008", totalRuns: "182,400" },
      prompt: "Research the provided domain. Identify executive decision makers, recent funding announcements, and technology stack."
    },
    {
      id: "qualifier",
      role: "SPECIALIST AGENT 2",
      title: "Inbound Qualifier",
      model: "Claude 3.5 Sonnet",
      accuracy: "96.1% Accuracy",
      color: "#8B5CF6",
      avatar: "🎯",
      status: simStep === 2 ? "processing" : simStep > 2 ? "completed" : "idle",
      desc: "Scores lead fit against ICP rules, checks budget signals, and categorizes urgency.",
      tools: ["Salesforce CRM", "HubSpot Matrix", "Postgres Vector Store"],
      metrics: { latency: "310ms", costPerTask: "$0.012", totalRuns: "182,350" },
      prompt: "Evaluate company fit against enterprise ICP matrix. Output fit score (0-100) and priority route recommendation."
    },
    {
      id: "sdr",
      role: "SPECIALIST AGENT 3",
      title: "Outbound SDR Agent",
      model: "DeepSeek V3 / GPT-4o",
      accuracy: "95.8% Pass",
      color: "#10B981",
      avatar: "✉️",
      status: simStep === 3 ? "processing" : simStep > 3 ? "completed" : "idle",
      desc: "Generates custom hyper-personalized sales deck summary & tailor-made email response.",
      tools: ["Gmail SMTP", "Outreach IO", "Notion Workspace"],
      metrics: { latency: "520ms", costPerTask: "$0.015", totalRuns: "141,800" },
      prompt: "Draft personalized email highlighting relevant enterprise case studies matching lead's industry and pain points."
    },
    {
      id: "delivery",
      role: "ACTION & CLOSER",
      title: "Meeting Scheduler & CRM",
      model: "Autonomic Dispatcher",
      accuracy: "100% Sync",
      color: "#EC4899",
      avatar: "🚀",
      status: simStep === 4 ? "completed" : simStep > 3 ? "processing" : "idle",
      desc: "Posts real-time alert in Slack #sales-wins, reserves account executive calendar, and syncs CRM.",
      tools: ["Google Calendar", "Slack Webhook", "Salesforce Sync"],
      metrics: { latency: "85ms", costPerTask: "$0.001", totalRuns: "141,800" },
      prompt: "Dispatch executive alert to Slack channel, create CRM deal object, attach meeting invitation link."
    }
  ];

  const selectedAgent = agentNodes.find((a) => a.id === selectedAgentId) || agentNodes[1];

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(0);
    setSimLogs([
      { id: "1", time: new Date().toLocaleTimeString(), text: "📥 Webhook Received: demo.request@acmecorp.com (Acme Enterprise Inc.)", type: "trigger" }
    ]);

    const interval = setInterval(() => {
      setSimStep((prev) => {
        const next = prev + 1;
        if (next === 1) {
          setSimLogs((logs) => [
            ...logs,
            { id: "2", time: new Date().toLocaleTimeString(), text: "🔬 Lead Researcher Agent activated. Deep Researching acmecorp.com...", type: "agent" },
            { id: "2b", time: new Date().toLocaleTimeString(), text: "🌐 Extracted: Series B ($42M), 180 employees, Tech: Kubernetes, React, AWS", type: "tool" }
          ]);
        } else if (next === 2) {
          setSimLogs((logs) => [
            ...logs,
            { id: "3", time: new Date().toLocaleTimeString(), text: "🎯 Inbound Qualifier Agent evaluating ICP score...", type: "agent" },
            { id: "3b", time: new Date().toLocaleTimeString(), text: "✅ ICP Score: 94/100 (Tier 1 Enterprise Lead - High Priority)", type: "tool" }
          ]);
        } else if (next === 3) {
          setSimLogs((logs) => [
            ...logs,
            { id: "4", time: new Date().toLocaleTimeString(), text: "✉️ Outbound SDR Agent drafting hyper-personalized response...", type: "agent" },
            { id: "4b", time: new Date().toLocaleTimeString(), text: "📄 Generated tailored 1-page proposal and tailored ROI deck.", type: "tool" }
          ]);
        } else if (next === 4) {
          setSimLogs((logs) => [
            ...logs,
            { id: "5", time: new Date().toLocaleTimeString(), text: "🚀 Meeting Scheduler reserving slot with Enterprise AE...", type: "agent" },
            { id: "5b", time: new Date().toLocaleTimeString(), text: "🎉 SUCCESS: Slack #sales-wins notified, Salesforce record #SF-8890 created!", type: "success" }
          ]);
          setIsSimulating(false);
          clearInterval(interval);
        }
        return next;
      });
    }, 1200);
  };

  return (
    <section id="agent-teams-section" className="py-20 bg-white dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] border-b border-neutral-200 dark:border-[#1E2430] relative overflow-hidden transition-colors duration-300">
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FF6D29]/10 via-purple-500/10 to-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF6D29]/30 bg-[#FF6D29]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6D29]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6D29]" />
            <span>AI AGENT ORCHESTRATION ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-tight">
            Recruit teams of specialist <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF9408] via-[#CA3F16] to-[#95122C] bg-clip-text text-transparent">
              AI agents running on autopilot.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#100C08]/70 dark:text-[#DBE0E1]/70 leading-relaxed font-light">
            Build custom multi-agent pipelines in plain natural language. Agents collaborate, call tools, inspect CRM records, evaluate quality benchmarks, and deliver business outcomes 24/7.
          </p>

          {/* Preset selector tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {[
              { id: "sales", label: "Inbound Sales SDR Team", icon: Zap },
              { id: "support", label: "24/7 Tier 3 Support Agents", icon: Bot },
              { id: "devops", label: "DevOps & Security Guardrails", icon: ShieldCheck },
              { id: "finance", label: "Financial Audit & Invoicing", icon: TrendingUp }
            ].map((p) => {
              const Icon = p.icon;
              const isActive = activePreset === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#CA3F16] text-white shadow-md shadow-[#CA3F16]/20"
                      : "bg-neutral-100 dark:bg-[#151922] text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-neutral-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Agent Node Pipeline Canvas Container */}
        <div className="bg-neutral-50 dark:bg-[#0D1117] border border-neutral-200 dark:border-[#212631] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          
          {/* Top Bar Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black dark:text-white">
                  PIPELINE: INBOUND_ENTERPRISE_SDR_ORCHESTRA_V4
                </h3>
                <p className="text-[10px] text-neutral-500 font-mono">
                  5 Specialist Agent Nodes Connected &bull; Real-time Evaluation: 98.4%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#CA3F16] hover:bg-[#95122C] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#CA3F16]/30 cursor-pointer disabled:opacity-50 active:scale-95"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Live Agent Simulation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Interactive Agent Node Chain - Horizontal Layout with responsive scroll/stack */}
          <div className="py-8 relative">
            {/* SVG Cable connecting nodes - visible on desktop */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 hidden lg:block pointer-events-none px-12 z-0">
              <svg className="w-full h-8">
                <line
                  x1="0"
                  y1="16"
                  x2="100%"
                  y2="16"
                  stroke="#333"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                {isSimulating && (
                  <circle r="5" fill="#FF6D29" className="animate-pulse">
                    <animate
                      attributeName="cx"
                      from="0%"
                      to="100%"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                    <animate attributeName="cy" values="16;16" />
                  </circle>
                )}
              </svg>
            </div>

            {/* Agent Node Grid (Mobile horizontal swipe scroll, desktop 5-col grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10 overflow-x-auto pb-4 sm:pb-0">
              {agentNodes.map((agent, idx) => {
                const isSelected = selectedAgentId === agent.id;
                const isCurrentProcessing = simStep === idx;

                return (
                  <ThreeDTiltCard key={agent.id} className="h-full">
                    <div
                      onClick={() => setSelectedAgentId(agent.id)}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer relative h-full flex flex-col justify-between ${
                        isSelected
                          ? "bg-white dark:bg-[#161B22] border-2 border-[#CA3F16] shadow-lg shadow-[#CA3F16]/15 scale-[1.02]"
                          : isCurrentProcessing
                          ? "bg-white dark:bg-[#161B22] border-2 border-blue-500 shadow-lg shadow-blue-500/20"
                          : "bg-white/80 dark:bg-[#12161F]/80 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                      }`}
                    >
                      {/* Top badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${agent.color}20`,
                            color: agent.color,
                            border: `1px solid ${agent.color}40`
                          }}
                        >
                          {agent.role}
                        </span>
                        <span className="text-lg">{agent.avatar}</span>
                      </div>

                      {/* Agent Title & Model */}
                      <div className="space-y-1 mb-4">
                        <h4 className="text-sm font-bold text-black dark:text-white font-mono flex items-center gap-1.5">
                          {agent.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                          <Cpu className="w-3 h-3 text-[#CA3F16]" />
                          <span>{agent.model}</span>
                        </div>
                      </div>

                      {/* Status indicator pill */}
                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-500">Benchmark:</span>
                        <span className="font-bold text-[#10B981]">{agent.accuracy}</span>
                      </div>

                      {/* Live Processing Indicator */}
                      {isCurrentProcessing && (
                        <div className="absolute inset-0 rounded-xl bg-[#CA3F16]/5 border-2 border-[#CA3F16] animate-pulse pointer-events-none flex items-center justify-center">
                          <span className="px-3 py-1 bg-[#CA3F16] text-white text-[10px] font-mono font-bold rounded-full shadow-md">
                            Agent Active...
                          </span>
                        </div>
                      )}
                    </div>
                  </ThreeDTiltCard>
                );
              })}
            </div>
          </div>

          {/* Bottom Split: Agent Inspector Drawer & Live Simulation Task Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            
            {/* Left: Selected Agent Node Property Inspector (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-[#12161F] p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#CA3F16]/10 text-[#CA3F16] flex items-center justify-center font-bold text-lg">
                    {selectedAgent.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black dark:text-white font-mono flex items-center gap-2">
                      {selectedAgent.title}
                      <span className="px-2 py-0.5 rounded-full text-[9px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                        {selectedAgent.model}
                      </span>
                    </h4>
                    <p className="text-[10px] text-neutral-500 font-mono">{selectedAgent.desc}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Avg Latency</span>
                  <span className="text-xs font-mono font-bold text-[#10B981]">{selectedAgent.metrics.latency}</span>
                </div>
              </div>

              {/* Agent System Prompt Inspection */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#CA3F16]" />
                    Active Prompt Context & Policy
                  </span>
                  <span className="text-xs text-[#CA3F16]">Editable</span>
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-[#0A0D12] border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-mono text-neutral-800 dark:text-neutral-200 leading-relaxed">
                  {selectedAgent.prompt}
                </div>
              </div>

              {/* Connected Agent Tools */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 block">
                  Connected Workspace Tools ({selectedAgent.tools.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded bg-neutral-100 dark:bg-[#1A202C] border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-medium text-black dark:text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#10B981]" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Telemetry */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-2.5 rounded bg-neutral-50 dark:bg-[#0A0D12] border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Cost Per Task</span>
                  <span className="text-xs font-bold font-mono text-black dark:text-white">{selectedAgent.metrics.costPerTask}</span>
                </div>
                <div className="p-2.5 rounded bg-neutral-50 dark:bg-[#0A0D12] border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Total Runs</span>
                  <span className="text-xs font-bold font-mono text-black dark:text-white">{selectedAgent.metrics.totalRuns}</span>
                </div>
                <div className="p-2.5 rounded bg-neutral-50 dark:bg-[#0A0D12] border border-neutral-200/60 dark:border-neutral-800">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block">Accuracy</span>
                  <span className="text-xs font-bold font-mono text-[#10B981]">{selectedAgent.accuracy}</span>
                </div>
              </div>
            </div>

            {/* Right: Live Execution Logs (5 cols) */}
            <div className="lg:col-span-5 bg-[#0A0D12] p-5 rounded-xl border border-neutral-800 text-white space-y-3 font-mono flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6D29] flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  Live Execution Telemetry
                </span>
                <span className="text-[9px] text-neutral-500">LOG_STREAM_REALTIME</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto text-[11px] leading-relaxed pr-1">
                {simLogs.length === 0 ? (
                  <div className="text-neutral-500 text-center py-8 text-xs font-mono">
                    Click "Run Live Agent Simulation" to watch agents execute tasks in real time...
                  </div>
                ) : (
                  simLogs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-2 rounded border text-xs font-mono ${
                        log.type === "trigger"
                          ? "bg-amber-950/30 border-amber-800/40 text-amber-200"
                          : log.type === "agent"
                          ? "bg-blue-950/30 border-blue-800/40 text-blue-200"
                          : log.type === "success"
                          ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300 font-bold"
                          : "bg-neutral-900 border-neutral-800 text-neutral-300"
                      }`}
                    >
                      <span className="text-[9px] text-neutral-500 mr-2">[{log.time}]</span>
                      {log.text}
                    </motion.div>
                  ))
                )}
              </div>

              <div className="pt-2 border-t border-neutral-800 text-[10px] text-neutral-500 flex items-center justify-between">
                <span>Model Engine: Gemini 3.5 & Claude Sonnet</span>
                <span className="text-[#10B981]">Status: 200 OK</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
