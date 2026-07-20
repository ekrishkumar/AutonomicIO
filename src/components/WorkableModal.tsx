import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Lock, ArrowRight, ShieldCheck, FileCode, FileSpreadsheet, FileText, FileUp, Sparkles, Terminal } from "lucide-react";

interface WorkableModalProps {
  isOpen: boolean;
  type: "login" | "register" | "case-study" | "attach" | "verify" | "enquiry" | null;
  onClose: () => void;
  onLoginSuccess: (email: string, name: string) => void;
  attachedFiles: string[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function WorkableModal({
  isOpen,
  type,
  onClose,
  onLoginSuccess,
  attachedFiles,
  setAttachedFiles,
}: WorkableModalProps) {
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Atelier Architect");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Client Enquiry States
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryError, setEnquiryError] = useState<string | null>(null);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEnquiryError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          workspaceNeeds: selectedServices.join(", "),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }
      setEnquirySuccess(true);
      // Reset form states
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
      setSelectedServices([]);
    } catch (err: any) {
      console.error("Enquiry submit error:", err);
      setEnquiryError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceCheckbox = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Attachment mock files
  const sampleAssets = [
    { name: "architecture_blueprint_q3.pdf", size: "2.4 MB", type: "pdf", icon: FileText, desc: "System diagram & routing setup" },
    { name: "support_tickets_june.csv", size: "1.1 MB", type: "csv", icon: FileSpreadsheet, desc: "Raw customer support tickets & sentiment logs" },
    { name: "sprint_schedule_v2.json", size: "48 KB", type: "json", icon: FileCode, desc: "Engineering sprint tasks & priorities" },
    { name: "brand_guidelines_2026.pdf", size: "8.9 MB", type: "pdf", icon: FileText, desc: "Tone of voice, style guides & brand definitions" },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(email || "guest@autonomic.io", name || "Atelier Architect");
        setSuccess(false);
        onClose();
      }, 1000);
    }, 1200);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        onLoginSuccess(email || "architect@autonomic.io", name || "Studio Expert");
        setSuccess(false);
        onClose();
      }, 1000);
    }, 1200);
  };

  const toggleAttachment = (fileName: string) => {
    if (attachedFiles.includes(fileName)) {
      setAttachedFiles(attachedFiles.filter(f => f !== fileName));
    } else {
      setAttachedFiles([...attachedFiles, fileName]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && type && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Dark overlay backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg bg-white dark:bg-[#161316] text-[#1A1A1A] dark:text-white border border-black/10 dark:border-[#453027]/40 shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between rounded-none z-10 text-left"
          >
            {/* Header row */}
            <div className="flex justify-between items-center border-b border-black/5 dark:border-[#453027]/20 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">
                  {type === "login" && "AUTHENTICATE // ACCESS ATELIER"}
                  {type === "register" && "INITIALIZE // CREATE WORKSPACE"}
                  {type === "case-study" && "TECHNICAL LEDGER // STUDY NO. 12"}
                  {type === "attach" && "UPLOAD PORTAL // ATTACH SECURE ASSETS"}
                  {type === "verify" && "COMPLIANCE & VERIFICATION AUDIT"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-black/5 bg-black/[0.02] flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Switcher */}
            <div className="flex-1 max-h-[70vh] overflow-y-auto pr-1">
              
              {/* LOGIN MODAL */}
              {type === "login" && (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter">Welcome back to Autonomic I/O</h2>
                    <p className="text-xs text-black/50 dark:text-white/50 font-light">Access your custom agent sandbox and training flows.</p>
                  </div>

                  {success ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center bg-emerald-50/50 border border-emerald-500/20 text-emerald-800 space-y-2"
                    >
                      <Check className="w-8 h-8 mx-auto stroke-[2.5]" />
                      <div className="text-xs uppercase tracking-wider font-bold">Authentication Confirmed</div>
                      <p className="text-xs font-light">Decrypting secure workspace credentials...</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Wayne Grimshaw"
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="wayne@voxpopuli.co"
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">Secure Keyphrase</label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••••••••••"
                            className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none pr-9 focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                          />
                          <Lock className="w-3.5 h-3.5 text-black/30 dark:text-white/30 absolute right-3 top-3.5" />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF6D29] text-white py-3 text-[10px] uppercase tracking-wider font-bold hover:bg-[#E05A1B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-[0_4px_14px_rgba(255,109,41,0.25)]"
                      >
                        {loading ? "Authenticating Identity..." : "Authorize Access"}
                        {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  )}
                </form>
              )}

              {/* REGISTER MODAL */}
              {type === "register" && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter">Initialize Your Account</h2>
                    <p className="text-xs text-black/50 dark:text-white/50 font-light">Deploy a premium automated workflow in minutes.</p>
                  </div>

                  {success ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 text-center bg-emerald-50/50 border border-emerald-500/20 text-emerald-800 space-y-2"
                    >
                      <Check className="w-8 h-8 mx-auto stroke-[2.5]" />
                      <div className="text-xs uppercase tracking-wider font-bold">Workspace Provisioned</div>
                      <p className="text-xs font-light">Spawning initial agent routines...</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-3.5 pt-2">
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">Developer / Architect Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">Work Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.com"
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">AI Workspace Specialization</label>
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                        >
                          <option>Atelier Architect (Analysis & Creative)</option>
                          <option>Sprints Engineer (Ticketing & Deployment)</option>
                          <option>Operations Lead (Hands-free Automation)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF6D29] text-white py-3 text-[10px] uppercase tracking-wider font-bold hover:bg-[#E05A1B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-[0_4px_14px_rgba(255,109,41,0.25)]"
                      >
                        {loading ? "Deploying Sandbox..." : "Provision Atelier Space"}
                        {!loading && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    </div>
                  )}
                </form>
              )}

              {/* ATTACH ASSET MODAL */}
              {type === "attach" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter">Attach Studio Files</h2>
                    <p className="text-xs text-black/50 dark:text-white/50 font-light">Select from simulated technical files to feeds into your active workspace model container.</p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {sampleAssets.map((asset, idx) => {
                      const Icon = asset.icon;
                      const isAttached = attachedFiles.includes(asset.name);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleAttachment(asset.name)}
                          className={`p-4 border text-left cursor-pointer transition-all flex items-center justify-between group ${
                            isAttached 
                              ? "bg-black/5 dark:bg-white/5 border-black/20 dark:border-[#453027]/60" 
                              : "bg-white dark:bg-[#1C181C] border-black/5 dark:border-[#453027]/20 hover:border-black/20 dark:hover:border-[#453027]/60 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 flex items-center justify-center ${isAttached ? "bg-[#FF6D29] text-white" : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-[#BABABA]/40 group-hover:bg-[#FF6D29] group-hover:text-white transition-colors"}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-[#1A1A1A] dark:text-white">{asset.name}</div>
                              <div className="text-[10px] text-black/40 dark:text-[#BABABA]/40 font-light">{asset.desc} &bull; {asset.size}</div>
                            </div>
                          </div>
                          
                          <div className={`w-5 h-5 flex items-center justify-center border transition-all ${
                            isAttached ? "bg-emerald-500 border-emerald-500 text-white" : "border-black/10 dark:border-[#453027]/40 bg-white dark:bg-[#1C181C]"
                          }`}>
                            {isAttached && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-[#453027]/20 p-4 text-center space-y-1.5">
                    <FileUp className="w-5 h-5 mx-auto text-black/30 dark:text-white/30" />
                    <div className="text-[10px] uppercase tracking-wider font-bold text-black/60 dark:text-white/60">Drag and Drop Custom Document</div>
                    <p className="text-[10px] text-black/40 dark:text-[#BABABA]/40 font-light max-w-xs mx-auto leading-normal">
                      Accepts PDF, JSON, XLSX, CSV, or TXT up to 32MB. Real-time tokenization occurs inside sandbox boundaries.
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full bg-[#FF6D29] text-white py-3 text-[10px] uppercase tracking-wider font-bold hover:bg-[#E05A1B] transition-colors cursor-pointer mt-4 shadow-[0_4px_14px_rgba(255,109,41,0.25)]"
                  >
                    Confirm Attachments ({attachedFiles.length})
                  </button>
                </div>
              )}

              {/* CASE STUDY MODAL */}
              {type === "case-study" && (
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter">Vox Populi &bull; Operations Reform</h2>
                    <p className="text-xs text-black/50 dark:text-white/50 font-light">Full integration of automated agents across customer care & development sprint cycles.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 border-y border-black/5 dark:border-[#453027]/30 py-4 my-2">
                    <div className="text-center">
                      <div className="text-2xl font-serif italic font-light text-[#1A1A1A] dark:text-white">24/7</div>
                      <div className="text-[8px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold mt-0.5">Uptime Cover</div>
                    </div>
                    <div className="text-center border-x border-black/5 dark:border-[#453027]/30">
                      <div className="text-2xl font-serif italic font-light text-[#1A1A1A] dark:text-white">94%</div>
                      <div className="text-[8px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold mt-0.5">Fulfillment Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-serif italic font-light text-[#1A1A1A] dark:text-white">-40h</div>
                      <div className="text-[8px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold mt-0.5">Weekly Save/Dev</div>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-black/70 dark:text-white/70 font-light leading-relaxed">
                    <p>
                      <strong>The Objective:</strong> Vox Populi, a fast-scaling brand logistics ecosystem managed by Wayne Grimshaw, faced critical bottlenecks syncing software feature releases with multi-channel support updates. Support specialists were spending 12 hours/week compiling engineering ticket summaries manually.
                    </p>
                    <p>
                      <strong>The Solution:</strong> Deploying three connected <em>Autonomic Workspace Agents</em> inside the Vox Populi Slack and Jira boundaries. An agent listens directly to user issues, formats diagnostic logs automatically, and drafts ready-to-run GitHub pull requests.
                    </p>
                    <blockquote className="p-4 bg-black/[0.02] dark:bg-white/[0.02] border-l-2 border-black/40 dark:border-white/40 italic font-serif text-black/90 dark:text-white/90">
                      “Autonomic I/O completely changed how we work. Now we manage tasks faster and stay productive 24/7 without manual ticketing bottlenecks.”
                    </blockquote>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="w-full bg-[#FF6D29] text-white py-3 text-[10px] uppercase tracking-wider font-bold hover:bg-[#E05A1B] transition-colors cursor-pointer shadow-[0_4px_14px_rgba(255,109,41,0.25)]"
                    >
                      Dismiss Case Study Record
                    </button>
                  </div>
                </div>
              )}

              {/* VERIFICATION MODAL */}
              {type === "verify" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter">Cryptographic Audit Certificate</h2>
                    <p className="text-xs text-black/50 dark:text-white/50 font-light">Performance records verified by autonomous consensus layer.</p>
                  </div>

                  <div className="bg-[#121012] text-white p-4 font-mono text-[10px] space-y-2 border border-black/5 dark:border-[#453027]/40">
                    <div className="flex justify-between items-center text-white/40 pb-2 border-b border-white/5 uppercase tracking-wider">
                      <span>Log Key // OP-9625-X</span>
                      <span className="text-emerald-400 font-bold">PASSED</span>
                    </div>
                    <div className="space-y-1 text-white/80">
                      <div><span className="text-white/40">TIMESTAMP :</span> 2026-07-19T01:34:43 UTC</div>
                      <div><span className="text-white/40">AUDITOR   :</span> ATELIER CONSULTING INC.</div>
                      <div><span className="text-white/40">METHODOLOGY:</span> CONSTANT-INTERVAL RUN MONITORING</div>
                      <div><span className="text-white/40">MEASURED  :</span> 96% REDUCTION IN MANUAL WORKLOOPS</div>
                      <div><span className="text-white/40">DEVIATION :</span> &plusmn; 0.041%</div>
                    </div>
                    <div className="pt-2 border-t border-white/5 text-[9px] text-white/30 truncate">
                      HASH: 9a8c7b6d5e4f3c2b1a0f9e8d7c6b5a4f3e2d1c0b
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-black/60 dark:text-[#BABABA]/60 font-light leading-relaxed">
                    <div className="flex gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Hands-free integrity:</strong> All tracking parameters are collected asynchronously directly from server containers without human access, maintaining perfect data separation.
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Terminal className="w-4 h-4 text-black/40 dark:text-[#BABABA]/40 shrink-0 mt-0.5" />
                      <div>
                        <strong>Auditable Pipelines:</strong> Log streams can be downloaded as standard JSON ledger logs at any time from your administrator dashboard settings.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full bg-[#FF6D29] text-white py-3 text-[10px] uppercase tracking-wider font-bold hover:bg-[#E05A1B] transition-colors cursor-pointer mt-2 shadow-[0_4px_14px_rgba(255,109,41,0.25)]"
                  >
                    Close Compliance Sheet
                  </button>
                </div>
              )}

              {/* CLIENT ENQUIRY FORM MODAL */}
              {type === "enquiry" && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter">
                      Request Workspace Integration &bull; Enquiry
                    </h2>
                    <p className="text-xs text-black/50 dark:text-white/50 font-light">
                      Submit your customization request. Your requirements will be saved securely inside our active PostgreSQL cluster database.
                    </p>
                  </div>

                  {enquirySuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-6 text-center space-y-3 rounded-md"
                    >
                      <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                        <Check className="w-5 h-5 stroke-[3]" />
                      </div>
                      <h3 className="text-sm font-bold uppercase tracking-wider">Enquiry Submitted Successfully!</h3>
                      <p className="text-xs font-light leading-relaxed">
                        Thank you for your request. We have stored your workspace parameters inside our secure Cloud SQL storage. Our Atelier operations architects will contact you shortly.
                      </p>
                      <button
                        onClick={() => {
                          setEnquirySuccess(false);
                          onClose();
                        }}
                        className="mt-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] uppercase tracking-wider font-bold transition-all rounded"
                      >
                        Dismiss Portal
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-3 pt-2">
                      {enquiryError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-md text-xs font-light">
                          {enquiryError}
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">
                          Workspace Apps Needed
                        </label>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {["Google Drive", "Gmail", "Google Docs", "Google Forms"].map((service) => {
                            const isChecked = selectedServices.includes(service);
                            return (
                              <div
                                key={service}
                                onClick={() => handleServiceCheckbox(service)}
                                className={`p-2 border cursor-pointer transition-all flex items-center justify-between ${
                                  isChecked
                                    ? "bg-[#FF6D29]/5 border-[#FF6D29] text-[#FF6D29] font-semibold"
                                    : "bg-white dark:bg-[#1C181C] border-black/5 dark:border-[#453027]/20 text-neutral-600 dark:text-neutral-400 hover:border-black/15 dark:hover:border-white/10"
                                }`}
                              >
                                <span>{service}</span>
                                <div className={`w-3.5 h-3.5 border flex items-center justify-center rounded-sm ${
                                  isChecked ? "bg-[#FF6D29] border-[#FF6D29] text-white" : "border-black/20 dark:border-white/20 bg-white dark:bg-[#1C181C]"
                                }`}>
                                  {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-widest text-black/40 dark:text-[#BABABA]/40 font-bold block">
                          Enquiry Message / Requirements *
                        </label>
                        <textarea
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          placeholder="Detail your operational bottlenecks or required automation sync triggers..."
                          className="w-full bg-white dark:bg-[#1C181C] border border-black/10 dark:border-[#453027]/40 text-[#1A1A1A] dark:text-white p-2.5 text-xs outline-none focus:border-[#FF6D29] dark:focus:border-[#FF6D29] transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF6D29] text-white py-3 text-[10px] uppercase tracking-wider font-bold hover:bg-[#E05A1B] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-[0_4px_14px_rgba(255,109,41,0.25)]"
                      >
                        {loading ? "Recording Enquiry..." : "Submit Secure Enquiry"}
                        {!loading && <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    </form>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
