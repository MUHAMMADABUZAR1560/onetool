export interface Tool {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: ToolCategory;
  isAI: boolean;
  isPremium: boolean;
  color: string;
  gradient: string;
  uiType: ToolUIType;
  acceptedFiles?: string;
}

export type ToolUIType =
  | "file-upload"
  | "multi-upload"
  | "prompt-only"
  | "prompt-image"
  | "file-chat"
  | "file-text-input"
  | "file-password"
  | "text-input"
  | "code-editor"
  | "calculator"
  | "dual-text"
  | "image-upload"
  | "no-input";

export type ToolCategory =
  | "pdf" | "image" | "video" | "audio" | "ai"
  | "business" | "student" | "marketing" | "creator"
  | "designer" | "developer" | "health" | "hr" | "legal" | "travel";

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  iconName: string;
  color: string;
  gradient: string;
  toolCount: number;
}
