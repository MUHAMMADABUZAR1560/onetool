"use client";

import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function ThemeInitializer() {
  const setTheme = useAppStore((s) => s.setTheme);

  useEffect(() => {
    const saved = localStorage.getItem("onetool-theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = saved || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, [setTheme]);

  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null;
}
