"use client";

import { useAppUser } from "@/lib/use-app-user";
import { motion } from "framer-motion";
import { User, Bell, Lock, Shield, Globe, Palette, Monitor, Laptop, ExternalLink } from "lucide-react";
import { useAppStore } from "@/lib/store";

const settingsSections = [
  { id: "profile", icon: User, label: "Profile Information", description: "Manage your account details and avatar.", action: "Manage" },
  { id: "notifications", icon: Bell, label: "Notifications", description: "Configure how you receive alerts and updates.", action: "Coming Soon" },
  { id: "security", icon: Lock, label: "Security & Privacy", description: "Update passwords and manage 2FA.", action: "Secure" },
];

export default function SettingsPage() {
  const { theme, toggleTheme } = useAppStore();
  const { user, isLoaded } = useAppUser();

  if (!isLoaded) return null;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", paddingBottom: 80 }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
          color: "var(--text-primary)", letterSpacing: "-0.5px",
        }}>
          Settings
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Manage your account preferences and system configuration.
        </p>
      </motion.div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: 24, marginBottom: 24, display: "flex", alignItems: "center", gap: 20 }}
      >
        <img 
          src={user?.imageUrl} 
          alt={user?.fullName || "User"} 
          style={{ width: 64, height: 64, borderRadius: "var(--radius-full)", border: "2px solid var(--primary-light)" }} 
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{user?.fullName || "OneTool User"}</h3>
          <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{user?.primaryEmailAddress?.emailAddress}</p>
        </div>
        <a 
          href="https://accounts.clerk.com/user" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          style={{ gap: 8 }}
        >
          Manage Profile <ExternalLink size={14} />
        </a>
      </motion.div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {settingsSections.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card"
            style={{ padding: 24 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                <section.icon size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{section.label}</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{section.description}</p>
              </div>
              <div className="btn btn-ghost btn-sm" style={{ opacity: section.action === "Coming Soon" ? 0.5 : 1 }}>
                {section.action}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, fontFamily: "var(--font-display)" }}>Appearance</h2>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Color Theme</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>Choose between Glass White or Midnight AI themes.</p>
            </div>
            <div style={{ display: "flex", background: "var(--bg-subtle)", padding: 4, borderRadius: "var(--radius-md)", gap: 4 }}>
              <button
                onClick={() => theme !== "light" && toggleTheme()}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
                  background: theme === "light" ? "var(--bg-card)" : "transparent",
                  color: theme === "light" ? "var(--primary)" : "var(--text-secondary)",
                  boxShadow: theme === "light" ? "var(--shadow-sm)" : "none",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <Monitor size={16} /> Light
              </button>
              <button
                onClick={() => theme !== "dark" && toggleTheme()}
                style={{
                  padding: "8px 16px", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none",
                  background: theme === "dark" ? "var(--bg-card)" : "transparent",
                  color: theme === "dark" ? "var(--primary)" : "var(--text-secondary)",
                  boxShadow: theme === "dark" ? "var(--shadow-sm)" : "none",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <Laptop size={16} /> Dark
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
