"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-lg" style={{ background: "var(--bg)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 70%)",
      }} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            padding: "80px 40px",
            borderRadius: "var(--radius-2xl)",
            background: "var(--gradient-primary)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0, opacity: 0.1,
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800, color: "white", letterSpacing: "-1px",
            }}>
              Ready to Supercharge Your Workflow?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
              Join 50,000+ users who replaced dozens of apps with OneTool.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
              <Link href="/dashboard" style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: "var(--radius-lg)", background: "white",
                color: "#2563EB", fontWeight: 600, fontSize: 16,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)", transition: "all 0.2s",
              }}>
                <Sparkles size={18} /> Get Started Free <ArrowRight size={18} />
              </Link>
              <Link href="/pricing" style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
                padding: "14px 28px", borderRadius: "var(--radius-lg)",
                background: "rgba(255,255,255,0.15)", color: "white",
                fontWeight: 600, fontSize: 16, border: "1px solid rgba(255,255,255,0.3)",
              }}>
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
