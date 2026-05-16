"use client";

import { useAppUser } from "@/lib/use-app-user";
import { SafeUserButton } from "@/components/safe-user-button";
import { useAppStore } from "@/lib/store";
import { useEffect, useState } from "react";
import {
  Search, Sun, Moon, Bell, Menu, Command, Zap
} from "lucide-react";

export function DashboardHeader() {
  const { theme, toggleTheme, setCommandPaletteOpen, setMobileMenuOpen } = useAppStore();
  const { user } = useAppUser();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          setCredits(data.creditsRemaining);
        }
      } catch (err) {
        console.error("Failed to fetch user credits", err);
      }
    };
    fetchUser();
    
    // Refresh credits every 5 minutes or on window focus
    const interval = setInterval(fetchUser, 5 * 60 * 1000);
    window.addEventListener("focus", fetchUser);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", fetchUser);
    };
  }, []);

  return (
    <header style={{
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px", borderBottom: "1px solid var(--border)",
      background: "var(--bg-elevated)", position: "sticky", top: 0, zIndex: 40,
    }}>
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setMobileMenuOpen(true)}
          className="btn btn-ghost btn-icon btn-sm mobile-menu-btn"
          style={{ color: "var(--text-secondary)" }}>
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="search-btn"
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 14px", borderRadius: "var(--radius-md)",
            background: "var(--bg-subtle)", border: "1px solid var(--border)",
            cursor: "pointer", minWidth: 260, transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          <Search size={16} style={{ color: "var(--text-muted)" }} />
          <span className="search-btn-text" style={{ color: "var(--text-muted)", fontSize: 14, flex: 1, textAlign: "left" }}>
            Search 120+ tools...
          </span>
          <kbd style={{
            padding: "2px 6px", borderRadius: 4, background: "var(--bg-card)",
            border: "1px solid var(--border)", fontSize: 11, color: "var(--text-muted)",
            fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", gap: 2,
          }}>
            <Command size={10} /> K
          </kbd>
        </button>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <div style={{ 
          display: "flex", alignItems: "center", gap: 8, padding: "0 12px", 
          marginRight: 8, borderRight: "1px solid var(--border)", height: 32,
          fontSize: 13, fontWeight: 700, color: "var(--primary)"
        }}>
          <Zap size={14} fill="currentColor" />
          <span>{credits !== null ? `${credits} Credits` : "Loading..."}</span>
        </div>

        <button onClick={toggleTheme} className="btn btn-ghost btn-icon btn-sm"
          style={{ color: "var(--text-secondary)" }}>
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--text-secondary)", position: "relative" }}>
          <Bell size={18} />
          <span style={{
            position: "absolute", top: 6, right: 6, width: 8, height: 8,
            borderRadius: "50%", background: "var(--error)",
            border: "2px solid var(--bg-elevated)",
          }} />
        </button>
        
        <div style={{ marginLeft: 8, display: "flex", alignItems: "center" }}>
          <SafeUserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: 34, height: 34 }
              }
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: inline-flex !important; }
          .search-btn-text { display: none; }
          .search-btn { min-width: auto !important; }
        }
      `}</style>
    </header>
  );
}
