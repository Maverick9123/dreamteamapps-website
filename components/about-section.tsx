"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Star, Users } from "lucide-react"

const values = [
  { icon: Star, title: "QUALITY_FIRST", description: "Every app ships only when it's exceptional. No shortcuts, no half-measures.", color: "text-yellow-400" },
  { icon: Zap, title: "POWER_PACKED", description: "Serious functionality wrapped in clean, intuitive interfaces. No bloat.", color: "text-green-400" },
  { icon: Shield, title: "PRIVACY_CORE", description: "Your data stays yours. Privacy-by-design in every product we ship.", color: "text-teal-400" },
  { icon: Users, title: "REAL_SUPPORT", description: "Dedicated support desk. Real humans, real answers. Always.", color: "text-purple-400" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#030a05] relative overflow-hidden">
      {/* Subtle green grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="font-mono text-green-700 text-sm mb-3">// ABOUT_US.md</div>
            <h2 className="text-4xl font-bold text-white mt-1 mb-6 leading-tight">
              Code That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-300">
                Matters
              </span>
            </h2>
            <div className="space-y-4 font-mono text-sm">
              <p className="text-green-700/80 leading-relaxed border-l-2 border-green-500/30 pl-4">
                <span className="text-green-600">const</span> dreamTeam <span className="text-white">=</span> {"{"}
              </p>
              <p className="text-gray-400 pl-8 leading-relaxed">
                DreamTeam Apps is an independent iOS development studio 
                focused on building premium applications that solve real 
                everyday problems with elegant design.
              </p>
              <p className="text-gray-400 pl-8 leading-relaxed">
                From Siri voice integration to AI-powered features, we 
                leverage the best of modern iOS — wrapped in interfaces 
                that just work.
              </p>
              <p className="text-green-700/80 border-l-2 border-green-500/30 pl-4">{"}"}</p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["iOS 17+", "Swift", "Siri", "AI/ML", "WireGuard", "App Store"].map((tag) => (
                <span
                  key={tag}
                  className="bg-green-500/5 border border-green-500/20 text-green-600 text-xs px-3 py-1 font-mono rounded-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/60 border border-green-500/15 p-5 hover:border-green-500/40 transition-all duration-300 cyber-card"
              >
                <div className="flex items-center gap-2 mb-3">
                  <value.icon className={`w-4 h-4 ${value.color}`} />
                  <span className={`font-mono text-xs font-bold ${value.color}`}>{value.title}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed font-mono">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
