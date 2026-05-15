"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LandingHeader } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Check, Sparkles, Zap, ArrowRight, Crown } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with basic tools",
    color: "var(--text-secondary)",
    gradient: "var(--bg-subtle)",
    features: [
      "10 credits/day",
      "Basic PDF tools",
      "Image compress & resize",
      "Developer tools",
      "Watermark on exports",
      "Community support",
    ],
    cta: "Get Started",
    ctaStyle: "btn btn-secondary btn-lg",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "Unlimited access for individuals",
    color: "var(--primary)",
    gradient: "var(--gradient-primary)",
    features: [
      "Unlimited credits",
      "All 200+ tools",
      "AI-powered features",
      "No watermarks",
      "Priority processing",
      "Cloud storage (10GB)",
      "API access (1K req/day)",
      "Priority support",
    ],
    cta: "Start Pro Trial",
    ctaStyle: "btn btn-primary btn-lg",
    popular: true,
  },
  {
    name: "Business",
    price: "$29",
    period: "/seat/month",
    description: "For teams and organizations",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    features: [
      "Everything in Pro",
      "Team workspaces",
      "Admin controls",
      "Bulk processing",
      "Advanced analytics",
      "Cloud storage (100GB)",
      "API access (50K req/day)",
      "Dedicated support",
    ],
    cta: "Start Business Trial",
    ctaStyle: "btn btn-secondary btn-lg",
    popular: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Custom solutions at scale",
    color: "#0EA5E9",
    gradient: "linear-gradient(135deg, #0EA5E9, #06B6D4)",
    features: [
      "Everything in Business",
      "Custom infrastructure",
      "White-labeling",
      "Enterprise SSO",
      "Unlimited storage",
      "Unlimited API access",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    ctaStyle: "btn btn-secondary btn-lg",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main>
      <LandingHeader />

      <section style={{
        paddingTop: 140, paddingBottom: 80, background: "var(--gradient-hero)",
        textAlign: "center",
      }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge badge-primary" style={{ marginBottom: 20, display: "inline-flex", padding: "6px 16px" }}>
              Simple Pricing
            </span>
            <h1 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800, letterSpacing: "-1.5px", color: "var(--text-primary)",
            }}>
              One Price. <span className="gradient-text">Unlimited Power.</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 18, marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
              Start free, upgrade when you&apos;re ready. No hidden fees.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "0 0 100px", marginTop: -20 }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20, alignItems: "start",
          }}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={plan.popular ? "gradient-border" : ""}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-xl)",
                  border: plan.popular ? "none" : "1px solid var(--border)",
                  padding: 32,
                  position: "relative",
                  boxShadow: plan.popular ? "var(--shadow-glow)" : "var(--shadow-card)",
                  transform: plan.popular ? "scale(1.03)" : "none",
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "var(--gradient-primary)", borderRadius: "var(--radius-full)",
                    padding: "5px 16px", display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <Crown size={13} color="white" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>MOST POPULAR</span>
                  </div>
                )}

                <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>
                  {plan.description}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 800,
                    color: "var(--text-primary)", letterSpacing: "-1px",
                  }}>
                    {plan.price}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{plan.period}</span>
                </div>

                <Link href="/dashboard" className={plan.ctaStyle}
                  style={{ textDecoration: "none", width: "100%", marginBottom: 24 }}>
                  {plan.cta} <ArrowRight size={16} />
                </Link>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Check size={16} style={{ color: "var(--success)", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
