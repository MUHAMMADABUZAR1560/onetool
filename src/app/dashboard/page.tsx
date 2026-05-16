"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { categories, popularTools, featuredTools, tools, type ToolCategory } from "@/lib/tools-data";
import { useAppStore } from "@/lib/store";
import {
  Sparkles, ArrowRight, Clock, Zap,
  FileText,
} from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useAppUser } from "@/lib/use-app-user";
import { RecentActivity } from "@/components/dashboard/recent-activity";

const quickActions = [
  { icon: "FileText", label: "Merge PDF", id: "merge-pdf", color: "#F43F5E" },
  { icon: "UserMinus", label: "Remove BG", id: "bg-remover", color: "#8B5CF6" },
  { icon: "PenTool", label: "AI Writer", id: "ai-writer", color: "#6366F1" },
  { icon: "FileArchive", label: "Compress", id: "image-compress", color: "#06B6D4" },
  { icon: "Bot", label: "AI Chat", id: "ai-chatbot", color: "#4F46E5" },
  { icon: "Braces", label: "JSON", id: "json-formatter", color: "#14B8A6" },
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | "all">("all");
  const { user } = useAppUser();

  const filteredTools = activeCategory === "all"
    ? tools.slice(0, 16)
    : tools.filter((t) => t.category === activeCategory).slice(0, 16);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", paddingBottom: 64 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40 }}>
        {/* Main Content */}
        <div>
          {/* Welcome section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginBottom: 32 }}
          >
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
              color: "var(--text-primary)", letterSpacing: "-0.5px",
            }}>
              {getGreeting()}, {user?.firstName || "there"}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
              What would you like to work on today?
            </p>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: 12,
              marginBottom: 40,
            }}
          >
            {quickActions.map((action, i) => (
              <Link key={action.id} href={`/dashboard/tools/${action.id}`} style={{ textDecoration: "none" }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  className="card"
                  style={{
                    padding: "16px 14px", display: "flex", alignItems: "center",
                    gap: 10, cursor: "pointer",
                  }}
                >
                  <div style={{ color: action.color, display: "flex" }}>
                    <DynamicIcon name={action.icon} size={18} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                    {action.label}
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* AI Assistant Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: "var(--gradient-primary)",
              borderRadius: "var(--radius-xl)",
              padding: "24px 28px",
              marginBottom: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <Sparkles size={18} color="white" />
                <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>
                  AI Assistant
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, maxWidth: 360 }}>
                Describe your task and let AI pick the right tool for you.
              </p>
            </div>
            <Link href="/dashboard/ai" style={{
              textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: "var(--radius-md)",
              background: "white", color: "#2563EB", fontWeight: 600, fontSize: 13,
            }}>
              Ask AI <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Category Filter */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>
                Tools Registry
              </h2>
              <Link href="/dashboard/explore" style={{ color: "var(--primary)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
                Browse All 120+ →
              </Link>
            </div>

            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
              <button
                onClick={() => setActiveCategory("all")}
                style={{
                  padding: "6px 14px", borderRadius: "var(--radius-full)",
                  fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                  background: activeCategory === "all" ? "var(--primary)" : "var(--bg-subtle)",
                  color: activeCategory === "all" ? "white" : "var(--text-secondary)",
                  border: "none", cursor: "pointer"
                }}
              >
                All
              </button>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "6px 14px", borderRadius: "var(--radius-full)",
                    fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                    background: activeCategory === cat.id ? "var(--primary)" : "var(--bg-subtle)",
                    color: activeCategory === cat.id ? "white" : "var(--text-secondary)",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6
                  }}
                >
                  <DynamicIcon name={cat.iconName} size={12} />
                  {cat.name.replace(" Tools", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
            {filteredTools.map((tool, i) => (
              <Link key={tool.id} href={`/dashboard/tools/${tool.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 16, height: "100%", position: "relative" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", marginBottom: 12 }}>
                    <DynamicIcon name={tool.iconName} size={20} />
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{tool.name}</h3>
                  <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4 }}>{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div>
          <div style={{ position: "sticky", top: 104 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} style={{ color: "var(--primary)" }} /> Recent Activity
            </h2>
            <RecentActivity />

            <div className="card" style={{ marginTop: 24, padding: 20, background: "var(--bg-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Zap size={18} style={{ color: "var(--warning)" }} />
                <h3 style={{ fontSize: 14, fontWeight: 700 }}>Upgrade to Pro</h3>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 16 }}>
                Get unlimited credits, faster AI processing, and access to all 120+ tools.
              </p>
              <Link href="/dashboard/billing" className="btn btn-primary btn-sm" style={{ width: "100%", textDecoration: "none" }}>
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
