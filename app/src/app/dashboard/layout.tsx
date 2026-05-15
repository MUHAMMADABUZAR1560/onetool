"use client";

import { useAppStore } from "@/lib/store";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";
import { CommandPalette } from "@/components/dashboard/command-palette";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useAppStore();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />
      <CommandPalette />
      <div
        className="dashboard-main"
        style={{
          marginLeft: sidebarOpen ? 260 : 64,
          transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DashboardHeader />
        <main style={{ flex: 1, padding: 24 }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .dashboard-main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
