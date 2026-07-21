import React from "react";
import { 
  Sparkles, 
  Target, 
  Eye, 
  Flame, 
  Cpu, 
  Layers, 
  Database, 
  Workflow, 
  TrendingUp, 
  Lightbulb, 
  ShieldCheck, 
  ArrowUpRight 
} from "lucide-react";

export default function OverviewSection() {
  const coreObjectives = [
    "Develop AI-powered workflow automation.",
    "Replace repetitive manual processes with intelligent systems.",
    "Connect disconnected business applications into unified workflows.",
    "Deliver actionable insights through advanced analytics.",
    "Build scalable AI platforms for startups, enterprises, and governments.",
    "Make artificial intelligence practical, accessible, and measurable."
  ];

  const services = [
    {
      category: "AI Automation",
      items: [
        "Workflow Automation",
        "AI Agents",
        "Business Process Automation",
        "Email & CRM Automation",
        "Customer Support Automation"
      ]
    },
    {
      category: "Software Development",
      items: [
        "SaaS Platforms",
        "Web Applications",
        "Internal Business Tools",
        "API Development",
        "Cloud Solutions"
      ]
    },
    {
      category: "Artificial Intelligence",
      items: [
        "Large Language Model Integration",
        "Custom AI Assistants",
        "Document Intelligence",
        "Predictive Analytics",
        "Recommendation Systems"
      ]
    },
    {
      category: "Data Intelligence",
      items: [
        "Business Dashboards",
        "KPI Monitoring",
        "Financial Analytics",
        "Data Engineering",
        "Reporting Automation"
      ]
    }
  ];

  const futureProducts = [
    "Enterprise AI Operating System",
    "Autonomous Business Platform",
    "AI Research Products",
    "Financial Intelligence Platform",
    "Government Digital Solutions"
  ];

  const brandValues = [
    "Innovation",
    "Reliability",
    "Simplicity",
    "Intelligence",
    "Transparency",
    "Security",
    "Scalability",
    "Continuous Improvement"
  ];

  const brandPersonality = [
    "Intelligent",
    "Modern",
    "Minimalist",
    "Reliable",
    "Professional",
    "Future-oriented",
    "Engineering-driven"
  ];

  return (
    <section id="overview-section" className="py-24 bg-[#FAFAFC] dark:bg-[#100C08] px-6 sm:px-10 lg:px-12 border-b border-[#E2E8F0] dark:border-[#1C130E] transition-colors duration-300 relative">
      <div className="absolute inset-0 n8n-dot-grid pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* SECTION 1: ABOUT & STRATEGIC OBSERVATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="editorial-badge">THE COMPANY</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#100C08] dark:text-white leading-[1.12]">
              About <span className="bg-gradient-to-r from-[#FF9408] via-[#CA3F16] to-[#95122C] bg-clip-text text-transparent">Autonomic IO</span>
            </h2>
            <p className="text-sm text-[#100C08]/80 dark:text-[#DBE0E1]/80 leading-relaxed font-light">
              Autonomic IO is an AI-first technology company dedicated to developing intelligent automation solutions that transform how businesses operate. By combining artificial intelligence, workflow automation, data analytics, and modern software engineering, we create systems capable of executing repetitive tasks, assisting decision-making, and continuously optimizing business processes with minimal human intervention.
            </p>
            <div className="p-4 rounded-lg bg-neutral-100/50 dark:bg-[#1C130E]/30 border border-neutral-200/40 dark:border-[#CA3F16]/15">
              <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#CA3F16] mb-1">Our Core Mandate</span>
              <p className="text-xs text-[#100C08]/70 dark:text-[#DBE0E1]/60 font-light leading-relaxed">
                To eliminate operational inefficiencies, allowing organizations to focus on innovation, strategy, and sustainable growth.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-[#1C130E] p-8 rounded-xl border border-neutral-200/65 dark:border-[#CA3F16]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex items-center gap-2.5 text-[#CA3F16]">
              <Cpu className="w-5 h-5" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">A Strategic Observation</span>
            </div>
            
            <h3 className="text-lg font-display font-bold text-[#100C08] dark:text-white leading-snug">
              Why the combination of <span className="underline decoration-[#CA3F16]/30">Autonomic</span> & <span className="underline decoration-[#CA3F16]/30 font-mono">IO</span> defines the whole motto of our platform.
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <span className="block text-xs font-bold text-[#100C08] dark:text-white uppercase font-mono tracking-wider">
                  01 / Autonomic
                </span>
                <p className="text-xs text-[#100C08]/60 dark:text-[#DBE0E1]/65 leading-relaxed font-light">
                  Self-managing, self-healing, self-optimizing, and self-configuring digital constructs inspired directly by biology and autonomic computing.
                </p>
              </div>
              <div className="space-y-2">
                <span className="block text-xs font-bold text-[#100C08] dark:text-white uppercase font-mono tracking-wider">
                  02 / IO (Input / Output)
                </span>
                <p className="text-xs text-[#100C08]/60 dark:text-[#DBE0E1]/65 leading-relaxed font-light">
                  The elegant flow of unstructured and structured information between distributed enterprise systems, software engines, devices, and final operators.
                </p>
              </div>
            </div>
            
            <div className="editorial-divider" />
            
            <p className="text-xs text-[#100C08]/75 dark:text-[#DBE0E1]/70 leading-relaxed font-light italic">
              "We leverage this dynamic equilibrium to build software that not only automates custom workflows but also continuously learns, adapts, and improves—empowering modern organizations to scale with confidence in an increasingly digital world."
            </p>
          </div>
        </div>

        {/* SECTION 2: THE TRIAD (MISSION, VISION, PURPOSE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission */}
          <div className="bg-white dark:bg-[#181B22]/40 p-6 rounded-xl border border-neutral-200/50 dark:border-[#1C130E]/60 space-y-4">
            <div className="flex items-center gap-2 text-[#CA3F16]">
              <Target className="w-5 h-5" />
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider">Our Mission</h4>
            </div>
            <p className="text-xs text-[#100C08]/80 dark:text-[#DBE0E1]/75 leading-relaxed font-light">
              To empower every business with autonomous intelligence that automates complex workflows, enhances productivity, and enables smarter decision-making through ethical and scalable AI technologies.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white dark:bg-[#181B22]/40 p-6 rounded-xl border border-neutral-200/50 dark:border-[#1C130E]/60 space-y-4">
            <div className="flex items-center gap-2 text-[#CA3F16]">
              <Eye className="w-5 h-5" />
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider">Our Vision</h4>
            </div>
            <p className="text-xs text-[#100C08]/80 dark:text-[#DBE0E1]/75 leading-relaxed font-light">
              To become one of the world's leading AI infrastructure companies, creating autonomous digital ecosystems where intelligent software collaborates seamlessly with people across every industry.
            </p>
          </div>

          {/* Purpose */}
          <div className="bg-white dark:bg-[#181B22]/40 p-6 rounded-xl border border-neutral-200/50 dark:border-[#1C130E]/60 space-y-4">
            <div className="flex items-center gap-2 text-[#CA3F16]">
              <Flame className="w-5 h-5" />
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider">Our Purpose</h4>
            </div>
            <p className="text-xs text-[#100C08]/80 dark:text-[#DBE0E1]/75 leading-relaxed font-light">
              Autonomic IO exists to solve one fundamental problem: Businesses spend too much time on repetitive operations instead of creating value. We build AI systems that automate these operations while improving speed, accuracy, and scalability.
            </p>
          </div>

        </div>

        {/* SECTION 3: CORE OBJECTIVES */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="editorial-badge">THE STRATEGY</span>
            <h3 className="text-2xl font-display font-extrabold text-[#100C08] dark:text-white">
              Our Core Operational Objectives
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreObjectives.map((obj, i) => (
              <div 
                key={i} 
                className="flex gap-4 p-5 rounded-lg bg-white dark:bg-[#1C130E]/40 border border-neutral-200/40 dark:border-[#1C130E]/80 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <span className="text-xs font-mono font-bold text-[#CA3F16] bg-[#CA3F16]/5 dark:bg-[#CA3F16]/10 px-2.5 py-1 rounded h-fit">
                  0{i + 1}
                </span>
                <p className="text-xs text-[#100C08]/80 dark:text-[#DBE0E1]/80 leading-relaxed font-light pt-0.5">
                  {obj}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: CAPABILITIES & SERVICES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <span className="editorial-badge">CAPABILITIES</span>
              <h3 className="text-2xl font-display font-extrabold text-[#100C08] dark:text-white">
                Current Services & Solutions
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {services.map((srv, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#CA3F16] border-b border-neutral-200 dark:border-[#CA3F16]/15 pb-2 flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5" />
                    {srv.category}
                  </h4>
                  <ul className="space-y-2">
                    {srv.items.map((item, i) => (
                      <li key={i} className="text-xs text-[#100C08]/70 dark:text-[#DBE0E1]/70 font-light flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CA3F16]/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Future Products */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#CA3F16]/5 to-[#95122C]/5 dark:from-[#CA3F16]/10 dark:to-[#95122C]/5 p-6 rounded-xl border border-[#CA3F16]/15 dark:border-[#CA3F16]/20 space-y-6">
            <div className="space-y-1.5">
              <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase tracking-widest text-[#CA3F16] bg-[#CA3F16]/10 border border-[#CA3F16]/20">
                Roadmap
              </span>
              <h4 className="text-sm font-display font-extrabold text-[#100C08] dark:text-white">
                Upcoming Future Products
              </h4>
            </div>
            
            <ul className="space-y-3.5">
              {futureProducts.map((prod, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#CA3F16] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-xs font-bold text-[#100C08] dark:text-white leading-none">
                      {prod}
                    </span>
                    <span className="text-[9px] text-[#100C08]/40 dark:text-[#DBE0E1]/40 font-mono tracking-wider uppercase mt-1 block">
                      Autonomous Pipeline R&D
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SECTION 5: BRAND ARCHITECTURE & PERSPECTIVES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-200/60 dark:border-[#1C130E]/60 pt-12">
          
          {/* Brand Values */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#CA3F16]">
              Brand Core Values
            </span>
            <div className="flex flex-wrap gap-2">
              {brandValues.map((val, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-white dark:bg-[#1C130E] border border-neutral-200/50 dark:border-[#1C130E] text-[#100C08]/80 dark:text-[#DBE0E1]/80 shadow-[0_1px_4px_rgba(0,0,0,0.01)]"
                >
                  {val}
                </span>
              ))}
            </div>
          </div>

          {/* Brand Personality */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#CA3F16]">
              Brand Personality
            </span>
            <div className="flex flex-wrap gap-2">
              {brandPersonality.map((pers, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#100C08]/5 dark:bg-white/5 border border-transparent text-[#100C08]/70 dark:text-[#DBE0E1]/70"
                >
                  &bull; {pers}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Long Description showcase as conclusion banner */}
        <div className="bg-[#100C08] dark:bg-[#1C130E]/60 text-[#DBE0E1] p-8 sm:p-10 rounded-xl space-y-4 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
            <Cpu className="w-72 h-72" />
          </div>
          <span className="editorial-badge !bg-white/10 !text-white !border-white/10">In Summary</span>
          <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white leading-snug">
            Autonomous Software Systems That Transform The Way Organizations Work
          </h4>
          <p className="text-xs text-[#DBE0E1]/80 leading-relaxed font-light max-w-4xl">
            Autonomic IO is an AI-native technology company focused on designing autonomous software systems that transform the way organizations work. We leverage artificial intelligence, machine learning, intelligent automation, cloud technologies, and advanced analytics to eliminate repetitive tasks, streamline business operations, and unlock new levels of productivity. Our mission is to create software that not only automates workflows but also continuously learns, adapts, and improves—empowering businesses to scale with confidence in an increasingly digital world.
          </p>
        </div>

      </div>
    </section>
  );
}
