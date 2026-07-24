import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AgentTeamCanvas from "./components/AgentTeamCanvas";
import EnterpriseRoiSection from "./components/EnterpriseRoiSection";
import EvaluationBenchmarksSection from "./components/EvaluationBenchmarksSection";
import AppIntegrationsGrid from "./components/AppIntegrationsGrid";
import FeatureSplit from "./components/FeatureSplit";
import ZapierGovernanceGrid from "./components/ZapierGovernanceGrid";
import ZapierDarkResultsSection from "./components/ZapierDarkResultsSection";
import ZapierMcpSdkSection from "./components/ZapierMcpSdkSection";
import OverviewSection from "./components/OverviewSection";
import GovernanceMatrixSection from "./components/GovernanceMatrixSection";
import ContactSection from "./components/ContactSection";
import QuoteSection from "./components/QuoteSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import WorkableModal from "./components/WorkableModal";
import UserDashboard from "./components/UserDashboard";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";
import ScrollProgress from "./components/ScrollProgress";
import { initAuth, logout as firebaseLogout } from "./lib/firebase";

export default function App() {
  const [userSession, setUserSession] = useState<{ email: string; name: string } | null>(null);
  const [activeModal, setActiveModal] = useState<"login" | "register" | "case-study" | "attach" | "verify" | "enquiry" | "admin" | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [theme, setTheme] = useState<"light" | "midnight">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("optiv-theme");
      return saved === "midnight" ? "midnight" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "midnight") {
      root.classList.add("dark");
      localStorage.setItem("optiv-theme", "midnight");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("optiv-theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setUserSession({
          email: user.email || "",
          name: user.displayName || "Atelier Architect"
        });
      },
      () => {
        setUserSession(null);
      }
    );
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    const handleToggleCommandPalette = () => {
      setIsCommandPaletteOpen((prev) => !prev);
    };
    window.addEventListener("toggle-command-palette", handleToggleCommandPalette);
    return () => window.removeEventListener("toggle-command-palette", handleToggleCommandPalette);
  }, []);

  const handleLoginSuccess = (email: string, name: string) => {
    setUserSession({ email, name });
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
    } catch (err) {
      console.error("Firebase logout error:", err);
    }
    setUserSession(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFEFB] dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] selection:bg-[#FF4F00]/20 selection:text-neutral-900 transition-colors duration-300">
      {/* Dynamic SEO Meta Management */}
      <SEO />

      {/* Top Scroll Reading Progress & Back-to-Top Button */}
      <ScrollProgress />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        openEnquiryModal={() => setActiveModal("enquiry")}
        openLoginModal={() => setActiveModal("login")}
        openVerifyModal={() => setActiveModal("verify")}
        openAdminModal={() => setActiveModal("admin")}
        setTheme={setTheme}
        theme={theme}
      />

      {/* Floating Theme Toggle Pill */}
      <div className="fixed top-24 right-6 md:right-8 z-[150]">
        <button
          id="theme-toggle-btn"
          onClick={() => setTheme((prev) => (prev === "light" ? "midnight" : "light"))}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-white/90 dark:bg-[#1E293B]/30 hover:bg-neutral-50 dark:hover:bg-[#1E293B]/50 text-[#0B0F19] dark:text-[#BABABA] border border-[#C5C0B1]/40 dark:border-[#1E293B]/50 shadow-lg backdrop-blur-md transition-all duration-300 rounded-full cursor-pointer group active:scale-95 overflow-hidden"
          title={`Switch to ${theme === "light" ? "Midnight Dark" : "Light"} Mode`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: -6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center gap-2"
            >
              {theme === "light" ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-500 transition-transform group-hover:rotate-12 duration-300" />
                  <span className="text-[10px] uppercase tracking-wider font-bold pr-1 font-mono">Midnight</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#FF4F00] transition-transform group-hover:rotate-45 duration-300" />
                  <span className="text-[10px] uppercase tracking-wider font-bold pr-1 font-mono text-white/90">Light</span>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        userSession={userSession}
        onLogout={handleLogout}
        openLoginModal={() => setActiveModal("login")}
        openRegisterModal={() => setActiveModal("register")}
        openCommandPalette={() => setIsCommandPaletteOpen(true)}
        openAdminModal={() => setActiveModal("admin")}
      />

      <main>
        {/* 2. Interactive Hero Section with live prompt box */}
        <HeroSection
          attachedFiles={attachedFiles}
          setAttachedFiles={setAttachedFiles}
          openAttachModal={() => setActiveModal("attach")}
        />

        {/* Dynamic Personal User Dashboard Portal (rendered when signed in) */}
        {userSession && (
          <section id="user-dashboard-section" className="py-12 bg-neutral-50/30 dark:bg-black/30 border-y border-black/5 dark:border-[#222630] px-6 sm:px-10 lg:px-12 relative">
            <div className="absolute inset-0 n8n-dot-grid pointer-events-none opacity-40" />
            <div className="max-w-7xl mx-auto relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="editorial-badge">USER PORTAL</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4F00] font-mono">
                  AUTHENTICATED AS {userSession.email}
                </span>
              </div>
              <UserDashboard userSession={userSession} onLogout={handleLogout} />
            </div>
          </section>
        )}

        {/* 3. Zapier/Enterprise 4-Grid Governance Section */}
        <ZapierGovernanceGrid />

        {/* 4. Multi-Agent Orchestration Canvas */}
        <AgentTeamCanvas />

        {/* 5. Zapier/Enterprise Dark Results & Live Telemetry Counter */}
        <ZapierDarkResultsSection />

        {/* 6. Enterprise ROI & 6-Week Deployment Timeline */}
        <EnterpriseRoiSection />

        {/* 7. Zapier/Enterprise Autonomic MCP + SDK Section */}
        <ZapierMcpSdkSection />

        {/* 8. Evaluation Benchmarks & Real-Time Oversight Dashboard */}
        <EvaluationBenchmarksSection />

        {/* 9. Universal 1,000+ App Integrations Search Grid */}
        <AppIntegrationsGrid />

        {/* 10. Detailed Feature Split Showcase */}
        <FeatureSplit />

        {/* 11. Autonomic IO Company & Platform Overview */}
        <OverviewSection />

        {/* 12. Enterprise Governance Comparison Matrix & FAQ */}
        <GovernanceMatrixSection />

        {/* 10. Partner Spotlight & Quote */}
        <QuoteSection openCaseStudyModal={() => setActiveModal("case-study")} />

        {/* 11. Visual Pricing Tier Matrix */}
        <PricingSection openEnquiryModal={() => setActiveModal("enquiry")} />

        {/* 12. Direct Team Contact Page Section */}
        <ContactSection />
      </main>

      {/* 5. Complete Footer */}
      <Footer openModal={(type) => setActiveModal(type)} />

      {/* Shared Workable Modals container */}
      <WorkableModal
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onLoginSuccess={handleLoginSuccess}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
        userSession={userSession}
      />

      {/* Dynamic Cursor tracking */}
      <CustomCursor />
    </div>
  );
}

