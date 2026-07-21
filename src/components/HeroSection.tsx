import React, { useState } from "react";
import { Star, BarChart3, Dumbbell, ShieldAlert, Rocket, Plus, Send, RefreshCw, Sparkles, CheckCircle2, Play, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeroSectionProps {
  attachedFiles: string[];
  setAttachedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  openAttachModal: () => void;
}

export default function HeroSection({
  attachedFiles,
  setAttachedFiles,
  openAttachModal,
}: HeroSectionProps) {
  const [promptInput, setPromptInput] = useState("Inbound ticket payload: System integration reporting timeout errors.");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Analyse");

  // Visual Node selection and detailed settings
  const [selectedNodeId, setSelectedNodeId] = useState<"trigger" | "agent" | "delivery">("agent");

  // Webhook trigger state
  const [webhookMethod, setWebhookMethod] = useState("POST");
  const [webhookAuth, setWebhookAuth] = useState("API Key (Bearer)");
  const [rateLimit, setRateLimit] = useState(true);

  // AI Agent parser state
  const [selectedModel, setSelectedModel] = useState("Gemini 3.5 Flash");
  const [agentTemperature, setAgentTemperature] = useState(0.7);
  const [systemPrompt, setSystemPrompt] = useState("Extract contact information and client requirements from unstructured emails.");

  // Delivery Hub state
  const [deliveryTarget, setDeliveryTarget] = useState("Slack Webhook");
  const [retryStrategy, setRetryStrategy] = useState("Exponential Backoff");
  const [alertOnError, setAlertOnError] = useState(true);

  const recipes = [
    {
      name: "Lead Qualification & Score",
      desc: "Qualify corporate leads & send Slack alerts",
      nodeId: "agent" as const,
      activeTab: "Analyse",
      trigger: { method: "POST", auth: "API Key (Bearer)", limit: true },
      agent: { model: "Gemini 3.5 Flash", temp: 0.5, prompt: "Verify if sender is enterprise lead, score interest scale 1-10, extract key requirements." },
      delivery: { target: "Slack Webhook", retry: "Exponential Backoff", alert: true }
    },
    {
      name: "Manual Vector Sync",
      desc: "Ingest PDF assets & synchronize Postgres pool",
      nodeId: "agent" as const,
      activeTab: "Train",
      trigger: { method: "POST", auth: "OAuth 2.0 Token", limit: false },
      agent: { model: "Gemini 3.5 Pro", temp: 0.2, prompt: "Parse raw training docs into structured JSON with vector embedding guidelines." },
      delivery: { target: "Postgres Vector Pool", retry: "Instant Retry (3x)", alert: true }
    },
    {
      name: "Security Guardrail Scanner",
      desc: "Audit inbound parameters for code injection",
      nodeId: "agent" as const,
      activeTab: "Testing",
      trigger: { method: "GET", auth: "None", limit: true },
      agent: { model: "Gemini 3.5 Flash", temp: 0.8, prompt: "Scan inputs against system policy checks. Flag suspicious tokens or prompt injects." },
      delivery: { target: "Email Automation Hub", retry: "Exponential Backoff", alert: false }
    },
    {
      name: "Continuous Webhook Syncer",
      desc: "Deploy webhook to listen & dispatch Slack logs",
      nodeId: "agent" as const,
      activeTab: "Deploy",
      trigger: { method: "POST", auth: "API Key (Bearer)", limit: true },
      agent: { model: "Gemini 3.5 Flash", temp: 0.3, prompt: "Automatically summarize webhook logs, extract system errors, formats as card." },
      delivery: { target: "Slack Webhook", retry: "Instant Retry (3x)", alert: true }
    }
  ];

  const tabConfig: Record<string, { prompts: string[]; placeholder: string }> = {
    Analyse: {
      prompts: [
        "Analyze this week's customer feedback metrics",
        "Generate data mapping for user sessions ledger",
        "Detect performance bottlenecks in current build",
        "Summarize support tickets from recent sprints"
      ],
      placeholder: "Describe the complex data or logs you want to analyze..."
    },
    Train: {
      prompts: [
        "Train onboarding model on user guide docs",
        "Fine-tune classifier on active feedback tickets",
        "Load workspace sprint logs into neural core",
        "Feed customer success guidelines to the assistant"
      ],
      placeholder: "Enter training objectives or specify assets to feed the model..."
    },
    Testing: {
      prompts: [
        "Run security verification and alignment checks",
        "Simulate 10k random concurrent client queries",
        "Check cryptographic audit certificate rules",
        "Verify system guardrails against prompt injection"
      ],
      placeholder: "Describe testing criteria or security guardrails to verify..."
    },
    Deploy: {
      prompts: [
        "Deploy fine-tuned workspace model to prod",
        "Integrate automated Slack update triggers",
        "Ship automated GitHub pull-request review sync",
        "Provision new sandbox model container instances"
      ],
      placeholder: "Describe the deployment target, active container, or integrations..."
    }
  };

  const currentConfig = tabConfig[activeTab] || tabConfig.Analyse;

  const triggerGeneration = async (customPayload?: string) => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const testPayload = customPayload || promptInput || "Simulate trigger ingestion payload";

    // Build highly detailed structured command summarizing selected node settings
    const compoundPrompt = `
[PIPELINE BLUEPRINT CONFIGURATION]
- WEBHOOK TRIGGER: Method [${webhookMethod}], Auth [${webhookAuth}], RateLimit [${rateLimit ? "ENABLED" : "DISABLED"}]
- AI AGENT PARSER: Model [${selectedModel}], Temperature [${agentTemperature}], Guidelines: "${systemPrompt}"
- DELIVERY HUB: Target Destination [${deliveryTarget}], Retry Mode [${retryStrategy}], AlertOnError [${alertOnError ? "YES" : "NO"}]

[TEST RUN PAYLOAD]
"${testPayload}"
`.trim();

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: compoundPrompt,
          tab: activeTab,
          files: attachedFiles
        })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the automated AI generator. Please try again.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResponse(data.text);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRecipeClick = (recipe: typeof recipes[0]) => {
    setWebhookMethod(recipe.trigger.method);
    setWebhookAuth(recipe.trigger.auth);
    setRateLimit(recipe.trigger.limit);
    setSelectedModel(recipe.agent.model);
    setAgentTemperature(recipe.agent.temp);
    setSystemPrompt(recipe.agent.prompt);
    setDeliveryTarget(recipe.delivery.target);
    setRetryStrategy(recipe.delivery.retry);
    setAlertOnError(recipe.delivery.alert);
    setSelectedNodeId(recipe.nodeId);
    setActiveTab(recipe.activeTab);

    // Contextual payload
    const payloads: Record<string, string> = {
      Analyse: "Inbound ticket payload: Customer service is down! Critical error on node_id 103.",
      Train: "Ingestion guidelines: Map training manuals and compliance sheets.",
      Testing: "Audit query: SELECT * FROM users; -- DROP TABLE users; CHECK_ALIGNMENT",
      Deploy: "Deploy log: Pipeline active, routing metrics to production server."
    };
    setPromptInput(payloads[recipe.activeTab] || "Default test payload active");

    setResponse(null);
    setError(null);
  };

  const handleSampleClick = (text: string) => {
    setPromptInput(text);
    triggerGeneration(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerGeneration(promptInput);
  };

  const tabs = [
    { label: "Analyse", icon: BarChart3, desc: "Process and map complex data automatically" },
    { label: "Train", icon: Dumbbell, desc: "Feed custom assets into your dedicated workspace model" },
    { label: "Testing", icon: ShieldAlert, desc: "Verify accuracy and guardrails against simulated runs" },
    { label: "Deploy", icon: Rocket, desc: "Ship polished models & automated integrations in 1-click" }
  ];

  return (
    <section id="hero-section" className="relative pt-16 pb-24 bg-[#F3F4F5] dark:bg-[#100C08] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#1C130E]/40 transition-colors duration-300 overflow-hidden">
      {/* Subtle Dotted Canvas Background overlay */}
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto text-center z-10">
        
        {/* Release Status Badge */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CA3F16]/20 bg-[#CA3F16]/5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#CA3F16]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CA3F16] animate-pulse" />
            <span>Autonomic I/O Pipeline Sandbox V2.0</span>
          </div>
        </div>
 
        {/* Brand Headline */}
        <div className="mb-8 max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-[1.12]">
            Engineering the <br />
            <span className="bg-gradient-to-r from-[#FF9408] via-[#CA3F16] to-[#95122C] bg-clip-text text-transparent">Autonomous Future.</span>
          </h1>
          
          {/* Elegant tagline matrix carousel strip */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider uppercase text-[#100C08]/50 dark:text-[#DBE0E1]/40 py-2">
            <span>Autonomy Through Intelligence</span>
            <span className="hidden sm:inline text-[#CA3F16] font-bold">&bull;</span>
            <span>Automate. Optimize. Evolve.</span>
            <span className="hidden sm:inline text-[#CA3F16] font-bold">&bull;</span>
            <span>Where Intelligence Becomes Autonomous</span>
          </div>

          <p className="max-w-2xl mx-auto text-[#100C08]/70 dark:text-[#DBE0E1]/70 text-sm font-light leading-relaxed">
            Autonomic IO is an AI technology company building intelligent automation systems that help businesses operate faster, smarter, and more efficiently through artificial intelligence, software engineering, and data-driven innovation.
          </p>
        </div>
 
        {/* Primary Action Button */}
        <div className="flex justify-center gap-4 mb-14">
          <button
            onClick={() => document.getElementById("prompt-form")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-md bg-[#CA3F16] hover:bg-[#95122C] text-white text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_14px_rgba(202,63,22,0.3)] cursor-pointer active:scale-95"
          >
            Launch Pipeline Sandbox &darr;
          </button>
          <button
            onClick={() => document.getElementById("overview-section")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-md border border-[#E2E8F0] dark:border-[#1C130E]/40 bg-white dark:bg-[#1C130E] hover:bg-neutral-50 dark:hover:bg-[#100C08] text-[#100C08] dark:text-[#DBE0E1] text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
          >
            Learn About Autonomic IO
          </button>
        </div>

        {/* Workflow Active Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12 max-w-xl mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                id={`hero-tab-${tab.label.toLowerCase()}`}
                onClick={() => {
                  setActiveTab(tab.label);
                  setResponse(null);
                  setError(null);
                  setPromptInput("");
                }}
                className={`flex items-center gap-2 px-4 py-2 border rounded-md text-[10px] uppercase tracking-wider font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-sunset-orange border-sunset-orange text-white shadow-[0_4px_12px_rgba(234,97,19,0.2)]"
                    : "bg-white dark:bg-[#181B22] border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D]/60 dark:text-[#E2E8F0]/60 hover:text-sunset-orange hover:border-sunset-orange/40"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Interactive Node-Canvas Layout Grid */}
        <div className="relative overflow-hidden min-h-[680px] lg:min-h-[640px] border border-[#E2E8F0] dark:border-[#453027]/40 bg-white dark:bg-[#12151C] shadow-lg rounded-xl flex flex-col justify-between p-6 sm:p-8">
          
          {/* Subtle connecting workflow pipelines SVG overlay - active only on desktops */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg className="w-full h-full">
              {/* Left Line */}
              <path
                d="M 160 120 Q 240 120, 310 200"
                fill="none"
                stroke={loading ? "#EA6113" : "currentColor"}
                strokeWidth="1.5"
                className={`text-neutral-200 dark:text-neutral-800 transition-colors duration-300 ${loading ? "stroke-dasharray-[6] animate-[dash_1s_linear_infinite]" : ""}`}
              />
              {/* Right Line */}
              <path
                d="M 520 200 Q 600 120, 680 120"
                fill="none"
                stroke={response ? "#EA6113" : "currentColor"}
                strokeWidth="1.5"
                className={`text-neutral-200 dark:text-neutral-800 transition-colors duration-300 ${loading ? "stroke-dasharray-[6] animate-[dash_1s_linear_infinite]" : ""}`}
              />
            </svg>
          </div>

          {/* Canvas Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 z-10 border-b border-[#E2E8F0] dark:border-[#453027]/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sunset-orange animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                ACTIVE PIPELINE: AUTONOMIC_AGENT_CLASSIFIER
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-sunset-orange bg-sunset-orange/10 border border-sunset-orange/20 rounded">
                Node Status: Active
              </span>
            </div>
          </div>

          {/* Interactive Workflow Canvas Nodes Representation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 items-center z-10">
            
            {/* NODE 1: Trigger (Webhook) */}
            <button
              type="button"
              onClick={() => setSelectedNodeId("trigger")}
              className={`p-4 rounded-lg text-left relative transition-all duration-300 cursor-pointer text-inherit ${
                selectedNodeId === "trigger"
                  ? "bg-white dark:bg-[#1a171d] border-2 border-sunset-orange shadow-[0_4px_16px_rgba(234,97,19,0.15)] scale-[1.02]"
                  : "bg-neutral-50 dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#453027]/40 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Connector ports */}
              <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded bg-sunset-orange/10 flex items-center justify-center text-sunset-orange">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">Webhook Trigger</h4>
                  <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">On Prompt Ingest</p>
                </div>
              </div>
              <p className="text-[10px] text-[#14161D]/70 dark:text-[#E2E8F0]/70 leading-normal font-sans">
                Listens to inbound customer intent, system logs, or customized actions.
              </p>
            </button>

            {/* NODE 2: Active AI Agent Parser */}
            <button
              type="button"
              onClick={() => setSelectedNodeId("agent")}
              className={`p-4 rounded-lg text-left relative transition-all duration-300 cursor-pointer text-inherit ${
                selectedNodeId === "agent"
                  ? "bg-white dark:bg-[#1a171d] border-2 border-sunset-orange shadow-[0_4px_16px_rgba(234,97,19,0.15)] scale-[1.02]"
                  : "bg-neutral-50 dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#453027]/40 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Connector ports */}
              <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded bg-sunset-orange/10 text-sunset-orange flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">AI Agent Parser</h4>
                  <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">{selectedModel}</p>
                </div>
              </div>
              <p className="text-[10px] text-[#14161D]/70 dark:text-[#E2E8F0]/70 leading-normal font-sans">
                Processes guidelines, maps assets, and generates contextual outputs instantly.
              </p>
            </button>

            {/* NODE 3: Action Delivery */}
            <button
              type="button"
              onClick={() => setSelectedNodeId("delivery")}
              className={`p-4 rounded-lg text-left relative transition-all duration-300 cursor-pointer text-inherit ${
                selectedNodeId === "delivery"
                  ? "bg-white dark:bg-[#1a171d] border-2 border-sunset-orange shadow-[0_4px_16px_rgba(234,97,19,0.15)] scale-[1.02]"
                  : "bg-neutral-50 dark:bg-[#181B22] border border-[#E2E8F0] dark:border-[#453027]/40 opacity-75 hover:opacity-100"
              }`}
            >
              {/* Connector ports */}
              <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#12151C] z-20" />
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-8 h-8 rounded bg-sunset-orange/10 flex items-center justify-center text-sunset-orange">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#14161D] dark:text-white">Delivery Hub</h4>
                  <p className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 font-mono">{deliveryTarget}</p>
                </div>
              </div>
              <p className="text-[10px] text-[#14161D]/70 dark:text-[#E2E8F0]/70 leading-normal font-sans">
                Sends automated Slack triggers, pushes commits to GitHub, or logs structured metrics.
              </p>
            </button>

          </div>

          {/* Middle Parameter & Output Panel Container */}
          <div className="max-w-2xl w-full mx-auto my-4 space-y-4 z-10">
            <AnimatePresence mode="wait">
              {/* Real-time Workspace Execution Output Panel */}
              {(loading || response || error) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="bg-neutral-50 dark:bg-[#181B22] p-5 text-left rounded-lg border border-[#E2E8F0] dark:border-[#453027]/40 max-h-56 overflow-y-auto shadow-sm"
                >
                  {loading && (
                    <div className="flex items-center gap-3 text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                      <RefreshCw className="w-4 h-4 animate-spin text-sunset-orange" />
                      <span className="text-[10px] uppercase tracking-wider font-bold font-mono">Executing Active Node Pipeline...</span>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400" />
                      {error}
                    </div>
                  )}

                  {response && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-sunset-orange">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-sunset-orange" />
                          Workspace Output Success
                        </span>
                        <span className="font-mono bg-sunset-orange/10 text-sunset-orange px-2 py-0.5 rounded">200 OK</span>
                      </div>
                      <div className="text-[#14161D] dark:text-[#E2E8F0]/90 text-xs leading-relaxed font-mono whitespace-pre-wrap p-3 bg-white dark:bg-[#161316] border border-[#E2E8F0] dark:border-[#453027]/40 rounded">
                        {response}
                      </div>
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => { setResponse(null); setPromptInput(""); }}
                          className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/50 hover:text-sunset-orange uppercase tracking-wider font-bold flex items-center gap-1 transition-colors"
                        >
                          &times; Clear Output
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulated n8n Node Settings Panel */}
            <form
              id="prompt-form"
              onSubmit={handleSubmit}
              className="bg-white dark:bg-[#181B22] p-5 shadow-md rounded-lg border border-[#E2E8F0] dark:border-[#453027]/40 flex flex-col gap-4 relative transition-all duration-300 focus-within:shadow-[0_4px_20px_rgba(234,97,19,0.08)] text-left"
            >
              {/* Inner Node Tab Bar */}
              <div className="flex items-center justify-between border-b border-[#E2E8F0]/80 dark:border-[#453027]/30 pb-3">
                <div className="flex gap-4 items-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-sunset-orange border-b-2 border-sunset-orange pb-1.5 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-sunset-orange" />
                    Node Property Inspector
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 uppercase font-bold">
                    {selectedNodeId === "trigger" ? "Webhook" : selectedNodeId === "agent" ? "AI Agent" : "Delivery"}
                  </span>
                </div>
                <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#14161D]/40 dark:text-[#E2E8F0]/40">
                  Tab: {activeTab}
                </div>
              </div>

              {/* Node-specific configurations */}
              {selectedNodeId === "trigger" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                        HTTP Request Method
                      </label>
                      <div className="flex gap-1.5">
                        {["POST", "GET", "PUT"].map((m) => (
                          <button
                            type="button"
                            key={m}
                            onClick={() => setWebhookMethod(m)}
                            className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                              webhookMethod === m
                                ? "bg-sunset-orange text-white"
                                : "bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D]/70 dark:text-[#E2E8F0]/70 hover:border-sunset-orange/30"
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                        Authentication Guard
                      </label>
                      <select
                        value={webhookAuth}
                        onChange={(e) => setWebhookAuth(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none cursor-pointer"
                      >
                        <option value="API Key (Bearer)">API Key (Bearer)</option>
                        <option value="OAuth 2.0 Token">OAuth 2.0 Token</option>
                        <option value="None">None (Public)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                        IP Rate Limiting
                      </span>
                      <button
                        type="button"
                        onClick={() => setRateLimit(!rateLimit)}
                        className="flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90 animate-none border-none bg-transparent p-0 outline-none"
                      >
                        {rateLimit ? (
                          <div className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase font-mono bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Enabled</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-neutral-400 font-bold text-[10px] uppercase font-mono bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                            <span>Disabled</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                      Sample Inbound Payload
                    </label>
                    <textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder="Specify raw JSON or query string to ingest..."
                      className="w-full h-[118px] p-2 text-xs font-mono rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {selectedNodeId === "agent" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                        Active Large Language Model
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none cursor-pointer"
                      >
                        <option value="Gemini 3.5 Flash">Gemini 3.5 Flash (Ultralight)</option>
                        <option value="Gemini 3.5 Pro">Gemini 3.5 Pro (Deep Reasoning)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                          Temperature (Randomness)
                        </label>
                        <span className="text-[10px] font-mono font-bold text-sunset-orange bg-sunset-orange/10 px-1.5 py-0.5 rounded">
                          {agentTemperature.toFixed(1)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="1.0"
                        step="0.1"
                        value={agentTemperature}
                        onChange={(e) => setAgentTemperature(parseFloat(e.target.value))}
                        className="w-full accent-sunset-orange cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-[#14161D]/40 dark:text-white/40 font-mono uppercase mt-1">
                        <span>Deterministic</span>
                        <span>Creative</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                        System Instructions & Guidelines
                      </label>
                      <textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        placeholder="e.g. Structure feedback logs, find sentiment, compile checklist..."
                        className="w-full h-[62px] p-2 text-xs rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1">
                        Ingest Test Payload
                      </label>
                      <input
                        type="text"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder={currentConfig.placeholder}
                        className="w-full p-2 text-xs rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedNodeId === "delivery" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                        Integration Target Destination
                      </label>
                      <select
                        value={deliveryTarget}
                        onChange={(e) => setDeliveryTarget(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none cursor-pointer"
                      >
                        <option value="Slack Webhook">Slack Webhook channel</option>
                        <option value="GitHub Commit Sync">GitHub Commit Review API</option>
                        <option value="Postgres Vector Pool">Postgres Vector Pool</option>
                        <option value="Email Automation Hub">Email Automation Hub</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1.5">
                        Retry Strategy
                      </label>
                      <select
                        value={retryStrategy}
                        onChange={(e) => setRetryStrategy(e.target.value)}
                        className="w-full text-xs p-2 rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none cursor-pointer"
                      >
                        <option value="Exponential Backoff">Exponential Backoff (recommeded)</option>
                        <option value="Instant Retry (3x)">Instant Retry (3x max)</option>
                        <option value="None">None (Fail immediately)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60">
                          Critical Alert Notifications
                        </span>
                        <span className="text-[9px] text-[#14161D]/40 dark:text-white/40">
                          Ping engineering channels on connection drops
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAlertOnError(!alertOnError)}
                        className="flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-90 animate-none border-none bg-transparent p-0 outline-none"
                      >
                        {alertOnError ? (
                          <div className="flex items-center gap-1 text-amber-600 font-bold text-[10px] uppercase font-mono bg-amber-50 dark:bg-amber-950/20 px-2 py-1 rounded border border-amber-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>ON ERROR</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-neutral-400 font-bold text-[10px] uppercase font-mono bg-neutral-50 dark:bg-neutral-900 px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                            <span>OFF</span>
                          </div>
                        )}
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#14161D]/60 dark:text-[#E2E8F0]/60 mb-1">
                        Input Payload Preview
                      </label>
                      <input
                        type="text"
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        placeholder="Type test payload data..."
                        className="w-full p-2 text-xs rounded bg-neutral-50 dark:bg-neutral-800 border border-[#E2E8F0] dark:border-[#453027]/40 text-[#14161D] dark:text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Live Attached Files display */}
              {attachedFiles.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-1 py-1 border-t border-[#E2E8F0]/40 dark:border-[#453027]/20 pt-2.5">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 bg-sunset-orange/5 text-[9px] uppercase tracking-wider font-bold text-sunset-orange border border-sunset-orange/15 rounded"
                    >
                      <span>{file}</span>
                      <button
                        type="button"
                        onClick={() => setAttachedFiles(attachedFiles.filter(f => f !== file))}
                        className="hover:text-red-500 font-bold ml-1 cursor-pointer bg-transparent border-none p-0"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Node Panel Footer controls */}
              <div className="flex items-center justify-between border-t border-[#E2E8F0]/80 dark:border-[#453027]/30 pt-3 mt-1">
                {/* File attachments */}
                <button
                  type="button"
                  onClick={openAttachModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-50 dark:bg-neutral-800/40 hover:bg-sunset-orange/5 dark:hover:bg-sunset-orange/10 border border-[#E2E8F0] dark:border-[#453027]/40 transition-colors text-[9px] uppercase tracking-wider font-bold text-[#14161D]/60 dark:text-[#E2E8F0]/60 hover:text-sunset-orange cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Attach Asset {attachedFiles.length > 0 ? `(${attachedFiles.length})` : ""}</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* Status node pill */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-sunset-orange/5 text-[9px] uppercase tracking-widest text-sunset-orange font-bold font-mono border border-sunset-orange/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-sunset-orange animate-pulse" />
                    <span>Blueprint Confirmed</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-md bg-sunset-orange hover:opacity-95 text-white flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shadow-[0_4px_12px_rgba(234,97,19,0.25)]"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Run Full Pipeline</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Bottom Suggestions and Caption */}
          <div className="w-full flex flex-col items-center gap-4 mt-6 border-t border-[#E2E8F0]/60 dark:border-[#453027]/30 pt-6">
            <div className="w-full max-w-3xl">
              <span className="block text-[10px] text-[#14161D]/50 dark:text-[#E2E8F0]/50 uppercase tracking-[0.2em] font-bold text-center mb-3">
                Or load pre-configured active pipeline blueprints
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {recipes.map((rec, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleRecipeClick(rec)}
                    className="flex flex-col text-left p-3 rounded-lg border border-[#E2E8F0] dark:border-[#453027]/40 bg-white dark:bg-[#181B22] hover:border-sunset-orange hover:bg-sunset-orange/[0.02] dark:hover:bg-sunset-orange/[0.04] transition-all cursor-pointer group"
                  >
                    <span className="text-[10px] font-bold text-[#14161D] dark:text-white group-hover:text-sunset-orange transition-colors line-clamp-1">
                      {rec.name}
                    </span>
                    <span className="text-[9px] text-[#14161D]/50 dark:text-[#E2E8F0]/40 mt-1 line-clamp-2 leading-relaxed">
                      {rec.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[#100C08]/40 dark:text-[#DBE0E1]/40 text-[9px] uppercase tracking-[0.2em] font-mono mt-2">
              Autonomic I/O Intelligent Sandbox Engine &bull; Self-Managing Computing Node
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
