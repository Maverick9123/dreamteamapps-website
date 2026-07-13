"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MatrixRain } from "@/components/matrix-rain"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black scanlines">
      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-green-500/5 rounded-full blur-3xl z-10" />

      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16">
        {/* Terminal Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-black/80 border border-green-500/40 rounded px-4 py-2 mb-8 font-mono glow-border"
        >
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-sm">
            <span className="text-green-600">root@dreamteam:~$</span>{" "}
            <span className="cursor">launching premium iOS apps</span>
          </span>
        </motion.div>

        {/* Logo + Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <h1 className="sr-only">Dream Team Apps LLC — On Demand Dream App Creations</h1>
          <Image
            src="/dta-banner.jpg"
            alt="Dream Team Apps LLC — On Demand Dream App Creations — Start Here!"
            width={1920}
            height={960}
            className="w-full max-w-4xl h-auto rounded-xl"
            style={{ boxShadow: "0 0 60px rgba(90,120,255,0.28), 0 0 130px rgba(140,90,255,0.16)" }}
            priority
          />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-green-300/80 mb-10 max-w-2xl mx-auto leading-relaxed font-mono"
        >
          // Premium iOS applications engineered for real life.<br />
          // Where cutting-edge code meets elegant design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-6 text-lg rounded-none border-0 uppercase tracking-widest"
            style={{ boxShadow: "0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.1)" }}
            onClick={() => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Apps <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300 px-8 py-6 text-lg rounded-none uppercase tracking-widest font-mono"
            onClick={() => document.getElementById('support')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Shield className="mr-2 w-5 h-5" /> Get Support
          </Button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto border border-green-500/20 bg-black/60 backdrop-blur-sm p-6"
          style={{ boxShadow: "0 0 30px rgba(0,255,65,0.08)" }}
        >
          {[
            { value: "2+", label: "Live Apps", icon: Zap },
            { value: "iOS", label: "Platform", icon: Shield },
            { value: "24/7", label: "Support", icon: Terminal },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-5 h-5 text-green-500 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-400 neon-green font-mono">{stat.value}</div>
              <div className="text-green-700 text-xs mt-1 font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
    </section>
  )
}
