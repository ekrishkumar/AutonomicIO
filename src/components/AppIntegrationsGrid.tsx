import React, { useState } from "react";
import {
  Search,
  Layers,
  Slack,
  Github,
  Mail,
  Globe,
  Database,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Plus,
  ArrowRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import ThreeDTiltCard from "./ThreeDTiltCard";

export default function AppIntegrationsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Sales & CRM",
    "Customer Success",
    "Engineering & DevOps",
    "Data & Analytics",
    "HR & Operations"
  ];

  const apps = [
    { name: "Salesforce Enterprise", category: "Sales & CRM", desc: "Sync contacts, leads, accounts, and automated pipeline status.", badge: "MCP Enabled", color: "#00A1E0" },
    { name: "HubSpot CRM", category: "Sales & CRM", desc: "Automate inbound lead qualification and custom email deal sequences.", badge: "OAuth 2.0", color: "#FF7A59" },
    { name: "Slack Workspace", category: "Customer Success", desc: "Dispatch real-time agent alerts, approval requests, and thread summaries.", badge: "Webhook", color: "#4A154B" },
    { name: "Gmail & Google Workspace", category: "Customer Success", desc: "Automate calendar invites, email parsing, and document summaries.", badge: "Workspace API", color: "#EA4335" },
    { name: "GitHub & Enterprise Server", category: "Engineering & DevOps", desc: "Auto-review pull requests, triage issues, and trigger CI/CD pipelines.", badge: "GitHub App", color: "#24292E" },
    { name: "Jira Software", category: "Engineering & DevOps", desc: "Generate sprint tickets, summarize incident reports, and assign tasks.", badge: "REST API", color: "#0052CC" },
    { name: "Zendesk Support", category: "Customer Success", desc: "Resolve Tier 1-2 tickets automatically with high-accuracy RAG.", badge: "MCP Connector", color: "#03363D" },
    { name: "Snowflake Data Cloud", category: "Data & Analytics", desc: "Query data warehouses in natural language and format executive decks.", badge: "SQL Native", color: "#29B5E8" },
    { name: "Databricks Lakehouse", category: "Data & Analytics", desc: "Ingest structured datasets into vector embeddings and agent memory.", badge: "Spark Sync", color: "#FF3621" },
    { name: "PostgreSQL & PgVector", category: "Data & Analytics", desc: "Store long-term agent memory vectors and transactional audit logs.", badge: "Vector DB", color: "#336791" },
    { name: "Microsoft Entra ID", category: "HR & Operations", desc: "Automate employee onboarding, permissions, and credential rotation.", badge: "OAuth 2.0", color: "#0078D4" },
    { name: "Notion Enterprise", category: "HR & Operations", desc: "Sync internal documentation, wikis, and SOP knowledge bases.", badge: "Notion API", color: "#000000" }
  ];

  const filteredApps = apps.filter((app) => {
    const matchesCategory = activeCategory === "All" || app.category === activeCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="integrations-grid-section" className="py-20 bg-[#F9FAFB] dark:bg-[#0E1117] text-[#100C08] dark:text-[#DBE0E1] border-b border-neutral-200 dark:border-[#1E2430] transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CA3F16]/30 bg-[#CA3F16]/10 text-[10px] font-mono font-bold uppercase tracking-wider text-[#CA3F16]">
            <Globe className="w-3.5 h-3.5 text-[#CA3F16]" />
            <span>UNIVERSAL ECOSYSTEM INTEGRATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-tight">
            Connect your agents to <br />
            <span className="bg-gradient-to-r from-[#FF9408] via-[#CA3F16] to-[#95122C] bg-clip-text text-transparent">
              1,000+ apps & internal databases.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
            Agents connect effortlessly using standard OAuth 2.0, webhooks, REST APIs, or Model Context Protocol (MCP) servers with zero complex code required.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 bg-neutral-200/60 dark:bg-[#151922] p-1.5 rounded-xl border border-neutral-300 dark:border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#CA3F16] text-white shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 1,000+ apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#12161F] border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-black dark:text-white focus:outline-none focus:border-[#CA3F16]"
            />
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredApps.map((app) => (
            <ThreeDTiltCard key={app.name} className="h-full">
              <div className="p-5 rounded-xl bg-white dark:bg-[#12161F] border border-neutral-200 dark:border-neutral-800/80 shadow-sm hover:border-[#CA3F16]/50 transition-all h-full flex flex-col justify-between space-y-4 group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-black dark:text-white font-mono">
                      {app.name[0]}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold font-mono text-black dark:text-white group-hover:text-[#CA3F16] transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-sans">
                    {app.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-400">{app.category}</span>
                  <span className="text-[#CA3F16] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Connect Tool &rarr;
                  </span>
                </div>
              </div>
            </ThreeDTiltCard>
          ))}
        </div>

        {/* Custom Connector Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#100C08] to-[#1C130E] text-white border border-[#CA3F16]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-base font-bold font-mono flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF9408]" />
              Need a custom internal API or private database connector?
            </h4>
            <p className="text-xs text-neutral-400 font-mono">
              Build custom Model Context Protocol (MCP) servers or connect REST endpoints in under 5 minutes.
            </p>
          </div>
          <button
            onClick={() => document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-5 py-2.5 rounded-lg bg-[#CA3F16] hover:bg-[#95122C] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md shadow-[#CA3F16]/30 whitespace-nowrap cursor-pointer"
          >
            Create Custom Connector &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
