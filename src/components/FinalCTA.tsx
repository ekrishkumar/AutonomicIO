import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface FinalCTAProps {
  openRegisterModal: () => void;
  openEnquiryModal: () => void;
}

export default function FinalCTA({ openRegisterModal, openEnquiryModal }: FinalCTAProps) {
  return (
    <section id="final-cta" className="py-24 px-6 sm:px-10 lg:px-12 bg-white dark:bg-[#161316] transition-colors duration-300">
      <div className="max-w-6xl mx-auto overflow-hidden relative aspect-[16/10] md:aspect-[16/5.8] border border-black/5 dark:border-[#453027]/40 rounded-none">
        
        {/* Dynamic Tech Grid Backdrop Pattern (No Image) */}
        <div className="absolute inset-0 bg-neutral-50 dark:bg-[#161316] transition-colors duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-100/50 via-transparent to-neutral-200/20 dark:from-[#161316]/50 dark:via-transparent dark:to-neutral-900/10" />
        </div>

        {/* Overlaid Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 sm:p-10 z-10 space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.4em] text-black/50 dark:text-[#BABABA]/50 uppercase flex items-center justify-center gap-1">
              DEPLOYMENT PORTAL &bull; STUDIO LAB
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-[#1A1A1A] dark:text-white tracking-tighter leading-tight font-light">
              Start Your Productivity<br className="hidden sm:inline" /> Journey Today
            </h2>
            <p className="text-black/60 dark:text-[#BABABA]/70 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light">
              Work smarter. Save time. Achieve more.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <div
              id="cta-btn-try-free"
              onClick={() => {
                document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                  openRegisterModal();
                }, 600);
              }}
              className="flex items-center gap-4 group cursor-pointer select-none"
            >
              <div className="w-12 h-12 rounded-full border border-black/10 dark:border-[#453027]/60 bg-black/5 dark:bg-[#1C181C] flex items-center justify-center group-hover:bg-[#FF6D29] dark:group-hover:bg-[#FF6D29] group-hover:text-white dark:group-hover:text-white group-hover:border-[#FF6D29] dark:group-hover:border-[#FF6D29] transition-all duration-300 text-[#1A1A1A] dark:text-white font-light text-lg">
                &#8594;
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] dark:text-white">
                Try AI for Free
              </span>
            </div>

            <div
              id="cta-btn-enquiry"
              onClick={openEnquiryModal}
              className="flex items-center gap-4 group cursor-pointer select-none"
            >
              <div className="w-12 h-12 rounded-full border border-[#FF6D29]/40 dark:border-[#FF6D29]/40 bg-[#FF6D29]/5 dark:bg-[#FF6D29]/5 flex items-center justify-center group-hover:bg-[#FF6D29] dark:group-hover:bg-[#FF6D29] group-hover:text-white dark:group-hover:text-white group-hover:border-[#FF6D29] dark:group-hover:border-[#FF6D29] transition-all duration-300 text-[#FF6D29] font-light text-lg">
                &#9993;
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FF6D29]">
                Enquiry Now
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
