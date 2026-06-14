"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

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
            <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">Contact</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-6 leading-tight">
              Let&apos;s Talk
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Have a question, partnership inquiry, or feedback? 
              We&apos;d love to hear from you.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">Website</div>
                  <div className="text-white font-medium">www.DreamTeamApps.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-sm">General Inquiries</div>
                  <div className="text-white font-medium">hello@dreamteamapps.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f2744]/60 border border-white/10 rounded-2xl p-8"
          >
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-white text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-400">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">First Name</Label>
                    <Input
                      placeholder="John"
                      className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-teal-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm">Last Name</Label>
                    <Input
                      placeholder="Smith"
                      className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-teal-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Email</Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-teal-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Subject</Label>
                  <Input
                    placeholder="How can we help?"
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-teal-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Message</Label>
                  <Textarea
                    placeholder="Tell us more..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder-gray-600 focus:border-teal-500/50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-white border-0 font-semibold py-3"
                >
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
