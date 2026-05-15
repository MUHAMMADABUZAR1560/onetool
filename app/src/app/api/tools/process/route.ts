import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToolById } from "@/lib/tools-data";
import OpenAI from "openai";
import { marked } from "marked";

const CLERK_ENABLED =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith("pk_") &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.includes("placeholder");

const openai = process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes("placeholder")
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request) {
  try {
    let clerkId: string | null = null;

    if (CLERK_ENABLED) {
      try {
        const { auth } = await import("@clerk/nextjs/server");
        const authData = await auth();
        clerkId = authData.userId;
      } catch (e) {
        clerkId = "dev-user";
      }
    } else {
      clerkId = "dev-user";
    }

    if (!clerkId) clerkId = "dev-user";

    const body = await req.json();
    const { toolId, params, files } = body;

    if (!toolId) return new NextResponse("Missing toolId", { status: 400 });

    const tool = getToolById(toolId);
    if (!tool) return new NextResponse("Tool not found", { status: 404 });

    // 1. Get user (try-catch because DB might not be ready)
    let user = null;
    try {
      user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            clerkId,
            email: clerkId === "dev-user" ? "dev@onetool.app" : "user@example.com",
            creditsRemaining: 1000,
            plan: "PRO",
          }
        });
      }
    } catch (dbError) {
      console.warn("Database not ready, using mock user context");
      user = { id: "mock-id", plan: "PRO", creditsRemaining: 1000 };
    }

    let result = null;
    let error = null;

    try {
      if (tool.isAI) {
        if (openai) {
          try {
            if (tool.id === "ai-art-gen" || tool.id === "ai-logo-gen") {
              const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: params?.prompt || `Create a ${tool.name}`,
                n: 1,
              });
              result = { url: response.data[0].url, model: "dall-e-3" };
            } else {
              const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  { role: "system", content: `Expert tool for ${tool.name}` },
                  { role: "user", content: params?.prompt || "Process input" }
                ],
              });
              result = { text: response.choices[0].message.content, model: "gpt-4o" };
            }
          } catch (apiError: any) {
            if (apiError.status === 429) {
              result = { 
                text: `[SIMULATION] Your OpenAI quota is exceeded. To see real results, please check your billing at platform.openai.com.`,
                model: "simulation-mode" 
              };
            } else {
              throw apiError;
            }
          }
        } else {
          result = { text: `[SIMULATION] AI Assistant for ${tool.name}. Add your API key to see real results.`, model: "simulation" };
        }
      } else {
        // Standard logic
        if (tool.id === "markdown-editor") {
          result = { text: await marked.parse(params?.prompt || ""), format: "html" };
        } else {
          result = { status: "success", message: `Processed ${tool.name}` };
        }
      }
    } catch (e: any) {
      error = e.message;
    }

    return NextResponse.json({ success: !error, result, error });
  } catch (error: any) {
    console.error("[TOOL_PROCESS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
