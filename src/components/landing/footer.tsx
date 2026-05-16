"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { ExternalLink, Globe, MessageSquare, Rss } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "All Tools", href: "/dashboard" },
    { label: "Pricing", href: "/pricing" },
    { label: "API", href: "/api-docs" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Changelog", href: "/changelog" },
  ],
  Tools: [
    { label: "PDF Tools", href: "/dashboard?category=pdf" },
    { label: "Image Tools", href: "/dashboard?category=image" },
    { label: "AI Writer", href: "/dashboard/tools/ai-writer" },
    { label: "Video Tools", href: "/dashboard?category=video" },
    { label: "Developer Tools", href: "/dashboard?category=developer" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press Kit", href: "/press" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", padding: "64px 0 32px" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr repeat(4, 1fr)",
          gap: 40,
        }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Logo size="md" href="/" />
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, maxWidth: 280, marginTop: 16 }}>
              The AI-powered all-in-one productivity platform. 200+ tools for every need.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {[
                { icon: Globe, href: "#" },
                { icon: MessageSquare, href: "#" },
                { icon: Rss, href: "#" },
                { icon: ExternalLink, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href}
                  style={{
                    width: 36, height: 36, borderRadius: "var(--radius-md)",
                    background: "var(--bg-subtle)", border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--text-muted)", textDecoration: "none", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-light)"; e.currentTarget.style.color = "var(--primary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--bg-subtle)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} style={{
                      color: "var(--text-secondary)", textDecoration: "none", fontSize: 14,
                      transition: "color 0.2s",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid var(--border)", marginTop: 48, paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        }}>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
            © 2026 OneTool. All rights reserved.
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
            Made with precision for high-performance teams worldwide.
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
