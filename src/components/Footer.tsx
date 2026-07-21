import React, { useState } from "react";
import { Mail, ArrowRight, Sparkles, Check, Linkedin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

interface FooterProps {
  openModal?: (type: "login" | "register" | "case-study" | "attach" | "verify" | "enquiry") => void;
}

export default function Footer({ openModal }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Autonomic I/O?",
      answer: "Autonomic I/O is a next-generation AI orchestration layer designed to link complex LLM pipelines with robust multi-platform data integrations, automating enterprise work without code."
    },
    {
      question: "How does the Sandbox testing container work?",
      answer: "The Sandbox is an isolated virtual playground running on simulated secure container networks, enabling architects to safely validate agent reasoning and execution prior to staging."
    },
    {
      question: "Is user data stored or processed?",
      answer: "No. Security is our priority. We offer native Google Workspace OAuth client structures so that data fetches occur in real-time within your active local session tunnel, never on a third-party server."
    },
    {
      question: "What is the significance of the 'Atelier Specialist' roles?",
      answer: "We offer customized preset structures (e.g., Creative Architect, Sprints Engineer, Operations Lead) designed with tailored prompts and system contexts to align with your specialized automation objectives."
    }
  ];

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
        { label: "Contact", action: "modal", target: "enquiry" as const }
      ]
    },
    {
      title: "Product",
      items: [
        { label: "Pipeline Sandbox", action: "scroll", target: "prompt-form" },
        { label: "Pricing Matrix", action: "scroll", target: "pricing-section" },
        { label: "Updates", action: "modal", target: "verify" as const }
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Help Center", action: "toast", message: "Help Center ledger loaded into local workspace container memory." },
        { label: "Documentation", action: "modal", target: "attach" as const },
        { label: "Community", action: "toast", message: "Connected to Autonomic peer consensus node (14.2k active nodes)." }
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
    <footer id="optiv-footer" className="relative bg-[#F3F4F5] dark:bg-[#100C08] border-t border-[#E2E8F0] dark:border-[#1C130E]/40 pt-24 pb-12 text-left transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      {/* Dynamic Toast Popup Container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] bg-white dark:bg-[#1C130E] text-[#100C08] dark:text-[#DBE0E1] px-4 py-3 border border-[#E2E8F0] dark:border-[#1C130E]/40 rounded-lg shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#CA3F16] animate-ping" />
            <div className="space-y-0.5">
              <div className="text-[9px] uppercase tracking-wider font-bold text-[#CA3F16] font-mono">
                Atelier System Alert
              </div>
              <div className="text-[11px] font-light leading-snug font-sans">
                {toastMessage}
              </div>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-[#100C08]/50 hover:text-[#CA3F16] dark:text-[#DBE0E1]/50 dark:hover:text-[#CA3F16] ml-auto pl-2 font-mono cursor-pointer bg-transparent border-none p-0"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 z-10">
        
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#E2E8F0] dark:border-[#1C130E]/40">
          
          {/* Brand and Newsletter Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-display font-extrabold text-lg tracking-tighter uppercase text-[#100C08] dark:text-white">
                AUTONOMIC<span className="text-[#CA3F16] font-mono select-none font-bold">.</span>I/O
              </span>
              <span className="px-1.5 py-0.5 text-[7px] tracking-[0.15em] uppercase font-bold text-[#CA3F16] bg-[#CA3F16]/10 border border-[#CA3F16]/20 rounded font-mono">
                SYSTEM
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-[#CA3F16] uppercase tracking-[0.25em] font-mono">
                Subscribe
              </h4>
              <p className="text-xs text-[#100C08]/65 dark:text-[#DBE0E1]/65 max-w-sm leading-relaxed font-light font-sans">
                Join our newsletter to stay up to date on features, technical releases, and design case studies.
              </p>
            </div>

            {/* Newsletter Subscription input - Fully Responsive Frame */}
            <form onSubmit={handleSubscribe} className="relative max-w-md w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white dark:bg-[#1C130E] p-1 border border-[#E2E8F0] dark:border-[#1C130E]/40 focus-within:border-[#CA3F16] focus-within:ring-1 focus-within:ring-[#CA3F16]/20 transition-all duration-300 rounded-md gap-2 sm:gap-0">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="pl-3 text-[#CA3F16]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-transparent border-0 outline-none pl-2.5 pr-2 py-2 text-xs text-[#100C08] dark:text-white placeholder-black/30 dark:placeholder-white/30"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#CA3F16] hover:bg-[#95122C] text-white rounded-md text-[9px] uppercase tracking-wider font-bold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1 shadow-sm"
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

            <p className="text-[10px] text-[#100C08]/50 dark:text-[#DBE0E1]/50 leading-normal max-w-sm font-light font-sans">
              By subscribing you agree to our{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="underline hover:text-[#CA3F16]">
                Privacy Policy
              </a>
              .
            </p>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/autonomicio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-[#1C130E]/60 bg-white dark:bg-black/20 hover:bg-neutral-50 dark:hover:bg-white/5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#100C08]/85 dark:text-[#DBE0E1]/85 hover:text-[#CA3F16] dark:hover:text-[#CA3F16] hover:border-[#CA3F16]/30 transition-all cursor-pointer active:scale-95 shadow-sm group"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#CA3F16]" />
                <span>Connect on LinkedIn</span>
                <ArrowRight className="w-3 h-3 text-[#100C08]/40 dark:text-[#DBE0E1]/40 group-hover:translate-x-0.5 group-hover:text-[#CA3F16] transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links Column Groupings */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h5 className="text-[10px] font-bold text-[#100C08]/80 dark:text-white uppercase tracking-[0.2em] font-mono">
                  {group.title}
                </h5>
                <ul className="space-y-2 text-xs">
                  {group.items.map((item, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, item)}
                        className="text-[#100C08]/60 dark:text-white/60 hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors py-0.5 block font-light font-sans"
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

        {/* Interactive FAQ Accordion Section */}
        <div className="py-12 border-b border-[#E2E8F0] dark:border-[#1C130E]/40">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h4 className="text-[10px] font-bold text-[#CA3F16] uppercase tracking-[0.25em] font-mono">
                System Documentation
              </h4>
              <h3 className="text-2xl font-serif italic text-[#100C08] dark:text-white tracking-tighter">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-[#100C08]/50 dark:text-[#DBE0E1]/50 font-light font-sans max-w-xl">
                Quick solutions to common queries regarding our automated agent sandbox, secure integrations, and execution protocols.
              </p>
            </div>

            <div className="space-y-2.5 pt-4">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="border border-neutral-200 dark:border-[#1C130E]/60 rounded-lg bg-white/40 dark:bg-black/10 overflow-hidden transition-all duration-200 hover:border-[#CA3F16]/30 dark:hover:border-[#CA3F16]/30"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      className="w-full flex items-center justify-between p-4 text-left cursor-pointer select-none"
                    >
                      <span className="text-xs font-semibold text-[#100C08] dark:text-neutral-200 font-sans leading-relaxed">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#CA3F16]"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-4 pb-4 pt-1 text-xs text-[#100C08]/70 dark:text-[#DBE0E1]/70 font-light font-sans leading-relaxed border-t border-dashed border-neutral-150 dark:border-[#1C130E]/30 mt-1">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar copyrights */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider text-[#100C08]/50 dark:text-[#DBE0E1]/40 font-light font-mono">
          <div>© 2026 Autonomic I/O. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors">
              Terms of Service
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors">
              Privacy Policy
            </a>
             <a href="#" onClick={(e) => { e.preventDefault(); if (openModal) openModal("verify"); }} className="hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors">
              Compliance
            </a>
            <a 
              href="https://www.linkedin.com/company/autonomicio/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors flex items-center gap-1.5 normal-case font-sans font-medium"
            >
              <Linkedin className="w-3 h-3 shrink-0 text-[#CA3F16]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
