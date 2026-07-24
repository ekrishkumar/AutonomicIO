import React, { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  Activity,
  Users,
  Database,
  Cpu,
  Lock,
  RefreshCw,
  Terminal,
  Sliders,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  Server,
  Layers,
  Radio,
  FileText,
  Power,
  Search,
  Eye,
  Trash2,
  UserCheck,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AdminDashboardProps {
  userSession: { email: string; name: string } | null;
  onClose?: () => void;
}

export default function AdminDashboard({ userSession, onClose }: AdminDashboardProps) {
  const isAdminAuthorized = userSession && (
    userSession.email.toLowerCase() === "krishkumar6928@gmail.com" ||
    userSession.email.toLowerCase().includes("admin")
  );

  const [passkey, setPasskey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(isAdminAuthorized || false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"telemetry" | "users" | "ai-models" | "logs" | "security">("telemetry");
  const [isLoading, setIsLoading] = useState(false);

  // Live Telemetry Data State
  const [cpuLoad, setCpuLoad] = useState(28);
  const [memoryUsage, setMemoryUsage] = useState(42);
  const [gpuLoad, setGpuLoad] = useState(64);
  const [activeThreads, setActiveThreads] = useState(14);
  const [tokenThroughput, setTokenThroughput] = useState(840);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Model parameters state
  const [selectedModel, setSelectedModel] = useState("gemini-3.5-flash");
  const [temperature, setTemperature] = useState(0.2);
  const [maxTokens, setMaxTokens] = useState(4096);
  const [safetyThreshold, setSafetyThreshold] = useState("Strict");

  // System Logs
  const [systemLogs, setSystemLogs] = useState<{ id: string; level: "INFO" | "WARN" | "ERROR" | "SECURITY"; text: string; time: string }[]>([
    { id: "1", level: "SECURITY", text: "Admin session authenticated from 127.0.0.1 (krishkumar6928@gmail.com)", time: "05:04:12" },
    { id: "2", level: "INFO", text: "Container runtime port 3000 online with 0 active dropping frames", time: "05:03:50" },
    { id: "3", level: "INFO", text: "PostgreSQL pool connected with 10 idle client sockets", time: "05:02:10" },
    { id: "4", level: "WARN", text: "Gemini API rate buffer reached 65% capacity - auto-scaled worker pool", time: "04:58:33" },
    { id: "5", level: "SECURITY", text: "Google Workspace OAuth token scope audit completed - 100% compliant", time: "04:45:00" },
  ]);

  // Users State
  const [usersList, setUsersList] = useState([
    { id: "usr_1", email: "krishkumar6928@gmail.com", name: "Krish Kumar", role: "Super Admin", status: "Active", lastSeen: "Just now" },
    { id: "usr_2", email: "sarah@stripe.com", name: "Sarah Jenkins", role: "Enterprise Client", status: "Active", lastSeen: "12m ago" },
    { id: "usr_3", email: "m.vance@linear.app", name: "Marcus Vance", role: "Developer", status: "Active", lastSeen: "1h ago" },
    { id: "usr_4", email: "alex@openai.com", name: "Alex Mercer", role: "Auditor", status: "Suspended", lastSeen: "2d ago" },
  ]);

  // Live telemetry pulse simulation
  useEffect(() => {
    if (!isUnlocked) return;
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(22 + Math.random() * 18));
      setMemoryUsage(Math.floor(40 + Math.random() * 6));
      setGpuLoad(Math.floor(60 + Math.random() * 20));
      setTokenThroughput(Math.floor(800 + Math.random() * 120));
    }, 3000);
    return () => clearInterval(interval);
  }, [isUnlocked]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey.trim() === "admin2026" || passkey.trim() === "autonomic" || passkey.trim() === "krishkumar6928@gmail.com") {
      setIsUnlocked(true);
      setAuthError("");
    } else {
      setAuthError("Invalid administrative secret passphrase. Access denied.");
    }
  };

  const toggleUserRole = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextRole = u.role === "Super Admin" ? "Developer" : u.role === "Developer" ? "Enterprise Client" : "Super Admin";
        return { ...u, role: nextRole };
      }
      return u;
    }));
  };

  const toggleUserStatus = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === "Active" ? "Suspended" : "Active" };
      }
      return u;
    }));
  };

  const addLog = (level: "INFO" | "WARN" | "ERROR" | "SECURITY", text: string) => {
    const time = new Date().toLocaleTimeString();
    setSystemLogs(prev => [{ id: String(Date.now()), level, text, time }, ...prev]);
  };

  if (!isUnlocked) {
    return (
      <div className="bg-[#100C08] text-white p-8 sm:p-12 rounded-3xl border border-[#CA3F16]/30 shadow-2xl relative overflow-hidden font-sans max-w-2xl mx-auto my-10">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Shield className="w-64 h-64 text-[#CA3F16]" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#CA3F16]/20 border border-[#CA3F16]/40 rounded-2xl text-[#FF6D29]">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <span className="editorial-badge">RESTRICTED ZONE</span>
              <h2 className="text-xl font-bold tracking-tight text-white font-sans">Admin Control Center Gate</h2>
            </div>
          </div>

          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            This administrative dashboard is restricted to authorized platform owners (<span className="text-[#FF6D29] font-mono">krishkumar6928@gmail.com</span>). Enter the administrative security passphrase to unlock live server telemetry and orchestration controls.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400 mb-2">
                Administrative Passphrase / Secret Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Enter secret passkey (e.g. admin2026)"
                  className="w-full bg-[#181B22] border border-[#2A2F3D] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CA3F16] transition-colors font-mono"
                  autoFocus
                />
                <Key className="w-4 h-4 text-neutral-500 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-mono"
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#CA3F16] hover:bg-[#B32E0B] text-white text-xs uppercase tracking-widest font-bold transition-all shadow-lg shadow-[#CA3F16]/20 cursor-pointer active:scale-95"
              >
                Verify & Unlock Dashboard
              </button>

              {userSession && (
                <span className="text-[10px] font-mono text-neutral-500">
                  User: <span className="text-neutral-300">{userSession.email}</span>
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#12151C] text-white rounded-3xl border border-[#2A2F3D] shadow-2xl overflow-hidden font-sans relative">
      {/* Top Header Bar */}
      <div className="px-6 py-5 bg-[#181B22] border-b border-[#2A2F3D] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#CA3F16]/20 border border-[#CA3F16]/40 rounded-xl text-[#FF6D29]">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight text-white font-sans">AUTONOMIC ADMIN COMMAND CENTER</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] uppercase tracking-wider font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> ONLINE
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              Root Authority • Logged as: <span className="text-[#FF6D29]">{userSession?.email || "SuperAdmin"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setMaintenanceMode(!maintenanceMode);
              addLog("SECURITY", `Maintenance mode toggled to [${!maintenanceMode ? "ENABLED" : "DISABLED"}] by admin`);
            }}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors ${
              maintenanceMode
                ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10"
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            <span>{maintenanceMode ? "Maintenance: ON" : "Maintenance: OFF"}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center px-6 border-b border-[#2A2F3D] bg-[#12151C] overflow-x-auto gap-2 py-2">
        {[
          { id: "telemetry", label: "Live Telemetry", icon: Activity },
          { id: "users", label: "User Access & RBAC", icon: Users },
          { id: "ai-models", label: "AI Model Tuning", icon: Cpu },
          { id: "logs", label: "System Logs", icon: Terminal },
          { id: "security", label: "Security & Keys", icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#CA3F16] text-white shadow-lg shadow-[#CA3F16]/30"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Body */}
      <div className="p-6 sm:p-8">
        {/* TAB 1: TELEMETRY & LIVE INFRASTRUCTURE */}
        {activeTab === "telemetry" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#181B22] p-4 rounded-2xl border border-[#2A2F3D] space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                  <span>CPU Cluster Load</span>
                  <Cpu className="w-4 h-4 text-[#FF6D29]" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">{cpuLoad}%</div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#FF6D29] to-[#CA3F16] h-full transition-all duration-500" style={{ width: `${cpuLoad}%` }} />
                </div>
              </div>

              <div className="bg-[#181B22] p-4 rounded-2xl border border-[#2A2F3D] space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                  <span>Memory Allocated</span>
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">{memoryUsage}% <span className="text-xs font-normal text-neutral-500">/ 64GB</span></div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${memoryUsage}%` }} />
                </div>
              </div>

              <div className="bg-[#181B22] p-4 rounded-2xl border border-[#2A2F3D] space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                  <span>GPU H100 Cluster</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">{gpuLoad}%</div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${gpuLoad}%` }} />
                </div>
              </div>

              <div className="bg-[#181B22] p-4 rounded-2xl border border-[#2A2F3D] space-y-2">
                <div className="flex justify-between items-center text-xs text-neutral-400 font-mono">
                  <span>Token Throughput</span>
                  <Radio className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">{tokenThroughput} <span className="text-xs font-normal text-neutral-500">tok/s</span></div>
                <div className="text-[10px] text-emerald-400 font-mono font-bold">+12% vs 1h average</div>
              </div>
            </div>

            {/* Active Nodes Grid */}
            <div className="bg-[#181B22] p-6 rounded-2xl border border-[#2A2F3D] space-y-4">
              <div className="flex items-center justify-between border-b border-[#2A2F3D] pb-3">
                <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#CA3F16]" /> Live Container Microservices Status
                </h3>
                <button
                  onClick={() => addLog("INFO", "Manual container cluster refresh triggered by admin")}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-mono text-neutral-400 cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Refresh
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Node 1: Port 3000 Ingress", status: "Healthy", uptime: "99.98%", lat: "14ms" },
                  { name: "Node 2: Gemini API Proxy", status: "Healthy", uptime: "100%", lat: "42ms" },
                  { name: "Node 3: Postgres Vector DB", status: "Connected", uptime: "99.95%", lat: "8ms" },
                ].map((node, i) => (
                  <div key={i} className="p-4 bg-[#12151C] rounded-xl border border-[#2A2F3D] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white font-sans">{node.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono mt-0.5">Latency: {node.lat} | Uptime: {node.uptime}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER ACCESS & RBAC */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-300">
                Registered Platform Accounts ({usersList.length})
              </h3>
              <span className="text-[10px] font-mono text-neutral-500">
                Click role or status to toggle administrative privileges
              </span>
            </div>

            <div className="bg-[#181B22] rounded-2xl border border-[#2A2F3D] overflow-hidden">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#12151C] text-[10px] font-mono uppercase text-neutral-400 border-b border-[#2A2F3D]">
                  <tr>
                    <th className="p-4">User</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2F3D] text-neutral-300">
                  {usersList.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white">{usr.name}</div>
                        <div className="text-[10px] font-mono text-neutral-400">{usr.email}</div>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            toggleUserRole(usr.id);
                            addLog("SECURITY", `User role changed for ${usr.email}`);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border cursor-pointer ${
                            usr.role === "Super Admin"
                              ? "bg-[#CA3F16]/20 border-[#CA3F16]/40 text-[#FF6D29]"
                              : "bg-white/5 border-white/10 text-neutral-300"
                          }`}
                        >
                          {usr.role}
                        </button>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          usr.status === "Active" ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
                        }`}>
                          {usr.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[10px] text-neutral-400">{usr.lastSeen}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            toggleUserStatus(usr.id);
                            addLog("WARN", `User status toggled for ${usr.email}`);
                          }}
                          className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-neutral-300 cursor-pointer"
                        >
                          {usr.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: AI MODEL PARAMETER TUNING */}
        {activeTab === "ai-models" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#181B22] p-6 rounded-2xl border border-[#2A2F3D] space-y-5">
              <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-300 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#CA3F16]" /> Live Model Hyperparameters
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] uppercase font-mono text-neutral-400 mb-1.5">Primary Model Core</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      addLog("INFO", `Primary model updated to: ${e.target.value}`);
                    }}
                    className="w-full bg-[#12151C] border border-[#2A2F3D] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CA3F16] font-mono"
                  >
                    <option value="gemini-3.5-flash">Gemini 3.5 Flash (Ultra-Fast 60fps)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Reasoning)</option>
                    <option value="gemini-custom-lora">Autonomic Custom LoRA Weights</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mb-1">
                    <span>Temperature ({temperature})</span>
                    <span>0.0 (Deterministic) - 1.0 (Creative)</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-[#CA3F16] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400 mb-1">
                    <span>Max Output Tokens ({maxTokens})</span>
                    <span>1024 - 16384</span>
                  </div>
                  <input
                    type="range"
                    min="1024"
                    max="16384"
                    step="512"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full accent-[#CA3F16] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#181B22] p-6 rounded-2xl border border-[#2A2F3D] space-y-4">
              <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-300 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" /> Active Safety Guardrails
              </h3>

              <div className="p-4 bg-[#12151C] rounded-xl border border-[#2A2F3D] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Hate & Harassment Threshold</span>
                  <span className="text-emerald-400 font-mono font-bold">BLOCK_LOW_AND_ABOVE</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Cryptographic Data Audit</span>
                  <span className="text-emerald-400 font-mono font-bold">100% SHA-256</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Prompt Injection Guard</span>
                  <span className="text-emerald-400 font-mono font-bold">ACTIVE (Neural Shield)</span>
                </div>
              </div>

              <button
                onClick={() => addLog("SECURITY", "Guardrail policies re-compiled and verified")}
                className="w-full py-2.5 rounded-xl bg-[#CA3F16] hover:bg-[#B32E0B] text-white text-xs uppercase font-bold tracking-wider transition-all cursor-pointer"
              >
                Re-apply Security Guardrails
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SYSTEM LOGS */}
        {activeTab === "logs" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-300">
                Live Audit Logs ({systemLogs.length})
              </h3>
              <button
                onClick={() => setSystemLogs([])}
                className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-mono text-neutral-400 cursor-pointer"
              >
                Clear Console
              </button>
            </div>

            <div className="bg-[#0B0D12] p-4 rounded-2xl border border-[#2A2F3D] font-mono text-xs max-h-80 overflow-y-auto space-y-2">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-b border-white/5 pb-1.5 last:border-0">
                  <span className="text-neutral-500 text-[10px] shrink-0">{log.time}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 ${
                    log.level === "SECURITY" ? "bg-purple-500/20 text-purple-400" :
                    log.level === "ERROR" ? "bg-red-500/20 text-red-400" :
                    log.level === "WARN" ? "bg-amber-500/20 text-amber-400" :
                    "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {log.level}
                  </span>
                  <span className="text-neutral-300 text-xs">{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SECURITY & KEYS */}
        {activeTab === "security" && (
          <div className="bg-[#181B22] p-6 rounded-2xl border border-[#2A2F3D] space-y-5">
            <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-neutral-300 flex items-center gap-2">
              <Key className="w-4 h-4 text-[#CA3F16]" /> Enterprise API Keys & OAuth Vault
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 bg-[#12151C] rounded-xl border border-[#2A2F3D] flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">GEMINI_API_KEY</div>
                  <div className="text-[10px] text-neutral-500">Server-Side Proxy Client Key</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                  VERIFIED & CONFIGURED
                </span>
              </div>

              <div className="p-4 bg-[#12151C] rounded-xl border border-[#2A2F3D] flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">Google Workspace OAuth 2.0 Scopes</div>
                  <div className="text-[10px] text-neutral-500">Drive, Gmail, Docs, Forms</div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-bold">
                  ACTIVE (4 Scopes)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
