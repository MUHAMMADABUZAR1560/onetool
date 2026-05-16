"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, CreditCard, History, ArrowRight, Crown, Loader2 } from "lucide-react";
import Link from "next/link";
import { useNotify } from "@/components/notification-provider";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    description: "Basic tools for everyday use",
    features: ["50 credits/day", "Basic PDF tools", "Standard exports", "Community support"],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_placeholder",
    description: "Unlimited power for power users",
    features: ["Unlimited credits", "All 200+ tools", "AI-powered features", "No watermarks", "Priority support"],
    current: false,
    recommended: true,
  },
];

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { notify } = useNotify();

  const handleUpgrade = async (planId: string, priceId?: string) => {
    if (planId === "free") return;
    
    if (!priceId || priceId.includes("placeholder")) {
      notify("Configuration Required", "Please add a real Stripe Price ID to your .env.local to test checkout.", "info");
      return;
    }

    setLoadingPlan(planId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      notify("Error", error.message || "Something went wrong", "error");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 32 }}
      >
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
          color: "var(--text-primary)", letterSpacing: "-0.5px",
        }}>
          Billing & Plans
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, marginTop: 4 }}>
          Manage your subscription and usage credits.
        </p>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 48 }}>
        {/* Usage Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ padding: 24 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={20} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Credits Usage</h2>
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: "var(--text-secondary)" }}>Daily Limit</span>
              <span style={{ fontWeight: 600 }}>12 / 50 credits</span>
            </div>
            <div style={{ width: "100%", height: 8, background: "var(--bg-subtle)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ width: "24%", height: "100%", background: "var(--primary)", borderRadius: 4 }} />
            </div>
          </div>
          
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
            Your credits will reset in 12 hours. Upgrade to Pro for unlimited daily usage.
          </p>
        </motion.div>

        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card"
          style={{ padding: 24, border: "2px solid var(--primary)", position: "relative" }}
        >
          <div style={{ position: "absolute", top: -12, right: 24, background: "var(--primary)", color: "white", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: 11, fontWeight: 700 }}>
            ACTIVE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={20} style={{ color: "var(--primary)" }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Free Plan</h2>
          </div>
          <p style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>$0 <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 400 }}>/ month</span></p>
          <button className="btn btn-secondary" style={{ width: "100%" }} disabled>
            Current Plan
          </button>
        </motion.div>
      </div>

      {/* Upgrade Options */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, fontFamily: "var(--font-display)" }}>Available Plans</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 48 }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="card"
            style={{ padding: 32, border: plan.recommended ? "1px solid var(--primary)" : "1px solid var(--border)" }}
          >
            {plan.recommended && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--primary)", fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                <Crown size={14} /> RECOMMENDED
              </div>
            )}
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{plan.name}</h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>{plan.description}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 24 }}>
              <span style={{ fontSize: 32, fontWeight: 800 }}>{plan.price}</span>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>/ month</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                  <Check size={16} style={{ color: "var(--success)" }} /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleUpgrade(plan.id, plan.priceId)}
              disabled={plan.current || !!loadingPlan}
              className={plan.recommended ? "btn btn-primary" : "btn btn-secondary"} 
              style={{ width: "100%", gap: 8 }}
            >
              {loadingPlan === plan.id ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {plan.current ? "Current Plan" : "Upgrade Now"} <ArrowRight size={16} />
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* History */}
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, fontFamily: "var(--font-display)" }}>Billing History</h2>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "var(--bg-subtle)", textAlign: "left" }}>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Invoice</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Amount</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}>Date</th>
              <th style={{ padding: "16px 24px", fontWeight: 600 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                No invoices found yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
