"use client";

import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import Link from "next/link";
import { popularTools } from "@/lib/tools-data";

export default function FavoritesPage() {
  // In production this would come from user's saved favorites in DB
  const favorites = popularTools.slice(0, 6);

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          Favorites
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Your pinned tools for quick access.
        </p>
      </motion.div>

      {favorites.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {favorites.map((tool, i) => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/dashboard/tools/${tool.id}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 24, textAlign: "center", position: "relative" }}>
                  <button
                    onClick={(e) => e.preventDefault()}
                    style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", cursor: "pointer", color: "#F59E0B" }}
                  >
                    <Star size={16} fill="#F59E0B" />
                  </button>
                  <div style={{ width: 52, height: 52, borderRadius: "var(--radius-md)", background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: "white", boxShadow: `0 4px 14px ${tool.color}30` }}>
                    <DynamicIcon name={tool.iconName} size={24} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{tool.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{tool.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "100px 24px" }}>
          <Star size={56} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
          <h3 style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>No favorites yet</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: 24 }}>Star tools you use often to pin them here.</p>
          <Link href="/dashboard/explore" className="btn btn-primary" style={{ textDecoration: "none", gap: 8 }}>
            <Sparkles size={16} /> Explore Tools
          </Link>
        </div>
      )}
    </div>
  );
}
