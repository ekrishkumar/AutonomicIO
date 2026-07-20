import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Play,
  Check,
  Plus,
  RefreshCw,
  ChevronRight,
  Settings,
  Trash2,
  Database,
  Cpu,
  Slack,
  Github,
  AlertTriangle,
  Layers,
  Activity,
  MessageSquare,
  HelpCircle,
  FolderOpen,
  GitBranch,
  Terminal,
  Code,
  CheckCircle,
  FileText,
  UserCheck,
  UserPlus,
  Mail,
  Zap,
  Globe,
  Briefcase
} from "lucide-react";

// Types for customizable preset schemas
interface NodeConfig {
  id: string;
  name: string;
  type: string;
  icon: any;
  desc?: string;
  color: string;
  fields?: { label: string; value: string; type: "text" | "select"; options?: string[] }[];
}

interface WorkflowPreset {
  tabTitle: string;
  tabSub: string;
  icon: any;
  triggerNode: NodeConfig;
  agentNode: NodeConfig & {
    model: string;
    memory: string;
    tools: { name: string; icon: any; category: string }[];
  };
  routerNode: NodeConfig & {
    condition: string;
    trueBranchLabel: string;
    falseBranchLabel: string;
  };
  trueNode: NodeConfig;
  falseNode: NodeConfig;
  simulationSteps: {
    nodeId: string;
    log: string;
    duration: number;
  }[];
}

export default function InteractiveWorkflow() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [simLog, setSimLog] = useState<string[]>([]);
  
  // Customization parameters & editor modal drawer state
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    name: string;
    nodeType: "trigger" | "agent" | "router" | "true" | "false";
  } | null>(null);

  // Define standard available values for customizable dropdowns
  const availableModels = [
    "Gemini 2.5 Flash (Default)",
    "Gemini 2.5 Pro (High Intelligence)",
    "Claude 3.5 Sonnet (Agentic)",
    "GPT-4o (Standard)",
    "DeepSeek-V3 (Low Latency)",
    "Llama 3.3 (Local Node)"
  ];

  const availableMemories = [
    "PostgreSQL Vector Ledger",
    "Redis Cache Stream",
    "Upstash Serverless Memory",
    "Stateless Ephemeral Session",
    "Chroma Document DB"
  ];

  const allAvailableTools = [
    { name: "Jira Software", icon: Layers, category: "issue_tracker" },
    { name: "Microsoft Entra ID", icon: ShieldCheckIcon, category: "auth" },
    { name: "GitHub Repository", icon: Github, category: "vcs" },
    { name: "Google Calendar", icon: Globe, category: "scheduler" },
    { name: "HubSpot CRM", icon: Briefcase, category: "crm" },
    { name: "Gmail SMTP", icon: Mail, category: "email" },
    { name: "Slack Channel Notify", icon: Slack, category: "im" }
  ];

  function ShieldCheckIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={props.className}
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11 2 2 4-4" />
      </svg>
    );
  }

  // Define our 5 visual interactive presets
  const [presets, setPresets] = useState<WorkflowPreset[]>([
    {
      tabTitle: "IT Ops can",
      tabSub: "On-board new employees",
      icon: UserCheck,
      triggerNode: {
        id: "trig-it",
        name: "On 'Create User' Form",
        type: "Webhook Trigger",
        icon: FileText,
        color: "#FF6D29",
        desc: "Activated via Employee Intake Form Submission",
        fields: [
          { label: "Trigger Endpoint", value: "/webhooks/employees/new", type: "text" },
          { label: "Auth Key Type", value: "Secret Signature Bearer", type: "text" }
        ]
      },
      agentNode: {
        id: "agent-it",
        name: "AI Agent Coordinator",
        type: "Tools Agent",
        icon: Cpu,
        color: "#FF6D29",
        desc: "Allocates enterprise accounts & sets permission scopes",
        model: "Claude 3.5 Sonnet (Agentic)",
        memory: "PostgreSQL Vector Ledger",
        tools: [
          { name: "Microsoft Entra ID", icon: ShieldCheckIcon, category: "auth" },
          { name: "Jira Software", icon: Layers, category: "issue_tracker" }
        ],
        fields: [
          { label: "Agent Instructions", value: "Review applicant record, create AD security credentials, provision matching ticket.", type: "text" }
        ]
      },
      routerNode: {
        id: "router-it",
        name: "Is a manager?",
        type: "Conditional Node",
        icon: GitBranch,
        color: "#7C8BA1",
        desc: "Evaluates standard corporate ladder metadata",
        condition: "json.role === 'manager'",
        trueBranchLabel: "true",
        falseBranchLabel: "false"
      },
      trueNode: {
        id: "true-it",
        name: "Slack #leadership-welcome",
        type: "Slack Integration",
        icon: Slack,
        color: "#E05A1B",
        desc: "Alert leadership channel of executive onboarding"
      },
      falseNode: {
        id: "false-it",
        name: "Slack #team-welcome",
        type: "Slack Integration",
        icon: Slack,
        color: "#E05A1B",
        desc: "Publish warm welcome message to core group"
      },
      simulationSteps: [
        { nodeId: "trig-it", log: "📥 Intake Form Submission received for Jane Doe (Marketing Director)", duration: 1200 },
        { nodeId: "agent-it", log: "🧠 AI Agent activated with Claude 3.5 Sonnet. Scanning tools...", duration: 1500 },
        { nodeId: "agent-it", log: "🛡️ Invoking Microsoft Entra ID API: Created AD credential 'jane.doe@company.com'", duration: 1300 },
        { nodeId: "agent-it", log: "📂 Invoking Jira: Provisioned task ticket 'OPS-4421: Set up workstation'", duration: 1200 },
        { nodeId: "router-it", log: "🔄 Branch Router: Checking metadata: Role 'Director' inherits Manager hierarchy [TRUE]", duration: 1000 },
        { nodeId: "true-it", log: "🚀 Slack channel notified (#leadership-welcome): New director onboarding. Status: 200 OK", duration: 1400 }
      ]
    },
    {
      tabTitle: "Sec Ops can",
      tabSub: "Enrich incident tickets",
      icon: ShieldCheckIcon,
      triggerNode: {
        id: "trig-sec",
        name: "Cloudflare Threat Alert",
        type: "Webhook Trigger",
        icon: Zap,
        color: "#FF6D29",
        desc: "Dispatched upon firewall rule breaches & high-volume scans",
        fields: [
          { label: "Trigger Endpoint", value: "/webhooks/cloudflare/threat", type: "text" },
          { label: "Max Request Burst", value: "200 / second", type: "text" }
        ]
      },
      agentNode: {
        id: "agent-sec",
        name: "Threat Enricher Agent",
        type: "Analysis Agent",
        icon: Cpu,
        color: "#FF6D29",
        desc: "Examines security vectors, IP ratings, & GitHub repositories",
        model: "Gemini 2.5 Pro (High Intelligence)",
        memory: "Stateless Ephemeral Session",
        tools: [
          { name: "Jira Software", icon: Layers, category: "issue_tracker" },
          { name: "GitHub Repository", icon: Github, category: "vcs" }
        ],
        fields: [
          { label: "Audit Prompt Template", value: "Analyze incoming malicious traffic source, lookup open CVE records, compile risk scorecard.", type: "text" }
        ]
      },
      routerNode: {
        id: "router-sec",
        name: "Threat score > 8.5?",
        type: "Conditional Node",
        icon: GitBranch,
        color: "#7C8BA1",
        desc: "Compares cumulative threat risk metrics",
        condition: "json.threatScore > 8.5",
        trueBranchLabel: "true",
        falseBranchLabel: "false"
      },
      trueNode: {
        id: "true-sec",
        name: "GitHub Lockdown API",
        type: "GitHub Integration",
        icon: Github,
        color: "#161316",
        desc: "Revoke API access tokens and lock master repository branches"
      },
      falseNode: {
        id: "false-sec",
        name: "Slack #security-log",
        type: "Slack Integration",
        icon: Slack,
        color: "#E05A1B",
        desc: "Record safe audit log for retrospective study"
      },
      simulationSteps: [
        { nodeId: "trig-sec", log: "⚠️ Cloudflare Webhook: Incoming payload flagged IP 185.122.14.89", duration: 1100 },
        { nodeId: "agent-sec", log: "🧠 Gemini 2.5 Pro searching threat metrics database...", duration: 1600 },
        { nodeId: "agent-sec", log: "🔍 IP rating lookup score: 9.1 (Active malicious Botnet cluster)", duration: 1300 },
        { nodeId: "router-sec", log: "🔄 Evaluated Threat score 9.1 > 8.5 target. Condition is [TRUE]", duration: 1000 },
        { nodeId: "true-sec", log: "🔒 Executed GitHub Lockdown: Temporarily frozen master repo push permissions. Status: 200 OK", duration: 1500 }
      ]
    },
    {
      tabTitle: "Dev Ops can",
      tabSub: "Translate text to API calls",
      icon: Code,
      triggerNode: {
        id: "trig-dev",
        name: "Slack Intake Prompt",
        type: "Chatbot Listener",
        icon: MessageSquare,
        color: "#FF6D29",
        desc: "Listens for custom chat triggers in #developer-tools",
        fields: [
          { label: "Target Channel", value: "developer-tools-sandbox", type: "text" },
          { label: "Prefix Constraint", value: "/run-atelier", type: "text" }
        ]
      },
      agentNode: {
        id: "agent-dev",
        name: "Schema Generator Agent",
        type: "Code Assistant",
        icon: Cpu,
        color: "#FF6D29",
        desc: "Interprets natural language prompts and generates structured API requests",
        model: "Gemini 2.5 Flash (Default)",
        memory: "Redis Cache Stream",
        tools: [
          { name: "GitHub Repository", icon: Github, category: "vcs" },
          { name: "Jira Software", icon: Layers, category: "issue_tracker" }
        ],
        fields: [
          { label: "Execution Sandbox", value: "Isolated Docker Node (v18-lts)", type: "text" }
        ]
      },
      routerNode: {
        id: "router-dev",
        name: "Code validates?",
        type: "Conditional Node",
        icon: GitBranch,
        color: "#7C8BA1",
        desc: "Performs strict JSON-schema validation tests",
        condition: "json.validation === 'passed'",
        trueBranchLabel: "true",
        falseBranchLabel: "false"
      },
      trueNode: {
        id: "true-dev",
        name: "Jira Spawn Ticket",
        type: "Jira Integration",
        icon: Layers,
        color: "#0B4C8C",
        desc: "Creates production issue on board with structured parameters"
      },
      falseNode: {
        id: "false-dev",
        name: "Slack Post Error Log",
        type: "Slack Integration",
        icon: Slack,
        color: "#E05A1B",
        desc: "Send trace warning back to the original developer"
      },
      simulationSteps: [
        { nodeId: "trig-dev", log: "💬 Slack Message: '/run-atelier Create a high-priority bug for DB lag'", duration: 1200 },
        { nodeId: "agent-dev", log: "🧠 AI Agent: Parsing prompt with Gemini 2.5 Flash...", duration: 1400 },
        { nodeId: "agent-dev", log: "🛠️ Structuring request variables: Severity: High, Target: DB Cluster 0", duration: 1100 },
        { nodeId: "router-dev", log: "🔄 Validating payload against Schema... Result: Passed [TRUE]", duration: 900 },
        { nodeId: "true-dev", log: "🎫 Created Jira Issue (JIRA-8012: Database replication lag resolved). Status: 201 Created", duration: 1500 }
      ]
    },
    {
      tabTitle: "Sales can",
      tabSub: "Generate customer insights",
      icon: Briefcase,
      triggerNode: {
        id: "trig-sales",
        name: "NPS Review Submitted",
        type: "Webhook Trigger",
        icon: FileText,
        color: "#FF6D29",
        desc: "Fires instantly when a user submits a review or score",
        fields: [
          { label: "Trigger Endpoint", value: "/webhooks/surveys/nps", type: "text" }
        ]
      },
      agentNode: {
        id: "agent-sales",
        name: "Sentiment Analyzer Agent",
        type: "Insights Agent",
        icon: Cpu,
        color: "#FF6D29",
        desc: "Extracts primary emotional keywords and tags user profile in CRM",
        model: "DeepSeek-V3 (Low Latency)",
        memory: "Upstash Serverless Memory",
        tools: [
          { name: "HubSpot CRM", icon: Briefcase, category: "crm" },
          { name: "Google Calendar", icon: Globe, category: "scheduler" }
        ],
        fields: [
          { label: "CRM Workspace Key", value: "HS-CRM-PROD-90", type: "text" }
        ]
      },
      routerNode: {
        id: "router-sales",
        name: "Sentiment positive?",
        type: "Conditional Node",
        icon: GitBranch,
        color: "#7C8BA1",
        desc: "Classifies tone of response as friendly/happy vs upset",
        condition: "json.sentiment === 'positive'",
        trueBranchLabel: "true",
        falseBranchLabel: "false"
      },
      trueNode: {
        id: "true-sales",
        name: "Slack #sales-wins",
        type: "Slack Integration",
        icon: Slack,
        color: "#E05A1B",
        desc: "Share high praise in general public team updates"
      },
      falseNode: {
        id: "false-sales",
        name: "Google Call Scheduler",
        type: "Calendar Integration",
        icon: Globe,
        color: "#1E88E5",
        desc: "Auto-reserve a support slot on Google Calendar to call customer back"
      },
      simulationSteps: [
        { nodeId: "trig-sales", log: "📥 Intake NPS survey feedback from client 'The API setup is too complex, I need help'", duration: 1200 },
        { nodeId: "agent-sales", log: "🧠 AI Agent with DeepSeek-V3 categorizing sentiment...", duration: 1300 },
        { nodeId: "agent-sales", log: "📊 Identified NPS Score: 3. Tone flag: Frustrated. Category: API_ISSUES", duration: 1100 },
        { nodeId: "router-sales", log: "🔄 Evaluating sentiment parameter positive === true... Result: [FALSE]", duration: 1000 },
        { nodeId: "false-sales", log: "📅 Scheduled Google Calendar callback session with Support Lead inside client account. Status: 200 OK", duration: 1500 }
      ]
    },
    {
      tabTitle: "You can",
      tabSub: "Custom Workspace Canvas",
      icon: Sparkles,
      triggerNode: {
        id: "trig-custom",
        name: "Custom Webhook Trigger",
        type: "Webhook Trigger",
        icon: Zap,
        color: "#FF6D29",
        desc: "Your custom incoming operational endpoint",
        fields: [
          { label: "Webhook Endpoint", value: "/webhooks/custom-sandbox", type: "text" },
          { label: "HTTP Method", value: "POST", type: "text" }
        ]
      },
      agentNode: {
        id: "agent-custom",
        name: "My Custom AI Brain",
        type: "Tools Agent",
        icon: Cpu,
        color: "#FF6D29",
        desc: "Highly customisable server-side decision maker node",
        model: "Gemini 2.5 Flash (Default)",
        memory: "PostgreSQL Vector Ledger",
        tools: [
          { name: "Jira Software", icon: Layers, category: "issue_tracker" },
          { name: "Slack Channel Notify", icon: Slack, category: "im" }
        ],
        fields: [
          { label: "Instruction Prompt", value: "You are a friendly workspace moderator. Parse incoming text and execute downstream tools.", type: "text" }
        ]
      },
      routerNode: {
        id: "router-custom",
        name: "Route to True node?",
        type: "Conditional Node",
        icon: GitBranch,
        color: "#7C8BA1",
        desc: "Custom boolean decision matrix",
        condition: "json.decision === true",
        trueBranchLabel: "true",
        falseBranchLabel: "false"
      },
      trueNode: {
        id: "true-custom",
        name: "Primary Route Action",
        type: "Custom Output Node",
        icon: Slack,
        color: "#E05A1B",
        desc: "Success endpoint for custom workflow routes"
      },
      falseNode: {
        id: "false-custom",
        name: "Secondary Route Action",
        type: "Custom Output Node",
        icon: Github,
        color: "#161316",
        desc: "Fallback endpoint for rejected custom decisions"
      },
      simulationSteps: [
        { nodeId: "trig-custom", log: "🚀 Webhook Triggered with custom parameters", duration: 1000 },
        { nodeId: "agent-custom", log: "🧠 Running customizable server-side LLM sequence...", duration: 1500 },
        { nodeId: "agent-custom", log: "📡 Processing with integrated active tools", duration: 1200 },
        { nodeId: "router-custom", log: "🔄 Evaluating custom condition expression...", duration: 1100 },
        { nodeId: "true-custom", log: "🎉 Executed user's customized True flow safely! Status: 200 OK", duration: 1400 }
      ]
    }
  ]);

  // Handle playing simulation
  const handlePlaySimulation = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentStep(0);
    setSimLog([]);

    const steps = presets[activeTab].simulationSteps;
    let stepIndex = 0;

    const executeNextStep = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        setSimLog((prev) => [...prev, steps[stepIndex].log]);
        
        setTimeout(() => {
          stepIndex++;
          executeNextStep();
        }, steps[stepIndex].duration);
      } else {
        setTimeout(() => {
          setIsPlaying(false);
          setCurrentStep(-1);
        }, 1200);
      }
    };

    executeNextStep();
  };

  // Node customization updates
  const handleUpdateAgentConfig = (model: string, memory: string) => {
    setPresets((prev) => {
      const updated = [...prev];
      updated[activeTab].agentNode.model = model;
      updated[activeTab].agentNode.memory = memory;
      
      // Update corresponding log step text slightly to reflect the new customized parameters!
      const currentSteps = [...updated[activeTab].simulationSteps];
      currentSteps.forEach((step, idx) => {
        if (step.nodeId === `agent-${updated[activeTab].tabTitle.toLowerCase().split(" ")[0]}`) {
          if (step.log.includes("LLM") || step.log.includes("Gemini") || step.log.includes("Claude") || step.log.includes("AI Agent")) {
            currentSteps[idx].log = `🧠 Active node customized: Running with ${model} and ${memory}.`;
          }
        }
      });
      updated[activeTab].simulationSteps = currentSteps;
      return updated;
    });
  };

  const handleUpdateRouterCondition = (condName: string, condText: string) => {
    setPresets((prev) => {
      const updated = [...prev];
      updated[activeTab].routerNode.name = condName;
      updated[activeTab].routerNode.condition = condText;
      return updated;
    });
  };

  const handleUpdateNodeName = (nodeType: "trigger" | "agent" | "router" | "true" | "false", newName: string) => {
    setPresets((prev) => {
      const updated = [...prev];
      if (nodeType === "trigger") updated[activeTab].triggerNode.name = newName;
      else if (nodeType === "agent") updated[activeTab].agentNode.name = newName;
      else if (nodeType === "router") updated[activeTab].routerNode.name = newName;
      else if (nodeType === "true") updated[activeTab].trueNode.name = newName;
      else if (nodeType === "false") updated[activeTab].falseNode.name = newName;
      return updated;
    });
  };

  const handleAddTool = (tool: { name: string; icon: any; category: string }) => {
    setPresets((prev) => {
      const updated = [...prev];
      const tools = updated[activeTab].agentNode.tools;
      if (tools.length < 4 && !tools.some(t => t.name === tool.name)) {
        updated[activeTab].agentNode.tools = [...tools, tool];
      }
      return updated;
    });
  };

  const handleRemoveTool = (toolName: string) => {
    setPresets((prev) => {
      const updated = [...prev];
      updated[activeTab].agentNode.tools = updated[activeTab].agentNode.tools.filter(t => t.name !== toolName);
      return updated;
    });
  };

  const currentPreset = presets[activeTab];

  // Helper check for active state in animation loop
  const isNodeActive = (nodeId: string) => {
    if (!isPlaying || currentStep === -1) return false;
    return currentPreset.simulationSteps[currentStep].nodeId === nodeId;
  };

  return (
    <section id="interactive-workflow-section" className="py-24 px-6 sm:px-10 lg:px-12 bg-[#FAFAFC] dark:bg-[#121012] border-b border-[#E2E8F0] dark:border-[#453027]/40 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-sunset-orange/20 bg-sunset-orange/5 text-[10px] font-mono font-bold uppercase tracking-wider text-sunset-orange">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Node Sandbox</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#14161D] dark:text-white leading-tight">
            Click & customize active pipelines
          </h2>
          <p className="text-sm font-light text-[#14161D]/60 dark:text-[#BABABA]/60 max-w-xl mx-auto">
            Interact with live workflows just like on the native n8n web app. Click any node to customize variables, tweak prompt properties, or add connected integration tools!
          </p>
        </div>

        {/* Master Container resembling n8n dark canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-[#161316] border border-[#E2E8F0] dark:border-[#453027]/40 rounded-xl overflow-hidden shadow-2xl min-h-[640px] relative">
          
          {/* LEFT SIDEBAR: Clickable Use-case tabs (Col-span 4) */}
          <div className="lg:col-span-3 border-r border-[#E2E8F0] dark:border-[#453027]/40 bg-[#FAFAFC] dark:bg-[#141214] flex flex-col justify-between">
            <div className="p-4 space-y-2">
              <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40 dark:text-[#BABABA]/40 px-3 pb-3 border-b border-black/5 dark:border-[#453027]/20">
                Workflow Presets
              </div>
              
              <div className="space-y-1.5 pt-2">
                {presets.map((preset, index) => {
                  const IconComponent = preset.icon;
                  const isActive = activeTab === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTab(index);
                        setIsPlaying(false);
                        setCurrentStep(-1);
                        setSimLog([]);
                        setSelectedNode(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-lg border transition-all duration-300 relative group flex items-start gap-3.5 ${
                        isActive
                          ? "bg-white dark:bg-[#1C181C] border-sunset-orange/40 dark:border-sunset-orange/40 shadow-sm"
                          : "bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Left side indicator colored bar */}
                      {isActive && (
                        <div className="absolute left-0 top-3 bottom-3 w-1 bg-sunset-orange rounded-r-full" />
                      )}
                      
                      <div className={`p-2 rounded-md ${isActive ? "bg-sunset-orange/10 text-sunset-orange" : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-[#BABABA]/40 group-hover:text-sunset-orange"}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#14161D] dark:text-white">
                          {preset.tabTitle}
                        </div>
                        <div className="text-[10px] text-black/50 dark:text-[#BABABA]/50 mt-0.5 truncate font-mono">
                          {preset.tabSub}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Run Button Panel at Bottom of sidebar */}
            <div className="p-4 bg-white dark:bg-[#161316] border-t border-[#E2E8F0] dark:border-[#453027]/40 space-y-3">
              <button
                onClick={handlePlaySimulation}
                disabled={isPlaying}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-sunset-orange via-sunset-mid to-sunset-gold hover:opacity-95 text-white flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-bold transition-all disabled:opacity-40 cursor-pointer shadow-[0_4px_14px_rgba(234,97,19,0.35)] active:scale-98"
              >
                {isPlaying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Model...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Run Test Pipeline</span>
                  </>
                )}
              </button>

              <div className="text-[9px] uppercase tracking-wider text-black/40 dark:text-[#BABABA]/40 text-center font-mono">
                Click any Node block to edit config
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive SVG Workflow Canvas (Col-span 9) */}
          <div className="lg:col-span-9 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden bg-[#FAFAFC] dark:bg-[#121012] min-h-[500px]">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.2px,transparent_1.2px)] dark:bg-[radial-gradient(#302824_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none opacity-80" />
            
            {/* CANVAS INTERFACE */}
            <div className="relative flex-1 flex flex-col items-center justify-center z-10 w-full">
              
              {/* Dynamic SVG Connection paths drawing lines between the nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
                {/* Connection 1: Trigger -> Agent */}
                <path
                  d="M 175 180 Q 250 180, 270 180"
                  fill="none"
                  stroke={isNodeActive(currentPreset.triggerNode.id) || isNodeActive(currentPreset.agentNode.id) ? "#EA6113" : "#E2E8F0"}
                  className="transition-colors duration-300 dark:stroke-[#302824]"
                  strokeWidth="2.5"
                />
                
                {/* Agent sub-connections (Dashed curves) */}
                <path
                  d="M 360 215 Q 360 280, 280 320"
                  fill="none"
                  stroke="#EA6113"
                  strokeDasharray="4 4"
                  className="opacity-40"
                  strokeWidth="1.5"
                />
                <path
                  d="M 360 215 Q 360 280, 360 320"
                  fill="none"
                  stroke="#EA6113"
                  strokeDasharray="4 4"
                  className="opacity-40"
                  strokeWidth="1.5"
                />
                <path
                  d="M 360 215 Q 360 280, 440 320"
                  fill="none"
                  stroke="#EA6113"
                  strokeDasharray="4 4"
                  className="opacity-40"
                  strokeWidth="1.5"
                />

                {/* Connection 2: Agent -> Router */}
                <path
                  d="M 450 180 Q 470 180, 495 180"
                  fill="none"
                  stroke={isNodeActive(currentPreset.agentNode.id) || isNodeActive(currentPreset.routerNode.id) ? "#EA6113" : "#E2E8F0"}
                  className="transition-colors duration-300 dark:stroke-[#302824]"
                  strokeWidth="2.5"
                />

                {/* Connection 3: Router -> True Node (top curve) */}
                <path
                  d="M 590 165 Q 630 110, 680 110"
                  fill="none"
                  stroke={isNodeActive(currentPreset.trueNode.id) ? "#EA6113" : "#E2E8F0"}
                  className="transition-colors duration-300 dark:stroke-[#302824]"
                  strokeWidth="2.5"
                />

                {/* Connection 4: Router -> False Node (bottom curve) */}
                <path
                  d="M 590 195 Q 630 250, 680 250"
                  fill="none"
                  stroke={isNodeActive(currentPreset.falseNode.id) ? "#EA6113" : "#E2E8F0"}
                  className="transition-colors duration-300 dark:stroke-[#302824]"
                  strokeWidth="2.5"
                />
              </svg>

              {/* NODE LAYOUT GRID */}
              <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-4 items-center justify-center pt-8">
                
                {/* NODE 1: Webhook Trigger (Cols 1-3) */}
                <div className="md:col-span-3 flex justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode({ id: currentPreset.triggerNode.id, name: currentPreset.triggerNode.name, nodeType: "trigger" })}
                    className={`w-44 p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 bg-white dark:bg-[#181618] relative ${
                      isNodeActive(currentPreset.triggerNode.id)
                        ? "border-sunset-orange shadow-[0_0_15px_rgba(234,97,19,0.25)] ring-2 ring-sunset-orange"
                        : "border-[#E2E8F0] dark:border-[#453027]/40 hover:border-sunset-orange/40"
                    }`}
                  >
                    <div className="absolute -left-1 top-4 w-2 h-2 rounded-full bg-sunset-orange shadow" />
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#121012] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sunset-orange" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded bg-sunset-orange/10 text-sunset-orange">
                        <Zap className="w-4 h-4 fill-sunset-orange" />
                      </div>
                      <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-black/40 dark:text-[#BABABA]/40">Trigger</div>
                    </div>
                    <div className="text-xs font-bold text-[#14161D] dark:text-white truncate">{currentPreset.triggerNode.name}</div>
                    <div className="text-[9px] text-black/50 dark:text-[#BABABA]/50 mt-1 truncate">{currentPreset.triggerNode.type}</div>
                  </motion.div>
                </div>

                {/* NODE 2: AI Agent with integrated Model, Memory, Tools (Cols 4-7) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode({ id: currentPreset.agentNode.id, name: currentPreset.agentNode.name, nodeType: "agent" })}
                    className={`w-52 p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 bg-white dark:bg-[#181618] relative ${
                      isNodeActive(currentPreset.agentNode.id)
                        ? "border-sunset-orange shadow-[0_0_15px_rgba(234,97,19,0.25)] ring-2 ring-sunset-orange"
                        : "border-[#E2E8F0] dark:border-[#453027]/40 hover:border-sunset-orange/40"
                    }`}
                  >
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#121012] z-20" />
                    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#121012] z-20" />

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded bg-sunset-orange/10 text-sunset-orange">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-black/40 dark:text-[#BABABA]/40">AI Agent</div>
                      </div>
                      <span className="text-[8px] bg-sunset-orange/15 text-sunset-orange font-mono px-1 rounded uppercase font-bold">Active</span>
                    </div>
                    <div className="text-xs font-bold text-[#14161D] dark:text-white truncate">{currentPreset.agentNode.name}</div>
                    <div className="text-[8px] text-emerald-500 font-mono mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {currentPreset.agentNode.model.split(" ")[0]}
                    </div>
                  </motion.div>

                  {/* AI Sub-Nodes attached below (Visible mainly on desktops) */}
                  <div className="hidden md:flex gap-4 mt-8 w-full justify-center">
                    {/* Chat Model Subnode */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 p-2 border border-black/5 dark:border-[#453027]/30 bg-neutral-50 dark:bg-[#141214] text-center rounded text-[8px] relative group hover:border-sunset-orange/30">
                        <div className="font-bold text-[#14161D] dark:text-white truncate">Model</div>
                        <div className="text-sunset-orange mt-0.5 font-mono truncate">{currentPreset.agentNode.model.split(" ")[0]}</div>
                      </div>
                    </div>

                    {/* Memory Subnode */}
                    <div className="flex flex-col items-center">
                      <div className="w-20 p-2 border border-black/5 dark:border-[#453027]/30 bg-neutral-50 dark:bg-[#141214] text-center rounded text-[8px] relative hover:border-sunset-orange/30">
                        <div className="font-bold text-[#14161D] dark:text-white truncate">Memory</div>
                        <div className="text-sunset-orange mt-0.5 font-mono truncate">{currentPreset.agentNode.memory.split(" ")[0]}</div>
                      </div>
                    </div>

                    {/* Tools Subnode Grid */}
                    <div className="flex flex-col items-center">
                      <div className="p-2 border border-black/5 dark:border-[#453027]/30 bg-sunset-orange/5 text-sunset-orange rounded flex gap-1 items-center max-w-[110px]">
                        <Plus className="w-2.5 h-2.5" />
                        <div className="grid grid-cols-2 gap-0.5">
                          {currentPreset.agentNode.tools.map((t, i) => {
                            const ToolIcon = t.icon;
                            return (
                              <div key={i} title={t.name} className="w-3.5 h-3.5 rounded bg-white dark:bg-[#1C181C] border border-sunset-orange/15 flex items-center justify-center text-black/60 dark:text-white/80">
                                <ToolIcon className="w-2 h-2" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* NODE 3: Router Node (Cols 8-9) */}
                <div className="md:col-span-2 flex justify-center z-10">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode({ id: currentPreset.routerNode.id, name: currentPreset.routerNode.name, nodeType: "router" })}
                    className={`w-36 p-4 border rounded-lg text-left cursor-pointer transition-all duration-300 bg-white dark:bg-[#181618] relative ${
                      isNodeActive(currentPreset.routerNode.id)
                        ? "border-sunset-orange shadow-[0_0_15px_rgba(234,97,19,0.25)] ring-2 ring-sunset-orange"
                        : "border-[#E2E8F0] dark:border-[#453027]/40 hover:border-sunset-orange/40"
                    }`}
                  >
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#121012] z-20" />
                    
                    {/* Top branch connector */}
                    <div className="absolute -right-1.5 top-[25%] w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#121012] z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    {/* Bottom branch connector */}
                    <div className="absolute -right-1.5 top-[75%] w-3 h-3 rounded-full border-2 border-sunset-orange bg-white dark:bg-[#121012] z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    </div>

                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                        <GitBranch className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-[8px] uppercase font-mono font-bold tracking-wider text-black/40">If Branch</div>
                    </div>
                    <div className="text-[10px] font-bold text-[#14161D] dark:text-white leading-tight truncate">{currentPreset.routerNode.name}</div>
                    <div className="text-[8px] font-mono text-black/40 dark:text-[#BABABA]/40 truncate mt-1">{currentPreset.routerNode.condition}</div>
                  </motion.div>
                </div>

                {/* NODE 4 & 5: True/False Endpoints (Cols 10-12 stacked) */}
                <div className="md:col-span-3 flex flex-col gap-6 items-center justify-center z-10">
                  {/* True Node */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode({ id: currentPreset.trueNode.id, name: currentPreset.trueNode.name, nodeType: "true" })}
                    className={`w-40 p-3 border rounded-lg text-left cursor-pointer transition-all duration-300 bg-white dark:bg-[#181618] relative ${
                      isNodeActive(currentPreset.trueNode.id)
                        ? "border-sunset-orange shadow-[0_0_15px_rgba(234,97,19,0.25)] ring-2 ring-sunset-orange"
                        : "border-[#E2E8F0] dark:border-[#453027]/40 hover:border-sunset-orange/40"
                    }`}
                  >
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-emerald-500 bg-white dark:bg-[#121012] z-20" />
                    <div className="absolute -right-1 top-4 w-2 h-2 rounded-full bg-emerald-500 shadow" />
                    
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">True Route</span>
                      <currentPreset.trueNode.icon className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                    <div className="text-[10px] font-bold text-[#14161D] dark:text-white truncate">{currentPreset.trueNode.name}</div>
                  </motion.div>

                  {/* False Node */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedNode({ id: currentPreset.falseNode.id, name: currentPreset.falseNode.name, nodeType: "false" })}
                    className={`w-40 p-3 border rounded-lg text-left cursor-pointer transition-all duration-300 bg-white dark:bg-[#181618] relative ${
                      isNodeActive(currentPreset.falseNode.id)
                        ? "border-sunset-orange shadow-[0_0_15px_rgba(234,97,19,0.25)] ring-2 ring-sunset-orange"
                        : "border-[#E2E8F0] dark:border-[#453027]/40 hover:border-sunset-orange/40"
                    }`}
                  >
                    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-neutral-400 bg-white dark:bg-[#121012] z-20" />
                    <div className="absolute -right-1 top-4 w-2 h-2 rounded-full bg-neutral-400 shadow" />
                    
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">False Route</span>
                      <currentPreset.falseNode.icon className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                    <div className="text-[10px] font-bold text-[#14161D] dark:text-white truncate">{currentPreset.falseNode.name}</div>
                  </motion.div>
                </div>

              </div>

            </div>

            {/* LIVE CONSOLE LOGS AT BOTTOM */}
            <div className="mt-8 border-t border-[#E2E8F0] dark:border-[#453027]/40 pt-4 z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-black/50 dark:text-[#BABABA]/50">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Execution Audit Console Logs</span>
                </div>
                {isPlaying && (
                  <span className="text-[8px] text-sunset-orange font-mono animate-pulse uppercase font-bold">Streaming real-time execution...</span>
                )}
              </div>
              
              <div className="bg-[#1C181C] dark:bg-[#141214] p-3 rounded-lg border border-black/10 dark:border-[#453027]/40 text-[10px] text-white/80 font-mono text-left space-y-1 h-28 overflow-y-auto shadow-inner">
                {simLog.length === 0 ? (
                  <div className="text-white/30 flex items-center gap-1.5 h-full justify-center">
                    <span>Press 'Run Test Pipeline' to execute a dry-run log trace.</span>
                  </div>
                ) : (
                  simLog.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-1.5 border-b border-white/5 pb-1 last:border-0"
                    >
                      <span className="text-sunset-orange select-none">&raquo;</span>
                      <span className="flex-1 leading-relaxed">{log}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* INTERACTIVE CUSTOMIZER PANEL DRAWER overlay */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-x-0 bottom-0 bg-white dark:bg-[#161316] border-t-2 border-sunset-orange p-6 z-30 shadow-2xl rounded-t-xl text-left"
                >
                  <div className="flex justify-between items-start border-b border-[#E2E8F0] dark:border-[#453027]/30 pb-3 mb-4">
                    <div>
                      <div className="text-[10px] uppercase font-mono font-bold tracking-widest text-sunset-orange">Atelier Node Configurer</div>
                      <h3 className="text-sm font-bold text-[#14161D] dark:text-white mt-1">Configure parameters for node: <span className="font-mono">{selectedNode.name}</span></h3>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="text-xs px-2 py-1 rounded bg-black/5 hover:bg-sunset-orange hover:text-white dark:bg-white/5 transition-colors cursor-pointer"
                    >
                      &times; Close Settings
                    </button>
                  </div>

                  {/* Dynamic Settings Fields depending on Node Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* TRIGGER CONFIG */}
                    {selectedNode.nodeType === "trigger" && (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Custom Trigger Node Name</label>
                          <input
                            type="text"
                            value={currentPreset.triggerNode.name}
                            onChange={(e) => handleUpdateNodeName("trigger", e.target.value)}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded focus:border-sunset-orange"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Webhook Endpoint URL</label>
                          <input
                            type="text"
                            defaultValue={currentPreset.triggerNode.fields?.[0]?.value || "/webhooks/trigger"}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded font-mono text-black/60 dark:text-[#BABABA]"
                          />
                        </div>
                      </>
                    )}

                    {/* AI AGENT CONFIG */}
                    {selectedNode.nodeType === "agent" && (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Select Model Core</label>
                          <select
                            value={currentPreset.agentNode.model}
                            onChange={(e) => handleUpdateAgentConfig(e.target.value, currentPreset.agentNode.memory)}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded focus:border-sunset-orange text-black dark:text-white"
                          >
                            {availableModels.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Select Memory Core</label>
                          <select
                            value={currentPreset.agentNode.memory}
                            onChange={(e) => handleUpdateAgentConfig(currentPreset.agentNode.model, e.target.value)}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded focus:border-sunset-orange text-black dark:text-white"
                          >
                            {availableMemories.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>

                        {/* Connected Tools customizer */}
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50 block">Connected Integration Tools ({currentPreset.agentNode.tools.length}/4 limit)</label>
                          <div className="flex flex-wrap gap-2">
                            {currentPreset.agentNode.tools.map((t, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-sunset-orange/10 text-sunset-orange border border-sunset-orange/20 text-[10px] font-bold">
                                <span>{t.name}</span>
                                <button
                                  onClick={() => handleRemoveTool(t.name)}
                                  className="hover:text-red-500 transition-colors font-sans text-xs cursor-pointer ml-1"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>

                          <div className="pt-1">
                            <span className="text-[9px] text-black/40 dark:text-[#BABABA]/40 mr-2 uppercase font-mono">Add tools to agent sandbox:</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {allAvailableTools
                                .filter((tool) => !currentPreset.agentNode.tools.some((t) => t.name === tool.name))
                                .map((tool, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleAddTool(tool)}
                                    className="px-2 py-1 bg-black/5 hover:bg-sunset-orange dark:bg-white/5 dark:hover:bg-sunset-orange text-black dark:text-white hover:text-white transition-colors rounded text-[9px] cursor-pointer"
                                  >
                                    + {tool.name}
                                  </button>
                                ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ROUTER CONFIG */}
                    {selectedNode.nodeType === "router" && (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Branch Rule Name</label>
                          <input
                            type="text"
                            value={currentPreset.routerNode.name}
                            onChange={(e) => handleUpdateRouterCondition(e.target.value, currentPreset.routerNode.condition)}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded focus:border-sunset-orange text-black dark:text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Condition Statement (JSON syntax)</label>
                          <input
                            type="text"
                            value={currentPreset.routerNode.condition}
                            onChange={(e) => handleUpdateRouterCondition(currentPreset.routerNode.name, e.target.value)}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded font-mono focus:border-sunset-orange text-black dark:text-white"
                          />
                        </div>
                      </>
                    )}

                    {/* TRUE/FALSE NODES */}
                    {(selectedNode.nodeType === "true" || selectedNode.nodeType === "false") && (
                      <>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Node Output Name</label>
                          <input
                            type="text"
                            value={selectedNode.nodeType === "true" ? currentPreset.trueNode.name : currentPreset.falseNode.name}
                            onChange={(e) => handleUpdateNodeName(selectedNode.nodeType, e.target.value)}
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded focus:border-sunset-orange text-black dark:text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-black/50 dark:text-[#BABABA]/50">Status Code Parameter</label>
                          <input
                            type="text"
                            defaultValue="200 OK / 201 Created"
                            disabled
                            className="w-full bg-[#FAFAFC] dark:bg-[#1C181C] border border-[#E2E8F0] dark:border-[#453027]/40 text-xs p-2.5 outline-none rounded font-mono text-black/40 dark:text-[#BABABA]/40"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
