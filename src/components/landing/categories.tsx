"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/tools-data";
import { ArrowRight } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";

export function CategoriesSection() {
  return (
    <section className="section-lg" style={{ background: "var(--bg)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <span className="badge badge-primary" style={{ marginBottom: 16, display: "inline-flex", padding: "6px 16px" }}>
            15 Categories
          </span>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800, letterSpacing: "-1px", color: "var(--text-primary)",
          }}>
            Tools for <span className="gradient-text">Every Need</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 18, marginTop: 12, maxWidth: 560, margin: "12px auto 0" }}>
            From PDF editing to AI content generation — find the perfect tool for any task.
          </p>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link href={`/dashboard?category=${cat.id}`} style={{ textDecoration: "none" }}>
                <div
                  className="card"
                  style={{ padding: 24, cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 16 }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: "var(--radius-md)",
                    background: cat.gradient, display: "flex", alignItems: "center",
                    justifyContent: "center", flexShrink: 0, color: "white",
                  }}>
                    <DynamicIcon name={cat.iconName} size={22} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>{cat.name}</h3>
                      <ArrowRight size={16} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 4, lineHeight: 1.5 }}>
                      {cat.description}
                    </p>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8, display: "inline-block" }}>
                      {cat.toolCount} tools
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
