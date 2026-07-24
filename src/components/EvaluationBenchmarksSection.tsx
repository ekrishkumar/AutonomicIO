import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Activity,
  Cpu,
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function EvaluationBenchmarksSection() {
  const [selectedTaskCategory, setSelectedTaskCategory] = useState<string>("All Tasks");

  const metrics = [
    { label: "TASKS RUN / MO", value: "1,248,920", sub: "+14.2% MoM", color: "#3B82F6" },
    { label: "TOTAL SPEND / MO", value: "$11,840", sub: "Avg $0.09 / task", color: "#10B981" },
    { label: "AVG COST / TASK", value: "$0.09", sub: "98% cheaper than human ops", color: "#8B5CF6" },
    { label: "EVAL PASS RATE", value: "96.4%", sub: "Automated SLA gate", color: "#FF6D29" }
  ];

  const benchmarks = [
    { name: "Company Match Accuracy", passRate: 96, benchmark: 90 },
    { name: "Contact Email Accuracy", passRate: 93, benchmark: 88 },
    { name: "Job Title & Level Accuracy", passRate: 92, benchmark: 85 },
    { name: "Intent Classification Accuracy", passRate: 97, benchmark: 92 },
    { name: "CRM Payload Formatting Accuracy", passRate: 99, benchmark: 95 }
  ];

  const modelLogs = [
    { model: "Gemini 3.5 Flash", category: "Inbound Search", passRate: "98.4%", latency: "210ms", cost: "$0.008", status: "Optimal" },
    { model: "Claude 3.5 Sonnet", category: "Lead Qualification", passRate: "96.2%", latency: "340ms", cost: "$0.015", status: "Optimal" },
    { model: "DeepSeek V3", category: "Data Enrichment", passRate: "97.1%", latency: "180ms", cost: "$0.005", status: "Optimal" },
    { model: "GPT-4o", category: "Email Generation", passRate: "95.8%", latency: "480ms", cost: "$0.020", status: "Standard" }
  ];

  return (
    <section id="benchmarks-oversight-section" className="py-20 bg-white dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] border-b border-neutral-200 dark:border-[#1E2430] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B5CF6]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>ENTERPRISE OVERSIGHT & ACCURACY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-tight">
            Nothing runs without oversight. <br />
            <span className="bg-gradient-to-r from-[#FF9408] via-[#CA3F16] to-[#95122C] bg-clip-text text-transparent">
              Guaranteed performance benchmarks.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
            Set up rigorous evaluation gates before agents hit production. Monitor latency, pass rates, cost per run, and model performance in a centralized dashboard.
          </p>
        </div>

        {/* 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-[#12161F] border border-neutral-200 dark:border-neutral-800 space-y-2 relative overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500">
                <span>{m.label}</span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
                  LIVE
                </span>
              </div>
              <div className="text-3xl font-display font-extrabold text-black dark:text-white tracking-tight">
                {m.value}
              </div>
              <div className="text-xs font-mono text-[#10B981] font-semibold flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#10B981]" />
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Benchmarks & Performance Bars (Grid 12 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Accuracy Bars (6 cols) */}
          <div className="lg:col-span-6 bg-neutral-50 dark:bg-[#12161F] p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#CA3F16]">
                ACCURACY BENCHMARKS
              </span>
              <h3 className="text-xl font-bold font-mono text-black dark:text-white">
                Set baseline standards for every agent
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Agents are continuously audited against ground-truth human validations.
              </p>
            </div>

            <div className="space-y-4">
              {benchmarks.map((b) => (
                <div key={b.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono font-semibold text-black dark:text-white">
                    <span>{b.name}</span>
                    <span className="text-[#10B981] font-bold">{b.passRate}% (Goal: &gt;{b.benchmark}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF9408] to-[#10B981] rounded-full transition-all duration-1000"
                      style={{ width: `${b.passRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Model Breakdown & Telemetry Table (6 cols) */}
          <div className="lg:col-span-6 bg-neutral-50 dark:bg-[#12161F] p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#CA3F16]">
                  MULTI-MODEL AUDIT
                </span>
                <h3 className="text-xl font-bold font-mono text-black dark:text-white">
                  Model Efficiency Ledger
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-[10px] font-mono font-bold">
                Auto-Router Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 text-[10px] uppercase">
                    <th className="pb-2">Model</th>
                    <th className="pb-2">Category</th>
                    <th className="pb-2">Pass Rate</th>
                    <th className="pb-2">Cost/Task</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/60">
                  {modelLogs.map((row) => (
                    <tr key={row.model} className="hover:bg-neutral-100 dark:hover:bg-[#181D28] transition-colors">
                      <td className="py-3 font-bold text-black dark:text-white flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-[#CA3F16]" />
                        {row.model}
                      </td>
                      <td className="py-3 text-neutral-500">{row.category}</td>
                      <td className="py-3 text-[#10B981] font-bold">{row.passRate}</td>
                      <td className="py-3 text-black dark:text-white">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[10px] font-mono text-neutral-500 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              * The Autonomic router dynamically selects the optimal model per request to balance speed, intelligence, and cost.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
