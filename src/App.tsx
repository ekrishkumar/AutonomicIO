import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import OverviewSection from "./components/OverviewSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import WorkableModal from "./components/WorkableModal";
import UserDashboard from "./components/UserDashboard";
import CustomCursor from "./components/CustomCursor";
import { initAuth, logout as firebaseLogout } from "./lib/firebase";

export default function App() {
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
    <div className="min-h-screen bg-[#F3F4F5] dark:bg-[#100C08] text-[#100C08] dark:text-[#DBE0E1] selection:bg-[#FF9408]/20 selection:text-neutral-900 transition-colors duration-300">

      {/* Floating Theme Toggle Pill */}
      <div className="fixed top-24 right-6 md:right-8 z-[150]">
        <button
          id="theme-toggle-btn"
          onClick={() => setTheme((prev) => (prev === "light" ? "midnight" : "light"))}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-[#1E293B]/30 hover:bg-neutral-50 dark:hover:bg-[#1E293B]/50 text-[#0B0F19] dark:text-[#BABABA] border border-black/10 dark:border-[#1E293B]/50 shadow-lg backdrop-blur-md transition-all duration-300 rounded-full cursor-pointer group active:scale-95"
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

        {/* 3. Tiered Statement Summary */}
        <OverviewSection />

        {/* 4. Visual Pricing Tier Matrix */}
        <PricingSection openEnquiryModal={() => setActiveModal("enquiry")} />
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
      />

      {/* Dynamic Cursor tracking */}
      <CustomCursor />
    </div>
  );
}

