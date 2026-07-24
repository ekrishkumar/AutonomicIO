import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ChevronDown,
  HelpCircle,
  Lock,
  Eye,
  Building2,
  FileText
} from "lucide-react";

export default function GovernanceMatrixSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const matrixRows = [
    {
      question: "Who manages agents day-to-day?",
      autonomic: "Domain experts & team leads in plain language",
      legacy: "Only senior software engineering teams",
      manual: "Individual human staff members"
    },
    {
      question: "Who owns agent quality & benchmarks?",
      autonomic: "Automated real-time evaluation gates & pass rates",
      legacy: "Manual ad-hoc spot checks",
      manual: "Human managers reviewing sample output"
    },
    {
      question: "How do agents receive & process tasks?",
      autonomic: "24/7 Webhooks, emails, CRM events, or chat triggers",
      legacy: "Manual copy-pasting into prompt boxes",
      manual: "Manual email inboxes & ticket queues"
    },
    {
      question: "How much can you tune performance?",
      autonomic: "Fine-tune prompts, vector memories, and model routing per node",
      legacy: "Fixed system prompts without memory context",
      manual: "Requires retraining employees"
    },
    {
      question: "How do you govern data & security?",
      autonomic: "SOC2 Type II, RBAC, encrypted vector vaults, zero model training on data",
      legacy: "Unknown model logging policies",
      manual: "Human privacy risk"
    }
  ];

  const faqs = [
    {
      q: "Does Autonomic IO train AI models on our proprietary business data?",
      a: "No. Never. Your data is isolated inside your private enterprise tenant. Model providers (Google Gemini, Anthropic, OpenAI) are accessed via zero-data-retention enterprise APIs."
    },
    {
      q: "How fast can our team deploy our first AI agent pipeline?",
      a: "Most teams deploy their first fully autonomous agent pipeline in 2 to 3 weeks using our pre-built recipe templates and MCP connector framework."
    },
    {
      q: "Can we run agents on our own private VPC or local infrastructure?",
      a: "Yes. Autonomic IO supports hybrid cloud deployments, dedicated private tenant containers, and local node connections for strict compliance standards."
    },
    {
      q: "What happens if an agent fails an evaluation benchmark?",
      a: "The agent instantly triggers an automated human-in-the-loop review gate, preventing unverified actions from executing until reviewed by a team manager."
    }
  ];

  return (
    <section id="governance-matrix-section" className="py-20 bg-white dark:bg-[#0A0D12] text-[#100C08] dark:text-[#DBE0E1] border-b border-neutral-200 dark:border-[#1E2430] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#10B981]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span>ENTERPRISE GOVERNANCE MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-tight">
            Why leading enterprises choose <br />
            <span className="bg-gradient-to-r from-[#FF9408] via-[#CA3F16] to-[#95122C] bg-clip-text text-transparent">
              Autonomic IO over legacy AI tools.
            </span>
          </h2>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#12161F] p-4 sm:p-6 shadow-sm">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase text-[10px] tracking-wider">
                <th className="pb-4 w-1/3">Core Capability</th>
                <th className="pb-4 text-[#CA3F16] font-bold">Autonomic IO Platform</th>
                <th className="pb-4">Single Model Chatbot</th>
                <th className="pb-4">Manual Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/60">
              {matrixRows.map((row) => (
                <tr key={row.question} className="hover:bg-neutral-100 dark:hover:bg-[#181D28] transition-colors">
                  <td className="py-4 font-bold text-black dark:text-white pr-4">
                    {row.question}
                  </td>
                  <td className="py-4 font-bold text-[#10B981] pr-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{row.autonomic}</span>
                  </td>
                  <td className="py-4 text-neutral-500 pr-4">
                    {row.legacy}
                  </td>
                  <td className="py-4 text-neutral-500 pr-4">
                    {row.manual}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Enterprise FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-6 pt-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-display font-extrabold text-black dark:text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-neutral-500 font-mono">
              Everything you need to know about enterprise deployment, privacy, and SLA guarantees.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#12161F] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-mono text-sm font-bold text-black dark:text-white cursor-pointer hover:text-[#CA3F16] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#CA3F16] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs font-sans text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
