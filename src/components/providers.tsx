"use client";

import { NotificationProvider } from "@/components/notification-provider";

/**
 * Global client-side providers wrapper.
 * ClerkProvider is handled at the layout level for App Router compliance.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <NotificationProvider>{children}</NotificationProvider>;
}
