"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, FileText, Trash2 } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import Link from "next/link";
import { featuredTools } from "@/lib/tools-data";

const mockRecent = featuredTools.slice(0, 8).map((tool, i) => ({
  ...tool,
  usedAt: new Date(Date.now() - i * 1000 * 60 * 60 * (i + 1)).toISOString(),
  status: i === 0 ? "processing" : "completed",
}));

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function RecentPage() {
  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          Recent Activity
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Your processing history from the last 30 days.
        </p>
      </motion.div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
            {mockRecent.length} recent jobs
          </span>
          <button className="btn btn-ghost btn-sm" style={{ gap: 6, color: "var(--error)" }}>
            <Trash2 size={14} /> Clear History
          </button>
        </div>

        {mockRecent.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "16px 24px",
              borderBottom: i < mockRecent.length - 1 ? "1px solid var(--border)" : "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: item.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
              <DynamicIcon name={item.iconName} size={20} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
                {item.name}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={12} />
                {timeAgo(item.usedAt)}
                <span style={{ color: "var(--border)" }}>·</span>
                <span style={{
                  color: item.status === "completed" ? "var(--success)" : "var(--warning)",
                  fontWeight: 500,
                }}>
                  {item.status === "completed" ? "Completed" : "Processing"}
                </span>
              </div>
            </div>

            <Link href={`/dashboard/tools/${item.id}`} className="btn btn-ghost btn-sm" style={{ gap: 6, flexShrink: 0 }}>
              <ArrowRight size={14} /> Open
            </Link>
          </motion.div>
        ))}

        {mockRecent.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 24px" }}>
            <Clock size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
            <p style={{ color: "var(--text-secondary)" }}>No recent activity yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
