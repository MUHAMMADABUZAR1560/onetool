import { NextResponse } from "next/server";

/**
 * STRIPE UNAVAILABLE IN PAKISTAN
 * This route is now a mock that informs users of the situation
 * while allowing them to continue testing the app.
 */
export async function POST(req: Request) {
  try {
    return new NextResponse(
      JSON.stringify({ 
        error: "Stripe is currently unavailable in your region (Pakistan).",
        message: "We are working on integrating alternative payment methods like 2CheckOut or local gateways. For now, all PRO features are enabled for testing.",
        status: "region_unavailable"
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("[STRIPE_CHECKOUT]", error);
    return new NextResponse(error.message, { status: 500 });
  }
}
