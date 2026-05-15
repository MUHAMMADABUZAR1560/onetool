"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { popularTools } from "@/lib/tools-data";
import { ArrowRight, Sparkles, Lock } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";

export function PopularToolsSection() {
  return (
    <section className="section-lg" style={{ background: "var(--bg-elevated)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: 16, display: "inline-flex", padding: "6px 16px" }}>
            <Sparkles size={14} /> Most Popular
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800, letterSpacing: "-1px", color: "var(--text-primary)",
          }}>
            Popular <span className="gradient-text">Tools</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 18, marginTop: 12 }}>
            The tools people love the most — try them free today.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}>
          {popularTools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link href={`/dashboard/tools/${tool.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{
                  padding: 24, textAlign: "center", cursor: "pointer",
                  position: "relative", overflow: "hidden",
                }}>
                  {tool.isPremium && (
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                      borderRadius: "var(--radius-full)", padding: "3px 8px",
                      display: "flex", alignItems: "center", gap: 3,
                    }}>
                      <Lock size={10} color="white" />
                      <span style={{ fontSize: 10, fontWeight: 600, color: "white" }}>PRO</span>
                    </div>
                  )}
                  {tool.isAI && (
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                      background: "var(--primary-light)", borderRadius: "var(--radius-full)",
                      padding: "3px 8px", display: "flex", alignItems: "center", gap: 3,
                    }}>
                      <Sparkles size={10} style={{ color: "var(--primary)" }} />
                      <span style={{ fontSize: 10, fontWeight: 600, color: "var(--primary)" }}>AI</span>
                    </div>
                  )}
                  <div style={{
                    width: 56, height: 56, borderRadius: "var(--radius-lg)",
                    background: tool.gradient, display: "flex", alignItems: "center",
                    justifyContent: "center", margin: "0 auto 16px",
                    boxShadow: `0 4px 16px ${tool.color}30`,
                    color: "white",
                  }}>
                    <DynamicIcon name={tool.iconName} size={28} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                    {tool.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    {tool.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ textDecoration: "none", gap: 8 }}>
            View All 200+ Tools <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
