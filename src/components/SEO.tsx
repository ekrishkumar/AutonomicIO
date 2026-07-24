import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function SEO({
  title = "Autonomic I/O — Autonomous AI Multi-Agent Orchestration Platform",
  description = "Enterprise-grade AI orchestration platform linking LLM multi-agent pipelines with 9,000+ app connectors via MCP SDK, sub-20ms latency, and full PII governance guardrails.",
  keywords = "AI orchestration, multi-agent systems, MCP SDK, Zapier alternative, AI pipelines, enterprise AI, autonomous agents, LLM guardrails, AI workflows",
  ogImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  ogUrl = "https://autonomicio.com",
}: SEOProps) {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#FF4F00" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Autonomic I/O" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={ogUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:creator" content="@autonomicio" />

      {/* Canonical Link */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
}
