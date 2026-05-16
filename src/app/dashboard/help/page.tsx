"use client";

import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, Book, Video, Mail, ChevronRight, Search, Zap, Shield, CreditCard } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How many credits do I get on the Free plan?", a: "Free plan users get 50 credits per day. Each tool use costs 1 credit (premium tools cost 5). Credits reset daily at midnight UTC." },
  { q: "What file formats are supported?", a: "We support PDF, DOCX, XLSX, PNG, JPG, WebP, MP4, MOV, MP3, WAV, and many more. Check each tool page for its specific supported formats." },
  { q: "How does AI processing work?", a: "AI tools are powered by GPT-4o and Claude 3.5. Connect your own API keys in Settings for unlimited usage, or use our shared quota on the Pro plan." },
  { q: "Are my files stored permanently?", a: "Files are automatically deleted after 1 hour unless you explicitly save them to My Files. Pro users get 5GB of persistent cloud storage." },
  { q: "How do I cancel my subscription?", a: "You can cancel anytime from the Billing page. Your access continues until the end of your billing period, and you won't be charged again." },
  { q: "Is there a team or enterprise plan?", a: "Yes! Contact us at enterprise@onetool.ai for volume pricing, SSO, custom integrations, and dedicated support." },
];

const resources = [
  { icon: Book, title: "Documentation", desc: "Full API docs and integration guides", href: "#" },
  { icon: Video, title: "Video Tutorials", desc: "Step-by-step walkthroughs for every tool", href: "#" },
  { icon: MessageSquare, title: "Community Forum", desc: "Ask questions and share tips", href: "#" },
  { icon: Mail, title: "Email Support", desc: "support@onetool.ai — 24h response", href: "#" },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(f =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          Help Center
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Everything you need to get the most out of OneTool.
        </p>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        style={{ position: "relative", marginBottom: 40 }}>
        <Search size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input className="input" placeholder="Search help articles..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft: 48, fontSize: 16, padding: "16px 16px 16px 48px" }} />
      </motion.div>

      {/* Resources */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Resources</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14, marginBottom: 48 }}>
        {resources.map((r, i) => (
          <motion.a key={r.title} href={r.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="card" style={{ padding: 20, textDecoration: "none", display: "block" }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <r.icon size={20} style={{ color: "var(--primary)" }} />
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{r.title}</h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{r.desc}</p>
          </motion.a>
        ))}
      </div>

      {/* FAQs */}
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filteredFaqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="card" style={{ overflow: "hidden" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", padding: "18px 20px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{faq.q}</span>
              <ChevronRight size={18} style={{ color: "var(--text-muted)", flexShrink: 0, transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {openFaq === i && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                style={{ padding: "0 20px 18px", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, borderTop: "1px solid var(--border)" }}>
                <div style={{ paddingTop: 14 }}>{faq.a}</div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredFaqs.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
          <HelpCircle size={40} style={{ margin: "0 auto 12px" }} />
          <p>No results found. Try a different search or contact support.</p>
        </div>
      )}

      {/* Contact CTA */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="card" style={{ padding: 32, marginTop: 40, textAlign: "center", background: "var(--gradient-primary)", border: "none" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", marginBottom: 8 }}>Still need help?</h3>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>Our support team typically responds within 2 hours.</p>
        <a href="mailto:support@onetool.ai" className="btn" style={{ background: "white", color: "#2563EB", fontWeight: 600, gap: 8 }}>
          <Mail size={16} /> Contact Support
        </a>
      </motion.div>
    </div>
  );
}
