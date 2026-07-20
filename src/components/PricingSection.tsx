import React from "react";
import { Check, Sparkles, Zap, Shield, Database, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface PricingSectionProps {
  openEnquiryModal: () => void;
}

export default function PricingSection({ openEnquiryModal }: PricingSectionProps) {
  const tiers = [
    {
      name: "Atelier Sandbox",
      price: "$0",
      period: "forever",
      desc: "Perfect for developers testing local node logic and basic Google Workspace handshakes.",
      icon: Zap,
      color: "border-[#E2E8F0] dark:border-[#222630] bg-white dark:bg-[#181B22]/60",
      features: [
        "1 Active Workflow Sandbox",
        "Standard local telemetry scans",
        "Up to 2 connected credentials",
        "100 tasks/month throughput limit",
        "Community Support forums"
      ],
      buttonText: "Launch Sandbox Console",
      primary: false,
      onClick: () => {
        document.getElementById("optiv-navbar")?.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      name: "Atelier Pro Node",
      price: "$49",
      period: "month",
      desc: "Ideal for fast-scaling operations and creators managing multi-channel pipelines.",
      icon: Sparkles,
      color: "border-[#FF5C43]/20 dark:border-[#FF5C43]/30 bg-white dark:bg-[#1C181C]",
      badge: "Most Popular",
      features: [
        "Unlimited workflows & loops",
        "Real-time Google Workspace monitors",
        "Dedicated Cloud SQL PostgreSQL storage",
        "Up to 4 parallel autonomous agents",
        "Full support for Docs, Drive, Gmail, & Forms",
        "Email & Discord Priority Support"
      ],
      buttonText: "Enquiry Now",
      primary: true,
      onClick: openEnquiryModal
    },
    {
      name: "Enterprise Grid",
      price: "Custom",
      period: "annual",
      desc: "For high-volume business clusters requiring strict security, audits, and custom VMs.",
      icon: Shield,
      color: "border-[#E2E8F0] dark:border-[#222630] bg-white dark:bg-[#181B22]/60",
      features: [
        "Unlimited connected credentials",
        "Dedicated Postgres pools in your project",
        "24/7 Compliance & SLA agreements",
        "Custom secure VPN tunnel configs",
        "SAML SSO & fine-grained role permissions",
        "Dedicated Solutions Architect support"
      ],
      buttonText: "Contact Sales & Enquiry",
      primary: false,
      onClick: openEnquiryModal
    }
  ];

  return (
    <section id="pricing-section" className="py-24 bg-[#FAFAFC] dark:bg-[#0E1015] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#222630] transition-colors duration-300 relative">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-16 z-10 text-center">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="editorial-badge">PRICING TIERS</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#14161D] dark:text-white leading-tight">
            Transparent pricing for <br className="hidden sm:inline" />limitless automation.
          </h2>
          <p className="text-xs text-[#14161D]/60 dark:text-[#E2E8F0]/60 leading-relaxed font-light">
            Start free on our Sandbox environment or scale up to our robust PostgreSQL-backed Atelier Pro clusters for deep enterprise Google Workspace synchronization.
          </p>
        </div>

        {/* Pricing Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left items-stretch">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-8 border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ${tier.color} ${
                  tier.primary ? "ring-2 ring-[#FF5C43]/20 scale-102 z-10 md:-translate-y-2" : ""
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[8px] uppercase tracking-widest font-extrabold bg-[#FF5C43] text-white rounded-full">
                    {tier.badge}
                  </span>
                )}

                <div className="space-y-6">
                  {/* Icon & Title */}
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-lg ${tier.primary ? "bg-[#FF5C43]/10 text-[#FF5C43]" : "bg-neutral-100 dark:bg-white/5 text-[#14161D]/60 dark:text-[#E2E8F0]/60"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold tracking-[0.15em] text-neutral-400 dark:text-neutral-500 uppercase font-mono">
                      Tier 0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#14161D] dark:text-white">{tier.name}</h3>
                    <p className="text-xs text-[#14161D]/60 dark:text-[#E2E8F0]/60 font-light min-h-[48px] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 py-2 border-y border-black/5 dark:border-white/5">
                    <span className="text-3xl md:text-4xl font-serif font-extrabold text-[#14161D] dark:text-white">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-xs text-[#14161D]/55 dark:text-[#E2E8F0]/55 font-mono">
                        / {tier.period}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 pt-2 text-xs">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-[#14161D]/75 dark:text-[#E2E8F0]/75">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${tier.primary ? "text-[#FF5C43]" : "text-emerald-500"}`} />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="pt-8 mt-auto">
                  <button
                    onClick={tier.onClick}
                    className={`w-full py-3 px-4 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                      tier.primary
                        ? "bg-[#FF5C43] hover:bg-[#E04830] text-white shadow-md hover:shadow-lg hover:translate-y-[-1px]"
                        : "bg-neutral-100 hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10 text-[#14161D] dark:text-white border border-transparent dark:border-white/5"
                    }`}
                  >
                    {tier.buttonText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
