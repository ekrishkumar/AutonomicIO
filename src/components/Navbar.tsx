import React, { useState } from "react";
import { ChevronDown, Menu, X, Sparkles, GitMerge, Search, Command } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ServiceMonitor from "./ServiceMonitor";
import Logo from "./Logo";

interface NavbarProps {
  userSession: { email: string; name: string } | null;
  onLogout: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  openCommandPalette?: () => void;
}

export default function Navbar({
  userSession,
  onLogout,
  openLoginModal,
  openRegisterModal,
  openCommandPalette,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    { label: "Sandbox", target: "hero-section" },
    { label: "Overview", target: "overview-section" },
    { label: "Pricing", target: "pricing-section" }
  ];

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav id="optiv-navbar" className="sticky top-0 z-50 bg-white/90 dark:bg-[#100C08]/90 backdrop-blur-md border-b border-[#E2E8F0] dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center gap-2.5 select-none">
            <Logo size={26} />
            <span className="font-sans font-bold text-xs tracking-[0.25em] text-[#100C08] dark:text-white uppercase">
              AUTONOMIC<span className="text-[#CA3F16] font-mono select-none font-black">.</span>I/O
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10 items-center">
            {navItems.map((item) => {
              return (
                <button
                  key={item.label}
                  id={`nav-btn-${item.label.toLowerCase()}`}
                  onClick={(e) => handleScrollTo(e, item.target)}
                  className="relative py-2 text-[9px] uppercase tracking-[0.22em] font-bold text-[#100C08]/65 dark:text-[#DBE0E1]/65 hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-all duration-200 cursor-pointer group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#CA3F16] scale-0 group-hover:scale-100 transition-all duration-250 ease-out" />
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Command Palette Trigger Button */}
            <button
              onClick={() => openCommandPalette ? openCommandPalette() : window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 border border-black/5 dark:border-white/5 transition-all text-xs font-mono cursor-pointer active:scale-95"
              title="Open Command Palette (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-[#CA3F16]" />
              <span className="hidden lg:inline text-[10px] text-neutral-400 font-sans">Search...</span>
              <kbd className="px-1.5 py-0.5 text-[9px] bg-black/5 dark:bg-white/10 rounded font-mono text-neutral-500 dark:text-neutral-300">⌘K</kbd>
            </button>

            <ServiceMonitor />

            {userSession ? (
              <div className="flex items-center gap-5">
                <span className="text-[9px] uppercase tracking-[0.18em] font-mono font-medium text-[#100C08]/75 dark:text-white/75 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 rounded">
                  {userSession.name}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#100C08]/50 dark:text-[#DBE0E1]/50 hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <button
                  id="nav-btn-login"
                  onClick={openLoginModal}
                  className="text-[9px] uppercase tracking-[0.22em] font-bold text-[#100C08]/70 dark:text-[#DBE0E1]/70 hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  id="nav-btn-get-started"
                  onClick={openRegisterModal}
                  className="px-4 py-2 rounded bg-[#CA3F16] hover:bg-[#B32E0B] text-white text-[9px] uppercase tracking-[0.22em] font-bold transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              id="btn-toggle-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-black/5 dark:border-[#1C130E]/40 bg-white dark:bg-[#100C08] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-black/5 dark:border-white/5 pb-3 last:border-0 last:pb-0">
                  <div
                    onClick={(e) => {
                      handleScrollTo(e, item.target);
                      setMobileMenuOpen(false);
                    }}
                    className="font-bold text-neutral-800 dark:text-neutral-100 text-[10px] uppercase tracking-[0.2em] py-1 cursor-pointer hover:text-[#CA3F16] dark:hover:text-[#CA3F16] transition-colors"
                  >
                    {item.label}
                  </div>
                </div>
              ))}

              <div className="pt-2 pb-4 border-b border-black/5 dark:border-white/5">
                <ServiceMonitor />
              </div>

              <div className="pt-4 flex flex-col space-y-3">
                {userSession ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider text-center border border-emerald-500/20 rounded">
                      Welcome, {userSession.name}
                    </div>
                    <button
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="w-full py-2.5 rounded border border-black/10 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      id="mobile-btn-login"
                      onClick={() => { openLoginModal(); setMobileMenuOpen(false); }}
                      className="w-full py-2.5 rounded border border-black/10 dark:border-white/10 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      id="mobile-btn-get-started"
                      onClick={() => { openRegisterModal(); setMobileMenuOpen(false); }}
                      className="w-full py-2.5 rounded bg-[#CA3F16] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B32E0B] transition-colors cursor-pointer"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
