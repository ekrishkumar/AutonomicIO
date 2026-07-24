import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X, Cpu, Layers, ShieldCheck, Zap, TrendingUp, Grid, BarChart2, DollarSign, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ServiceMonitor from "./ServiceMonitor";
import Logo from "./Logo";

interface NavbarProps {
  userSession: { email: string; name: string } | null;
  onLogout: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
  openCommandPalette?: () => void;
  openAdminModal?: () => void;
}

interface DropdownItem {
  title: string;
  desc: string;
  target: string;
  icon: React.ElementType;
}

interface DropdownCategory {
  id: string;
  label: string;
  items: DropdownItem[];
}

export default function Navbar({
  userSession,
  onLogout,
  openLoginModal,
  openRegisterModal,
  openCommandPalette,
  openAdminModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>("platform");
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdowns: DropdownCategory[] = [
    {
      id: "platform",
      label: "Platform",
      items: [
        {
          title: "Multi-Agent Pipeline",
          desc: "Visual workflow builder for autonomous AI agent networks",
          target: "agent-teams-section",
          icon: Layers,
        },
        {
          title: "MCP & SDK Core",
          desc: "Universal protocol connecting AI models to 9,000+ apps",
          target: "mcp-sdk-section",
          icon: Cpu,
        },
        {
          title: "Governance & Guardrails",
          desc: "Enterprise security, PII protection & prompt injection defense",
          target: "governance-grid-section",
          icon: ShieldCheck,
        },
        {
          title: "Autonomous Sandbox",
          desc: "Live prompt testing environment and pipeline execution",
          target: "hero-section",
          icon: Zap,
        },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      items: [
        {
          title: "Enterprise ROI",
          desc: "6-week deployment timeline & 85% operational cost reduction",
          target: "roi-timeline-section",
          icon: TrendingUp,
        },
        {
          title: "1,000+ App Ecosystem",
          desc: "Native connectors for Slack, Salesforce, Jira & Zendesk",
          target: "integrations-grid-section",
          icon: Grid,
        },
        {
          title: "Benchmarks & Oversight",
          desc: "Real-time latency metrics, error rates & execution telemetry",
          target: "benchmarks-oversight-section",
          icon: BarChart2,
        },
        {
          title: "Architecture Overview",
          desc: "System specs, scalability benchmarks & cloud infrastructure",
          target: "overview-section",
          icon: Sparkles,
        },
      ],
    },
    {
      id: "pricing",
      label: "Pricing & Team",
      items: [
        {
          title: "Pricing Plans",
          desc: "Flexible Starter, Growth, and Custom Enterprise options",
          target: "pricing-section",
          icon: DollarSign,
        },
        {
          title: "Contact Engineering Team",
          desc: "Direct architecture inquiries, custom proof of concepts & sales",
          target: "contact-section",
          icon: Mail,
        },
        {
          title: "Governance Matrix",
          desc: "Feature-by-feature comparison against legacy platforms",
          target: "governance-matrix-section",
          icon: CheckCircle2,
        },
      ],
    },
  ];

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      ref={navRef}
      id="optiv-navbar"
      className="sticky top-0 z-50 bg-[#FFFEFB]/95 dark:bg-[#0A0D12]/95 backdrop-blur-md border-b border-[#C5C0B1]/40 dark:border-white/10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Brand / Logo */}
          <div
            onClick={(e) => handleScrollTo(e, "hero-section")}
            className="flex-shrink-0 flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <Logo size={26} />
            <span className="font-sans font-extrabold text-xs tracking-[0.25em] text-[#100C08] dark:text-white uppercase transition-colors group-hover:text-[#FF4F00]">
              AUTONOMIC<span className="text-[#FF4F00] font-mono select-none font-black">.</span>I/O
            </span>
          </div>

          {/* Desktop Navigation - EXACTLY 3 DROPDOWN OPTIONS */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {dropdowns.map((category) => {
              const isOpen = activeDropdown === category.id;
              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(category.id)}
                >
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : category.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[11px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isOpen
                        ? "bg-[#FF4F00]/10 text-[#FF4F00] dark:bg-[#FF4F00]/20"
                        : "text-[#100C08]/80 dark:text-[#DBE0E1]/80 hover:text-[#FF4F00] dark:hover:text-[#FF4F00] hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{category.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#FF4F00]" : "text-neutral-400"
                      }`}
                    />
                  </button>

                  {/* Dropdown Card */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-1.5 w-80 sm:w-88 p-3 rounded-2xl bg-[#FFFEFB] dark:bg-[#121620] border border-[#C5C0B1]/60 dark:border-neutral-800 shadow-2xl z-50 space-y-1 backdrop-blur-xl"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest font-bold text-[#FF4F00]">
                          {category.label} Features
                        </div>
                        <div className="space-y-1">
                          {category.items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <button
                                key={item.title}
                                onClick={(e) => handleScrollTo(e, item.target)}
                                className="w-full text-left p-2.5 rounded-xl flex items-start gap-3 hover:bg-neutral-100 dark:hover:bg-[#1A202C] transition-all duration-150 cursor-pointer group"
                              >
                                <div className="p-2 rounded-lg bg-[#FF4F00]/10 text-[#FF4F00] group-hover:bg-[#FF4F00] group-hover:text-white transition-all shrink-0 mt-0.5">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                  <div className="text-xs font-bold text-[#100C08] dark:text-white group-hover:text-[#FF4F00] transition-colors flex items-center justify-between">
                                    <span>{item.title}</span>
                                  </div>
                                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-light leading-snug line-clamp-2">
                                    {item.desc}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-3.5">
            <ServiceMonitor />

            {userSession ? (
              <div className="flex items-center gap-3">
                {(userSession.email.toLowerCase() === "krishkumar6928@gmail.com" || userSession.email.toLowerCase().includes("admin")) && (
                  <button
                    onClick={openAdminModal}
                    className="px-2.5 py-1 rounded-md bg-[#FF4F00]/10 border border-[#FF4F00]/30 text-[#FF4F00] text-[10px] uppercase tracking-wider font-mono font-bold hover:bg-[#FF4F00] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Admin
                  </button>
                )}
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-[#100C08] dark:text-white bg-neutral-100 dark:bg-white/10 px-2.5 py-1 rounded-md border border-[#C5C0B1]/40 dark:border-white/10">
                  {userSession.name}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-[#FF4F00] transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  id="nav-btn-login"
                  onClick={openLoginModal}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold text-[#100C08] dark:text-white hover:text-[#FF4F00] dark:hover:text-[#FF4F00] transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  id="nav-btn-get-started"
                  onClick={openRegisterModal}
                  className="px-4 py-2 rounded-lg bg-[#FF4F00] hover:bg-[#E04400] text-white text-[10px] uppercase tracking-widest font-bold transition-all duration-200 cursor-pointer active:scale-95 shadow-md shadow-[#FF4F00]/25"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-toggle-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#100C08] dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-[#C5C0B1]/40 dark:border-white/10 cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF4F00]" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden border-t border-[#C5C0B1]/40 dark:border-white/10 bg-[#FFFEFB] dark:bg-[#0A0D12] overflow-hidden shadow-2xl"
          >
            <div className="px-5 py-6 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {/* 3 Categories in Accordion format */}
              <div className="space-y-3">
                {dropdowns.map((category) => {
                  const isAccordionOpen = openMobileAccordion === category.id;
                  return (
                    <div
                      key={category.id}
                      className="rounded-xl border border-[#C5C0B1]/40 dark:border-neutral-800 bg-white/60 dark:bg-[#121620]/60 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenMobileAccordion(isAccordionOpen ? null : category.id)}
                        className="w-full px-4 py-3.5 flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#100C08] dark:text-white cursor-pointer min-h-[44px]"
                      >
                        <span>{category.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#FF4F00] transition-transform duration-200 ${
                            isAccordionOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isAccordionOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-3 pb-3 space-y-1 border-t border-[#C5C0B1]/30 dark:border-neutral-800 pt-2"
                          >
                            {category.items.map((item) => {
                              const IconComp = item.icon;
                              return (
                                <button
                                  key={item.title}
                                  onClick={(e) => handleScrollTo(e, item.target)}
                                  className="w-full text-left p-2.5 rounded-lg flex items-center gap-3 hover:bg-[#FF4F00]/10 text-neutral-800 dark:text-neutral-200 active:bg-[#FF4F00]/15 cursor-pointer min-h-[44px]"
                                >
                                  <div className="p-1.5 rounded-md bg-[#FF4F00]/10 text-[#FF4F00] shrink-0">
                                    <IconComp className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="text-xs font-semibold">{item.title}</div>
                                </button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Service monitor bar */}
              <div className="pt-2 pb-2 border-t border-[#C5C0B1]/30 dark:border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">System Telemetry</span>
                <ServiceMonitor />
              </div>

              {/* Auth Buttons on Mobile */}
              <div className="pt-2 flex flex-col space-y-2.5">
                {userSession ? (
                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#FF4F00]/10 text-[#FF4F00] text-xs font-bold uppercase tracking-wider text-center border border-[#FF4F00]/20 rounded-lg">
                      Signed in as {userSession.name}
                    </div>
                    <button
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="w-full py-3 rounded-lg border border-[#C5C0B1]/50 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer min-h-[44px]"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      id="mobile-btn-login"
                      onClick={() => { openLoginModal(); setMobileMenuOpen(false); }}
                      className="w-full py-3 rounded-lg border border-[#C5C0B1]/60 dark:border-white/20 text-xs font-bold uppercase tracking-wider text-[#100C08] dark:text-white transition-colors cursor-pointer min-h-[44px]"
                    >
                      Login
                    </button>
                    <button
                      id="mobile-btn-get-started"
                      onClick={() => { openRegisterModal(); setMobileMenuOpen(false); }}
                      className="w-full py-3 rounded-lg bg-[#FF4F00] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E04400] transition-colors cursor-pointer shadow-md shadow-[#FF4F00]/20 min-h-[44px]"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
