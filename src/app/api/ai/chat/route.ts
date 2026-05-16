import { NextResponse } from "next/server";
import OpenAI from "openai";

const CLERK_ENABLED =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes("placeholder");

const openai = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("placeholder") 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) 
  : null;

export async function POST(req: Request) {
  try {
    let userId: string | null = null;
    if (CLERK_ENABLED) {
      try {
        const { auth } = await import("@clerk/nextjs/server");
        const authData = await auth();
        userId = authData.userId;
      } catch (e) {
        console.warn("Clerk auth failed in AI route, falling back to dev");
      }
    }
    
    if (!userId) userId = "dev-user";

    const { messages } = await req.json();
    if (!messages) return new NextResponse("Missing messages", { status: 400 });

    if (!openai) {
      return getSimulationResponse();
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are the OneTool AI Assistant. Help users navigate 120+ tools and answer questions about productivity. Be concise and professional." },
          ...messages
        ],
      });
      return NextResponse.json(response.choices[0].message);
    } catch (apiError: any) {
      // If quota exceeded (429), fallback to simulation so the user isn't blocked
      if (apiError.status === 429) {
        console.warn("OpenAI Quota Exceeded (429). Falling back to simulation mode.");
        return getSimulationResponse(true);
      }
      throw apiError;
    }
  } catch (error: any) {
    console.error("[AI_CHAT_ERROR]", error);
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  }
}

function getSimulationResponse(isQuotaExceeded = false) {
  const content = isQuotaExceeded 
    ? "I'm currently running in **Simulation Mode** because your OpenAI API key has exceeded its quota or has no credits. You can still test the interface here!"
    : "I'm currently in **Simulation Mode**. Please add a valid OPENAI_API_KEY to your .env.local file to enable real-time AI assistance.";
    
  return NextResponse.json({
    role: "assistant",
    content
  });
}
