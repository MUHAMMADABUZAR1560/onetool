import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const CLERK_ENABLED =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes("placeholder");

const stripe = process.env.STRIPE_SECRET_KEY &&
  !process.env.STRIPE_SECRET_KEY.includes("placeholder")
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-04-30.basil" as any })
  : null;

export async function POST() {
  try {
    if (!stripe) {
      return new NextResponse("Stripe not configured. Add STRIPE_SECRET_KEY to .env.local", { status: 503 });
    }

    let userId: string | null = null;
    if (CLERK_ENABLED) {
      const { auth } = await import("@clerk/nextjs/server");
      const authData = await auth();
      userId = authData.userId;
    }
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user?.stripeCustomerId) {
      return new NextResponse("No billing account found. Upgrade first.", { status: 404 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE_PORTAL]", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
