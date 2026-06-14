   "use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Globe, Mail, MessageSquare, Send, User, AtSign,
  Smartphone, AlertCircle, CheckCircle, Bot, ExternalLink,
  ChevronRight, TicketIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

function AIChatTab() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm the DreamTeamApps AI support assistant. Ask me anything about FishingPalPro or PlayListAI — I'm here to help! 🎣🎵",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [escalated, setEscalated] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput("")
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMsg }]
    setMessages(newMessages)
    setLoading(true)
    setMessages(prev => [...prev, { role: "assistant", content: "" }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok || !res.body) throw new Error("Stream failed")

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value, { stream: true })
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: "assistant", content: full }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again or submit a support ticket.",
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (escalated) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-8 text-center">
        <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-none flex items-center justify-center mb-4">
          <TicketIcon className="w-6 h-6 text-green-400" />
        </div>
        <p className="text-white font-mono font-bold mb-2">Escalating to Support Team</p>
        <p className="text-gray-400 font-mono text-xs mb-6">
          // Click below to open a ticket.<br />
          // Your chat context has been noted.
        </p>
        <Button
          className="bg-green-500 hover:bg-green-400 text-black font-bold border-0 rounded-none uppercase tracking-widest font-mono text-xs px-6"
          style={{ boxShadow: "0 0 20px rgba(0,255,65,0.3)" }}
          onClick={() => window.open("https://app-support-desk-three.vercel.app/submit", "_blank")}
        >
          Open Support Ticket <ExternalLink className="ml-2 w-3 h-3" />
        </Button>
        <button
          onClick={() => setEscalated(false)}
          className="mt-4 text-green-900 font-mono text-xs hover:text-green-700"
        >
          ← Back to chat
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[420px]">
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-7 h-7 rounded-none flex items-center justify-center shrink-0 mt-0.5 ${
              msg.role === "assistant"
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-teal-500/10 border border-teal-500/30"
            }`}>
              {msg.role === "assistant"
                ? <Bot className="w-3.5 h-3.5 text-green-400" />
                : <User className="w-3.5 h-3.5 text-teal-400" />
              }
            </div>
            <div className={`max-w-[80%] px-3 py-2 font-mono text-xs leading-relaxed ${
              msg.role === "assistant"
                ? "bg-black/60 border border-green-500/20 text-gray-300"
                : "bg-teal-500/10 border border-teal-500/30 text-white"
            }`}>
              {msg.content || (
                <span className="flex gap-1 items-center text-green-700">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              )}
            </div>
          </div>
        ))}
        {messages.length >= 5 && !loading && (
          <div className="flex justify-center pt-1">
            <button
              onClick={() => setEscalated(true)}
              className="font-mono text-xs text-green-900 hover:text-green-700 flex items-center gap-1 transition-colors"
            >
              <ChevronRight className="w-3 h-3" />
              Still need help? Escalate to a support ticket
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-green-500/20 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="// Ask about FishingPalPro or PlayListAI..."
          disabled={loading}
          className="flex-1 bg-black/40 border border-green-500/20 text-white font-mono text-xs px-3 py-2 focus:outline-none focus:border-green-500/50 placeholder-green-900 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="w-9 h-9 bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 flex items-center justify-center disabled:opacity-30 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-green-400" />
        </button>
      </div>
    </div>
  )
}

function TicketFormTab() {
  const [form, setForm] = useState({
    customerName: "", customerEmail: "", app: "",
    category: "", subject: "", description: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<number | null>(null)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.customerName || !form.customerEmail || !form.app || !form.subject || !form.description) {
      setError("Please fill in all required fields.")
      return
    }
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/submit-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          status: "open",
          priority: "medium",
          category: form.category || "other",
          assignedTo: null,
        }),
      })
      if (!res.ok) throw new Error("Failed")
      const ticket = await res.json()
      setTicketNumber(ticket.ticketNumber)
      setSubmitted(true)
    } catch {
      setError("Submission failed. Email us at btwynn@bellsouth.net")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 text-center px-4">
        <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-none flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
        <p className="text-white font-mono font-bold mb-1">Ticket Submitted!</p>
        {ticketNumber && (
          <div className="bg-black/60 border border-green-500/20 px-4 py-2 my-3">
            <p className="text-green-900 font-mono text-xs mb-1">// ticket_number</p>
            <p className="text-green-400 font-mono font-bold text-xl">#{ticketNumber}</p>
          </div>
        )}
        <p className="text-gray-500 font-mono text-xs">We&apos;ll respond within 24 hours.</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ customerName: "", customerEmail: "", app: "", category: "", subject: "", description: "" }) }}
          className="mt-4 text-green-900 font-mono text-xs hover:text-green-700"
        >
          ← Submit another
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 overflow-y-auto h-[420px]">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-green-900 text-xs mb-1">// name *</label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-green-900" />
              <input name="customerName" value={form.customerName} onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-black/40 border border-green-500/20 text-white font-mono text-xs pl-7 pr-2 py-2 focus:outline-none focus:border-green-500/50 placeholder-green-900" />
            </div>
          </div>
          <div>
            <label className="block font-mono text-green-900 text-xs mb-1">// email *</label>
            <div className="relative">
              <AtSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-green-900" />
              <input name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange}
                placeholder="you@email.com"
                className="w-full bg-black/40 border border-green-500/20 text-white font-mono text-xs pl-7 pr-2 py-2 focus:outline-none focus:border-green-500/50 placeholder-green-900" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-mono text-green-900 text-xs mb-1">// app *</label>
            <div className="relative">
              <Smartphone className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-green-900" />
              <select name="app" value={form.app} onChange={handleChange}
                className="w-full bg-black/40 border border-green-500/20 text-white font-mono text-xs pl-7 pr-2 py-2 focus:outline-none focus:border-green-500/50 appearance-none">
                <option value="" className="bg-black">Select app...</option>
                <option value="FishingPalPro" className="bg-black">🎣 FishingPalPro</option>
                <option value="PlayListAI" className="bg-black">🎵 PlayListAI</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-mono text-green-900 text-xs mb-1">// issue_type</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full bg-black/40 border border-green-500/20 text-white font-mono text-xs px-2 py-2 focus:outline-none focus:border-green-500/50 appearance-none">
              <option value="" className="bg-black">Category...</option>
              <option value="bug" className="bg-black">🐛 Bug</option>
              <option value="crash" className="bg-black">💥 Crash</option>
              <option value="purchase_issue" className="bg-black">💳 Purchase</option>
              <option value="feature_request" className="bg-black">💡 Feature request</option>
              <option value="other" className="bg-black">❓ Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-mono text-green-900 text-xs mb-1">// subject *</label>
          <input name="subject" value={form.subject} onChange={handleChange}
            placeholder="Brief description"
            className="w-full bg-black/40 border border-green-500/20 text-white font-mono text-xs px-3 py-2 focus:outline-none focus:border-green-500/50 placeholder-green-900" />
        </div>

        <div>
          <label className="block font-mono text-green-900 text-xs mb-1">// details *</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            rows={3} placeholder="Describe your issue in detail..."
            className="w-full bg-black/40 border border-green-500/20 text-white font-mono text-xs px-3 py-2 focus:outline-none focus:border-green-500/50 placeholder-green-900 resize-none" />
        </div>

        {error && (
          <div className="flex items-center gap-2 font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2">
            <AlertCircle className="w-3 h-3 shrink-0" /> {error}
          </div>
        )}

        <Button type="submit" disabled={submitting}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold border-0 rounded-none uppercase tracking-widest font-mono text-xs py-5"
          style={{ boxShadow: "0 0 20px rgba(0,255,65,0.3)" }}>
          {submitting ? "// submitting..." : "Submit Ticket"}
        </Button>
      </form>
    </div>
  )
}

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<"chat" | "ticket">("chat")

  return (
    <section id="contact" className="py-24 bg-[#0a1f3d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-green-700 text-sm mb-3">// CONTACT_US.md</div>
            <h2 className="text-4xl font-bold text-white mt-1 mb-6 leading-tight">
              Let&apos;s{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">
                Talk
              </span>
            </h2>
            <p className="text-gray-400 font-mono text-xs leading-relaxed mb-8">
              // Have a question, partnership inquiry,<br />
              // or need app support? We&apos;ve got you.
            </p>
            <div className="space-y-5">
              <a
                href="https://www.dreamteamapps.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-none bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Globe className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">// Website</div>
                  <div className="text-white font-mono text-sm font-medium group-hover:text-green-400 transition-colors">www.DreamTeamApps.com</div>
                </div>
              </a>
              <a
                href="mailto:btwynn@bellsouth.net"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-none bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">// General Inquiries</div>
                  <div className="text-white font-mono text-sm font-medium group-hover:text-green-400 transition-colors">btwynn@bellsouth.net</div>
                </div>
              </a>
              <button
                onClick={() => setActiveTab("chat")}
                className="flex items-center gap-4 group w-full text-left"
              >
                <div className="w-10 h-10 rounded-none bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <MessageSquare className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">// AI Support</div>
                  <div className="text-white font-mono text-sm font-medium group-hover:text-green-400 transition-colors">Chat or submit a ticket →</div>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-black/60 border border-green-500/20">
              <div className="flex border-b border-green-500/20">
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === "chat"
                      ? "bg-green-500/10 text-green-400 border-b-2 border-green-400"
                      : "text-green-900 hover:text-green-700"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  AI Chat Support
                </button>
                <button
                  onClick={() => setActiveTab("ticket")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
                    activeTab === "ticket"
                      ? "bg-green-500/10 text-green-400 border-b-2 border-green-400"
                      : "text-green-900 hover:text-green-700"
                  }`}
                >
                  <TicketIcon className="w-3.5 h-3.5" />
                  Submit Ticket
                </button>
              </div>
              {activeTab === "chat" ? <AIChatTab /> : <TicketFormTab />}
            </div>
            <p className="text-green-900 font-mono text-xs text-center mt-3">
              // Powered by DreamTeam AppSupport Desk
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
