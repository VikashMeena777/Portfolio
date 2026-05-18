"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ArrowRight, Code2, ExternalLink, Mail, Sparkles } from "lucide-react";
import Link from "next/link";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-[-1] bg-background">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative w-full max-w-5xl px-6 pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/30 bg-primary/10 text-primary backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Zero coding experience. 100% Vibe Coding.
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            I'm <span className="text-gradient">Vikash Meena</span>
            <br />
            The Vibe Coder.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            I am an <strong className="text-foreground font-semibold">AI Automation Solution Provider</strong>. 
            I build production-grade SaaS applications, advanced AI workflows, and multi-platform automations—all without writing a single line of code manually.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/20" onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              View My Arsenal <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base glass hover:bg-white/5" onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              Let's Work Together
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats/Showcase Banner */}
      <section className="w-full border-y border-white/5 bg-background/50 backdrop-blur-md py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-4xl font-bold text-foreground mb-2">26+</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Automations Built</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-4xl font-bold text-foreground mb-2">10+</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">SaaS Products</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-4xl font-bold text-foreground mb-2">∞</h3>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Vibes Encoded</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="text-4xl font-bold text-primary mb-2">100%</h3>
            <p className="text-sm text-primary/80 font-medium uppercase tracking-wider">AI Generated</p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated selection of my 26+ automations and SaaS platforms. Built entirely through AI orchestration and vibe coding.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <Card className="glass-card border-white/5 h-full flex flex-col overflow-hidden group hover:border-primary/50 transition-colors duration-300">
                <CardHeader className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {project.category}
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Code2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <div className="p-6 pt-0 mt-auto">
                  <Button variant="ghost" size="sm" className="w-full justify-between group/btn hover:bg-white/5">
                    View Details
                    <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="glass rounded-full">
            View All 26+ Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-secondary/50 border-t border-white/5 py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's Build the Future</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Whether you need a custom AI agent, a full-scale SaaS platform, or an n8n automation workflow, I can build it at the speed of thought.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:contact@vikashmeena.com">
              <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-lg shadow-primary/20">
                <Mail className="w-5 h-5 mr-2" />
                Email Me
              </Button>
            </Link>
            <Link href="https://linkedin.com/in/vikashmeena" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base glass hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 transition-all">
                <LinkedinIcon className="w-5 h-5 mr-2" />
                Connect on LinkedIn
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-muted-foreground border-t border-white/5">
        <p>© {new Date().getFullYear()} Vikash Meena. Built with 100% Vibe Coding.</p>
      </footer>
    </main>
  );
}
