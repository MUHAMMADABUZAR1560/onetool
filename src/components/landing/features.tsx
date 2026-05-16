"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Cpu, Cloud, Users } from "lucide-react";

const features = [
  { icon: <Zap size={24} />, title: "Lightning Fast", desc: "Process files in seconds with edge computing and optimized pipelines.", color: "#F59E0B" },
  { icon: <Cpu size={24} />, title: "AI-Powered", desc: "GPT-4, Claude, and Stable Diffusion integrated across every tool.", color: "#7C3AED" },
  { icon: <Cloud size={24} />, title: "Cloud Storage", desc: "Save, organize, and access your files from any device seamlessly.", color: "#06B6D4" },
  { icon: <Shield size={24} />, title: "Bank-Grade Security", desc: "End-to-end encryption, SOC2 compliance, and secure file processing.", color: "#10B981" },
  { icon: <Globe size={24} />, title: "Works Everywhere", desc: "Web, iOS, Android — your tools follow you on every platform.", color: "#2563EB" },
  { icon: <Users size={24} />, title: "Team Collaboration", desc: "Share workspaces, collaborate in real-time, and manage teams.", color: "#EC4899" },
];

const stats = [
  { value: "200+", label: "Tools Available" },
  { value: "50K+", label: "Active Users" },
  { value: "10M+", label: "Files Processed" },
  { value: "99.9%", label: "Uptime SLA" },
];

export function FeaturesSection() {
  return (
    <section className="section-lg" style={{ background: "var(--bg)" }}>
      <div className="container">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card"
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 1, padding: 0, marginBottom: 80, overflow: "hidden",
            background: "var(--border)",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{
              padding: "32px 24px", textAlign: "center",
              background: "var(--bg-card)",
            }}>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800,
                letterSpacing: "-1px",
              }}>
                <span className="gradient-text">{stat.value}</span>
              </div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800, letterSpacing: "-1px", color: "var(--text-primary)",
          }}>
            Built for <span className="gradient-text">the Future</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 18, marginTop: 12 }}>
            Enterprise-grade infrastructure wrapped in a beautiful experience.
          </p>
        </motion.div>

        {/* Features grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 20,
        }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card"
              style={{ padding: 32 }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: "var(--radius-md)",
                background: `${f.color}15`, color: f.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 20,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
