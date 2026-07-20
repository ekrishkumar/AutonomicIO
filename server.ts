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

  // POST endpoint to record client enquiry
  app.post("/api/enquiry", async (req, res) => {
    try {
      const { name, email, company, message, workspaceNeeds } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      console.log("Saving client enquiry details:", { name, email, company, workspaceNeeds });

      let record;
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
      }

      return res.status(200).json({ success: true, enquiry: record });
    } catch (error: any) {
      console.error("Enquiry submission error:", error);
      return res.status(500).json({ error: error?.message || "Internal server error." });
    }
  });

  // GET endpoint to fetch all registered enquiries
  app.get("/api/enquiries", async (req, res) => {
    try {
      let results;
      try {
        // Attempt fetch via Drizzle ORM
        results = await db.select().from(enquiries).orderBy(desc(enquiries.id));
        console.log(`Successfully fetched ${results.length} enquiries from PostgreSQL.`);
      } catch (dbError) {
        console.warn("⚠️ PostgreSQL select failed or unconfigured, returning memory store records:", dbError);
        // Return sorted in-memory enquiries copy (newest first)
        results = [...mockEnquiries].sort((a, b) => b.id - a.id);
      }
      return res.status(200).json({ enquiries: results });
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
