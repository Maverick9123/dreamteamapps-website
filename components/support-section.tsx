"use client"

import { motion } from "framer-motion"
import { MessageSquare, Mail, ExternalLink, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SupportSection() {
  return (
    <section id="support" className="py-24 bg-[#0d1b2e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Support</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
            We&apos;ve Got You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
              Covered
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real support for real users. Submit a ticket and our team will get back to you fast.
          </p>
        </motion.div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Support Desk Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-2xl p-8 hover:border-teal-400/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center mb-6">
              <MessageSquare className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Support Portal</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Submit a support ticket through our dedicated helpdesk portal. Track your ticket status
              and get help from our team.
            </p>
            <div className="space-y-2 mb-6">
              {["Ticket tracking", "Fast response times", "App-specific support", "Feature requests"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Button className="w-full bg-teal-500 hover:bg-teal-400 text-white border-0 font-semibold">
              Open Support Ticket <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f2744]/60 border border-white/10 rounded-2xl p-8 hover:border-teal-500/20 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white text-xl font-bold mb-3">Email Support</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Prefer email? Reach out directly and we&apos;ll get back to you within 24 hours, 
              usually much faster.
            </p>
            <div className="space-y-3 mb-6">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">FishingPalPro Support</div>
                <div className="text-teal-300 text-sm font-medium">support@fishingpalpro.com</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-gray-500 text-xs mb-1">PlayListAI Support</div>
                <div className="text-teal-300 text-sm font-medium">support@dreamteamapps.com</div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-teal-500/30 text-teal-300 hover:bg-teal-500/10 hover:text-teal-200"
            >
              Send an Email <Mail className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
