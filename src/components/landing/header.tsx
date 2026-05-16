"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/logo";
import {
  Sun, Moon, Menu, X, Sparkles, ChevronDown, ArrowRight,
} from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const navLinks = [
  { label: "Tools", href: "/dashboard", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "API", href: "/api-docs" },
  { label: "Enterprise", href: "/enterprise" },
];

/**
 * Evaluates if Clerk is properly configured with real keys.
 */
const CLERK_ENABLED =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export function LandingHeader() {
  const { theme, toggleTheme, mobileMenuOpen, toggleMobileMenu } = useAppStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="landing-header"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? "10px 0" : "16px 0",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className={scrolled ? "glass" : ""} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: scrolled ? "10px 20px" : "0", borderRadius: scrolled ? "var(--radius-xl)" : 0,
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <Logo size="md" />

            <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} style={{
                  display: "flex", alignItems: "center", gap: 4, padding: "8px 14px",
                  borderRadius: "var(--radius-md)", color: "var(--text-secondary)",
                  textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.background = "var(--bg-subtle)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </Link>
              ))}
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={toggleTheme} className="btn btn-ghost btn-icon btn-sm" style={{ color: "var(--text-secondary)" }}>
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {CLERK_ENABLED ? (
                <>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="btn btn-secondary btn-sm desktop-only">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="btn btn-primary btn-sm desktop-only" style={{ gap: 6 }}>
                        <Sparkles size={14} /> Get Started Free
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <Link href="/dashboard" className="btn btn-secondary btn-sm desktop-only">Dashboard</Link>
                    <UserButton />
                  </Show>
                </>
              ) : (
                <Link href="/dashboard" className="btn btn-primary btn-sm desktop-only" style={{ gap: 6 }}>
                  <Sparkles size={14} /> Get Started Free
                </Link>
              )}

              <button onClick={toggleMobileMenu} className="btn btn-ghost btn-icon btn-sm mobile-only">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass-strong" style={{
              position: "fixed", top: 70, left: 16, right: 16, zIndex: 99,
              borderRadius: "var(--radius-xl)", padding: 20, display: "flex", flexDirection: "column", gap: 4,
            }}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => toggleMobileMenu()}
                style={{ padding: "12px 16px", borderRadius: "var(--radius-md)", color: "var(--text-primary)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
                {link.label}
              </Link>
            ))}
            <div style={{ height: 1, background: "var(--border)", margin: "8px 0" }} />
            <Link href="/dashboard" className="btn btn-primary" onClick={() => toggleMobileMenu()} style={{ textDecoration: "none", marginTop: 4 }}>
              <Sparkles size={16} /> Get Started Free <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .desktop-nav { display: flex; }
        .desktop-only { display: inline-flex !important; }
        .mobile-only { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-only { display: none !important; }
          .mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
