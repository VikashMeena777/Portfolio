export type Project = {
  id: string;
  title: string;
  description: string;
  category: "AI SaaS" | "Automation" | "Content Factory" | "Other";
  link?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "assistmint",
    title: "AssistMint",
    description: "Production-grade AI WhatsApp ordering bot with real-time webhooks and automated notifications.",
    category: "AI SaaS",
  },
  {
    id: "chirplymint",
    title: "ChirplyMint",
    description: "Multi-account Instagram automation dashboard with secure OAuth and premium UI.",
    category: "Automation",
  },
  {
    id: "ai-trademind",
    title: "AI-TradeMind",
    description: "AI-powered trading system using multi-LLM routing (NVIDIA, Groq, OpenRouter) and live signal generation.",
    category: "AI SaaS",
  },
  {
    id: "pitchmint",
    title: "PitchMint",
    description: "Professional email outreach and CRM application passing Google OAuth compliance.",
    category: "AI SaaS",
  },
  {
    id: "clipmint",
    title: "ClipMint",
    description: "Automated high-quality video subtitle rendering pipeline using Remotion and NVIDIA NIM Whisper.",
    category: "Content Factory",
  },
  {
    id: "toolzhub",
    title: "ToolzHub",
    description: "Ad-monetized movie link delivery system powered by Telegram bots and n8n workflows.",
    category: "Automation",
  },
  {
    id: "lead-gen",
    title: "Automated Lead Generation",
    description: "WhatsApp outreach automation delivering high-converting, category-specific business solutions.",
    category: "Automation",
  },
  {
    id: "faceless-meme",
    title: "Faceless Meme Factory",
    description: "End-to-end automated pipeline for generating and publishing viral meme content.",
    category: "Content Factory",
  },
];
