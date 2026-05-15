"use client";

import { useUser } from "@clerk/nextjs";

/**
 * Safe wrappers around Clerk hooks.
 * Returns mock data in dev mode (placeholder keys) or real data when keys are present.
 */

const CLERK_ENABLED =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export interface AppUser {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  imageUrl?: string;
  primaryEmailAddress?: { emailAddress: string } | null;
}

export interface UseAppUserReturn {
  user: AppUser | null;
  isLoaded: boolean;
  isSignedIn: boolean;
}

export function useAppUser(): UseAppUserReturn {
  // We call the hook unconditionally to follow React's rules
  const { user, isLoaded, isSignedIn } = useUser();

  if (!CLERK_ENABLED) {
    return {
      user: {
        id: "dev-user",
        firstName: "Dev",
        lastName: "User",
        fullName: "Dev User",
        imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=onetool",
        primaryEmailAddress: { emailAddress: "dev@onetool.app" },
      },
      isLoaded: true,
      isSignedIn: true,
    };
  }

  return { user: user as any, isLoaded, isSignedIn: !!isSignedIn };
}
