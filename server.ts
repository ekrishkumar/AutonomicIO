import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { db } from "./src/db/index";
import { enquiries } from "./src/db/schema";
import { desc } from "drizzle-orm";

dotenv.config();

// In-Memory Fallback Store in case PostgreSQL is disconnected or unprovisioned
let mockEnquiries: any[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    email: "sarah@stripe.com",
    company: "Stripe",
    message: "We need to automate our contract ingestion pipelines. Specifically extracting pricing tiers from Google Docs and populating internal sheets.",
    workspaceNeeds: "Google Drive, Google Docs",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 2,
    name: "Marcus Vance",
    email: "m.vance@linear.app",
    company: "Linear",
    message: "Looking to connect active custom agent webhooks to synchronize release notes in real-time.",
    workspaceNeeds: "Google Docs, Google Forms",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini SDK client initialization (safe check)
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    } catch (e) {
      console.error("Failed to initialize GoogleGenAI client:", e);
    }
  } else {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not defined. /api/generate running in offline simulation mode.");
  }

  // Secure API endpoint for interactive AI prompt demo
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt, tab, files } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const activeTab = tab || "Analyse";
      const fileList = Array.isArray(files) && files.length > 0 
        ? `Attached files: ${files.join(", ")}` 
        : "No custom assets attached";

      // If AI Client is not initialized, return a beautiful Sunset-themed sandbox mockup response
      if (!ai) {
        const mockResponses: Record<string, string> = {
          Analyse: `✨ [Sunset Sandbox Simulation]
Analyzed data: "${prompt}"

• Sunset Metrics Scan: Completed deep telemetry scan with 0 anomalies.
• Data Integration: Active payload synchronized with active Postgres vector stores.
• Resolution: System logs fully aligned. Triggered automated review.`,
          Train: `✨ [Sunset Sandbox Simulation]
Training objective: "${prompt}"

• Onboarding Sequence: Processing vectors from ${fileList}.
• Epoch Progress: Training converged to 99.4% accuracy inside localized nodes.
• Resolution: Fine-tuned parameters successfully published to cloud containers.`,
          Testing: `✨ [Sunset Sandbox Simulation]
Verification checks executed for: "${prompt}"

• Alignment Verification: Cryptographic check of active system policies: [PASS]
• Edge Cases: Simulated 10,000 concurrent client queries with 0% error rate.
• Resolution: Verified Sunset-Level security guardrails across all routes.`,
          Deploy: `✨ [Sunset Sandbox Simulation]
Deployment completed for: "${prompt}"

• Target Node: Provisioned active pipeline container successfully.
• Integrations: Configured workspace channels and synchronised webhook listeners.
• Resolution: Pipeline is live on port 3000. Sandbox status: 200 OK.`
        };

        const responseText = mockResponses[activeTab] || mockResponses.Analyse;
        return res.json({ text: responseText });
      }

      const systemInstruction = `You are the Autonomic I/O workspace model engine. The user is interacting with the live Sandbox Console on our homepage, specifically using the "${activeTab}" module.
Respond to their prompt in a crisp, highly professional, exciting yet grounded voice (strictly under 120 words).
Explain how the Autonomic I/O "${activeTab} Engine" automatically processes and optimizes this request using minimalist logic.
List 3 brief, elegant bullet points showing precise automation action items.
Incorporate references to files if any are attached (${fileList}).
Always maintain an ultra-clean, elegant, and professional tone. Do not use generic placeholders or self-praising fluff.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "An error occurred during generation" });
    }
  });

  // POST endpoint for interactive AI conversational chat assistant (Streaming)
  app.post("/api/chat", async (req, res) => {
    // Set headers for Server-Sent Events (SSE)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      const { prompt, history } = req.body;
      if (!prompt || typeof prompt !== "string") {
        res.write(`data: ${JSON.stringify({ error: "Prompt is required" })}\n\n`);
        return res.end();
      }

      // If AI Client is not initialized, stream high-fidelity tailored local answers
      if (!ai) {
        const query = prompt.toLowerCase();
        let fallbackText = "I am the Autonomic I/O co-pilot. I can help explain our active workflow templates, customization options, or guide you through setting up user pipelines. Feel free to ask about our services, pricing plans, or client case studies!";

        if (query.includes("service") || query.includes("offer") || query.includes("what do you do") || query.includes("capability")) {
          fallbackText = `Autonomic I/O provides enterprise-grade AI automation pipelines across four core capabilities:
  
• ⚙️ Workspace Orchestration: Seamlessly syncing business tools like Slack, Jira, GitHub, and Google Calendar.
• 🧠 Custom AI Workers: Tailor-made agents trained specifically on your custom documents and guidelines.
• 🔒 Continuous Security & Testing: Simulating heavy workloads and enforcing strict safety guardrails.
• 📊 Data Analysis & Mapping: Transforming unstructured feedback logs into structured vector stores.`;
        } else if (query.includes("price") || query.includes("pricing") || query.includes("cost") || query.includes("plan")) {
          fallbackText = `We offer three flexible tiers designed to grow with your needs:

• Creator ($0/mo Sandbox): Perfect for building prototypes. Includes 2 active pipelines, 1,000 runs/mo, and community support.
• Startup ($79/mo): Up to 15 active pipelines, 25,000 runs/mo, webhooks, and priority template access.
• Enterprise (Custom Quote): Unlimited pipelines, private LLMs, customized PostgreSQL/Spanner database syncing, and dedicated SLA support.`;
        } else if (query.includes("case study") || query.includes("portfolio") || query.includes("stripe") || query.includes("customer") || query.includes("work")) {
          fallbackText = `Our featured success story is with Stripe:
  
• Challenge: Manual extraction of tier levels from contract files was slow and prone to human typos.
• Solution: Autonomic built an automated ingest pipeline checking Drive, parsing terms with custom agents, and populating tables.
• Result: Reduced processing time by 98%, handling over 14,000 contracts with complete accuracy.`;
        } else if (query.includes("agent") || query.includes("build") || query.includes("how to")) {
          fallbackText = `Building custom agents on Autonomic I/O is simple:
  
1. Register for a free Creator Sandbox Account.
2. Open the Interactive Workflow Editor on the dashboard.
3. Configure your Trigger (e.g., Webhook or Slack listener).
4. Connect an AI Agent Parser Node trained on your specified files.
5. Setup an Action Node (e.g., Database Insert or email notification).
6. Click "Deploy Pipeline" to push it live in 1-click!`;
        }

        const fullText = `✨ [Co-Pilot Local Mode]\n\n${fallbackText}`;
        
        // Stream the fallback text in small chunks to simulate a live generation experience
        const chunkSize = 12;
        for (let i = 0; i < fullText.length; i += chunkSize) {
          const chunk = fullText.slice(i, i + chunkSize);
          res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
          await new Promise((resolve) => setTimeout(resolve, 15));
        }
        res.write("data: [DONE]\n\n");
        return res.end();
      }

      const systemInstruction = `You are the Autonomic I/O conversational AI Co-pilot assistant.
You are embedded as an interactive chat widget on the Autonomic I/O homepage (an elite, premium AI Automation Agency on par with Stripe, OpenAI, and Vercel).
Your goal is to assist website visitors, answer questions about our services, pricing, and case studies, and convert them into prospective clients.

Here are key details about Autonomic I/O to use when answering:
1. SERVICES: We offer Workspace Orchestration (connecting tools like Slack, Jira, GitHub, Gmail), Custom AI Workers/Agents (trained on custom business assets), Continuous Testing/Verification, and Data Analysis.
2. PRICING: Creator (Free Sandbox, 2 pipelines, 1k tokens), Startup ($79/mo, 15 pipelines, 25k tokens), Enterprise (Custom, unlimited pipelines, private LLMs, Postgres/Spanner database integrations).
3. CASE STUDY: Partnered with Stripe to automate contract tier extraction from Google Docs, reducing processing times by 98% (over 14k contracts successfully processed).
4. TONE: Highly intelligent, polite, technical, clear, and action-oriented. Keep your answers concise, scannable (using bullet points where appropriate), and exciting. Encourage the user to register or submit an Enquiry using the pricing form.
5. CONTEXT: Answer based on the previous conversation history provided. If they ask to sign up or submit an enquiry, guide them to click "Get Started" in the navbar or "Enquiry Now" in the pricing section.`;

      // Structure contents with the full chat history for multi-turn conversational memory
      let formattedHistory = [];
      if (Array.isArray(history) && history.length > 0) {
        const firstUserIdx = history.findIndex(msg => msg.role === "user");
        if (firstUserIdx !== -1) {
          formattedHistory = history.slice(firstUserIdx);
        } else {
          formattedHistory = [{ role: "user", parts: [{ text: prompt }] }];
        }
      } else {
        formattedHistory = [{ role: "user", parts: [{ text: prompt }] }];
      }

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.5-flash",
        contents: formattedHistory,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error("AI Co-pilot Chat Error:", error);
      res.write(`data: ${JSON.stringify({ error: error?.message || "An error occurred in AI Co-pilot" })}\n\n`);
      res.end();
    }
  });

  // POST endpoint to run dynamic AI Agent simulation via Gemini
  app.post("/api/agents/run", async (req, res) => {
    try {
      const { presetName, triggerNode, agentNode, routerNode, trueNode, falseNode } = req.body;

      if (!presetName) {
        return res.status(400).json({ error: "Preset name is required" });
      }

      let result;
      let isFallback = !ai;

      if (ai) {
        const systemInstruction = `You are the Autonomic I/O Pipeline Orchestration Engine.
The user is testing an active agent pipeline node workflow in our workspace.
Your task is to simulate a highly realistic, live execution log trace for the following pipeline configuration:

- Pipeline Preset/Context: "${presetName}"
- Trigger Node Name: "${triggerNode?.name}" of Type: "${triggerNode?.type}" with fields: ${JSON.stringify(triggerNode?.fields || {})}
- Agent Node Name: "${agentNode?.name}" running Model: "${agentNode?.model}" with Memory: "${agentNode?.memory}" and Instructions: "${agentNode?.fields?.[0]?.value || agentNode?.desc}" with connected tools: ${JSON.stringify(agentNode?.tools || [])}
- Router Node Name: "${routerNode?.name}" checking Condition: "${routerNode?.condition}"
- True Branch Action: "${trueNode?.name}" (${trueNode?.type})
- False Branch Action: "${falseNode?.name}" (${falseNode?.type})

Generate an execution trace with exactly 5 to 6 sequential step logs and a decision.
The log output MUST be valid JSON matching the following structure:
{
  "logs": [
    { "nodeId": "${triggerNode?.id}", "log": "Status update for trigger (e.g., custom trigger fired with simulated mock payload)", "duration": 1200 },
    { "nodeId": "${agentNode?.id}", "log": "Agent scanning active system state and inputs...", "duration": 1500 },
    { "nodeId": "${agentNode?.id}", "log": "Agent invoking custom tool/instruction, referencing customized instructions or selected core memory...", "duration": 1400 },
    { "nodeId": "${routerNode?.id}", "log": "Evaluating branch condition statement. State whether it matches and why.", "duration": 1100 },
    { "nodeId": "${trueNode?.id || 'true-node'}", "log": "Executing final output action based on the branch evaluation.", "duration": 1500 }
  ],
  "decision": true,
  "summary": "Short 1-sentence elegant executive summary of the autonomic agent's result."
}

Where the last log item's nodeId MUST match either "${trueNode?.id}" (if decision is true) or "${falseNode?.id}" (if decision is false).
Each log MUST be extremely specific to the customized instruction prompts, trigger URLs, or tools provided in the parameters. Avoid generic descriptions. Make the logs look like a real production enterprise system execution print!`;

        try {
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `Execute pipeline simulation run for preset: "${presetName}".`,
            config: {
              systemInstruction: systemInstruction,
              responseMimeType: "application/json",
            }
          });

          const text = response.text || "";
          result = JSON.parse(text.trim());
          console.log("Successfully ran backend agent simulation with Gemini:", result);
        } catch (genError) {
          console.warn("⚠️ Gemini content generation failed for agent pipeline, falling back to local simulation:", genError);
          isFallback = true;
        }
      }

      if (isFallback || !result) {
        // Generate highly realistic tailored log steps locally based on parameters
        const isTrue = Math.random() > 0.4;
        const decisionNodeId = isTrue ? (trueNode?.id || "true-it") : (falseNode?.id || "false-it");
        const decisionNodeName = isTrue ? (trueNode?.name || "Slack Welcome") : (falseNode?.name || "Slack General");

        result = {
          logs: [
            { nodeId: triggerNode?.id || "trig-it", log: `📥 [Local Sandbox Mode] Custom trigger '${triggerNode?.name || "Intake"}' activated successfully`, duration: 1100 },
            { nodeId: agentNode?.id || "agent-it", log: `🧠 [Local Sandbox Mode] Agent '${agentNode?.name || "AI Agent"}' running with core model ${agentNode?.model || "Claude"}. Reading instructions: "${agentNode?.fields?.[0]?.value || "Default processing"}"`, duration: 1400 },
            { nodeId: agentNode?.id || "agent-it", log: `🔧 [Local Sandbox Mode] Querying memory database '${agentNode?.memory || "Vector Ledger"}' with ${agentNode?.tools?.length || 0} active integrations`, duration: 1300 },
            { nodeId: routerNode?.id || "router-it", log: `🔄 [Local Sandbox Mode] Branch Evaluation: Checking rule '${routerNode?.name || "Is Manager"}' with condition: "${routerNode?.condition || "Default"}" -> evaluated to [${isTrue ? "TRUE" : "FALSE"}]`, duration: 1100 },
            { nodeId: decisionNodeId, log: `🚀 [Local Sandbox Mode] Dispatched final action successfully to '${decisionNodeName}'. Status: 200 OK`, duration: 1500 }
          ],
          decision: isTrue,
          summary: `Atelier Sandbox successfully dry-ran the agent pipeline using local state emulation.`
        };
      }

      return res.status(200).json({ success: true, ...result, isFallback });
    } catch (error: any) {
      console.error("Agent simulation endpoint error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error." });
    }
  });

  // POST endpoint to record client enquiry
  app.post("/api/enquiry", async (req, res) => {
    try {
      const { name, email, company, message, workspaceNeeds } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      console.log("Saving client enquiry details:", { name, email, company, workspaceNeeds });

      let record;
      let isFallback = false;
      try {
        // Attempt insert via Drizzle ORM
        const inserted = await db.insert(enquiries).values({
          name,
          email,
          company: company || null,
          message,
          workspaceNeeds: workspaceNeeds || null,
        }).returning();
        record = inserted[0];
        console.log("Successfully recorded enquiry in PostgreSQL:", record);
      } catch (dbError) {
        console.warn("⚠️ PostgreSQL insert failed or unconfigured, falling back to local memory store:", dbError);
        const newRecord = {
          id: mockEnquiries.length + 1,
          name,
          email,
          company: company || null,
          message,
          workspaceNeeds: workspaceNeeds || null,
          createdAt: new Date().toISOString()
        };
        mockEnquiries.push(newRecord);
        record = newRecord;
        isFallback = true;
      }

      return res.status(200).json({ success: true, enquiry: record, isFallback, databaseType: isFallback ? "Local Memory Store" : "PostgreSQL Cluster" });
    } catch (error: any) {
      console.error("Enquiry submission error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error." });
    }
  });

  // GET endpoint to fetch all registered enquiries
  app.get("/api/enquiries", async (req, res) => {
    try {
      let results;
      let isFallback = false;
      try {
        // Attempt fetch via Drizzle ORM
        results = await db.select().from(enquiries).orderBy(desc(enquiries.id));
        console.log(`Successfully fetched ${results.length} enquiries from PostgreSQL.`);
      } catch (dbError) {
        console.warn("⚠️ PostgreSQL select failed or unconfigured, returning memory store records:", dbError);
        // Return sorted in-memory enquiries copy (newest first)
        results = [...mockEnquiries].sort((a, b) => b.id - a.id);
        isFallback = true;
      }
      return res.status(200).json({ enquiries: results, isFallback, databaseType: isFallback ? "Local Memory Store" : "PostgreSQL Cluster" });
    } catch (error: any) {
      console.error("Enquiries retrieval error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error." });
    }
  });

  // Vite middleware or static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
