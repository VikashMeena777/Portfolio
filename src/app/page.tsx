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
  Video, RefreshCw, FolderGit2, Github, Send,
  ChevronDown, ChevronUp, Check, Layers, Code, Play
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

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

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [activeCommand, setActiveCommand] = useState("/hire");
  const [commandOutput, setCommandOutput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

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
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Handle preset Command Prompt interaction
  const runCommand = (cmd: string) => {
    setActiveCommand(cmd);
    if (cmd === "/hire") {
      setCommandOutput(`
Running: fetch_vikash_info.sh
-----------------------------
🚀 Vikash Meena
💼 AI Automation Solution Provider
📞 Quick Contacts:
   - Email: contact@vikashmeena.com
   - LinkedIn: linkedin.com/in/vikashmeena
⚡ Services: n8n pipelines, Supabase apps, AI WhatsApp bots, custom SaaS.
      `);
    } else if (cmd === "/manifesto") {
      setCommandOutput(`
Running: cat manifesto.txt
-------------------------
"Vibe Coding is not about writing syntax; it is about describing goals and orchestrating machine minds to shape reality. We do not edit files line-by-line; we align vibes with agents to output production-grade software."
      `);
    } else if (cmd === "/logs") {
      setCommandOutput(`
Running: tail -n 5 automation.log
---------------------------------
[07:12:45] AssistMint DB Insert - SUCCESS
[08:14:22] ChirplyMint Instagram DM - DELIVERED
[09:30:10] AI-TradeMind Prediction - Groq 0.1s
[10:02:55] Vibe Check - 100% STABLE
      `);
    }
  };

  useEffect(() => {
    runCommand("/hire");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#070b0e] text-foreground font-sans overflow-x-hidden relative">
      
      {/* Background Neon Grid Effect */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-[0.15] pointer-events-none" />
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
          <Link href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              Vikash <span className="text-primary font-black">Meena</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="#tech" className="hover:text-primary transition-colors">Tech Console</Link>
            <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] bg-primary/10 border border-primary/20 text-primary font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              🟢 Currently Vibing
            </span>
            <Button size="sm" className="rounded-full px-4 text-xs font-semibold" onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
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
          <div className="flex-1 overflow-y-auto space-y-2 text-gray-300 pr-2">
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
            <div ref={terminalEndRef} />
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
            className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col md:flex-row gap-6 hover:border-primary/40 transition-colors"
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
              <div className="flex gap-2">
                <Link href="https://github.com" target="_blank" className="inline-block">
                  <Button size="sm" variant="outline" className="rounded-full text-xs px-4">
                    Code Repo <Github className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-56 shrink-0 flex items-center justify-center">
              <WhatsAppSimulator />
            </div>
          </motion.div>

          {/* Card 2: ChirplyMint (Single Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-primary/40 transition-colors"
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
            <div className="mb-4">
              <InstagramNodeRouter />
            </div>
          </motion.div>

          {/* Card 3: AI-TradeMind (Single Column) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col justify-between hover:border-primary/40 transition-colors"
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
            <div className="mb-4">
              <TradeGraphSimulator />
            </div>
          </motion.div>

          {/* Card 4: ClipMint (Double Columns on Desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-8 group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/60 p-6 flex flex-col md:flex-row gap-6 hover:border-primary/40 transition-colors"
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
              <div className="flex gap-2">
                <Link href="https://github.com" target="_blank" className="inline-block">
                  <Button size="sm" variant="outline" className="rounded-full text-xs px-4">
                    View Pipeline <ExternalLink className="w-3 h-3 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-56 shrink-0 flex items-center justify-center">
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
                {projects.slice(4).map((project, i) => (
                  <Card key={project.id} className="border-white/5 bg-zinc-950/60 p-4 hover:border-primary/30 transition-all flex flex-col justify-between">
                    <div>
                      <Badge className="bg-primary/5 text-primary border-primary/10 text-[9px] mb-2">{project.category}</Badge>
                      <h4 className="text-xs font-bold text-white mb-1">{project.title}</h4>
                      <p className="text-[10px] text-muted-foreground leading-normal">{project.description}</p>
                    </div>
                    <div className="pt-3">
                      <Button variant="ghost" size="sm" className="w-full justify-between p-0 h-6 text-[9px] hover:bg-transparent hover:text-primary">
                        Details <ExternalLink className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Tech Stack Console Panel */}
      <section id="tech" className="relative z-10 w-full max-w-5xl px-6 py-12">
        <div className="border border-white/5 bg-zinc-950/50 rounded-2xl p-6 backdrop-blur-md">
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
              <Link href="mailto:contact@vikashmeena.com" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4" /> contact@vikashmeena.com
              </Link>
              <Link href="https://linkedin.com/in/vikashmeena" target="_blank" className="flex items-center gap-2.5 text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" /> linkedin.com/in/vikashmeena
              </Link>
            </div>
          </div>

          {/* Interactive Console Prompt Right */}
          <div className="lg:col-span-7 bg-black/80 rounded-2xl border border-white/5 p-4 flex flex-col font-mono text-[10px] overflow-hidden aspect-[4/3]">
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
                className={`flex-1 text-center py-1.5 rounded font-bold transition-all ${activeCommand === "/hire" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
              >
                /hire
              </button>
              <button 
                onClick={() => runCommand("/manifesto")} 
                className={`flex-1 text-center py-1.5 rounded font-bold transition-all ${activeCommand === "/manifesto" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
              >
                /manifesto
              </button>
              <button 
                onClick={() => runCommand("/logs")} 
                className={`flex-1 text-center py-1.5 rounded font-bold transition-all ${activeCommand === "/logs" ? "bg-primary text-black" : "text-muted-foreground hover:text-white"}`}
              >
                /logs
              </button>
            </div>

            {/* Console Output area */}
            <div className="flex-1 bg-zinc-950/70 rounded p-3 text-gray-300 overflow-y-auto whitespace-pre-wrap leading-normal font-mono select-text">
              {commandOutput}
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
                      toast.success("Message compiled! Redirecting to mail client...");
                      window.location.href = `mailto:contact@vikashmeena.com?subject=Vibe Coding Inquiry&body=${encodeURIComponent(val)}`;
                      e.currentTarget.value = "";
                    }
                  }
                }}
              />
              <Button size="sm" className="px-3" onClick={() => {
                toast.success("Opening connection via email...");
                window.location.href = `mailto:contact@vikashmeena.com`;
              }}>
                <Send className="w-3 h-3" />
              </Button>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center text-[10px] text-muted-foreground border-t border-white/5 bg-[#070b0e]">
        <p>© {new Date().getFullYear()} Vikash Meena. Orchestrated with 100% Vibe Coding. Zero manual code.</p>
      </footer>

    </main>
  );
}
