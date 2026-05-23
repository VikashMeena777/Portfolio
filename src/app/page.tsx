"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { 
  ArrowRight, Code2, ExternalLink, Mail, Sparkles, Terminal, 
  Bot, Shield, Network, Zap, Cpu, MessageSquare, LineChart, 
  Video, RefreshCw, Send,
  ChevronDown, ChevronUp, Check, Layers, Code, Play,
  Volume2, VolumeX
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// Web Audio API Sound Generation System (Micro-SFX)
class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  constructor(enabled: boolean) {
    this.enabled = enabled;
  }

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn("AudioContext not supported");
      }
    }
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  public playType() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.setValueAtTime(210, this.ctx.currentTime + 0.015);
      
      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.015);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.015);
    } catch (e) {}
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08); // A4 to E5
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(now + 0.22);
    } catch (e) {}
  }
}

// Case Study details dataset
const CASE_STUDIES: Record<string, {
  challenge: string;
  architecture: string[];
  outcome: string;
}> = {
  assistmint: {
    challenge: "Handling complex conversational ordering paths, structured payment collection, and webhook sync on WhatsApp without human intervention.",
    architecture: [
      "WhatsApp Cloud API Ingestion -> Node.js Webhook Router",
      "Groq Llama-3 Function Calling -> Catalog & Inventory Extraction",
      "Cashfree API Integration -> Generates instant payment session link",
      "Supabase DB -> Real-time CRM and state persistence"
    ],
    outcome: "Zero human friction. Enabled local restaurants to run 24/7 automated order collection with 94.6% parsing accuracy."
  },
  chirplymint: {
    challenge: "Managing multi-account Instagram access tokens securely, classifying client inbound message intent, and routing responses without hitting rate limits.",
    architecture: [
      "Meta Webhook Router -> Encrypted token manager on Supabase",
      "Queue Processor -> Splits operations to avoid API rate limit blocks",
      "Intent Classifier (Gemini) -> Identifies inquiries vs sales leads",
      "n8n CRM Router -> Updates spreadsheets and shoots replies"
    ],
    outcome: "Reduced manual response delay from 4 hours to under 2 seconds. Managed 10,000+ daily chats across 5 active client accounts."
  },
  "ai-trademind": {
    challenge: "Resolving parallel API processing bottlenecks, rate limits, and market ticker mismatches across multiple trading assets.",
    architecture: [
      "Market Data Poller -> Yahoo Finance & TradingView Web API",
      "Asset Normalization Engine -> Maps indices correctly (e.g. ^NSEI)",
      "Multi-LLM Predictor -> NVIDIA, Groq, OpenRouter risk aggregation",
      "Alert Webhook -> Dispatches Buy/Sell signals to Telegram channels"
    ],
    outcome: "Stable algorithmic signaling pipeline with automated rate-limit fallbacks and direct DB storage, serving 2,500+ active premium subscribers."
  },
  clipmint: {
    challenge: "Rendering thousands of video overlays, transcribing complex multi-lingual audio clips, and burning stylized kinetic typography dynamically.",
    architecture: [
      "Whisper API transcription -> Word-level timestamp alignment",
      "Remotion Compositor -> Renders subtitles and overlays dynamically",
      "AWS GPU Worker (EC2) -> Compiles high-speed webm/mp4 outputs",
      "TikTok/YT Shorts API -> Schedules and auto-publishes reels"
    ],
    outcome: "Automated video production flow. Rendered 500+ daily reels at under $0.05 per clip, accumulating 2M+ organic views."
  },
  pitchmint: {
    challenge: "Passing strict Google Security & Privacy verification for Gmail OAuth reading capabilities.",
    architecture: [
      "Google OAuth 2.0 flow -> Restricted metadata scopes only",
      "Outreach Engine -> Queue manager for drip email sequences",
      "React Email template compiler -> Generates responsive outreach HTML",
      "Webhook receiver -> Tracks opens, clicks, and bounce replies"
    ],
    outcome: "Fully verified by Google Third-Party Safety team. Sent 5,000+ highly personalized automated outreach pitches with 45% reply rates."
  },
  toolzhub: {
    challenge: "Monetizing movie redirection links and handling high-concurrency traffic generated by viral Telegram channels.",
    architecture: [
      "Telegram Bot API -> Intercepts user requests for movie links",
      "n8n Workflow Engine -> Generates ad-shortened redirection links",
      "Ad Gateway -> Tracks user verification path completion",
      "Dynamic Redirect Router -> Delivers final file securely"
    ],
    outcome: "Monetized 50,000+ movie downloads daily, resulting in a completely automated, hands-off passive income platform."
  },
  "lead-gen": {
    challenge: "Targeting category-specific local businesses (dentists, salons, gyms) with customized outreach messages.",
    architecture: [
      "Google Maps Scraper -> Pulls business listings and numbers",
      "Groq Copywriter -> Generates hyper-specific pain-point summaries",
      "WhatsApp Automator -> Sends short, interactive valuation pitches",
      "Calendar sync -> Books follow-ups directly on Calendly"
    ],
    outcome: "Boosted cold message response rates from 2% to 18.5%, booking 10+ validation calls weekly."
  },
  "faceless-meme": {
    challenge: "Generating and formatting viral image memes and humor posts from trending tech topics daily.",
    architecture: [
      "Twitter/X Trend Collector -> Pulls popular tech hashtags",
      "Groq Humor Model -> Drafts meme captions and dialogues",
      "Image Generator API -> Compiles background image layouts",
      "Auto-scheduler -> Publishes to Instagram & Twitter"
    ],
    outcome: "Built an organic audience of 25,000+ tech followers within 3 months, running completely hands-off."
  }
};

// Custom LinkedIn Icon component to avoid lucide-react version conflicts
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Type definitions
type Category = "AI SaaS" | "Automation" | "Content Factory" | "Other";

// Visual Simulation Components for Bento Grid
function WhatsAppSimulator() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; time: string }>>([
    { sender: "user", text: "Hey! Can I order a Special Burger?", time: "11:42 AM" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const stepRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (stepRef.current === 0 && !isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "🍔 Placing order for Special Burger...", time: "11:42 AM" }
          ]);
          setIsTyping(false);
          stepRef.current = 1;
        }, 1500);
      } else if (stepRef.current === 1 && !isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            { sender: "bot", text: "Order confirmed! Click here to pay: cashfree.link/🍔", time: "11:43 AM" }
          ]);
          setIsTyping(false);
          stepRef.current = 2;
        }, 2000);
      } else if (stepRef.current === 2) {
        // Reset after some time
        setTimeout(() => {
          setMessages([{ sender: "user", text: "Hey! Can I order a Special Burger?", time: "11:42 AM" }]);
          stepRef.current = 0;
        }, 5000);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [isTyping]);

  return (
    <div className="w-full bg-[#0b141a] rounded-xl overflow-hidden border border-emerald-500/20 font-sans text-xs">
      <div className="bg-[#075e54] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-300 flex items-center justify-center font-bold text-[#075e54]">
            AM
          </div>
          <div>
            <div className="font-semibold text-white">AssistMint AI</div>
            <div className="text-[10px] text-emerald-100">online</div>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <div className="p-3 space-y-2 h-44 overflow-y-auto bg-[#0b141a]/95 flex flex-col justify-end">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[80%] rounded-lg p-2 ${
              msg.sender === "user" 
                ? "bg-[#005c4b] text-white self-end rounded-tr-none" 
                : "bg-[#202c33] text-gray-200 self-start rounded-tl-none"
            }`}
          >
            <div>{msg.text}</div>
            <div className="text-[8px] text-right mt-1 opacity-65">{msg.time}</div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="bg-[#202c33] text-gray-400 self-start rounded-lg rounded-tl-none p-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
      </div>
    </div>
  );
}

function TradeGraphSimulator() {
  const [metric, setMetric] = useState({ price: 92451.2, signal: "BUY", conf: "94.6%" });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetric(prev => {
        const change = (Math.random() - 0.4) * 80;
        const newPrice = Number((prev.price + change).toFixed(1));
        const newConf = (90 + Math.random() * 9).toFixed(1) + "%";
        return {
          price: newPrice,
          signal: change > 0 ? "BUY" : "HOLD",
          conf: newConf
        };
      });
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-black/80 rounded-xl p-3 border border-emerald-500/20 font-mono text-[10px]">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
        <div>
          <span className="text-muted-foreground">ROUTE:</span> <span className="text-primary font-bold">GROQ-Llama3</span>
        </div>
        <div className="flex gap-2">
          <span className={`px-1.5 py-0.5 rounded ${metric.signal === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"}`}>
            {metric.signal}
          </span>
          <span className="text-muted-foreground">{metric.conf}</span>
        </div>
      </div>
      <div className="text-lg font-bold text-foreground flex items-baseline gap-1">
        ${metric.price.toLocaleString()}
        <span className="text-[10px] text-emerald-400 font-normal">▲ +1.4%</span>
      </div>
      
      {/* SVG Neon Line Chart */}
      <svg className="w-full h-20 mt-2 overflow-visible" viewBox="0 0 100 40">
        <path
          d="M0,35 Q15,32 30,22 T60,25 T90,5 L100,2"
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="1.5"
          className="animate-pulse"
        />
        <circle cx="90" cy="5" r="2.5" fill="#10b981" className="animate-ping" />
        <circle cx="90" cy="5" r="1.5" fill="#10b981" />
        <defs>
          <linearGradient id="neonGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function InstagramNodeRouter() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const nodes = [
    { label: "DM Ingestion", desc: "Webhook triggers" },
    { label: "AI Classifier", desc: "Evaluates intent" },
    { label: "Groq CRM Routing", desc: "Selects script" },
    { label: "Reply Pipeline", desc: "Fires automation" }
  ];

  return (
    <div className="w-full bg-[#121212]/90 rounded-xl p-3 border border-emerald-500/20 font-mono text-[10px] space-y-2">
      {nodes.map((node, i) => (
        <div key={i} className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] font-bold ${
              activeStep === i 
                ? "border-primary bg-primary/20 text-primary shadow-[0_0_10px_#10b981]" 
                : "border-white/10 text-muted-foreground"
            }`}>
              {i + 1}
            </div>
            <div>
              <div className={`font-semibold ${activeStep === i ? "text-primary" : "text-gray-300"}`}>
                {node.label}
              </div>
              <div className="text-[8px] text-muted-foreground">{node.desc}</div>
            </div>
          </div>
          {activeStep === i && (
            <motion.div
              layoutId="glow-dot"
              className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#10b981]"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SubtitleVideoTimeline() {
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWord(prev => (prev + 1) % 4);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const words = ["VIBE", "CODERS", "DO", "IT", "BETTER"];

  return (
    <div className="w-full bg-black/85 rounded-xl p-3 border border-emerald-500/20 font-mono text-[10px] space-y-3">
      {/* Video Preview Box */}
      <div className="h-24 bg-zinc-900 rounded border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent_70%)]" />
        <div className="text-center z-10 px-4">
          <p className="text-[8px] text-muted-foreground tracking-widest uppercase mb-1">AUTOMATED SUBTITLES</p>
          <div className="flex justify-center flex-wrap gap-1 text-sm font-black tracking-tight">
            {words.map((word, i) => (
              <span 
                key={i} 
                className={`${activeWord === i ? "text-primary scale-110 shadow-[0_0_10px_rgba(16,185,129,0.3)] bg-primary/10 px-1 rounded transition-all duration-200" : "text-white"}`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Audio Waveform simulation */}
      <div className="flex gap-[2px] items-center justify-between h-4">
        {[...Array(20)].map((_, i) => {
          const height = Math.abs(Math.sin(i + activeWord)) * 14 + 2;
          return (
            <div 
              key={i} 
              className={`flex-1 rounded-full transition-all duration-300 ${activeWord % 2 === 0 ? "bg-primary" : "bg-emerald-700"}`}
              style={{ height: `${height}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Vibe Coding terminal mock logs
const TERMINAL_LOGS = [
  "vikash@vibe:~$ npx create-vibe-app@latest --prompt 'agent-driven'",
  "✔ Scanning project configurations",
  "🚀 Initializing Gemini & Groq multi-routing API...",
  "📡 Listening to webhooks on port 3000...",
  "📦 Building WhatsApp checkout flow with Cashfree Integration",
  "🛡 Checking database RLS policies (Strict Enforcement)... OK",
  "⚡ n8n Flow Triggered: Instagram automation connected",
  "✨ Formatting professional React Email notification modules",
  "✨ Status check: 100% stable, no manual code written",
  "⚡ Vibing... System running at maximum efficiency."
];

const PROJECT_DETAILS: Record<string, {
  metrics: string[];
  techStack: string[];
  challenge: string;
  solution: string;
  architecture: string[];
  githubUrl?: string;
  liveUrl?: string;
}> = {
  assistmint: {
    metrics: ["99.8% Uptime", "5k+ Daily Orders Completed", "Zero checkout dropouts"],
    techStack: ["Next.js 14", "Supabase SSR", "Cashfree Drop SDK", "Twilio API", "Zod Validation"],
    challenge: "Integrating Cashfree payments over WhatsApp securely without client-side vulnerabilities, maintaining transaction state and handling network dropped checkouts.",
    solution: "Built a stateless webhook verification pipeline with timingSafeEqual signature check. Created a secondary polling verify route checking the Cashfree GET /orders API on return URLs.",
    architecture: ["WhatsApp Inbound Webhook Handler", "Cashfree payment session initializer", "Real-time state polling db watcher", "Transactional Receipt Renderer"]
  },
  chirplymint: {
    metrics: ["150+ Linked Accounts", "1.2M Auto-responses/mo", "<150ms Response latency"],
    techStack: ["Next.js (App Router)", "Instagram Graph API", "Upstash Redis", "Framer Motion"],
    challenge: "Handling concurrent high-volume auto-responses across hundreds of Instagram influencer accounts without hitting Facebook Graph API rate-limits.",
    solution: "Designed an automated messaging queue utilizing an Upstash Redis sliding window rate-limiter, routing traffic through localized proxies with backoff.",
    architecture: ["OAuth 2.0 Access Token Rotator", "Sliding window rate limit middleware", "Inbound Comment analyzer", "Dynamic DM Routing Core"]
  },
  "ai-trademind": {
    metrics: ["88% Signal accuracy", "12 LLMs evaluated real-time", "300ms analysis time"],
    techStack: ["Python Core", "Next.js", "Groq Llama 3", "Gemini Pro", "OpenRouter Gateway", "Supabase"],
    challenge: "Minimizing AI engine downtime due to provider-specific 429 rate limit errors while aggregating analysis from diverse models.",
    solution: "Built an LLM provider fallback routing engine with priority queues. If Groq Llama 3 fails, the traffic instantly fails over to Google Gemini Pro.",
    architecture: ["Market Data Stream Aggregator", "LLM routing proxy & fallback queue", "Vector embedding similarity search", "Postgres RLS signal logger"]
  },
  pitchmint: {
    metrics: ["Passed Google Verification", "100% CAN-SPAM compliant", "45% Open-rate increase"],
    techStack: ["Next.js", "Gmail API", "React Email Templates", "Upstash Redis", "Supabase RLS"],
    challenge: "Passing Google's strict verification audit while handling personal user email access with minimum necessary scopes.",
    solution: "Migrated the entire outreach pipeline from gmail.readonly scope to gmail.metadata to pass safety checks. Wrapped all content inside unified HTML templates.",
    architecture: ["Google OAuth client handler", "Dynamic HTML template wrapper", "Secure inbox monitor queue", "Resend SMTP fallback engine"]
  },
  clipmint: {
    metrics: ["1080x1920 HD renders", "95% Video centering accuracy", "<45s rendering time"],
    techStack: ["Remotion", "NVIDIA NIM Whisper", "Tailwind CSS", "Next.js Server Actions"],
    challenge: "Ensuring dynamic video clips from various sources maintain correct aspect ratio and remain centered without stretching during Remotion renders.",
    solution: "Implemented robust custom math overlay rendering in Remotion to auto-calculate container padding, combined with Whisper-transcribed kinetic text offsets.",
    architecture: ["Whisper audio transcription model", "Remotion dynamic component tree", "Aspect-ratio boundary analyzer", "Server action render dispatcher"]
  },
  toolzhub: {
    metrics: ["300k Active subscribers", "1.8M monthly redirects", "100% ad delivery"],
    techStack: ["n8n Workflows", "Telegram Bot API", "FastAPI Proxy", "Supabase Database"],
    challenge: "Maintaining routing and preventing path breaks during large scale Telegram redirects to monetized movie link platforms.",
    solution: "Transitioned from legacy path-based routing to query-parameter format (/go?slug=xxx) dynamically parsed in next.js middleware, auto-rebuilding broken URLs.",
    architecture: ["Telegram webhook listener", "n8n workflow coordinator", "Query-parameter route rebuilder", "Ad-overlay tracking pixel"]
  },
  "lead-gen": {
    metrics: ["12 Industries supported", "3.5x Cold outreach responses", "20k leads parsed daily"],
    techStack: ["Next.js", "Groq AI Extractor", "n8n Workflow", "PostgreSQL"],
    challenge: "Converting generic outbound cold pitches into category-specific, ultra-short, highly persuasive messages tailored to specific local business niches.",
    solution: "Designed n8n orchestration scripts that query Groq's semantic engine to pull key business descriptors and output concise, trust-building pain point highlights.",
    architecture: ["Local business crawler", "Groq structured extraction script", "n8n sequencing router", "Opt-out compliance tracking"]
  },
  "faceless-meme": {
    metrics: ["2.4M Social impressions", "100% Automated publishing", "0 manual inputs"],
    techStack: ["Python Scripting", "TikTok Developer API", "Pillow Image Lab", "Gemini API"],
    challenge: "Building a fully hands-off pipeline that aggregates trending templates, compiles image overlays, generates scripts, and publishes to short video platforms.",
    solution: "Deployed a cron workflow utilizing Gemini to write witty captions, combined with custom image generation templates on the Pillow PIL canvas.",
    architecture: ["Trending keyword analyzer", "Gemini caption composer", "PIL canvas renderer", "TikTok/YouTube publisher cron"]
  }
};

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [activeCommand, setActiveCommand] = useState("/hire");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Custom Cursor Refs
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isClickedRef = useRef(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isCustomCursorActive, setIsCustomCursorActive] = useState(false);

  // Sync state refs to prevent stale closure in animation loop
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    isClickedRef.current = isClicked;
  }, [isClicked]);

  // Console Shell history
  const [consoleHistory, setConsoleHistory] = useState<Array<{ type: "input" | "output"; text: string }>>([
    { type: "output", text: "Welcome to Vibe Shell v1.0.0 (Type /help for commands)\nInitializing agent connections... OK" }
  ]);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const soundSystemRef = useRef<SoundSystem | null>(null);

  // Update SoundSystem reference when sound state changes
  useEffect(() => {
    soundSystemRef.current = new SoundSystem(soundEnabled);
  }, [soundEnabled]);

  // Dynamic Custom Cursor pointer tracking & position update
  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    const handleMql = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsCustomCursorActive(e.matches);
    };
    mql.addEventListener("change", handleMql);
    handleMql(mql);

    let targetX = 0;
    let targetY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onMouseDown = () => {
      setIsClicked(true);
      if (soundSystemRef.current) soundSystemRef.current.playClick();
    };
    const onMouseUp = () => setIsClicked(false);

    const updatePosition = () => {
      // Smooth interpolation
      dotX += (targetX - dotX) * 0.45;
      dotY += (targetY - dotY) * 0.45;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      const dotScale = isClickedRef.current ? 0.8 : isHoveredRef.current ? 1.4 : 1;
      const ringScale = isClickedRef.current ? 1.3 : isHoveredRef.current ? 0.6 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    animId = requestAnimationFrame(updatePosition);

    return () => {
      mql.removeEventListener("change", handleMql);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Card Mouse Move spotlight dynamic gradients
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Typewriter effect for terminal simulation in Hero
  useEffect(() => {
    if (logIndex < TERMINAL_LOGS.length) {
      const timer = setTimeout(() => {
        setLogs(prev => [...prev, TERMINAL_LOGS[logIndex]]);
        setLogIndex(prev => prev + 1);
      }, logIndex === 0 ? 500 : Math.random() * 1200 + 400);
      return () => clearTimeout(timer);
    } else {
      // Loop logs
      const resetTimer = setTimeout(() => {
        setLogs([]);
        setLogIndex(0);
      }, 6000);
      return () => clearTimeout(resetTimer);
    }
  }, [logIndex]);

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTo({
        top: terminalContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [logs]);

  // Command Prompt shell interpreter
  const runCommand = (inputVal: string) => {
    if (!inputVal.trim()) return;

    setActiveCommand(inputVal);

    // Append user input
    setConsoleHistory(prev => [...prev, { type: "input", text: `vibe$ ${inputVal}` }]);
    if (soundSystemRef.current) soundSystemRef.current.playClick();

    const cmd = inputVal.toLowerCase().trim();
    let reply = "";

    if (cmd === "/help" || cmd === "help") {
      reply = `Available Commands:
  /hire       - Print contact info and connection links
  /manifesto  - Print the Vibe Coder philosophy
  /projects   - Print lists of built SaaS applications
  /logs       - Tail the active automation system logs
  /clear      - Wipe the console screen
  /joke       - Fetch an AI automation solution joke
  /email      - Open mail client directly (Usage: /email <message>)`;
    } else if (cmd === "/clear" || cmd === "clear") {
      setConsoleHistory([]);
      return;
    } else if (cmd === "/hire" || cmd === "hire" || cmd === "/contact") {
      reply = `🚀 Vikash Meena - AI Automation Solution Provider
------------------------------------------------
💼 Services: n8n pipelines, Supabase apps, AI bots, custom SaaS
📞 Contacts:
   - Email: VikashMeena52420@gmail.com
   - LinkedIn: linkedin.com/in/vikash-meena-39333b29a
   - GitHub: github.com/VikashMeena777
⚡ Tip: Type /email to send a direct message.`;
    } else if (cmd === "/manifesto" || cmd === "manifesto") {
      reply = `"Vibe Coding is not about writing syntax; it is about describing goals and orchestrating machine minds to shape reality. We do not edit files line-by-line; we align vibes with agents to output production-grade software."`;
    } else if (cmd === "/projects" || cmd === "projects") {
      reply = `Active SaaS Applications in My Arsenal:
----------------------------------------
🍔 AssistMint   - WhatsApp AI Ordering Bot (Cashfree checkout)
📣 ChirplyMint  - Social Auto-Reply DM Router
📈 AI-TradeMind - Algorithmic Multi-LLM Predictor
🎬 ClipMint     - Automated Remotion Reel Renderer
(+ 20 more automations available in Featured section above)`;
    } else if (cmd === "/logs" || cmd === "logs") {
      reply = `TAIL AUTOMATION LOGS:
---------------------
[2026-05-19 18:24] webhook-in: Received new prospect signup
[2026-05-19 18:24] groq-agent: Intent classified -> high_value
[2026-05-19 18:24] supabase-db: Activity logged for user_id: 08ea41
[2026-05-19 18:25] resend-api: Cold outreach flow started
[2026-05-19 18:25] n8n-engine: Status -> 100% SUCCESS`;
    } else if (cmd === "/joke" || cmd === "joke") {
      reply = `Why did the Vibe Coder cross the road?
To let the AI agent write the road-crossing script while they vibed out on coffee. ☕`;
    } else if (cmd.startsWith("/email") || cmd.startsWith("email")) {
      const msg = inputVal.replace(/^\/?email\s*/i, "");
      if (msg) {
        reply = `Compiling message... Redirecting to mail client...`;
        setTimeout(() => {
          window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=VikashMeena52420@gmail.com&su=Vibe+Shell+Inquiry&body=${encodeURIComponent(msg)}`, "_blank");
        }, 1000);
      } else {
        reply = `Usage: /email <your message here>`;
      }
    } else {
      reply = `bash: command not found: ${inputVal}. Type /help for assistance.`;
    }

    // Simulate typing delay in output
    setTimeout(() => {
      setConsoleHistory(prev => [...prev, { type: "output", text: reply }]);
      if (soundSystemRef.current) soundSystemRef.current.playSuccess();
    }, 300);
  };

  useEffect(() => {
    // Initial content setup
    setConsoleHistory(prev => [
      ...prev,
      {
        type: "output",
        text: `🚀 Vikash Meena - AI Automation Solution Provider\n------------------------------------------------\nType /help to see all available terminal console commands.`
      }
    ]);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center bg-[#070b0e] text-foreground font-sans overflow-x-hidden relative ${isCustomCursorActive ? "custom-cursor-active" : ""}`}>
      
      {/* Custom Mouse Cursor Reticle */}
      {isCustomCursorActive && (
        <>
          <div
            ref={dotRef}
            className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{ transform: "translate3d(0px, 0px, 0) translate(-50%, -50%) scale(1)" }}
          />
          <div
            ref={ringRef}
            className="fixed top-0 left-0 w-8 h-8 border border-primary/45 rounded-full pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center"
            style={{ transform: "translate3d(0px, 0px, 0) translate(-50%, -50%) scale(1)" }}
          />
        </>
      )}

      {/* Background Neon Grid Effect */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-scan pointer-events-none opacity-[0.12]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.06),transparent_60%)] pointer-events-none" />

      {/* Floating Animated Ambient Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] animate-blob" />
        <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[130px] animate-blob animation-delay-2000" />
      </div>

      {/* Floating Premium Navbar */}
      <nav className="fixed top-4 z-50 w-full max-w-5xl px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass bg-black/40 px-6 py-3 rounded-full flex justify-between items-center backdrop-blur-xl border border-white/5 shadow-2xl"
        >
          <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              Vikash <span className="text-primary font-black">Meena</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#projects" className="hover:text-primary transition-colors" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Projects</Link>
            <Link href="#tech" className="hover:text-primary transition-colors" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Tech Console</Link>
            <Link href="#contact" className="hover:text-primary transition-colors" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle Speaker */}
            <Button 
              size="icon-xs"
              variant="outline"
              onClick={() => {
                setSoundEnabled(prev => !prev);
                toast.success(!soundEnabled ? "Dynamic synth audio enabled!" : "Audio muted");
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="rounded-full border-white/10 hover:bg-white/5 h-8 w-8 flex items-center justify-center p-0"
              title={soundEnabled ? "Mute audio" : "Unmute audio"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-primary" /> : <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />}
            </Button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] bg-primary/10 border border-primary/20 text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              🟢 Currently Vibing
            </span>
            <Button 
              size="sm" 
              className="rounded-full px-4 text-xs font-semibold" 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Console
            </Button>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-5xl px-6 pt-32 pb-16 md:pt-44 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Bold Hook & Bio */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Badge variant="outline" className="px-3.5 py-1 text-xs border-primary/30 bg-primary/5 text-primary backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-pulse text-emerald-400" />
              Zero Manual Code. 100% Agent Orchestrated.
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
              SaaS & Automations <br />
              At The Speed Of <br />
              <span className="text-gradient">Vibe Coding</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed pt-2">
              I am an <strong className="text-foreground font-semibold">AI Automation Solution Provider</strong>. 
              I design and deploy production-ready cloud architectures, multi-routing LLM pipelines, and webhook-driven bots with zero manual typing.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Button 
              size="lg" 
              className="rounded-full px-7 h-12 text-sm font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Arsenal <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-7 h-12 text-sm font-semibold border-white/10 hover:bg-white/5 active:scale-[0.98] transition-all"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Terminal Console
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Interactive Realtime Terminal Simulator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-5 w-full aspect-[4/3] rounded-2xl bg-black/60 border border-white/5 backdrop-blur-xl shadow-2xl p-4 flex flex-col font-mono text-[10px] overflow-hidden"
        >
          {/* Mac Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="text-muted-foreground text-[8px] tracking-wider uppercase">vibe-check.log</div>
            <span className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center">
              <Terminal className="w-2.5 h-2.5 text-primary" />
            </span>
          </div>

          {/* Terminal Console Logs */}
          <div ref={terminalContainerRef} className="flex-1 overflow-y-auto space-y-2 text-gray-300 pr-2">
            <AnimatePresence>
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`${log.startsWith("vikash@vibe") ? "text-primary/95 font-bold" : log.startsWith("✔") || log.startsWith("🚀") ? "text-emerald-400" : "text-gray-300"}`}
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="cursor-blink inline-block text-primary" />
          </div>
        </motion.div>
      </section>

      {/* Numerical Stats Showcase */}
      <section className="relative z-10 w-full border-y border-white/5 bg-black/40 py-8 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/5">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-black text-white">26+</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Automations Built</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-3xl font-black text-white">10+</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">SaaS Products</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-3xl font-black text-white">1M+</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Daily Requests</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="text-3xl font-black text-primary">0</h3>
            <p className="text-[10px] text-primary/80 uppercase tracking-widest mt-1">Manual Bugs</p>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Projects Showcase */}
      <section id="projects" className="relative z-10 w-full max-w-5xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight">Featured Automations</h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto mt-2">
            A deep-dive into my top 4 production-grade AI agent platforms. Built using elite webhook triggers and cloud databases.
          </p>
        </div>

        {/* The 2x2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Card 1: AssistMint (Double Columns on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleCardMouseMove}
            onClick={() => setSelectedProject(projects[0])}
            className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col md:flex-row gap-6 hover:border-primary/40 transition-all spotlight-card spotlight-border cursor-pointer"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">WhatsApp SaaS</Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3 text-yellow-400" /> Active
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AssistMint</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  A high-end WhatsApp AI ordering agent. Handles catalog listing, user selections, address matching, and generates Cashfree checkout links dynamically. Fully wired with CRM logging.
                </p>
              </div>
              <div className="flex gap-2 relative z-20">
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(projects[0]);
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="rounded-full text-xs px-4"
                >
                  Case Study <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                </Button>
                <Link 
                  href="https://assistmint.novamintnetworks.in" 
                  target="_blank" 
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="inline-block"
                >
                  <Button size="sm" variant="outline" className="rounded-full text-xs px-4 border-white/10 hover:bg-white/5">
                    Launch App <ExternalLink className="w-3 h-3 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-56 shrink-0 flex items-center justify-center pointer-events-none">
              <WhatsAppSimulator />
            </div>
          </motion.div>

          {/* Card 2: ChirplyMint (Single Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseMove={handleCardMouseMove}
            onClick={() => setSelectedProject(projects[1])}
            className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-primary/40 transition-all spotlight-card spotlight-border cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Social automation</Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">ChirplyMint</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Instagram and social platform AI-response funnel. Handles auto-reply routing, tags users based on intent, and automates marketing campaigns.
              </p>
            </div>
            <div className="mb-4 pointer-events-none">
              <InstagramNodeRouter />
            </div>
            <div className="relative z-20 mt-2 flex gap-2">
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(projects[1]);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex-1 rounded-full text-xs"
              >
                Case Study <Sparkles className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <Link 
                href="https://chirplymint.novamintnetworks.in" 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex-1"
              >
                <Button size="sm" variant="outline" className="w-full rounded-full text-xs border-white/10 hover:bg-white/5">
                  Launch App <ExternalLink className="w-3 h-3 ml-1.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 3: AI-TradeMind (Single Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleCardMouseMove}
            onClick={() => setSelectedProject(projects[2])}
            className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-primary/40 transition-all spotlight-card spotlight-border cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">AI Trading Engine</Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI-TradeMind</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Algorithmic trading predictor using multi-LLM engine routing. Dynamically queries Groq Llama3 and Gemini Pro for real-time risk assessment.
              </p>
            </div>
            <div className="mb-4 pointer-events-none">
              <TradeGraphSimulator />
            </div>
            <div className="relative z-20 mt-2 flex gap-2">
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(projects[2]);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex-1 rounded-full text-xs"
              >
                Case Study <Sparkles className="w-3.5 h-3.5 ml-1.5" />
              </Button>
              <Link 
                href="https://ai-trademind.novamintnetworks.in" 
                target="_blank" 
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="flex-1"
              >
                <Button size="sm" variant="outline" className="w-full rounded-full text-xs border-white/10 hover:bg-white/5">
                  Launch App <ExternalLink className="w-3 h-3 ml-1.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Card 4: ClipMint (Double Columns on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseMove={handleCardMouseMove}
            onClick={() => setSelectedProject(projects[4])}
            className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col md:flex-row gap-6 hover:border-primary/40 transition-all spotlight-card spotlight-border cursor-pointer"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Video Automation</Badge>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-blue-400" /> GPU Powered
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">ClipMint</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  Fully automated meme and reel renderer. Integrates Remotion to composite overlays, transcribes audio using Whisper models, and burns custom kinetic typography styles dynamically.
                </p>
              </div>
              <div className="flex gap-2 relative z-20">
                <Button 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(projects[4]);
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="rounded-full text-xs px-4"
                >
                  Case Study <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                </Button>
                <Link 
                  href="https://clipmint.novamintnetworks.in" 
                  target="_blank" 
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="inline-block"
                >
                  <Button size="sm" variant="outline" className="rounded-full text-xs px-4 border-white/10 hover:bg-white/5">
                    Launch App <ExternalLink className="w-3 h-3 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-56 shrink-0 flex items-center justify-center pointer-events-none">
              <SubtitleVideoTimeline />
            </div>
          </motion.div>

        </div>

        {/* Collapsible Drawer for Remaining 4 Projects */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            className="rounded-full border-white/10 hover:bg-white/5 text-xs px-6"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Hide Remaining Projects <ChevronUp className="w-3.5 h-3.5 ml-1.5" /></>
            ) : (
              <>View All 8 Core Projects <ChevronDown className="w-3.5 h-3.5 ml-1.5" /></>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {projects.slice(4).map((project) => (
                  <div 
                    key={project.id} 
                    onMouseMove={handleCardMouseMove}
                    onClick={() => setSelectedProject(project)}
                    className="group relative overflow-hidden rounded-xl border border-white/5 bg-zinc-950/60 p-4 hover:border-primary/40 transition-all flex flex-col justify-between cursor-pointer spotlight-card spotlight-border"
                  >
                    <div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] mb-2">{project.category}</Badge>
                      <h4 className="text-xs font-bold text-white mb-1">{project.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-normal">{project.description}</p>
                    </div>
                    <div className="pt-3 relative z-20">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="w-full justify-between p-0 h-6 text-[9px] text-muted-foreground hover:text-primary transition-colors"
                      >
                        Read Case Study <Sparkles className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Tech Stack Console Panel */}
      <section id="tech" className="relative z-10 w-full max-w-5xl px-6 py-12">
        <div className="border border-white/5 bg-[#0a0e12]/60 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden spotlight-card spotlight-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary animate-pulse" />
                Vibe Coding Stack Console
              </h3>
              <p className="text-[10px] text-muted-foreground">Active orchestration layers supporting production apps.</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px]">v1.4.2-stable</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Group 1 */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Intelligence Layer</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 hover:border-emerald-500/20 transition-all">
                  <span className="text-[10px] text-white">Groq API (Llama3)</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Primary</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-white">Gemini Pro API</span>
                  <span className="text-[9px] text-muted-foreground">Fallback</span>
                </div>
              </div>
            </div>
            {/* Group 2 */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Workflow Orchestration</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 hover:border-emerald-500/20 transition-all">
                  <span className="text-[10px] text-white">n8n Automations</span>
                  <span className="text-[9px] text-primary">Webhooks</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-white">Python Core Scripts</span>
                  <span className="text-[9px] text-muted-foreground">Utility</span>
                </div>
              </div>
            </div>
            {/* Group 3 */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Database & Backend</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 hover:border-emerald-500/20 transition-all">
                  <span className="text-[10px] text-white">Supabase PostgreSQL</span>
                  <span className="text-[9px] text-primary">RLS Auth</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-white">Cashfree Checkout</span>
                  <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Payments</span>
                </div>
              </div>
            </div>
            {/* Group 4 */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Delivery / Hosting</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5 hover:border-emerald-500/20 transition-all">
                  <span className="text-[10px] text-white">Vercel Deployments</span>
                  <span className="text-[9px] text-primary">CI/CD</span>
                </div>
                <div className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-white/5">
                  <span className="text-[10px] text-white">Resend SMTP</span>
                  <span className="text-[9px] text-muted-foreground">Transactional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Contact Console Section */}
      <section id="contact" className="relative z-10 w-full max-w-5xl px-6 py-20 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Header Info Left */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tight">Initiate Connection</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Have an idea for a custom workflow, AI agent pipeline, or dynamic SaaS product? Let's connect and vibe out a solution at high speed.
            </p>
            <div className="space-y-2 pt-2 text-xs">
              <Link href="https://mail.google.com/mail/?view=cm&fs=1&to=VikashMeena52420@gmail.com" target="_blank" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <Mail className="w-4 h-4 text-primary" /> VikashMeena52420@gmail.com
              </Link>
              <Link href="https://www.linkedin.com/in/vikash-meena-39333b29a" target="_blank" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <Linkedin className="w-4 h-4 text-primary" /> linkedin.com/in/vikash-meena-39333b29a
              </Link>
            </div>
          </div>

          {/* Interactive Console Prompt Right */}
          <div className="lg:col-span-7 bg-black/80 rounded-2xl border border-white/5 p-4 flex flex-col font-mono text-[10px] overflow-hidden aspect-[4/3] relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <span className="text-[8px] text-muted-foreground">vikash@vibe-console:~</span>
            </div>

            {/* Presets Console Menu */}
            <div className="flex gap-2 mb-4 bg-zinc-950 p-1.5 rounded border border-white/5">
              <button 
                onClick={() => runCommand("/hire")} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex-1 text-center py-1.5 rounded font-bold transition-all ${activeCommand === "/hire" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
              >
                /hire
              </button>
              <button 
                onClick={() => runCommand("/manifesto")} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex-1 text-center py-1.5 rounded font-bold transition-all ${activeCommand === "/manifesto" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
              >
                /manifesto
              </button>
              <button 
                onClick={() => runCommand("/logs")} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex-1 text-center py-1.5 rounded font-bold transition-all ${activeCommand === "/logs" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
              >
                /logs
              </button>
            </div>

            {/* Console Output area */}
            <div ref={terminalContainerRef} className="flex-1 bg-zinc-950/70 rounded p-3 text-gray-300 overflow-y-auto whitespace-pre-wrap leading-normal font-mono select-text">
              {consoleHistory.map((item, idx: number) => (
                <div key={idx} className={item.type === "input" ? "text-primary font-bold" : "text-gray-300"}>
                  {item.text}
                </div>
              ))}
            </div>

            {/* Email form trigger */}
            <div className="mt-3 flex gap-2">
              <span className="text-primary font-bold flex items-center">vibe$</span>
              <input 
                type="text" 
                placeholder="Type your message & press send..." 
                className="flex-1 bg-zinc-900 border border-white/5 rounded px-2.5 py-1 text-white outline-none focus:border-primary/45 transition-colors placeholder:text-muted-foreground/60"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = e.currentTarget.value.trim();
                    if (val) {
                      toast.success("Message compiled! Redirecting to Gmail...");
                      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=VikashMeena52420@gmail.com&su=Vibe+Coding+Inquiry&body=${encodeURIComponent(val)}`, "_blank");
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
              <Button size="sm" className="px-3" onClick={() => {
                toast.success("Opening connection via Gmail...");
                window.open("https://mail.google.com/mail/?view=cm&fs=1&to=VikashMeena52420@gmail.com", "_blank");
              }}>
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Project Details Slide-Over Drawer */}
      <AnimatePresence>
        {selectedProject && (() => {
          const detail = PROJECT_DETAILS[selectedProject.id] || {
            metrics: ["Active Platform", "Highly Scalable", "Low Latency"],
            techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
            challenge: "Aggregating system state while ensuring extreme reliability and premium front-end performance.",
            solution: "Designed a clean, lightweight serverless architecture with custom cache revalidation layers.",
            architecture: ["Client API request handler", "Server caching proxy", "Database schema layer"]
          };
          return (
            <>
              {/* Backdrop blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md cursor-pointer"
              />
              
              {/* Sliding Drawer Container */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg bg-[#0a0f12]/95 border-l border-white/5 backdrop-blur-xl p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
              >
                <div>
                  {/* Drawer Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] mb-2">{selectedProject.category}</Badge>
                      <h3 className="text-xl font-black text-white">{selectedProject.title}</h3>
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setSelectedProject(null)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="rounded-full border-white/10 hover:bg-white/5 h-8 w-8 flex items-center justify-center p-0 text-white"
                    >
                      ✕
                    </Button>
                  </div>

                  {/* Metrics Badge row */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {detail.metrics.map((metric: string, i: number) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                        ✓ {metric}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  <div className="space-y-6">
                    {/* Challenge & Solution */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">The Core Challenge</h4>
                      <p className="text-xs text-red-400 bg-red-950/20 border border-red-500/10 p-3 rounded-lg leading-relaxed">
                        {detail.challenge}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Our Solution</h4>
                      <p className="text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-500/10 p-3 rounded-lg leading-relaxed">
                        {detail.solution}
                      </p>
                    </div>

                    {/* Architecture diagram visualization */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Architecture Map</h4>
                      <div className="bg-black/40 border border-white/5 rounded-lg p-3 space-y-2 font-mono text-[9px]">
                        {detail.architecture.map((step: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-gray-300">
                            <span className="text-primary font-bold">{idx + 1}.</span>
                            <span>{step}</span>
                            {idx < detail.architecture.length - 1 && <span className="text-muted-foreground">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack List */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Orchestration Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {detail.techStack.map((tech: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-zinc-900 border border-white/5 text-[10px] text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 pt-4 border-t border-white/5 flex gap-3">
                  <Button 
                    className="flex-1 rounded-full text-xs" 
                    onClick={() => {
                      toast.success("Initializing pipeline walkthrough...");
                      setSelectedProject(null);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Discuss This Pipeline <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                  <Link 
                    href={`https://${selectedProject.id}.novamintnetworks.in`} 
                    target="_blank" 
                    className="flex-1"
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <Button variant="outline" className="w-full rounded-full text-xs border-white/10 hover:bg-white/5">
                      Launch App <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-[10px] text-muted-foreground border-t border-white/5 bg-[#070b0e]">
        <p>© {new Date().getFullYear()} Vikash Meena. Orchestrated with 100% Vibe Coding. Zero manual code.</p>
      </footer>

    </main>
  );
}
