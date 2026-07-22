import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Database,
  CheckCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Terminal,
  Layers,
  Settings,
  Sliders,
  LogOut,
  Mail,
  User as UserIcon,
  HelpCircle,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface UserDashboardProps {
  userSession: { email: string; name: string };
  onLogout: () => void;
}

export interface EnquiryRecord {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  workspaceNeeds: string | null;
  createdAt: string;
}

export default function UserDashboard({ userSession, onLogout }: UserDashboardProps) {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [isLoadingEnquiries, setIsLoadingEnquiries] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [databaseType, setDatabaseType] = useState<string>("Detecting...");
  const [isDbFallback, setIsDbFallback] = useState<boolean>(true);
  const [tokenUsage, setTokenUsage] = useState(4120);
  const maxTokens = 5000;
  const [logs, setLogs] = useState<string[]>([
    "System container initialized successfully on port 3000",
    "PostgreSQL database pool connected - 10 active clients",
    "Google Workspace OAuth scope validator loaded: Drive, Docs, Gmail, Forms",
    "Awaiting active token triggers..."
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing">("synced");
  const [activeTab, setActiveTab] = useState<"overview" | "database" | "terminal">("overview");

  // Fetch registered enquiries from backend database
  const fetchEnquiries = async () => {
    setIsLoadingEnquiries(true);
    try {
      const res = await fetch("/api/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setDatabaseType(data.databaseType || (data.isFallback ? "Local Memory Store" : "PostgreSQL Cluster"));
        setIsDbFallback(data.isFallback ?? true);
      }
    } catch (err) {
      console.error("Error fetching enquiries:", err);
    } finally {
      setIsLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    const timer = setTimeout(() => {
      setIsDashboardLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isDashboardLoading) {
    return <UserDashboardSkeleton />;
  }

  const simulateWorkflow = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSyncStatus("syncing");
    setTokenUsage(prev => Math.min(prev + 45, maxTokens));
    
    const newLogs = [
      `Initiating autonomous workflow cycle for ${userSession.name}...`,
      "Scanning Google Drive container files for updates...",
      "Gmail scan complete: 0 new unread enquiry payloads found.",
      "Syncing schema parameters with PostgreSQL cloud cluster...",
      "Workflow cycle concluded successfully [+45 tokens utilized]."
    ];

    // Staggered log output
    newLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [log, ...prev.slice(0, 15)]);
        if (index === newLogs.length - 1) {
          setIsSimulating(false);
          setSyncStatus("synced");
        }
      }, (index + 1) * 800);
    });
  };

  const percentage = (tokenUsage / maxTokens) * 100;

  return (
    <div className="w-full bg-white dark:bg-[#0E1015] border border-black/5 dark:border-[#222630] rounded-xl shadow-xl overflow-hidden font-sans transition-all duration-300">
      {/* Top Console Bar */}
      <div className="bg-[#FAF9FA] dark:bg-[#161316] border-b border-black/5 dark:border-[#222630] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FF6D29]/10 text-[#FF6D29] flex items-center justify-center font-bold text-lg font-serif">
            A
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-[#14161D] dark:text-white uppercase tracking-wider font-mono">
                Atelier Workspace
              </h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
                Active Node
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-200/40 dark:bg-white/5 border border-black/5 dark:border-white/5 font-mono select-none">
                {syncStatus === "syncing" ? (
                  <>
                    <RefreshCw className="w-2.5 h-2.5 text-amber-500 animate-spin" />
                    <span className="text-[8px] uppercase tracking-[0.05em] font-bold text-amber-600 dark:text-amber-400">
                      Syncing to Firestore...
                    </span>
                  </>
                ) : (
                  <>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.05em] font-bold text-emerald-600 dark:text-emerald-400">
                      Autosaved to Firestore
                    </span>
                  </>
                )}
              </div>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light">
              Autonomous automation portal & PostgreSQL database terminal
            </p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-black/20 p-1 rounded-lg border border-black/5 dark:border-white/5">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-white dark:bg-[#1C181C] text-sunset-orange shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => {
              setActiveTab("database");
              fetchEnquiries();
            }}
            className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === "database"
                ? "bg-white dark:bg-[#1C181C] text-sunset-orange shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            Enquiries DB ({enquiries.length})
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeTab === "terminal"
                ? "bg-white dark:bg-[#1C181C] text-sunset-orange shadow-sm"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            }`}
          >
            Telemetry Logs
          </button>
        </div>
      </div>

      {/* Main Console Grid */}
      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Profile Card */}
              <div className="bg-neutral-50/50 dark:bg-[#12141A] border border-black/5 dark:border-white/5 rounded-xl p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FF6D29]/10 text-[#FF6D29] flex items-center justify-center">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#14161D] dark:text-white leading-snug">
                        {userSession.name}
                      </h3>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 font-mono truncate max-w-[180px]">
                        {userSession.email}
                      </p>
                    </div>
                  </div>

                  <div className="h-[1px] bg-black/5 dark:bg-white/5" />

                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500">Security Tier</span>
                      <span className="font-semibold text-emerald-500 flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> SECURE SSL
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500">Workspace Region</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200 font-mono">asia-east1</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-400 dark:text-neutral-500">Durable Storage</span>
                      <span className={`font-semibold flex items-center gap-1 ${isDbFallback ? "text-amber-500" : "text-emerald-500"}`} title={databaseType}>
                        <Database className="w-3.5 h-3.5 text-[#FF6D29]" /> {isDbFallback ? "SANDBOX FALLBACK" : "POSTGRES LIVE"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="mt-6 w-full py-2 border border-red-500/10 hover:bg-red-500/5 text-red-500 rounded text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout Session
                </button>
              </div>

              {/* Token Plan Card */}
              <div className="bg-neutral-50/50 dark:bg-[#12141A] border border-black/5 dark:border-white/5 rounded-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14161D] dark:text-white">
                      Token plan utilization
                    </h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-sunset-orange bg-sunset-orange/10 px-2 py-0.5 rounded">
                    Atelier Pro Plan
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-2xl font-serif font-bold text-[#14161D] dark:text-white">
                      {tokenUsage.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      / {maxTokens.toLocaleString()} execution limit
                    </span>
                  </div>

                  {/* Utilization Progress Bar */}
                  <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sunset-orange to-amber-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-white dark:bg-[#181B22]/50 border border-black/5 dark:border-white/5 p-2.5 rounded">
                    <div className="text-neutral-400 dark:text-neutral-500 text-[10px] uppercase font-semibold">Remaining</div>
                    <div className="font-bold text-[#14161D] dark:text-white mt-0.5">
                      {(maxTokens - tokenUsage).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-[#181B22]/50 border border-black/5 dark:border-white/5 p-2.5 rounded">
                    <div className="text-neutral-400 dark:text-neutral-500 text-[10px] uppercase font-semibold">Utilization</div>
                    <div className="font-bold text-[#14161D] dark:text-white mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <button
                  onClick={simulateWorkflow}
                  disabled={isSimulating}
                  className="w-full py-2.5 bg-[#FF6D29] hover:bg-[#E05A1B] disabled:opacity-50 text-white rounded text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                  {isSimulating ? "Processing Loop..." : "Simulate Workspace Task"}
                </button>
              </div>

              {/* Connected APIs status */}
              <div className="bg-neutral-50/50 dark:bg-[#12141A] border border-black/5 dark:border-white/5 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#FF6D29]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14161D] dark:text-white">
                      Google credentials status
                    </h3>
                  </div>
                  <span title="Workspace verification credentials status">
                    <HelpCircle className="w-4 h-4 text-neutral-400 cursor-pointer" />
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { name: "Google Drive Client", status: "Secure", detail: "Read/Write files tunnel" },
                    { name: "Gmail API Endpoint", status: "Secure", detail: "Profile scan hook" },
                    { name: "Google Docs Compiler", status: "Secure", detail: "Document payload parser" },
                    { name: "Google Forms Router", status: "Secure", detail: "Form questionnaire sync" }
                  ].map((api, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <div className="font-semibold text-neutral-800 dark:text-neutral-100">{api.name}</div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light">{api.detail}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] uppercase tracking-wider font-bold flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                        {api.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "database" && (
            <motion.div
              key="database"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-[#14161D] dark:text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#FF6D29]" /> Cloud SQL enquiries ledger
                  </h3>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 font-light mt-0.5">
                    This ledger pulls live enquiries dynamically from our remote PostgreSQL cluster server.
                  </p>
                </div>
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <div className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    isDbFallback 
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                      : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }`}>
                    Connection: {databaseType}
                  </div>
                  <button
                    onClick={fetchEnquiries}
                    disabled={isLoadingEnquiries}
                    className="p-1.5 rounded border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 text-xs flex items-center gap-1.5 cursor-pointer text-neutral-700 dark:text-neutral-300 transition-all shadow-sm"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingEnquiries ? "animate-spin text-[#FF6D29]" : ""}`} />
                    Refresh
                  </button>
                </div>
              </div>

              {isLoadingEnquiries ? (
                <div className="py-12 text-center space-y-2 text-xs text-neutral-400 dark:text-neutral-500">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#FF6D29]" />
                  <p>Interrogating database tables...</p>
                </div>
              ) : enquiries.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-black/5 dark:border-white/5 rounded-lg space-y-3">
                  <Terminal className="w-8 h-8 mx-auto text-neutral-400 dark:text-neutral-600" />
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light">
                    No client enquiries recorded in the database yet. Submit an "Enquiry Now" request on the homepage!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-black/5 dark:border-white/5 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-50 dark:bg-[#141820] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider border-b border-black/5 dark:border-white/5">
                        <th className="p-3 font-semibold font-mono">ID</th>
                        <th className="p-3 font-semibold">Client Name</th>
                        <th className="p-3 font-semibold">Email</th>
                        <th className="p-3 font-semibold">Company</th>
                        <th className="p-3 font-semibold">Workspace Needs</th>
                        <th className="p-3 font-semibold">Message Preview</th>
                        <th className="p-3 font-semibold text-right">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5 dark:divide-white/5">
                      {enquiries.map((enquiry) => (
                        <tr
                          key={enquiry.id}
                          className="hover:bg-neutral-50/50 dark:hover:bg-[#12151D] transition-colors"
                        >
                          <td className="p-3 font-mono text-neutral-400 dark:text-neutral-500">#{enquiry.id}</td>
                          <td className="p-3 font-semibold text-[#14161D] dark:text-white">{enquiry.name}</td>
                          <td className="p-3 text-neutral-500 dark:text-neutral-400">{enquiry.email}</td>
                          <td className="p-3 text-neutral-500 dark:text-neutral-400 font-light">
                            {enquiry.company || <span className="italic text-neutral-300 dark:text-neutral-600">None</span>}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-[#FF6D29]/5 text-[#FF6D29] text-[10px] font-medium border border-[#FF6D29]/10">
                              {enquiry.workspaceNeeds || "General Automation"}
                            </span>
                          </td>
                          <td className="p-3 text-neutral-500 dark:text-neutral-400 max-w-[200px] truncate" title={enquiry.message}>
                            {enquiry.message}
                          </td>
                          <td className="p-3 text-right font-mono text-neutral-400 dark:text-neutral-500 text-[10px]">
                            {new Date(enquiry.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#14161D] dark:text-white flex items-center gap-2 font-mono">
                    <Terminal className="w-4 h-4 text-amber-500" /> Active container sandbox diagnostics
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light">
                    Real-time transaction loop, telemetry logs and event loggers.
                  </p>
                </div>
                <button
                  onClick={() => setLogs(["Manual trigger sequence diagnostic initiated", ...logs])}
                  className="px-2.5 py-1 border border-black/10 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 text-[10px] uppercase font-bold tracking-wider text-neutral-700 dark:text-neutral-300 rounded cursor-pointer"
                >
                  Clear Diagnostics
                </button>
              </div>

              <div className="bg-[#090B10] border border-black/15 dark:border-white/5 rounded-lg p-5 font-mono text-xs text-[#A8C5E6] overflow-y-auto max-h-72 space-y-1.5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2.5 items-start leading-relaxed">
                    <span className="text-neutral-600 select-none">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-amber-500/90">&gt;</span>
                    <span className="flex-1 font-light tracking-wide">{log}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UserDashboardSkeleton() {
  return (
    <div className="w-full bg-white dark:bg-[#0E1015] border border-black/5 dark:border-[#222630] rounded-xl shadow-xl overflow-hidden font-sans transition-all duration-300">
      {/* Top Console Bar */}
      <div className="bg-[#FAF9FA] dark:bg-[#161316] border-b border-black/5 dark:border-[#222630] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-2">
            <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-48 h-3 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
          </div>
        </div>
        <div className="flex gap-2 animate-pulse">
          <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-24 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-20 h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card Skeleton */}
        <div className="bg-neutral-50/50 dark:bg-[#12141A] border border-black/5 dark:border-white/5 rounded-xl p-6 space-y-6 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="space-y-2 flex-1">
              <div className="w-24 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
              <div className="w-36 h-3 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
            </div>
          </div>
          <div className="h-[1px] bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-3">
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
            <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
          </div>
          <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-full mt-6" />
        </div>

        {/* Center Card Skeleton */}
        <div className="bg-neutral-50/50 dark:bg-[#12141A] border border-black/5 dark:border-white/5 rounded-xl p-6 space-y-6 animate-pulse">
          <div className="flex justify-between items-center">
            <div className="w-32 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
          <div className="space-y-3">
            <div className="w-28 h-8 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-12 bg-neutral-200 dark:bg-[#1C181C]/50 rounded" />
          </div>
          <div className="h-9 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
        </div>

        {/* Right Card Skeleton */}
        <div className="bg-neutral-50/50 dark:bg-[#12141A] border border-black/5 dark:border-white/5 rounded-xl p-6 space-y-4 animate-pulse">
          <div className="flex justify-between items-center pb-2">
            <div className="w-36 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between items-center py-1">
              <div className="space-y-1.5 flex-1">
                <div className="w-24 h-3.5 bg-neutral-200 dark:bg-neutral-800 rounded" />
                <div className="w-32 h-2.5 bg-neutral-200/60 dark:bg-neutral-800/60 rounded" />
              </div>
              <div className="w-12 h-4 bg-neutral-200 dark:bg-neutral-800 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
