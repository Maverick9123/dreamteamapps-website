"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-green-500/20"
      style={{ boxShadow: "0 0 20px rgba(0,255,65,0.08)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — clicking takes you home */}
          <button onClick={scrollToTop} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="https://galaxy-prod.tlcdn.com/gen/user_33ij5Gxezez5LoutRhuzSKmJeV9/d1504e15-6c07-4b1b-97b4-50ca248ffbfb.png"
              alt="DreamTeam Apps Logo"
              width={44}
              height={44}
              className="rounded-lg object-cover"
              style={{ boxShadow: "0 0 12px rgba(0,255,65,0.2)" }}
            />
            <span className="text-green-400 font-bold text-lg tracking-widest font-mono uppercase neon-green">
              DreamTeam<span className="text-white">_</span>Apps
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={scrollToTop}
              className="text-green-600 hover:text-green-400 transition-colors text-sm font-mono uppercase tracking-wider"
            >
              Home
            </button>
            {["Apps", "About", "Support", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-green-600 hover:text-green-400 transition-colors text-sm font-mono uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-400 text-black font-bold border-0 rounded-none uppercase tracking-widest font-mono"
              style={{ boxShadow: "0 0 10px rgba(0,255,65,0.3)" }}
            >
              Get Apps
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-green-400 hover:text-green-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-green-500/20 bg-black/95">
            <button
              onClick={scrollToTop}
              className="block w-full text-left text-green-600 hover:text-green-400 transition-colors py-2 font-mono uppercase tracking-wider text-sm"
            >
              &gt; Home
            </button>
            {["Apps", "About", "Support", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-green-600 hover:text-green-400 transition-colors py-2 font-mono uppercase tracking-wider text-sm"
                onClick={() => setIsOpen(false)}
              >
                &gt; {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
