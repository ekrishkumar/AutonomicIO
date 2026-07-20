import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LogosBar from "./components/LogosBar";
import OverviewSection from "./components/OverviewSection";
import InteractiveWorkflow from "./components/InteractiveWorkflow";
import QuoteSection from "./components/QuoteSection";
import StatsGrid from "./components/StatsGrid";
import FeatureSplit from "./components/FeatureSplit";
import SocialCounter from "./components/SocialCounter";
import PricingSection from "./components/PricingSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import WorkableModal from "./components/WorkableModal";
import CustomCursor from "./components/CustomCursor";
import UserDashboard from "./components/UserDashboard";

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [userSession, setUserSession] = useState<{ email: string; name: string } | null>(null);
  const [activeModal, setActiveModal] = useState<"login" | "register" | "case-study" | "attach" | "verify" | "enquiry" | null>(null);
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
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginSuccess = (email: string, name: string) => {
    setUserSession({ email, name });
  };

  const handleLogout = () => {
    setUserSession(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#161316] text-[#161316] dark:text-[#BABABA] selection:bg-[#FF6D29]/20 selection:text-neutral-900 transition-colors duration-300">
      {/* Dynamic Animated Interactive Cursor */}
      <CustomCursor />

      {/* Elegant minimalist scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-black/[0.04] dark:bg-white/[0.04] z-[100] pointer-events-none">
        <div
          className="h-full bg-[#FF6D29] transition-all duration-75 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Theme Toggle Pill */}
      <div className="fixed top-24 right-6 md:right-8 z-[150]">
        <button
          id="theme-toggle-btn"
          onClick={() => setTheme((prev) => (prev === "light" ? "midnight" : "light"))}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-[#453027]/30 hover:bg-neutral-50 dark:hover:bg-[#453027]/50 text-[#161316] dark:text-[#BABABA] border border-black/10 dark:border-[#453027]/50 shadow-lg backdrop-blur-md transition-all duration-300 rounded-full cursor-pointer group active:scale-95"
          title={`Switch to ${theme === "light" ? "Midnight Dark" : "Light"} Mode`}
        >
          {theme === "light" ? (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-500 transition-transform group-hover:rotate-12 duration-300" />
              <span className="text-[10px] uppercase tracking-wider font-bold pr-1 font-mono">Midnight</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-[#FF6D29] transition-transform group-hover:rotate-45 duration-300" />
              <span className="text-[10px] uppercase tracking-wider font-bold pr-1 font-mono text-white/90">Light</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        userSession={userSession}
        onLogout={handleLogout}
        openLoginModal={() => setActiveModal("login")}
        openRegisterModal={() => setActiveModal("register")}
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
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6D29] font-mono">
                  AUTHENTICATED AS {userSession.email}
                </span>
              </div>
              <UserDashboard userSession={userSession} onLogout={handleLogout} />
            </div>
          </section>
        )}

        {/* 3. Logos Marquee Bar */}
        <LogosBar />

        {/* 4. Tiered Statement Summary */}
        <OverviewSection />

        {/* 4.5 n8n-Style Interactive Workflow Sandbox */}
        <InteractiveWorkflow />

        {/* 5. Stunning Review Quote Banner with audio wave player */}
        <QuoteSection
          openCaseStudyModal={() => setActiveModal("case-study")}
        />

        {/* 6. Dynamic Stats Grid */}
        <StatsGrid
          openVerifyModal={() => setActiveModal("verify")}
        />

        {/* 7. Setup Onboarding On-Click Steps */}
        <FeatureSplit />

        {/* 8. Tasks Completed Dynamically Counting Up Log Panel */}
        <SocialCounter />

        {/* 8.5 Visual Pricing Tier Matrix */}
        <PricingSection openEnquiryModal={() => setActiveModal("enquiry")} />

        {/* 9. Final CTA with wildflower sunset scene */}
        <FinalCTA
          openRegisterModal={() => setActiveModal("register")}
          openEnquiryModal={() => setActiveModal("enquiry")}
        />
      </main>

      {/* 10. Complete Footer */}
      <Footer openModal={(type) => setActiveModal(type)} />

      {/* Shared Workable Modals container */}
      <WorkableModal
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onLoginSuccess={handleLoginSuccess}
        attachedFiles={attachedFiles}
        setAttachedFiles={setAttachedFiles}
      />
    </div>
  );
}

