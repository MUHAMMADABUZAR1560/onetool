import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-04-30.basil" as any })
  : null;

export async function POST(req: Request) {
  if (!stripe) return new NextResponse("Stripe not configured", { status: 500 });

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Missing signature or webhook secret", { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("[STRIPE_WEBHOOK] Signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        if (!userId) break;

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        const priceId = subscription.items.data[0]?.price.id;
        
        const plan = priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? "PRO" :
                     priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID ? "BUSINESS" : "FREE";

        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: plan as any,
            stripeCustomerId: session.customer as string,
            creditsRemaining: plan === "PRO" ? 99999 : plan === "BUSINESS" ? 99999 : 50,
          },
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        const priceId = subscription.items.data[0]?.price.id;
        const plan = priceId === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID ? "PRO" :
                     priceId === process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID ? "BUSINESS" : "FREE";

        await prisma.user.update({
          where: { id: userId },
          data: { plan: plan as any },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        if (!userId) break;

        await prisma.user.update({
          where: { id: userId },
          data: { plan: "FREE", creditsRemaining: 50 },
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("[STRIPE_WEBHOOK] Handler error:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
