import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const CLERK_ENABLED =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes("placeholder");

export async function GET() {
  try {
    let userId: string | null = null;

    if (CLERK_ENABLED) {
      const { auth, currentUser } = await import("@clerk/nextjs/server");
      const authData = await auth();
      userId = authData.userId;

      if (!userId) return new NextResponse("Unauthorized", { status: 401 });

      const clerkUser = await currentUser();
      if (!clerkUser) return new NextResponse("User not found", { status: 404 });

      const user = await prisma.user.upsert({
        where: { clerkId: userId },
        update: {
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          avatar: clerkUser.imageUrl,
        },
        create: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0]?.emailAddress || "",
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          avatar: clerkUser.imageUrl,
          creditsRemaining: 50,
        },
      });

      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan,
        creditsRemaining: user.creditsRemaining,
        creditsUsedToday: user.creditsUsedToday,
        clerkId: user.clerkId,
      });
    }

    // Dev mode — return a mock user
    return NextResponse.json({
      id: "dev-user",
      name: "Dev User",
      email: "dev@onetool.app",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=onetool",
      plan: "PRO",
      creditsRemaining: 1000,
      creditsUsedToday: 0,
      clerkId: "dev",
    });
  } catch (error) {
    console.error("[USER_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
