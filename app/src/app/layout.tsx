import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { ThemeInitializer } from "@/components/theme-initializer";
import { Providers } from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "OneTool — 200+ AI-Powered Tools in One Platform",
  description:
    "200+ AI-powered tools for PDF, image, video, audio, writing, coding, business, and more. The only productivity platform you'll ever need.",
  keywords: [
    "AI tools", "PDF tools", "image editor", "video editor",
    "productivity", "SaaS", "all-in-one tools", "AI writing", "AI image generator",
  ],
  openGraph: {
    title: "OneTool — AI-Powered All-in-One Productivity Platform",
    description: "200+ AI-powered tools unified in one premium workspace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${sora.variable}`}>
      <body>
        <ClerkProvider>
          <Providers>
            <ThemeInitializer />
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
