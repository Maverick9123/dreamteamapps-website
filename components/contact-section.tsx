   "use client"

import { motion } from "framer-motion"
import { Globe, Mail, MessageSquare, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-[#0a1f3d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <motion.div
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
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-mono text-sm">
              // Have a question, partnership inquiry, or feedback?<br />
              // We&apos;d love to hear from you.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">// Website</div>
                  <div className="text-white font-mono font-medium">www.DreamTeamApps.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono">// General Inquiries</div>
                  <div className="text-white font-mono font-medium">btwynn@bellsouth.net</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Support Desk CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black/60 border border-green-500/20 p-8 cyber-card"
          >
            <div className="w-14 h-14 rounded-none bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-green-400" />
            </div>

            <h3 className="text-white text-2xl font-bold font-mono mb-3">Support Portal</h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed mb-6">
              // Need help with one of our apps?<br />
              // Submit a ticket through our dedicated<br />
              // helpdesk — we respond fast.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Ticket tracking & history",
                "App-specific support",
                "Feature requests welcome",
                "Fast response times",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 font-mono text-xs">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <Button
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold border-0 rounded-none uppercase tracking-widest font-mono py-6 text-sm"
              style={{ boxShadow: "0 0 20px rgba(0,255,65,0.3)" }}
              onClick={() => window.open('https://app-support-desk-three.vercel.app', '_blank')}
            >
              Open Support Ticket <ExternalLink className="ml-2 w-4 h-4" />
            </Button>

            <p className="text-green-900 text-xs font-mono text-center mt-4">
              // Powered by DreamTeam AppSupport Desk
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
