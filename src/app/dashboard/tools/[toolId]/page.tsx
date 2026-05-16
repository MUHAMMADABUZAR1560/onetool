"use client";

import { use, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getToolById, getCategoryById } from "@/lib/tools-data";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, Download, Sparkles, ArrowLeft, Settings2, Loader2,
  CheckCircle2, FileUp, X, Lock, Zap, Info, FileText, 
  Image as ImageIcon, Video as VideoIcon, Mic, MessageSquare,
  ChevronRight, RefreshCw, Eraser, Search, Copy
} from "lucide-react";
import { useNotify } from "@/components/notification-provider";
import { DynamicIcon } from "@/components/dynamic-icon";

export default function ToolPage({ params }: { params: Promise<{ toolId: string }> }) {
  const { toolId } = use(params);
  const tool = getToolById(toolId);
  const [files, setFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [resultData, setResultData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { notify } = useNotify();

  if (!tool) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>Tool not found</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>The tool you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: 24, textDecoration: "none" }}>
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const category = getCategoryById(tool.category);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (tool.uiType === "file-upload" || tool.uiType === "image-upload") {
        setFiles([selected[0]]);
      } else {
        setFiles((prev) => [...prev, ...selected]);
      }
    }
  };

  const handleProcess = async () => {
    // Validation based on uiType
    if (tool.uiType.includes("file") && files.length === 0) {
      notify("File Required", "Please upload a file to continue.", "warning");
      return;
    }
    if (tool.uiType === "prompt-only" && !prompt.trim()) {
      notify("Prompt Required", "Please enter a description for the AI.", "warning");
      return;
    }

    setProcessing(true);
    setCompleted(false);

    try {
      const response = await fetch("/api/tools/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: tool.id,
          params: { 
            prompt, 
            text: textInput || prompt 
          }, 
          files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Processing failed");
      }

      const data = await response.json();
      setResultData(data.result);
      
      if (data.result.text && tool.uiType === "dual-text") {
        setTextOutput(data.result.text);
      }
      
      notify("Success", "Task completed successfully!", "success");
      setCompleted(true);
    } catch (err: any) {
      notify("Error", err.message || "An error occurred", "error");
    } finally {
      setProcessing(false);
    }
  };

  const renderToolInterface = () => {
    switch (tool.uiType) {
      case "prompt-only":
      case "prompt-image":
        return (
          <div style={{ padding: "32px" }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 12 }}>
              What would you like to {tool.id.includes("gen") ? "generate" : "do"}?
            </label>
            <textarea
              className="input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={tool.id.includes("gen") ? "Describe your vision in detail..." : "Enter your instructions here..."}
              style={{ minHeight: 160, resize: "vertical", paddingTop: 16, marginBottom: 24, fontSize: 15 }}
            />
            <button 
              className="btn btn-primary btn-lg" 
              style={{ width: "100%", gap: 10, height: 56 }}
              onClick={handleProcess}
              disabled={processing || !prompt.trim()}
            >
              {processing ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {tool.id.includes("gen") ? "Generate with AI" : "Process Request"}
            </button>
          </div>
        );

      case "text-input":
        return (
          <div style={{ padding: "32px" }}>
            <textarea
              className="input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste or type your text here..."
              style={{ minHeight: 250, resize: "vertical", paddingTop: 16, marginBottom: 24, fontSize: 15 }}
            />
            <button 
              className="btn btn-primary btn-lg" 
              style={{ width: "100%", gap: 10, height: 56 }}
              onClick={handleProcess}
              disabled={processing || !textInput.trim()}
            >
              {processing ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
              Process Text
            </button>
          </div>
        );

      case "dual-text":
        return (
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>Input</label>
                <textarea
                  className="input"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter input..."
                  style={{ minHeight: 300, resize: "none", fontSize: 14 }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>Output</label>
                <div 
                  className="input"
                  style={{ minHeight: 300, background: "var(--bg-subtle)", position: "relative", padding: 16, fontSize: 14, color: "var(--text-primary)", overflow: "auto" }}
                >
                  {textOutput || <span style={{ color: "var(--text-muted)" }}>Results will appear here...</span>}
                  {textOutput && (
                    <button 
                      onClick={() => { navigator.clipboard.writeText(textOutput); notify("Copied", "Result copied to clipboard", "success"); }}
                      style={{ position: "absolute", top: 12, right: 12, background: "var(--bg-card)", border: "1px solid var(--border)", padding: 6, borderRadius: 6, cursor: "pointer" }}
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-lg" 
              style={{ width: "100%", gap: 10 }}
              onClick={handleProcess}
              disabled={processing || !textInput.trim()}
            >
              {processing ? <Loader2 size={18} className="animate-spin" /> : <Zap size={18} />}
              Execute Tool
            </button>
          </div>
        );

      case "file-upload":
      case "image-upload":
      case "multi-upload":
        return (
          <div style={{ padding: "32px" }}>
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "64px 32px", textAlign: "center", cursor: "pointer",
                background: "var(--bg-subtle)", borderRadius: "var(--radius-xl)",
                border: "2px dashed var(--border)", transition: "all 0.2s",
                marginBottom: 24,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple={tool.uiType === "multi-upload"}
                accept={tool.acceptedFiles}
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <div style={{
                width: 64, height: 64, borderRadius: "var(--radius-lg)",
                background: "var(--primary-light)", display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 20px",
              }}>
                {tool.uiType === "image-upload" ? <ImageIcon size={28} style={{ color: "var(--primary)" }} /> : <Upload size={28} style={{ color: "var(--primary)" }} />}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                {files.length > 0 ? `${files.length} file(s) selected` : "Click or drag files to upload"}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
                {tool.acceptedFiles ? `Supports: ${tool.acceptedFiles}` : "All formats supported up to 50MB"}
              </p>
            </div>

            {files.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                {files.map((file, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "var(--bg-subtle)", borderRadius: 8, marginBottom: 8 }}>
                    <FileText size={16} style={{ color: "var(--primary)" }} />
                    <span style={{ fontSize: 13, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
                    <button onClick={(e) => { e.stopPropagation(); setFiles([]); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button 
              className="btn btn-primary btn-lg" 
              style={{ width: "100%", height: 56, gap: 10 }}
              onClick={handleProcess}
              disabled={processing || files.length === 0}
            >
              {processing ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} />}
              Process Files
            </button>
          </div>
        );

      default:
        return (
          <div style={{ padding: "64px 32px", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)" }}>This tool is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", paddingBottom: 100 }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
        <Link href="/dashboard" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 14 }}>Dashboard</Link>
        <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
        {category && <span style={{ color: "var(--text-secondary)", fontSize: 14 }}>{category.name}</span>}
        <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
        <span style={{ color: "var(--text-primary)", fontSize: 14, fontWeight: 600 }}>{tool.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "start" }}>
        {/* Left Column: Tool Interface */}
        <div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: tool.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <DynamicIcon name={tool.iconName} size={24} />
              </div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>{tool.name}</h1>
                <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>{tool.description}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!completed ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderToolInterface()}
                </motion.div>
              ) : (
                <motion.div
                  key="output"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ padding: "40px 32px", textAlign: "center" }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: "var(--radius-full)", background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <CheckCircle2 size={32} style={{ color: "var(--success)" }} />
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Ready to download!</h2>
                  <p style={{ color: "var(--text-secondary)", marginBottom: 32 }}>Your {tool.name} task has been processed successfully.</p>

                  {resultData?.url && (
                    <div style={{ marginBottom: 32, borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}>
                      <img src={resultData.url} alt="Result" style={{ width: "100%", display: "block" }} />
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <button className="btn btn-primary btn-lg" style={{ gap: 8 }} onClick={() => notify("Downloading...", "Your file is being prepared.", "info")}>
                      <Download size={18} /> Download Result
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => { setCompleted(false); setFiles([]); setPrompt(""); setTextInput(""); setTextOutput(""); }}>
                      Process Another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Tool Info & Related */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <Info size={18} style={{ color: "var(--primary)" }} /> Tool Information
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--text-muted)" }}>Processing</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{tool.isAI ? "AI Powered" : "Standard Engine"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--text-muted)" }}>Privacy</span>
                <span style={{ color: "var(--success)", fontWeight: 500 }}>End-to-End Encrypted</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--text-muted)" }}>Credit Cost</span>
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>{tool.isPremium ? "5 Credits" : "1 Credit"}</span>
              </div>
            </div>
            <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
            <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
              All files are processed in secure sandboxed environments and deleted immediately after processing.
            </p>
          </div>

          <div className="card" style={{ padding: 24, background: "var(--bg-subtle)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Pro Tip</h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Upgrade to the <strong>Business Plan</strong> to get unlimited processing, batch uploads, and priority AI access.
            </p>
            <Link href="/dashboard/billing" style={{ display: "block", marginTop: 16, fontSize: 13, fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}>
              View pricing plans →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
