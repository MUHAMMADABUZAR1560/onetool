import { NextResponse, type NextRequest } from "next/server";

// ── Dev Bypass Logic ───────────────────────────────────────────────────────
const CLERK_ENABLED =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder") &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith("pk_");

// Security headers applied to every response
function applySecurityHeaders(res: NextResponse) {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
}

// ── Production Mode (Clerk Active) ─────────────────────────────────────────
async function runClerkMiddleware(req: NextRequest) {
  const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");

  const isPublicRoute = createRouteMatcher([
    "/",
    "/pricing",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhook(.*)",
    "/api/stripe/webhook(.*)",
  ]);

  return clerkMiddleware(async (auth, request) => {
    const { userId } = await auth();
    const res = NextResponse.next();
    applySecurityHeaders(res);

    if (!isPublicRoute(request) && !userId) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }
    return res;
  })(req, {} as any);
}

// ── Main Middleware Export ──────────────────────────────────────────────────
export default async function middleware(req: NextRequest) {
  if (!CLERK_ENABLED) {
    const res = NextResponse.next();
    return applySecurityHeaders(res);
  }
  return runClerkMiddleware(req);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
