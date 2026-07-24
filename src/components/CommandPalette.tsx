import React, { useState, useEffect } from "react";
import { Search, Command, ArrowRight, Zap, Shield, Sparkles, Terminal, FileText, Layers, Key, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  openEnquiryModal?: () => void;
  openLoginModal?: () => void;
  openVerifyModal?: () => void;
  openAdminModal?: () => void;
  setTheme?: (theme: "light" | "midnight") => void;
  theme?: string;
}

export default function CommandPalette({
  isOpen,
  onClose,
  openEnquiryModal,
  openLoginModal,
  openVerifyModal,
  openAdminModal,
  setTheme,
  theme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state toggle
          const event = new CustomEvent("toggle-command-palette");
          window.dispatchEvent(event);
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      id: "hero",
      title: "Neural Engine Sandbox",
      category: "Navigation",
      icon: Terminal,
      action: () => {
        document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "overview",
      title: "System Overview & Architecture",
      category: "Navigation",
      icon: Layers,
      action: () => {
        document.getElementById("overview-section")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "stats",
      title: "Live Autonomous Metrics",
      category: "Navigation",
      icon: Zap,
      action: () => {
        document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "pricing",
      title: "Enterprise Tier Pricing",
      category: "Navigation",
      icon: FileText,
      action: () => {
        document.getElementById("pricing-section")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "admin",
      title: "Admin Command Center & Telemetry",
      category: "Restricted",
      icon: Shield,
      action: () => {
        onClose();
        if (openAdminModal) openAdminModal();
      },
    },
    {
      id: "verify",
      title: "Cryptographic Audit Certificate",
      category: "Security",
      icon: Shield,
      action: () => {
        onClose();
        if (openVerifyModal) openVerifyModal();
      },
    },
    {
      id: "enquiry",
      title: "Request Custom Architecture Demo",
      category: "Actions",
      icon: Sparkles,
      action: () => {
        onClose();
        if (openEnquiryModal) openEnquiryModal();
      },
    },
    {
      id: "login",
      title: "Account Sign In / Register",
      category: "Account",
      icon: Key,
      action: () => {
        onClose();
        if (openLoginModal) openLoginModal();
      },
    },
    {
      id: "theme",
      title: `Switch to ${theme === "light" ? "Midnight Dark" : "Light"} Mode`,
      category: "Preferences",
      icon: Sparkles,
      action: () => {
        if (setTheme) {
          setTheme(theme === "light" ? "midnight" : "light");
        }
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-white dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#2A2F3D] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col font-sans"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-[#E2E8F0] dark:border-[#2A2F3D] gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDownList}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-sm text-[#100C08] dark:text-white placeholder-neutral-400 focus:outline-none font-sans"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
              ESC
            </kbd>
          </div>

          {/* Item List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-400 font-mono">
                No matching actions found for "{query}"
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#CA3F16]/10 text-[#CA3F16] dark:bg-[#CA3F16]/20 dark:text-white"
                        : "text-[#100C08]/80 dark:text-[#E2E8F0]/80 hover:bg-neutral-100 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1.5 rounded-lg ${
                          isSelected
                            ? "bg-[#CA3F16] text-white"
                            : "bg-neutral-100 dark:bg-white/5 text-neutral-500"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold font-sans">{item.title}</div>
                        <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#CA3F16] dark:text-[#FF6D29]" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-neutral-50 dark:bg-[#12151C] border-t border-[#E2E8F0] dark:border-[#2A2F3D] flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded">↑</kbd>
                <kbd className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-800 rounded">↵</kbd>
                <span>Select</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Command className="w-3 h-3 text-[#CA3F16]" />
              <span className="font-bold text-[#CA3F16]">Autonomic I/O Command</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
