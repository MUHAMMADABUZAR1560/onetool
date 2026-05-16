"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { categories, tools } from "@/lib/tools-data";
import { DynamicIcon } from "@/components/dynamic-icon";
import Link from "next/link";
import { Search, Sparkles, Lock, SlidersHorizontal, X } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAIOnly, setShowAIOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filtered = tools.filter((t) => {
    const matchesSearch =
      !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = !selectedCategory || t.category === selectedCategory;
    const matchesAI = !showAIOnly || t.isAI;
    const matchesFree = !showFreeOnly || !t.isPremium;
    return matchesSearch && matchesCat && matchesAI && matchesFree;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          Explore Tools
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Browse and discover 200+ powerful tools across 15 categories.
        </p>
      </motion.div>

      {/* Search & Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="input"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
        <button
          onClick={() => setShowAIOnly(!showAIOnly)}
          className={showAIOnly ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ gap: 6 }}
        >
          <Sparkles size={14} /> AI Only
        </button>
        <button
          onClick={() => setShowFreeOnly(!showFreeOnly)}
          className={showFreeOnly ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ gap: 6 }}
        >
          Free Only
        </button>
        {(searchQuery || selectedCategory || showAIOnly || showFreeOnly) && (
          <button onClick={() => { setSearchQuery(""); setSelectedCategory(null); setShowAIOnly(false); setShowFreeOnly(false); }}
            className="btn btn-ghost btn-sm" style={{ gap: 6, color: "var(--error)" }}>
            <X size={14} /> Clear
          </button>
        )}
      </motion.div>

      {/* Category pills */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        <button
          onClick={() => setSelectedCategory(null)}
          className={!selectedCategory ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
          style={{ borderRadius: "var(--radius-full)" }}
        >
          All Tools
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={selectedCategory === cat.id ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"}
            style={{ borderRadius: "var(--radius-full)", gap: 6 }}
          >
            <DynamicIcon name={cat.iconName} size={13} />
            {cat.name.replace(" Tools", "")}
          </button>
        ))}
      </motion.div>

      {/* Results count */}
      <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 20 }}>
        Showing <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong> tools
      </div>

      {/* Tool grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {filtered.map((tool, i) => (
          <motion.div key={tool.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Link href={`/dashboard/tools/${tool.id}`} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: 20, position: "relative", overflow: "hidden" }}>
                {tool.isPremium && (
                  <div style={{ position: "absolute", top: 10, right: 10, background: "linear-gradient(135deg, #F59E0B, #EF4444)", borderRadius: "var(--radius-full)", padding: "2px 8px", display: "flex", alignItems: "center", gap: 3 }}>
                    <Lock size={9} color="white" />
                    <span style={{ fontSize: 9, fontWeight: 700, color: "white" }}>PRO</span>
                  </div>
                )}
                {tool.isAI && (
                  <div style={{ position: "absolute", top: 10, left: 10, background: "var(--primary-light)", borderRadius: "var(--radius-full)", padding: "2px 8px" }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: "var(--primary)" }}>AI</span>
                  </div>
                )}
                <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", margin: "12px auto 14px", color: "white", boxShadow: `0 4px 12px ${tool.color}30` }}>
                  <DynamicIcon name={tool.iconName} size={22} />
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4, textAlign: "center" }}>{tool.name}</h3>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, textAlign: "center" }}>{tool.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <SlidersHorizontal size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>No tools found</h3>
          <p style={{ color: "var(--text-secondary)" }}>Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
