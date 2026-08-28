import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowUpRight,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
} from "lucide-react";
import "./AIChatDrawer.css";

const knowledgeBase = [
  {
    keywords: ["speed", "24", "42", "time", "how fast", "hours", "delivery", "fast"],
    response:
      "Our rapid delivery engine ships scoped, single-focus modules in 24 to 42 hours. Full platforms typically take 3 to 6 business days after brief lock.",
    action: { label: "View Speed Pipeline", target: "#speed" },
  },
  {
    keywords: ["service", "build", "offer", "web", "app", "mobile", "ai", "product"],
    response:
      "We engineer Web Platforms (Next.js/React), Native-grade Mobile Apps (iOS/Android), Headless E-Commerce, Custom Booking Engines, and Private AI Assistants.",
    action: { label: "Explore Services", target: "#services" },
  },
  {
    keywords: ["cost", "price", "package", "rate", "estimate", "pricing", "budget"],
    response:
      "We offer Sprint, Growth, and Custom Enterprise tiers. You can use our interactive Scope Estimator above to build and lock your exact feature matrix.",
    action: { label: "Open Estimator", target: "#estimator" },
  },
  {
    keywords: ["hire", "start", "contact", "order", "book", "call", "email", "talk"],
    response:
      "You can submit your brief directly via our Start Project intake form. We review specifications and follow up within 24 hours.",
    action: { label: "Start a Project", target: "#contact" },
  },
  {
    keywords: ["location", "calicut", "office", "kerala", "where"],
    response:
      "AI Concept is based out of Calicut, Kerala, India, engineering production digital systems for global clients.",
  },
];

const quickChips = [
  "How fast can you build?",
  "What services do you offer?",
  "How does pricing work?",
  "Start a project",
];

export default function AIChatDrawer({ isOpen, onClose, initialQuery }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm the AI Concept Assistant. Ask me anything about our delivery speed, architecture, or project scoping.",
      time: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const speakText = useCallback(
    (text) => {
      if (!ttsEnabled || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    },
    [ttsEnabled]
  );

  const findBestAnswer = (query) => {
    const clean = query.toLowerCase();
    for (const item of knowledgeBase) {
      if (item.keywords.some((kw) => clean.includes(kw))) {
        return { text: item.response, action: item.action };
      }
    }
    return {
      text: "I can help with project scope, delivery timelines (24–42H), architecture stack, or initiating your project brief. What would you like to explore?",
      action: { label: "Go to Project Intake", target: "#contact" },
    };
  };

  const handleSend = useCallback(
    (textToSend) => {
      const queryText = textToSend || input;
      if (!queryText.trim()) return;

      const userMsg = {
        sender: "user",
        text: queryText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      setTimeout(() => {
        const match = findBestAnswer(queryText);
        const botMsg = {
          sender: "bot",
          text: match.text,
          action: match.action,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setIsTyping(false);
        setMessages((prev) => [...prev, botMsg]);
        speakText(match.text);
      }, 700);
    },
    [input, speakText]
  );

  useEffect(() => {
    if (isOpen && initialQuery && initialQuery.trim()) {
      handleSend(initialQuery);
    }
  }, [isOpen, initialQuery, handleSend]);

  const handleActionClick = (target) => {
    onClose();
    setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="ai-drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="ai-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
          >
            <div className="ai-drawer-header">
              <div className="ai-drawer-brand">
                <div className="ai-avatar-badge">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4>AI Assistant</h4>
                  <span className="ai-status">
                    <span className="ai-dot-pulse" /> Ready // Concept Engine
                  </span>
                </div>
              </div>

              <div className="ai-header-tools">
                <button
                  type="button"
                  className={`ai-tool-btn ${ttsEnabled ? "is-active" : ""}`}
                  onClick={() => setTtsEnabled(!ttsEnabled)}
                  title={ttsEnabled ? "Mute Voice" : "Enable Voice Reader"}
                >
                  {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>

                <button
                  type="button"
                  className="ai-tool-btn"
                  onClick={() =>
                    setMessages([
                      {
                        sender: "bot",
                        text: "Thread cleared. How else can I assist your project today?",
                        time: "Just now",
                      },
                    ])
                  }
                  title="Reset Chat"
                >
                  <RotateCcw size={15} />
                </button>

                <button type="button" className="ai-close-btn" onClick={onClose}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="ai-drawer-messages">
              {messages.map((m, idx) => (
                <div key={idx} className={`ai-msg-row ${m.sender === "user" ? "user-row" : "bot-row"}`}>
                  <div className="ai-msg-avatar">
                    {m.sender === "user" ? <User size={13} /> : <Bot size={14} />}
                  </div>

                  <div className="ai-msg-bubble">
                    <p>{m.text}</p>
                    {m.action && (
                      <button
                        type="button"
                        className="ai-msg-action-btn"
                        onClick={() => handleActionClick(m.action.target)}
                      >
                        <span>{m.action.label}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    )}
                    <span className="ai-msg-time">{m.time}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="ai-msg-row bot-row">
                  <div className="ai-msg-avatar">
                    <Bot size={14} />
                  </div>
                  <div className="ai-typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="ai-chips-wrap">
              <span className="ai-chips-label">QUICK INQUIRIES:</span>
              <div className="ai-chips-scroll">
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="ai-chip-pill"
                    onClick={() => handleSend(chip)}
                  >
                    <Zap size={10} />
                    <span>{chip}</span>
                  </button>
                ))}
              </div>
            </div>

            <form
              className="ai-drawer-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Ask about speed, packages, or custom builds..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="ai-send-btn" disabled={!input.trim()}>
                <Send size={15} />
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}