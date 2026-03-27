"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface SupportChatProps {
  systemPrompt: string;
  assistantName: string;
  avatarLabel: string;
}

const RATE_LIMIT = 20;

export default function SupportChat({ systemPrompt, assistantName, avatarLabel }: SupportChatProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hi! I'm ${assistantName}. How can I help you today?`,
        },
      ]);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading || msgCount >= RATE_LIMIT) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setMsgCount((c) => c + 1);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, systemPrompt }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting. Email hello@mindbridge.health for help.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
      }}
    >
      {/* Chat panel */}
      {open && (
        <div
          style={{
            width: "320px",
            maxHeight: "480px",
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#0d9488",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                {avatarLabel[0]}
              </div>
              <div>
                <p style={{ color: "#fff", fontSize: "14px", fontWeight: "600", margin: 0 }}>
                  {assistantName}
                </p>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", margin: 0 }}>
                  Powered by MindBridge AI
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "20px",
                cursor: "pointer",
                lineHeight: 1,
                padding: "2px 6px",
              }}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              minHeight: "200px",
              maxHeight: "320px",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "8px 12px",
                    borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                    backgroundColor: m.role === "user" ? "#0d9488" : "#1e293b",
                    color: "#fff",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "8px 12px",
                    borderRadius: "12px 12px 12px 2px",
                    backgroundColor: "#1e293b",
                    color: "#94a3b8",
                    fontSize: "13px",
                  }}
                >
                  …
                </div>
              </div>
            )}
            {msgCount >= RATE_LIMIT && (
              <p style={{ color: "#94a3b8", fontSize: "11px", textAlign: "center", margin: "4px 0" }}>
                Session limit reached. Email{" "}
                <a href="mailto:hello@mindbridge.health" style={{ color: "#0d9488" }}>
                  hello@mindbridge.health
                </a>
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #1e293b",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading || msgCount >= RATE_LIMIT}
              placeholder={msgCount >= RATE_LIMIT ? "Session limit reached" : "Type a message…"}
              style={{
                flex: 1,
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                padding: "8px 10px",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <button
              onClick={send}
              disabled={loading || msgCount >= RATE_LIMIT || !input.trim()}
              style={{
                backgroundColor: "#0d9488",
                border: "none",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#fff",
                fontSize: "13px",
                cursor: "pointer",
                opacity: loading || msgCount >= RATE_LIMIT || !input.trim() ? 0.5 : 1,
              }}
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#0d9488",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(13,148,136,0.4)",
          fontSize: open ? "22px" : "13px",
          fontWeight: "700",
          color: "#fff",
          transition: "transform 0.15s ease",
        }}
        aria-label={open ? "Close chat" : `Chat with ${assistantName}`}
      >
        {open ? "×" : avatarLabel.slice(0, 2).toUpperCase()}
      </button>
    </div>
  );
}
