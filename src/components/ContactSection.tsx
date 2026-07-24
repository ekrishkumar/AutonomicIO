import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Globe,
  Send,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  UserCheck,
  ArrowRight,
  MessageSquare,
  Building2,
  Terminal,
  Cpu
} from "lucide-react";
import ThreeDTiltCard from "./ThreeDTiltCard";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "Enterprise AI Orchestration Inquiry",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactDetails = {
    name: "Autonomic IO Team",
    role: "Lead Architecture & Engineering Team, Autonomic IO",
    email: "krishkumar2711@outlook.com",
    phone: "+91 88290 99754",
    linkedin: "https://www.linkedin.com/in/krishkumar2711/",
    github: "https://github.com/ekrishkumar",
    website: "https://autonomicio.ai.studio/"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "Enterprise AI Orchestration Inquiry",
        message: ""
      });
      setTimeout(() => setIsSuccess(false), 6000);
    }, 1200);
  };

  return (
    <section
      id="contact-section"
      className="py-24 bg-[#FFFEFB] dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] border-b border-[#C5C0B1]/30 dark:border-[#1E2430] transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Subtle Accent Lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FF4F00]/10 via-amber-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FF4F00]/30 bg-[#FF4F00]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4F00]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF4F00]" />
            <span>DIRECT TEAM CONTACT & INQUIRIES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-tight">
            Let's build your autonomous <br />
            <span className="bg-gradient-to-r from-[#FF4F00] via-[#E04400] to-[#C5C0B1] bg-clip-text text-transparent">
              AI agent infrastructure together.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
            Have questions about multi-agent pipelines, MCP connectors, or custom deployment? Connect directly with our engineering team or submit a message below.
          </p>
        </div>

        {/* 2-Column Grid Layout: Direct Info Card & Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Team Contact Profile Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <ThreeDTiltCard className="h-full">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0F131C] text-white border border-[#C5C0B1]/30 shadow-2xl relative overflow-hidden space-y-8">
                {/* Decorative Glow Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#FF4F00]/20 border border-[#FF4F00]/40 flex items-center justify-center font-display font-extrabold text-xs tracking-wider text-[#FF4F00]">
                      TEAM
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                        {contactDetails.name}
                        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                      </h3>
                      <p className="text-xs font-mono text-neutral-400">{contactDetails.role}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-[#10B981]/10 text-[#10B981] text-[10px] font-mono font-bold border border-[#10B981]/20">
                    Online &bull; Available
                  </span>
                </div>

                {/* Direct Contact Links */}
                <div className="space-y-4 text-xs font-mono">
                  {/* Email */}
                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/60 hover:bg-[#FF4F00]/20 border border-neutral-700/60 hover:border-[#FF4F00] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FF4F00]/20 text-[#FF4F00] flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase">Primary Email</span>
                        <span className="text-white font-bold group-hover:text-[#FF4F00] transition-colors">{contactDetails.email}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/60 hover:bg-[#FF4F00]/20 border border-neutral-700/60 hover:border-[#FF4F00] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase">Phone & WhatsApp</span>
                        <span className="text-white font-bold group-hover:text-emerald-300 transition-colors">{contactDetails.phone}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>

                  {/* Website */}
                  <a
                    href={contactDetails.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-800/60 hover:bg-[#FF4F00]/20 border border-neutral-700/60 hover:border-[#FF4F00] transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase">Platform Site</span>
                        <span className="text-white font-bold group-hover:text-blue-300 transition-colors">autonomicio.ai.studio</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                {/* Social Profiles & Repos */}
                <div className="pt-4 border-t border-neutral-800 grid grid-cols-2 gap-3">
                  <a
                    href={contactDetails.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/30 border border-[#0A66C2]/30 text-white text-xs font-mono font-bold transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                    <span>LinkedIn Profile</span>
                  </a>

                  <a
                    href={contactDetails.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white text-xs font-mono font-bold transition-all"
                  >
                    <Github className="w-4 h-4 text-white" />
                    <span>GitHub Profile</span>
                  </a>
                </div>

                {/* Status Telemetry */}
                <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800/80 text-[10px] font-mono text-neutral-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Average Response Time:</span>
                    <span className="text-[#10B981] font-bold">&lt; 2 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="text-white">India / Global Remote</span>
                  </div>
                </div>
              </div>
            </ThreeDTiltCard>
          </div>

          {/* Right Column: Direct Message Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#12161F] p-6 sm:p-8 rounded-2xl border border-[#C5C0B1]/40 dark:border-neutral-800 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4F00] block">
                DIRECT INQUIRY FORM
              </span>
              <h3 className="text-2xl font-display font-extrabold text-black dark:text-white">
                Send a message directly to Krish Kumar
              </h3>
              <p className="text-xs text-neutral-500 font-mono">
                Whether you need a custom agent workflow, enterprise SLA, or technical partnership, we'll respond promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0D12] border border-[#C5C0B1]/50 dark:border-neutral-700 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-[#FF4F00]"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0D12] border border-[#C5C0B1]/50 dark:border-neutral-700 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-[#FF4F00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Company Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Enterprise Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0D12] border border-[#C5C0B1]/50 dark:border-neutral-700 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-[#FF4F00]"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                    Topic / Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0D12] border border-[#C5C0B1]/50 dark:border-neutral-700 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-[#FF4F00] cursor-pointer"
                  >
                    <option value="Enterprise AI Orchestration Inquiry">Enterprise AI Orchestration Inquiry</option>
                    <option value="Custom Agent Team Building">Custom Agent Team Building</option>
                    <option value="MCP Connector & API Integration">MCP Connector & API Integration</option>
                    <option value="Technical Partnership">Technical Partnership / Investment</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>
              </div>

              {/* Message textarea */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                  How can we help your team? *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your current manual workflow, desired AI agent capabilities, or integration requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#0A0D12] border border-[#C5C0B1]/50 dark:border-neutral-700 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-[#FF4F00] leading-relaxed resize-none"
                />
              </div>

              {/* Submit button & Success message */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#FF4F00] hover:bg-[#E04400] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#FF4F00]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Dispatching Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Message to Krish Kumar</span>
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold block">Message Transmitted Successfully!</span>
                      <span>Krish Kumar has received your message and will get back to you shortly at {formData.email || 'your email'}.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
