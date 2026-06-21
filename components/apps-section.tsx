"use client"

import { motion } from "framer-motion"
import { ExternalLink, Terminal, Code, Mic, Search, Headphones } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const apps = [
  {
    id: "fishingpalpro",
    name: "FishingPalPro",
    tagline: "Your Ultimate Fishing Companion",
    description: "Predict your best fishing times using lunar phases, Farmers Almanac data, and real-time weather. Log your catches with GPS, Siri voice control, and beautiful calendar visualizations.",
    emoji: "🎣",
    icon: Terminal,
    glowColor: "rgba(0,255,170,0.3)",
    borderColor: "border-teal-500/40",
    accentColor: "text-teal-400",
    badgeBg: "bg-teal-500/15 text-teal-300 border-teal-500/30",
    badge: "LIVE // App Store",
    status: "ONLINE",
    features: ["Lunar Phase Engine", "Real-Time Weather API", "GPS Catch Logger", "Siri Voice Control", "Fishing Calendar"],
    appStoreUrl: "https://apps.apple.com/app/id6777416041",
    code: "v1.0.0",
  },
  {
    id: "playlistai",
    name: "PlayListAI",
    tagline: "AI-Powered Music Curation",
    description: "Let AI build your perfect playlist. Integrates Apple Music and Spotify, supports Siri voice commands, offline playback, and smart genre-based organization.",
    emoji: "🎵",
    icon: Code,
    glowColor: "rgba(168,85,247,0.3)",
    borderColor: "border-purple-500/40",
    accentColor: "text-purple-400",
    badgeBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    badge: "LIVE // App Store",
    status: "ONLINE",
    features: ["Neural Playlist Engine", "Apple Music + Spotify", "Siri Voice Commands", "Offline Playback", "Genre Matrix"],
    appStoreUrl: "https://apps.apple.com/app/id6779980469",
    code: "v1.0.1",
  },
  {
    id: "sleuthpro",
    name: "SleuthPro",
    tagline: "People Search. Powered by Intelligence.",
    description: "Instant people search using public records and licensed data. Search by name, phone, email, or address. Deep Dive reports unlock law-enforcement-grade background data with Siri voice commands.",
    emoji: "🔍",
    icon: Search,
    glowColor: "rgba(59,130,246,0.3)",
    borderColor: "border-blue-500/40",
    accentColor: "text-blue-400",
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    badge: "PENDING REVIEW",
    status: "PENDING",
    features: ["Name / Phone / Email / Address Search", "Deep Dive Reports", "Siri Voice Commands", "Reports Vault", "Alerts & Monitoring"],
    appStoreUrl: null,
    code: "v1.0.0",
  },
  {
    id: "sirinotespro",
    name: "SiriNotes Pro",
    tagline: "Just Speak. Siri Does the Rest.",
    description: "Voice-first notes, grocery lists, appointments, and daily reminders — all hands-free with Siri. Designed for people who prefer speaking over typing. Smart, simple, and always listening when you need it.",
    emoji: "🎙️",
    icon: Mic,
    glowColor: "rgba(0,255,65,0.2)",
    borderColor: "border-green-500/30",
    accentColor: "text-green-400",
    badgeBg: "bg-green-500/10 text-green-600 border-green-500/20",
    badge: "IN DEVELOPMENT",
    status: "OFFLINE",
    features: ["Siri Voice Dictation", "Smart Grocery Lists", "Appointment Scheduling", "Daily Reminders", "Family Sharing"],
    appStoreUrl: null,
    code: "v0.1.0",
  },
  {
    id: "appsupportdesk",
    name: "AppSupport Desk",
    tagline: "Helpdesk Built for App Developers",
    description: "Commercial support ticket system designed for indie iOS app developers. Track, triage, and resolve customer issues across your entire app portfolio — from a single unified dashboard.",
    emoji: "🎧",
    icon: Headphones,
    glowColor: "rgba(251,146,60,0.3)",
    borderColor: "border-orange-500/40",
    accentColor: "text-orange-400",
    badgeBg: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    badge: "IN DEVELOPMENT",
    status: "OFFLINE",
    features: ["Multi-App Ticket Routing", "Priority Triage Queue", "Team Collaboration", "Customer Reply Threads", "Analytics Dashboard"],
    appStoreUrl: null,
    code: "v0.2.0",
  },
]

export function AppsSection() {
  return (
    <section id="apps" className="py-24 bg-black relative overflow-hidden">
      {/* Background binary pattern */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ fontSize: '10px', lineHeight: '18px', color: 'rgba(0,255,65,0.04)', fontFamily: 'monospace', wordBreak: 'break-all', padding: '20px' }}>
        {Array(60).fill("01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 ").join("")}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 font-mono text-green-600 text-sm mb-4">
            <span className="text-green-800">/*</span>
            <span>APP_PORTFOLIO.init()</span>
            <span className="text-green-800">*/</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-green-400">
              DEPLOYED
            </span>{" "}
            SYSTEMS
          </h2>
          <p className="text-green-700 text-sm font-mono max-w-2xl mx-auto">
            // Each application engineered with precision. Zero compromises.
          </p>
        </motion.div>

        {/* App Cards — 2-col on lg, 1-col on mobile, centered last row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className={`relative bg-black/80 border ${app.borderColor} rounded-none cyber-card overflow-hidden flex flex-col group transition-all duration-300`}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${app.glowColor}, 0 0 60px ${app.glowColor.replace('0.3', '0.1').replace('0.2', '0.05')}`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `none`; }}
            >
              {/* Terminal top bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-black/90 border-b border-green-500/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-green-800">{app.code}</span>
              </div>

              {/* Card Header */}
              <div className="p-6 border-b border-green-500/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{app.emoji}</div>
                  <Badge className={`${app.badgeBg} border text-xs font-mono rounded-none`}>
                    {app.badge}
                  </Badge>
                </div>
                <h3 className={`text-xl font-bold ${app.accentColor} font-mono mb-1 tracking-wider`}>{app.name}</h3>
                <p className="text-gray-500 text-xs font-mono">{app.tagline}</p>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-400 text-xs leading-relaxed mb-5 font-mono">
                  {app.description}
                </p>

                {/* Features */}
                <div className="space-y-1.5 mb-6 flex-1">
                  {app.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-green-600">&gt;</span>
                      <span className="text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Status + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-green-500/10">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        app.status === "ONLINE"
                          ? "bg-green-400"
                          : app.status === "PENDING"
                          ? "bg-blue-400"
                          : "bg-yellow-500"
                      }`}
                      style={
                        app.status === "ONLINE"
                          ? { boxShadow: "0 0 6px rgba(0,255,65,0.8)" }
                          : app.status === "PENDING"
                          ? { boxShadow: "0 0 6px rgba(59,130,246,0.8)" }
                          : { boxShadow: "0 0 6px rgba(234,179,8,0.8)" }
                      }
                    />
                    <span
                      className={
                        app.status === "ONLINE"
                          ? "text-green-500"
                          : app.status === "PENDING"
                          ? "text-blue-400"
                          : "text-yellow-600"
                      }
                    >
                      {app.status}
                    </span>
                  </div>
                  {app.appStoreUrl ? (
                    <Button
                      size="sm"
                      asChild
                      className={`bg-transparent hover:bg-green-500/10 ${app.accentColor} border border-current rounded-none font-mono text-xs uppercase tracking-wider`}
                    >
                      <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
                        App Store <ExternalLink className="ml-1.5 w-3 h-3" />
                      </a>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      disabled
                      className="bg-transparent text-yellow-700 border border-yellow-700/30 rounded-none font-mono text-xs cursor-not-allowed"
                    >
                      ./coming_soon
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
