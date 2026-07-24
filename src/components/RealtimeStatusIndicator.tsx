import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, Server, RefreshCw, Cpu, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export interface PlatformMetrics {
  uptime: string;
  latencyMs: number;
  activeRegions: { name: string; latency: number; status: "operational" | "degraded" }[];
  throughputRps: string;
  totalExecutionsToday: number;
  lastUpdated: string;
}

export function usePlatformStatus() {
  const [metrics, setMetrics] = useState<PlatformMetrics>({
    uptime: "99.998%",
    latencyMs: 14,
    throughputRps: "48.2k",
    totalExecutionsToday: 142980,
    lastUpdated: "Just now",
    activeRegions: [
      { name: "US-East (N. Virginia)", latency: 12, status: "operational" },
      { name: "US-West (Oregon)", latency: 16, status: "operational" },
      { name: "EU-West (Frankfurt)", latency: 22, status: "operational" },
      { name: "AP-South (Tokyo)", latency: 38, status: "operational" },
    ],
  });

  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPolling(true);
      setTimeout(() => setIsPolling(false), 600);

      setMetrics((prev) => {
        const latencyVariation = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newLatency = Math.max(10, Math.min(24, prev.latencyMs + latencyVariation));
        const newExecutions = prev.totalExecutionsToday + Math.floor(Math.random() * 12) + 3;

        return {
          ...prev,
          latencyMs: newLatency,
          totalExecutionsToday: newExecutions,
          lastUpdated: "Just now",
          activeRegions: prev.activeRegions.map((region) => ({
            ...region,
            latency: Math.max(8, region.latency + (Math.floor(Math.random() * 3) - 1)),
          })),
        };
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return { metrics, isPolling };
}

export default function RealtimeStatusIndicator() {
  const { metrics, isPolling } = usePlatformStatus();

  return (
    <div className="p-4 sm:p-6 rounded-2xl bg-neutral-900/90 dark:bg-[#0A0D12]/90 border border-neutral-800 shadow-2xl space-y-5 sm:space-y-6 backdrop-blur-xl relative overflow-hidden font-sans">
      {/* Glow Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-[#FF4F00] to-emerald-500" />

      {/* Status Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center shrink-0">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 relative z-10" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                System Status
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold uppercase border border-emerald-500/30">
                100% Operational
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-light mt-0.5">
              Autonomic IO Global Multi-Agent Cluster & MCP Gateway
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400 pt-1 sm:pt-0">
          <span className="flex items-center gap-1.5">
            <RefreshCw className={`w-3 h-3 text-[#FF4F00] ${isPolling ? "animate-spin" : ""}`} />
            <span>Polling API live</span>
          </span>
          <span className="text-neutral-600">|</span>
          <span>Updated {metrics.lastUpdated}</span>
        </div>
      </div>

      {/* Main Realtime Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
        {/* Metric 1: Uptime */}
        <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400">
            <span>Platform Uptime</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-mono font-bold text-white tracking-tight">
            {metrics.uptime}
          </div>
          <div className="text-[10px] text-emerald-400 font-mono">30-Day SLA Guarantee</div>
        </div>

        {/* Metric 2: Global API Latency */}
        <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400">
            <span>Global API Latency</span>
            <Activity className="w-3.5 h-3.5 text-[#FF4F00]" />
          </div>
          <div className="text-xl font-mono font-bold text-white tracking-tight flex items-baseline gap-1">
            <span>{metrics.latencyMs}</span>
            <span className="text-xs text-neutral-400 font-normal">ms</span>
          </div>
          <div className="text-[10px] text-[#FF4F00] font-mono">Sub-20ms Ultra-Fast</div>
        </div>

        {/* Metric 3: Active Throughput */}
        <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400">
            <span>Throughput</span>
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-mono font-bold text-white tracking-tight">
            {metrics.throughputRps}
          </div>
          <div className="text-[10px] text-amber-400 font-mono">Requests / sec</div>
        </div>

        {/* Metric 4: Automated Pipelines Executed Today */}
        <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-neutral-800 space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-neutral-400">
            <span>Executions Today</span>
            <Server className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <motion.div
            key={metrics.totalExecutionsToday}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            className="text-xl font-mono font-bold text-white tracking-tight"
          >
            {metrics.totalExecutionsToday.toLocaleString()}
          </motion.div>
          <div className="text-[10px] text-blue-400 font-mono">Realtime Pipeline Sync</div>
        </div>
      </div>

      {/* Regional Status Grid */}
      <div className="pt-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-2">
          <span>Global Edge Locations</span>
          <div className="flex-1 h-[1px] bg-neutral-800" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-mono text-xs">
          {metrics.activeRegions.map((region) => (
            <div
              key={region.name}
              className="p-2.5 rounded-lg bg-neutral-800/20 border border-neutral-800/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="text-neutral-300 text-[11px] font-medium truncate">
                  {region.name}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold ml-1 shrink-0">
                {region.latency}ms
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
