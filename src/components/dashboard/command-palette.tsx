"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { searchTools, tools, categories } from "@/lib/tools-data";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, Command, X } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.length > 0 ? searchTools(query).slice(0, 8) : tools.slice(0, 8);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape") setCommandPaletteOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  useEffect(() => { setSelectedIndex(0); }, [query]);

  const handleSelect = (toolId: string) => {
    setCommandPaletteOpen(false);
    router.push(`/dashboard/tools/${toolId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[selectedIndex]) { handleSelect(results[selectedIndex].id); }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 200 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
              width: "min(580px, 90vw)", zIndex: 201,
              background: "var(--bg-card)", borderRadius: "var(--radius-xl)",
              border: "1px solid var(--border)", boxShadow: "var(--shadow-xl)",
              overflow: "hidden",
            }}
          >
            {/* Search input */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
              <Search size={20} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search 200+ tools..."
                style={{
                  flex: 1, border: "none", outline: "none", background: "transparent",
                  fontSize: 16, color: "var(--text-primary)", fontFamily: "var(--font-sans)",
                }}
              />
              <button onClick={() => setCommandPaletteOpen(false)}
                style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", cursor: "pointer", color: "var(--text-muted)", fontSize: 12 }}>
                ESC
              </button>
            </div>

            {/* Results */}
            <div style={{ maxHeight: 400, overflow: "auto", padding: "8px" }}>
              {query.length === 0 && (
                <div style={{ padding: "8px 12px", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Popular Tools
                  </span>
                </div>
              )}
              {results.map((tool, i) => (
                <button
                  key={tool.id}
                  onClick={() => handleSelect(tool.id)}
                  onMouseEnter={() => setSelectedIndex(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, width: "100%",
                    padding: "10px 12px", borderRadius: "var(--radius-md)", border: "none",
                    background: i === selectedIndex ? "var(--bg-subtle)" : "transparent",
                    cursor: "pointer", textAlign: "left", transition: "all 0.1s",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: "var(--radius-sm)",
                    background: tool.gradient, display: "flex", alignItems: "center",
                    justifyContent: "center", color: "white", flexShrink: 0,
                    transform: i === selectedIndex ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}>
                    <DynamicIcon name={tool.iconName} size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 6 }}>
                      {tool.name}
                      {tool.isAI && <Sparkles size={12} style={{ color: "var(--primary)" }} />}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {tool.description}
                    </div>
                  </div>
                  <ArrowRight size={14} style={{ color: "var(--text-muted)", flexShrink: 0, opacity: i === selectedIndex ? 1 : 0 }} />
                </button>
              ))}
              {query.length > 0 && results.length === 0 && (
                <div style={{ padding: 32, textAlign: "center" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: 14 }}>No tools found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
