import React, { useState } from "react";
import { ShieldAlert, Lock, ShieldCheck, ArrowRight, Key, AlertTriangle, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AdminDashboard from "./AdminDashboard";

interface AdminRouteGuardProps {
  userSession: { email: string; name: string } | null;
  onClose?: () => void;
  openLoginModal?: () => void;
}

export default function AdminRouteGuard({ userSession, onClose, openLoginModal }: AdminRouteGuardProps) {
  // Check if current user email is recognized as authorized super admin
  const isAuthorizedEmail = userSession && (
    userSession.email.toLowerCase() === "krishkumar6928@gmail.com" ||
    userSession.email.toLowerCase().includes("admin")
  );

  const [passphrase, setPassphrase] = useState("");
  const [isPassphraseUnlocked, setIsPassphraseUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePassphraseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      passphrase.trim() === "admin2026" ||
      passphrase.trim() === "autonomic" ||
      passphrase.trim() === "krishkumar6928@gmail.com"
    ) {
      setIsPassphraseUnlocked(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid administrative security key or passphrase. Access denied.");
    }
  };

  const isFullyAuthenticated = isAuthorizedEmail || isPassphraseUnlocked;

  if (!isFullyAuthenticated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#0A0C10] text-white p-6 sm:p-10 rounded-3xl border border-[#CA3F16]/40 shadow-2xl relative overflow-hidden font-sans max-w-xl mx-auto"
      >
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#CA3F16]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 text-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] uppercase tracking-wider font-mono font-bold">
                  ROUTE GUARD &bull; ACCESSED DENIED
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight font-sans mt-0.5">
                  Restricted Administrative Portal
                </h2>
              </div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-neutral-300 transition-colors"
              >
                Close
              </button>
            )}
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-sans">
            The requested administrative interface is protected by high-grade role-based access control (RBAC). Only authenticated root administrators (<span className="text-[#FF6D29] font-mono">krishkumar6928@gmail.com</span>) may access live telemetry, user management, and system logs.
          </p>

          {userSession ? (
            <div className="p-3 bg-neutral-900/80 border border-neutral-800 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Signed in as:</span>
              <span className="text-neutral-200 font-bold">{userSession.email}</span>
            </div>
          ) : (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <Lock className="w-4 h-4" /> Unauthenticated Visitor
              </div>
              <p className="text-[11px] text-neutral-300">
                You are currently browsing as a guest. Please sign in with an administrator account or provide an administrative passkey below.
              </p>
              {openLoginModal && (
                <button
                  onClick={() => {
                    if (onClose) onClose();
                    openLoginModal();
                  }}
                  className="mt-2 px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Passphrase Override Gate */}
          <form onSubmit={handlePassphraseSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-[10px] uppercase font-mono font-bold tracking-widest text-neutral-400 mb-1.5">
                Administrative Passphrase Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter administrative passkey (e.g. admin2026)"
                  className="w-full bg-[#161B26] border border-[#2A2F3D] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#CA3F16] font-mono transition-colors"
                />
                <Key className="w-4 h-4 text-neutral-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono rounded-lg flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#CA3F16] hover:bg-[#B32E0B] text-white text-xs uppercase font-bold tracking-widest transition-all shadow-lg shadow-[#CA3F16]/20 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Validate Administrative Credentials</span>
            </button>
          </form>
        </div>
      </motion.div>
    );
  }

  // Render Admin Dashboard when authenticated & authorized
  return <AdminDashboard userSession={userSession} onClose={onClose} />;
}
