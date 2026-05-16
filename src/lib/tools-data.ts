// Re-export all types
export type { Tool, ToolUIType, ToolCategory, CategoryInfo } from "./tools/types";

import { pdfTools } from "./tools/pdf-tools";
import { imageTools } from "./tools/image-tools";
import { videoTools, audioTools } from "./tools/video-audio-tools";
import { aiTools, developerTools } from "./tools/ai-dev-tools";
import { businessTools, marketingTools } from "./tools/business-marketing-tools";
import { studentTools, dailyLifeTools, hrTools } from "./tools/other-tools";

export const categories = [
  { id: "pdf" as const, name: "PDF Tools", description: "Edit, convert, merge, compress & sign PDFs", iconName: "FileText", color: "#F43F5E", gradient: "linear-gradient(135deg, #F43F5E, #FB7185)", toolCount: pdfTools.length },
  { id: "image" as const, name: "Image Tools", description: "AI-powered image editing & generation", iconName: "Image", color: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #A78BFA)", toolCount: imageTools.length },
  { id: "video" as const, name: "Video Tools", description: "Edit, compress & enhance videos with AI", iconName: "Video", color: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #22D3EE)", toolCount: videoTools.length },
  { id: "audio" as const, name: "Audio Tools", description: "Audio editing, AI voice & music generation", iconName: "Mic", color: "#10B981", gradient: "linear-gradient(135deg, #10B981, #34D399)", toolCount: audioTools.length },
  { id: "ai" as const, name: "AI Tools", description: "AI writing, coding, translation & more", iconName: "Sparkles", color: "#6366F1", gradient: "linear-gradient(135deg, #6366F1, #818CF8, #06B6D4)", toolCount: aiTools.length },
  { id: "business" as const, name: "Business Tools", description: "Invoices, contracts, finance & operations", iconName: "Briefcase", color: "#3B82F6", gradient: "linear-gradient(135deg, #3B82F6, #60A5FA)", toolCount: businessTools.length },
  { id: "student" as const, name: "Student Tools", description: "Study aids, solvers, planners & tutoring", iconName: "GraduationCap", color: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #FBBF24)", toolCount: studentTools.length },
  { id: "marketing" as const, name: "Marketing Tools", description: "SEO, ads, social media & content", iconName: "TrendingUp", color: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #F472B6)", toolCount: marketingTools.length },
  { id: "developer" as const, name: "Developer Tools", description: "Formatters, encoders, testers & utilities", iconName: "Code2", color: "#14B8A6", gradient: "linear-gradient(135deg, #14B8A6, #2DD4BF)", toolCount: developerTools.length },
  { id: "health" as const, name: "Daily Life", description: "Calculators, timers & everyday utilities", iconName: "Activity", color: "#F43F5E", gradient: "linear-gradient(135deg, #F43F5E, #FB7185)", toolCount: dailyLifeTools.length },
  { id: "hr" as const, name: "HR & Recruitment", description: "Hiring, reviews & candidate management", iconName: "Users2", color: "#0EA5E9", gradient: "linear-gradient(135deg, #0EA5E9, #38BDF8)", toolCount: hrTools.length },
];

export const tools = [
  ...pdfTools,
  ...imageTools,
  ...videoTools,
  ...audioTools,
  ...aiTools,
  ...businessTools,
  ...marketingTools,
  ...developerTools,
  ...studentTools,
  ...dailyLifeTools,
  ...hrTools,
];

export const featuredTools = tools.filter((t) =>
  ["ai-art-gen", "ai-chatbot", "bg-remover", "merge-pdf", "ai-writer", "speech-to-text", "json-formatter", "ai-resume-builder"].includes(t.id)
);

export const popularTools = tools.filter((t) =>
  ["compress-pdf", "bg-remover", "ai-writer", "image-compress", "speech-to-text", "json-formatter", "ai-chatbot", "invoice-gen", "ai-grammar-check", "ai-paraphraser", "resize-image", "password-gen"].includes(t.id)
);

export function getToolsByCategory(category: string) {
  return tools.filter((t) => t.category === category);
}

export function getToolById(id: string) {
  return tools.find((t) => t.id === id);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function searchTools(query: string) {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.includes(q)
  );
}
