"use client";

import { motion } from "framer-motion";
import { File, Folder, Download, Trash2, Search, Filter, MoreVertical, FileText, ImageIcon, Video, Music } from "lucide-react";
import { useState } from "react";

const mockFiles = [
  { id: "1", name: "Report_2024.pdf", type: "pdf", size: "2.4 MB", date: "2 hours ago", icon: <FileText size={20} color="#F43F5E" /> },
  { id: "2", name: "Vacation_Photo.png", type: "image", size: "1.1 MB", date: "5 hours ago", icon: <ImageIcon size={20} color="#8B5CF6" /> },
  { id: "3", name: "Promo_Video.mp4", type: "video", size: "12.8 MB", date: "Yesterday", icon: <Video size={20} color="#06B6D4" /> },
  { id: "4", name: "Meeting_Audio.mp3", type: "audio", size: "4.5 MB", date: "2 days ago", icon: <Music size={20} color="#10B981" /> },
];

export default function MyFilesPage() {
  const [query, setQuery] = useState("");

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          My Files
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Manage your uploaded and processed files in one place.
        </p>
      </motion.div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 260, position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            className="input"
            placeholder="Search files..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 40 }}
          />
        </div>
        <button className="btn btn-secondary" style={{ gap: 8 }}>
          <Filter size={16} /> Filters
        </button>
        <button className="btn btn-primary" style={{ gap: 8 }}>
          Upload New
        </button>
      </div>

      {/* Grid vs List could be added here */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--bg-subtle)", textAlign: "left", borderBottom: "1px solid var(--border)" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Name</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Type</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Size</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}></th>
            </tr>
          </thead>
          <tbody>
            {mockFiles.map((file) => (
              <tr key={file.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-subtle)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "12px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {file.icon}
                    <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{file.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 24px", color: "var(--text-secondary)", textTransform: "uppercase", fontSize: 12, fontWeight: 600 }}>{file.type}</td>
                <td style={{ padding: "12px 24px", color: "var(--text-secondary)" }}>{file.size}</td>
                <td style={{ padding: "12px 24px", color: "var(--text-secondary)" }}>{file.date}</td>
                <td style={{ padding: "12px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                    <button className="btn btn-ghost btn-icon btn-sm"><Download size={16} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--error)" }}><Trash2 size={16} /></button>
                    <button className="btn btn-ghost btn-icon btn-sm"><MoreVertical size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {mockFiles.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <Folder size={48} style={{ color: "var(--text-muted)", margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>Your drive is empty</h3>
            <p style={{ color: "var(--text-secondary)" }}>Upload files to start processing them with OneTool.</p>
          </div>
        )}
      </div>
    </div>
  );
}
