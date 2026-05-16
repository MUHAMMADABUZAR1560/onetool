"use client";

import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import { getToolById } from "@/lib/tools-data";

interface Activity {
  id: string;
  toolId: string;
  status: "COMPLETED" | "FAILED" | "PROCESSING";
  createdAt: string;
}

export function RecentActivity({ activities = [] }: { activities?: Activity[] }) {
  if (activities.length === 0) {
    return (
      <div className="card" style={{ padding: "40px 24px", textAlign: "center" }}>
        <Clock size={32} style={{ color: "var(--text-muted)", margin: "0 auto 12px", opacity: 0.5 }} />
        <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>No recent activity yet.</p>
        <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 4 }}>Try using one of our tools to see it here.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {activities.map((activity, i) => {
        const tool = getToolById(activity.toolId);
        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card"
            style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: tool?.gradient || "var(--bg-subtle)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "white"
            }}>
              <DynamicIcon name={tool?.iconName || "File"} size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{tool?.name || "Unknown Tool"}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {activity.status === "COMPLETED" && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--success)", fontSize: 12, fontWeight: 600 }}>
                  <CheckCircle2 size={14} /> Done
                </div>
              )}
              {activity.status === "FAILED" && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--error)", fontSize: 12, fontWeight: 600 }}>
                  <AlertCircle size={14} /> Failed
                </div>
              )}
              {activity.status === "PROCESSING" && (
                <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--primary)", fontSize: 12, fontWeight: 600 }}>
                  <Loader2 size={14} className="animate-spin" /> Processing
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
