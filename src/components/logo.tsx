"use client";

import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

const sizes = {
  sm: { icon: 28, font: 16, dot: 6 },
  md: { icon: 36, font: 20, dot: 7 },
  lg: { icon: 48, font: 26, dot: 9 },
};

export function Logo({ size = "md", showText = true, href = "/" }: LogoProps) {
  const s = sizes[size];

  const icon = (
    <div style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
      {/* Icon mark */}
      <div 
        className="logo-mark"
        style={{
          width: s.icon,
          height: s.icon,
          borderRadius: Math.round(s.icon * 0.3),
          background: "linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #6366F1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px -5px rgba(37, 99, 235, 0.4), inset 0 1px 1px rgba(255,255,255,0.3)",
          position: "relative",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* Animated shine effect */}
        <div 
          className="logo-shine"
          style={{
            position: "absolute",
            top: "-100%", left: "-100%", width: "300%", height: "300%",
            background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
            pointerEvents: "none",
          }} 
        />

        {/* Letter O with inner hole — custom SVG mark */}
        <svg
          width={s.icon * 0.55}
          height={s.icon * 0.55}
          viewBox="0 0 24 24"
          fill="none"
          style={{ position: "relative", zIndex: 1 }}
        >
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.5" fill="none" />
          <circle cx="12" cy="12" r="3" fill="white" />
          <path d="M12 3V6M21 12H18M12 21V18M3 12H6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        {/* Status dot */}
        <div style={{
          position: "absolute",
          top: s.dot * 0.4,
          right: s.dot * 0.4,
          width: s.dot,
          height: s.dot,
          borderRadius: "50%",
          background: "#10B981",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.6)",
          border: "1.5px solid rgba(255,255,255,0.4)",
        }} />
      </div>

      {showText && (
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: s.font,
            fontWeight: 850,
            letterSpacing: "-0.8px",
            color: "var(--text-primary)",
            lineHeight: 1,
          }}>
            One<span style={{
              background: "linear-gradient(135deg, #3B82F6, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Tool</span>
          </span>
          {size !== "sm" && (
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--text-muted)",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginTop: 2,
              opacity: 0.8,
            }}>
              Core Engine
            </span>
          )}
        </div>
      )}

      <style jsx global>{`
        @keyframes shineMove {
          0% { transform: translate(-30%, -30%); }
          100% { transform: translate(30%, 30%); }
        }
        .logo-mark:hover .logo-shine {
          animation: shineMove 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );

  return href ? (
    <Link href={href} style={{ textDecoration: "none", display: "inline-flex" }}>
      {icon}
    </Link>
  ) : (
    <div style={{ display: "inline-flex" }}>{icon}</div>
  );
}
