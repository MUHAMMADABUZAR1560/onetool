"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Star, FileText, Image as ImageIcon, Video, Bot, Briefcase, Music, CheckCircle2 } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";

const floatingTools = [
  { icon: "FileText", x: "10%", y: "20%", delay: 0, color: "var(--error)" },
  { icon: "Image", x: "85%", y: "15%", delay: 0.5, color: "var(--primary)" },
  { icon: "Video", x: "90%", y: "65%", delay: 1, color: "var(--accent)" },
  { icon: "Bot", x: "5%", y: "70%", delay: 1.5, color: "var(--warning)" },
  { icon: "Briefcase", x: "75%", y: "85%", delay: 2, color: "var(--success)" },
  { icon: "Music", x: "15%", y: "85%", delay: 0.8, color: "var(--primary)" },
];

export function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--gradient-hero)",
        paddingTop: 80,
      }}
    >
      {/* Ambient glow orbs */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
          top: "-10%", left: "-10%",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          bottom: "-5%", right: "-5%",
        }} />
      </div>

      {/* Floating tool icons */}
      {floatingTools.map((tool, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: tool.delay + 0.5, duration: 0.6, ease: "backOut" }}
          style={{
            position: "absolute",
            left: tool.x,
            top: tool.y,
            filter: "blur(0px)",
            pointerEvents: "none",
            color: tool.color,
          }}
          className="animate-float"
        >
          <DynamicIcon name={tool.icon} size={32} strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.15,
        backgroundImage: "radial-gradient(circle, var(--text-muted) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="badge badge-primary"
            style={{ padding: "8px 20px", fontSize: 13, gap: 8, marginBottom: 24, display: "inline-flex", borderRadius: "var(--radius-full)", background: "var(--bg-glass)", border: "1px solid var(--border)" }}
          >
            <Sparkles size={14} className="gradient-text" />
            <span className="gradient-text" style={{ fontWeight: 600 }}>200+ AI-Powered Tools in One Platform</span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 7vw, 84px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-3px",
            color: "var(--text-primary)",
            maxWidth: 1000,
            margin: "24px auto 0",
          }}
        >
          Work Faster. <br />
          <span className="gradient-text">Think Bigger.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(17px, 2.5vw, 21px)",
            color: "var(--text-secondary)",
            maxWidth: 680,
            margin: "28px auto 0",
            lineHeight: 1.6,
            fontWeight: 450,
          }}
        >
          The world&apos;s most comprehensive AI tools ecosystem. PDF, image, video, coding, and business tools — all unified in one premium workspace.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 48,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/dashboard"
            className="btn btn-primary btn-lg"
            style={{ textDecoration: "none", gap: 10, padding: "16px 36px", fontSize: 18, borderRadius: "var(--radius-xl)" }}
          >
            Get Started Free
            <ArrowRight size={20} />
          </Link>
          <button className="btn btn-secondary btn-lg" style={{ gap: 10, padding: "16px 36px", fontSize: 18, borderRadius: "var(--radius-xl)", background: "var(--bg-glass)" }}>
            <Play size={18} fill="currentColor" />
            Watch Showreel
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginTop: 64,
            flexWrap: "wrap",
            background: "var(--bg-glass)",
            padding: "12px 24px",
            borderRadius: "var(--radius-full)",
            border: "1px solid var(--border)",
            width: "fit-content",
            margin: "64px auto 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} fill="var(--warning)" color="var(--warning)" />
            ))}
          </div>
          <div style={{ height: 20, width: 1, background: "var(--border)" }} />
          <span style={{ color: "var(--text-secondary)", fontSize: 15, fontWeight: 500 }}>
            Trusted by <strong style={{ color: "var(--text-primary)" }}>100k+</strong> professionals worldwide
          </span>
          <div style={{ height: 20, width: 1, background: "var(--border)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--success)", fontSize: 14, fontWeight: 600 }}>
            <CheckCircle2 size={16} /> Verified Platform
          </div>
        </motion.div>

        {/* Dashboard preview card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: 80,
            padding: 1,
            borderRadius: "var(--radius-2xl)",
            background: "linear-gradient(180deg, var(--border), transparent)",
            maxWidth: 1100,
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              borderRadius: "calc(var(--radius-2xl) - 1px)",
              overflow: "hidden",
              background: "var(--bg-card)",
              padding: 40,
              minHeight: 440,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Glossy overlay */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, white, transparent)", opacity: 0.5 }} />
            
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 20,
              width: "100%",
              maxWidth: 800,
            }}>
              {[
                { icon: "FileText", name: "PDF Suite", color: "#F43F5E" },
                { icon: "Image", name: "Image AI", color: "#8B5CF6" },
                { icon: "Video", name: "Video Lab", color: "#06B6D4" },
                { icon: "Sparkles", name: "AI Studio", color: "#6366F1" },
                { icon: "Code2", name: "Dev Hub", color: "#14B8A6" },
                { icon: "Briefcase", name: "Business", color: "#3B82F6" },
                { icon: "Mic", name: "Audio Engine", color: "#10B981" },
                { icon: "GraduationCap", name: "Education", color: "#F59E0B" },
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.08 }}
                  className="card-flat"
                  style={{
                    padding: 24,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.boxShadow = `0 12px 32px -8px ${item.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ color: item.color, marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    <DynamicIcon name={item.icon} size={32} strokeWidth={1.5} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.2px" }}>
                    {item.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
