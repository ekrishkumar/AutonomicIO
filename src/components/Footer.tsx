import React, { useState } from "react";
import { Mail, ArrowRight, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  openModal?: (type: "login" | "register" | "case-study" | "attach" | "verify" | "enquiry") => void;
}

export default function Footer({ openModal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const footerLinks = [
    {
      title: "Quick Links",
      items: [
        { label: "Home", action: "scroll", target: "optiv-navbar" },
        { label: "About", action: "scroll", target: "overview-section" },
        { label: "Services", action: "scroll", target: "stats-section" },
        { label: "Contact", action: "modal", target: "enquiry" as const }
      ]
    },
    {
      title: "Product",
      items: [
        { label: "Features", action: "scroll", target: "features-split" },
        { label: "Integrations", action: "scroll", target: "logos-section" },
        { label: "Pricing", action: "scroll", target: "pricing-section" },
        { label: "Updates", action: "modal", target: "verify" as const }
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Help Center", action: "toast", message: "Help Center ledger loaded into local workspace container memory." },
        { label: "Documentation", action: "modal", target: "attach" as const },
        { label: "Community", action: "toast", message: "Connected to Autonomic peer consensus node (14.2k active nodes)." },
        { label: "Tutorials", action: "toast", message: "Check Sandbox Console suggestions for guided workflow walkthroughs." }
      ]
    }
  ];

  const handleLinkClick = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    if (item.action === "scroll" && item.target) {
      const element = document.getElementById(item.target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (item.action === "modal" && item.target && openModal) {
      openModal(item.target as any);
    } else if (item.action === "toast" && item.message) {
      setToastMessage(item.message);
      const audio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAAA");
      audio.volume = 0.08;
      audio.play().catch(() => {});
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <footer id="optiv-footer" className="relative bg-[#FAFAFC] dark:bg-[#0E1015] border-t border-[#E2E8F0] dark:border-[#222630] pt-24 pb-12 text-left transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      {/* Dynamic Toast Popup Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] bg-white dark:bg-[#181B22] text-[#14161D] dark:text-[#E2E8F0] px-4 py-3 border border-[#E2E8F0] dark:border-[#222630] rounded-lg shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#FF5C43] animate-ping" />
            <div className="space-y-0.5">
              <div className="text-[9px] uppercase tracking-wider font-bold text-[#FF5C43] font-mono">
                Atelier System Alert
              </div>
              <div className="text-[11px] font-light leading-snug font-sans">
                {toastMessage}
              </div>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-[#14161D]/50 hover:text-[#FF5C43] dark:text-[#E2E8F0]/50 dark:hover:text-[#FF5C43] ml-auto pl-2 font-mono cursor-pointer"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 z-10">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#E2E8F0] dark:border-[#222630]">
          
          {/* Brand and Newsletter Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg tracking-tighter uppercase text-[#14161D] dark:text-white">
                AUTONOMIC<span className="text-[#FF5C43] font-mono select-none font-bold">.</span>I/O
              </span>
              <span className="px-1.5 py-0.5 text-[7px] tracking-[0.15em] uppercase font-bold text-[#FF5C43] bg-[#FF5C43]/10 border border-[#FF5C43]/20 rounded font-mono">
                SYSTEM
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-[#FF5C43] uppercase tracking-[0.25em] font-mono">
                Subscribe
              </h4>
              <p className="text-xs text-[#14161D]/65 dark:text-[#E2E8F0]/65 max-w-sm leading-relaxed font-light font-sans">
                Join our newsletter to stay up to date on features, technical releases, and design case studies.
              </p>
            </div>

            {/* Newsletter Subscription input - Fully Responsive Frame */}
            <form onSubmit={handleSubscribe} className="relative max-w-md w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-[#181B22] p-1 border border-[#E2E8F0] dark:border-[#222630] focus-within:border-[#FF5C43] focus-within:ring-1 focus-within:ring-[#FF5C43]/20 transition-all duration-300 rounded-md gap-2 sm:gap-0">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="pl-3 text-[#FF5C43]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-transparent border-0 outline-none pl-2.5 pr-2 py-2 text-xs text-[#14161D] dark:text-white placeholder-black/30 dark:placeholder-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#FF5C43] hover:bg-[#E04830] text-white rounded-md text-[9px] uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                >
                  <AnimatePresence mode="wait">
                    {subscribed ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-white stroke-[3]" /> Subscribed
                      </motion.span>
                    ) : (
                      <motion.span
                        key="sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Subscribe
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </form>

            <p className="text-[10px] text-[#14161D]/50 dark:text-[#E2E8F0]/50 leading-normal max-w-sm font-light font-sans">
              By subscribing you agree to our{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="underline hover:text-[#FF5C43]">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Quick Links Column Groupings */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h5 className="text-[10px] font-bold text-[#14161D]/80 dark:text-white uppercase tracking-[0.2em] font-mono">
                  {group.title}
                </h5>
                <ul className="space-y-2 text-xs">
                  {group.items.map((item, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, item)}
                        className="text-[#14161D]/60 dark:text-white/60 hover:text-[#FF5C43] dark:hover:text-[#FF5C43] transition-colors py-0.5 block font-light font-sans"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom bar copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-light font-mono">
          <div>© 2026 Autonomic I/O. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="hover:text-[#FF5C43] dark:hover:text-[#FF5C43] transition-colors">
              Terms of Service
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="hover:text-[#FF5C43] dark:hover:text-[#FF5C43] transition-colors">
              Privacy Policy
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="hover:text-[#FF5C43] dark:hover:text-[#FF5C43] transition-colors">
              Compliance
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
