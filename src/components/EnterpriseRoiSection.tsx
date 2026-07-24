import React, { useState } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
  CheckCircle2,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Award,
  Layers
} from "lucide-react";
import ThreeDTiltCard from "./ThreeDTiltCard";

export default function EnterpriseRoiSection() {
  // Interactive ROI Calculator State
  const [teamSize, setTeamSize] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(65);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(12);

  // Calculations
  const weeklyManualCost = teamSize * hourlyRate * manualHoursPerWeek;
  const annualManualCost = weeklyManualCost * 52;
  const automatedSavings = annualManualCost * 0.82; // 82% automation reduction
  const autonomicPlatformCost = Math.min(24000, teamSize * 350);
  const netAnnualSavings = automatedSavings - autonomicPlatformCost;
  const paybackWeeks = Math.max(2, Math.round((autonomicPlatformCost / (automatedSavings / 52))));

  return (
    <section id="roi-timeline-section" className="py-20 bg-[#F9FAFB] dark:bg-[#0E1117] text-[#100C08] dark:text-[#DBE0E1] border-b border-neutral-200 dark:border-[#1E2430] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
            <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
            <span>MEASURABLE BUSINESS IMPACT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-tight">
            Drive ROI in <span className="text-[#CA3F16]">six weeks or less</span> <br />
            with your first team of agents.
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
            Deploy autonomous workflows that replace repetitive manual tasks, accelerate lead response times from hours to seconds, and deliver 80%+ operational cost reduction.
          </p>
        </div>

        {/* 6-Week Deployment Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <ThreeDTiltCard className="h-full">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151922] border border-neutral-200 dark:border-neutral-800 shadow-sm h-full flex flex-col justify-between space-y-4">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20 inline-block mb-3">
                  WEEKS 1 - 2
                </span>
                <h3 className="text-lg font-bold text-black dark:text-white font-mono">
                  Map Initial Use-Cases
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  Our AI solution architects analyze your team's manual workflows, identify highest-ROI processes, and configure custom prompt policies.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Audit high-volume manual queues</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Connect tools via OAuth & MCP</span>
                </div>
              </div>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard className="h-full">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151922] border-2 border-[#CA3F16] shadow-md shadow-[#CA3F16]/10 h-full flex flex-col justify-between space-y-4 relative">
              <span className="absolute -top-3 right-6 px-2.5 py-0.5 rounded bg-[#CA3F16] text-white text-[9px] font-mono uppercase font-bold tracking-wider">
                CORE MILESTONE
              </span>

              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#CA3F16]/10 text-[#CA3F16] border border-[#CA3F16]/20 inline-block mb-3">
                  WEEKS 3 - 6
                </span>
                <h3 className="text-lg font-bold text-black dark:text-white font-mono">
                  Deploy First Agent Team
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  Your first specialized AI agents go live in sandbox mode, tested against benchmark datasets, and seamlessly handed off to human oversight.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#CA3F16]" />
                  <span>Real-time benchmark evaluation</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#CA3F16]" />
                  <span>First 10,000 tasks executed</span>
                </div>
              </div>
            </div>
          </ThreeDTiltCard>

          <ThreeDTiltCard className="h-full">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#151922] border border-neutral-200 dark:border-neutral-800 shadow-sm h-full flex flex-col justify-between space-y-4">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 text-purple-500 border border-purple-500/20 inline-block mb-3">
                  WEEK 6 +
                </span>
                <h3 className="text-lg font-bold text-black dark:text-white font-mono">
                  Continuous Scaling & New Agents
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                  Build new agents weekly in plain language. Expand agent coverage across sales, support, HR, and engineering departments.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Self-optimizing prompt memory</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Enterprise SLA & Governance</span>
                </div>
              </div>
            </div>
          </ThreeDTiltCard>

        </div>

        {/* Interactive ROI Calculator Card */}
        <div className="bg-white dark:bg-[#12161F] p-6 sm:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#CA3F16] block">
                INTERACTIVE IMPACT ESTIMATOR
              </span>
              <h3 className="text-2xl font-display font-extrabold text-black dark:text-white">
                Calculate your team's annual savings
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Adjust parameters to estimate manual operational hours saved and net financial return.
              </p>
            </div>

            {/* Slider 1: Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold text-black dark:text-white">
                <span>Team Size (Knowledge Workers):</span>
                <span className="text-[#CA3F16] font-bold">{teamSize} Employees</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#CA3F16] cursor-pointer"
              />
            </div>

            {/* Slider 2: Average Hourly Rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold text-black dark:text-white">
                <span>Avg Hourly Rate ($/hr):</span>
                <span className="text-[#CA3F16] font-bold">${hourlyRate} / hr</span>
              </div>
              <input
                type="range"
                min="25"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-[#CA3F16] cursor-pointer"
              />
            </div>

            {/* Slider 3: Manual Task Hours Per Week */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono font-semibold text-black dark:text-white">
                <span>Manual Task Hours / Week per Employee:</span>
                <span className="text-[#CA3F16] font-bold">{manualHoursPerWeek} Hours / week</span>
              </div>
              <input
                type="range"
                min="2"
                max="30"
                step="1"
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#CA3F16] cursor-pointer"
              />
            </div>
          </div>

          {/* Calculated Output Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#100C08] to-[#1C130E] text-white p-6 sm:p-8 rounded-xl border border-[#CA3F16]/30 shadow-2xl space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#FF9408] tracking-widest font-bold">
                ESTIMATED NET ANNUAL SAVINGS
              </span>
              <div className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                ${Math.round(netAnnualSavings).toLocaleString()}
              </div>
              <p className="text-[10px] text-neutral-400 font-mono">
                Based on 82% task automation rate with Autonomic IO
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Current Manual Expense:</span>
                <span className="text-red-400 font-bold">${Math.round(annualManualCost).toLocaleString()} / yr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Estimated Payback Period:</span>
                <span className="text-[#10B981] font-bold">{paybackWeeks} Weeks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Hours Reclaimed Annually:</span>
                <span className="text-white font-bold">{(teamSize * manualHoursPerWeek * 52 * 0.82).toLocaleString()} hrs</span>
              </div>
            </div>

            <button
              onClick={() => document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full py-3 rounded-lg bg-[#CA3F16] hover:bg-[#95122C] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#CA3F16]/40 cursor-pointer"
            >
              Get Custom ROI Assessment &rarr;
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
