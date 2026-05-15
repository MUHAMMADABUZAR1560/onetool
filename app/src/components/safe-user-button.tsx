"use client";

import { UserButton, Show, SignInButton, SignUpButton } from "@clerk/nextjs";

/**
 * Evaluates if Clerk is properly configured with real keys.
 * Used for the dev-bypass logic.
 */
const CLERK_ENABLED =
  typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === "string" &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

interface SafeUserButtonProps {
  appearance?: object;
}

/**
 * A safe UserButton wrapper.
 * - In Production: Uses Clerk's UserButton and Show components.
 * - In Development (No Keys): Renders a mock dev avatar.
 */
export function SafeUserButton({ appearance }: SafeUserButtonProps) {
  if (!CLERK_ENABLED) {
    return (
      <div style={{
        width: 34, height: 34, borderRadius: "50%",
        background: "var(--gradient-primary)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer",
        flexShrink: 0,
      }}>
        D
      </div>
    );
  }

  return (
    <>
      <Show when="signed-in">
        <UserButton appearance={appearance} />
      </Show>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="btn btn-secondary btn-sm">Sign In</button>
        </SignInButton>
      </Show>
    </>
  );
}
