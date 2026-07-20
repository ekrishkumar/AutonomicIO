import React, { useState } from "react";
import { ChevronDown, Menu, X, Sparkles, GitMerge } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ServiceMonitor from "./ServiceMonitor";

interface NavbarProps {
  userSession: { email: string; name: string } | null;
  onLogout: () => void;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

export default function Navbar({
  userSession,
  onLogout,
  openLoginModal,
  openRegisterModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: "Products",
      hasDropdown: true,
      items: [
        { title: "Task Automation", desc: "Automate task assignment & delegation seamlessly.", target: "overview-section" },
        { title: "Workspaces", desc: "Intelligent collaborative environments powered by AI.", target: "features-split" },
        { title: "Custom Agents", desc: "Deploy custom AI workers tailored to your workflow.", target: "features-split" }
      ]
    },
    {
      label: "Use Cases",
      hasDropdown: true,
      items: [
        { title: "For Engineering", desc: "Automate code reviews, deployments, & sprint planning.", target: "stats-section" },
        { title: "For Operations", desc: "Sync cross-functional processes without manual touch.", target: "stats-section" },
        { title: "For Marketing", desc: "Coordinate multi-channel campaigns & analytics automatically.", target: "stats-section" }
      ]
    },
    { label: "Pricing", hasDropdown: false, target: "pricing-section" },
    { label: "Company", hasDropdown: false, target: "overview-section" },
    { label: "Resources", hasDropdown: false, target: "final-cta" }
  ];

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav id="optiv-navbar" className="sticky top-0 z-50 bg-white/95 dark:bg-[#161316]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#453027]/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sunset-orange flex items-center justify-center text-white shadow-sm">
              <GitMerge className="w-4.5 h-4.5 rotate-90" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter text-[#14161D] dark:text-white uppercase">
              AUTONOMIC<span className="text-sunset-orange font-mono select-none font-bold">.</span>I/O
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[8px] tracking-[0.2em] uppercase font-bold text-sunset-orange bg-sunset-orange/10 border border-sunset-orange/20 rounded font-mono">
              N8N ATELIER
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => {
              const isSelected = activeDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    id={`nav-btn-${item.label.toLowerCase()}`}
                    onClick={(e) => {
                      if (!item.hasDropdown && item.target) {
                        handleScrollTo(e, item.target);
                      }
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected ? "text-sunset-orange border-b border-sunset-orange" : "text-[#14161D]/75 dark:text-[#E2E8F0]/75 hover:text-sunset-orange"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.99 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-1 w-80 bg-white dark:bg-[#181B22] rounded-lg shadow-xl border border-[#E2E8F0] dark:border-[#453027]/40 p-3 z-50"
                        >
                          <div className="space-y-1">
                            {item.items?.map((sub, idx) => (
                              <a
                                key={idx}
                                href={`#${sub.target}`}
                                onClick={(e) => {
                                  if (sub.target) {
                                    handleScrollTo(e, sub.target);
                                    setActiveDropdown(null);
                                  }
                                }}
                                className="block p-3 rounded-lg hover:bg-sunset-orange/5 dark:hover:bg-sunset-orange/10 transition-colors group"
                              >
                                <div className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white group-hover:text-sunset-orange dark:group-hover:text-sunset-orange">
                                  {sub.title}
                                </div>
                                <div className="text-xs text-[#14161D]/60 dark:text-white/60 mt-1 leading-relaxed font-light">
                                  {sub.desc}
                                </div>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <ServiceMonitor />
            {userSession ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-sunset-orange bg-sunset-orange/5 px-2.5 py-1 border border-sunset-orange/25">
                  {userSession.name}
                </span>
                <button
                  onClick={onLogout}
                  className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#14161D]/60 dark:text-[#E2E8F0]/60 hover:text-sunset-orange transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  id="nav-btn-login"
                  onClick={openLoginModal}
                  className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#14161D]/65 dark:text-[#E2E8F0]/65 hover:text-sunset-orange transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  id="nav-btn-get-started"
                  onClick={openRegisterModal}
                  className="px-6 py-2.5 rounded-md bg-sunset-orange hover:opacity-95 text-white border-none text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 cursor-pointer shadow-[0_4px_14px_rgba(234,97,19,0.35)] active:scale-98"
                >
                  Get Started
                </button>
              </>
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
            className="md:hidden border-t border-black/5 dark:border-[#453027]/40 bg-white dark:bg-[#161316] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-black/5 dark:border-[#453027]/20 pb-3 last:border-0 last:pb-0">
                  <div
                    onClick={(e) => {
                      if (!item.hasDropdown && item.target) {
                        handleScrollTo(e, item.target);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="font-semibold text-black dark:text-white text-xs uppercase tracking-[0.15em] py-1 cursor-pointer"
                  >
                    {item.label}
                  </div>
                  {item.hasDropdown && (
                    <div className="pl-3 mt-1.5 space-y-2">
                      {item.items?.map((sub, idx) => (
                        <a
                          key={idx}
                          href={`#${sub.target}`}
                          onClick={(e) => {
                            if (sub.target) {
                              handleScrollTo(e, sub.target);
                              setMobileMenuOpen(false);
                            }
                          }}
                          className="block py-1"
                        >
                          <div className="text-[11px] font-bold uppercase tracking-wider text-black/80 dark:text-white/80">{sub.title}</div>
                          <div className="text-xs text-black/50 dark:text-white/50 mt-0.5 font-light">{sub.desc}</div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2 pb-4 border-b border-black/5 dark:border-[#453027]/20">
                <div className="text-[9px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold mb-2">Live Workspace Status</div>
                <ServiceMonitor />
              </div>

              <div className="pt-4 flex flex-col space-y-3">
                {userSession ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-50 dark:bg-[#453027]/20 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider text-center border border-emerald-100 dark:border-emerald-500/10">
                      Welcome, {userSession.name}
                    </div>
                    <button
                      onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                      className="w-full py-2.5 rounded-lg border border-black/10 dark:border-[#453027]/40 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-[#BABABA]/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      id="mobile-btn-login"
                      onClick={() => { openLoginModal(); setMobileMenuOpen(false); }}
                      className="w-full py-2.5 rounded-lg border border-black/10 dark:border-[#453027]/40 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-[#BABABA]/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      id="mobile-btn-get-started"
                      onClick={() => { openRegisterModal(); setMobileMenuOpen(false); }}
                      className="w-full py-2.5 rounded-md bg-sunset-orange text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 transition-colors cursor-pointer shadow-[0_4px_12px_rgba(234,97,19,0.25)]"
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
