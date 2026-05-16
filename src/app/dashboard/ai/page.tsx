"use client";

import { motion } from "framer-motion";
import { Bot, Send, Sparkles, RotateCcw } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your OneTool AI assistant. I can help you process files, generate content, and guide you through our 200+ tools. What can I help you with?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;
    
    const newMessages: Message[] = [...messages, { role: "user", content }];
    setInput("");
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const assistantMsg = await response.json();
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" }}>
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={22} color="white" />
            </div>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--text-primary)" }}>AI Assistant</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--success)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }} /> Online
              </div>
            </div>
          </div>
          <button onClick={() => setMessages([{ role: "assistant", content: "New chat started. How can I help?" }])}
            className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
            <RotateCcw size={14} /> New Chat
          </button>
        </div>
      </motion.div>

      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, paddingBottom: 16 }}>
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", gap: 12, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && (
              <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 4 }}>
                <Sparkles size={14} color="white" />
              </div>
            )}
            <div style={{
              maxWidth: "78%", padding: "12px 16px", borderRadius: "var(--radius-lg)", fontSize: 14, lineHeight: 1.65,
              background: msg.role === "user" ? "var(--gradient-primary)" : "var(--bg-card)",
              color: msg.role === "user" ? "white" : "var(--text-primary)",
              border: msg.role === "user" ? "none" : "1px solid var(--border)",
            }}>
              {msg.content}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--gradient-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={14} color="white" />
            </div>
            <div style={{ padding: "14px 18px", borderRadius: "var(--radius-lg)", background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", gap: 5, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--primary)", animation: `aiPulse 1.2s ${i * 0.2}s ease-in-out infinite alternate` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <input className="input" placeholder="Ask anything..." value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            disabled={loading} />
          <button className="btn btn-primary" onClick={() => send()} disabled={!input.trim() || loading} style={{ flexShrink: 0 }}>
            <Send size={16} />
          </button>
        </div>
      </div>
      <style>{`@keyframes aiPulse { from { opacity:0.3; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}
