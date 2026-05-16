"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { categories } from "@/lib/tools-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Search, Star, Clock, FolderOpen, Settings, CreditCard,
  ChevronLeft, ChevronRight, Sparkles, HelpCircle, Crown, X,
} from "lucide-react";
import { Logo } from "@/components/logo";

const mainNav = [
  { icon: <Home size={18} />, label: "Dashboard", href: "/dashboard" },
  { icon: <Search size={18} />, label: "Explore Tools", href: "/dashboard/explore" },
  { icon: <Star size={18} />, label: "Favorites", href: "/dashboard/favorites" },
  { icon: <Clock size={18} />, label: "Recent", href: "/dashboard/recent" },
  { icon: <FolderOpen size={18} />, label: "My Files", href: "/dashboard/files" },
  { icon: <Sparkles size={18} />, label: "AI Assistant", href: "/dashboard/ai" },
];

const bottomNav = [
  { icon: <CreditCard size={18} />, label: "Billing", href: "/dashboard/billing" },
  { icon: <Settings size={18} />, label: "Settings", href: "/dashboard/settings" },
  { icon: <HelpCircle size={18} />, label: "Help", href: "/dashboard/help" },
];

import { DynamicIcon } from "@/components/dynamic-icon";

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, mobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  const sidebarContent = (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: sidebarOpen ? "16px 12px" : "16px 8px",
    }}>
      {/* Logo */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "space-between" : "center",
        padding: "4px 8px", marginBottom: 8,
      }}>
        {sidebarOpen && (
          <Logo size="sm" href="/" />
        )}
        <button onClick={toggleSidebar} className="btn btn-ghost btn-icon btn-sm"
          style={{ color: "var(--text-muted)", flexShrink: 0 }}>
          {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Main nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        {mainNav.map((item) => (
          <Link key={item.href} href={item.href} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: sidebarOpen ? "9px 12px" : "9px", justifyContent: sidebarOpen ? "flex-start" : "center",
            borderRadius: "var(--radius-md)", textDecoration: "none", fontSize: 14, fontWeight: 500,
            color: isActive(item.href) ? "var(--primary)" : "var(--text-secondary)",
            background: isActive(item.href) ? "var(--primary-light)" : "transparent",
            transition: "all 0.15s",
          }}
            onMouseEnter={(e) => { if (!isActive(item.href)) e.currentTarget.style.background = "var(--bg-subtle)"; }}
            onMouseLeave={(e) => { if (!isActive(item.href)) e.currentTarget.style.background = "transparent"; }}
            title={!sidebarOpen ? item.label : undefined}
          >
            {item.icon}
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}

        {/* Categories divider */}
        {sidebarOpen && (
          <>
            <div style={{ height: 1, background: "var(--border)", margin: "12px 8px" }} />
            <div style={{ padding: "4px 12px", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Categories
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", flex: 1, maxHeight: "calc(100vh - 450px)" }}>
              {categories.map((cat) => (
                <Link key={cat.id} href={`/dashboard?category=${cat.id}`} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 12px",
                  borderRadius: "var(--radius-sm)", textDecoration: "none", fontSize: 13,
                  color: "var(--text-secondary)", transition: "all 0.15s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <DynamicIcon name={cat.iconName} size={15} />
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </>
        )}
      </nav>

      {/* Upgrade card */}
      {sidebarOpen && (
        <div style={{
          background: "var(--gradient-primary)", borderRadius: "var(--radius-lg)",
          padding: 16, marginTop: 12, marginBottom: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Crown size={16} color="white" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Upgrade to Pro</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, marginBottom: 12 }}>
            Unlock 200+ tools, unlimited AI, no watermarks.
          </p>
          <Link href="/dashboard/billing" style={{
            display: "block", textAlign: "center", padding: "8px 16px",
            background: "white", color: "#2563EB", borderRadius: "var(--radius-sm)",
            fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>
            Upgrade — $12/mo
          </Link>
        </div>
      )}

      {/* Bottom nav */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {bottomNav.map((item) => (
          <Link key={item.href} href={item.href} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: sidebarOpen ? "9px 12px" : "9px", justifyContent: sidebarOpen ? "flex-start" : "center",
            borderRadius: "var(--radius-md)", textDecoration: "none", fontSize: 14, fontWeight: 500,
            color: "var(--text-secondary)", transition: "all 0.15s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            {item.icon}
            {sidebarOpen && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sidebar-desktop" style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: sidebarOpen ? 260 : 64, background: "var(--bg-elevated)",
        borderRight: "1px solid var(--border)", zIndex: 50,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)", overflow: "hidden",
      }}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 55 }}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
                background: "var(--bg-elevated)", zIndex: 60,
              }}
            >
              <button onClick={() => setMobileMenuOpen(false)} className="btn btn-ghost btn-icon btn-sm"
                style={{ position: "absolute", top: 12, right: 12, color: "var(--text-muted)" }}>
                <X size={18} />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .sidebar-desktop { display: block; }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
        }
      `}</style>
    </>
  );
}
