"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = Array(columns).fill(1)

    // Mix of katakana, Latin, numbers, symbols for ninja coder feel
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|=+-*&^%$#@!~`"

    function draw() {
      // Semi-transparent black fade effect
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Head of the stream — bright white/green
        if (drops[i] * fontSize < canvas!.height * 0.1 + Math.random() * 50) {
          ctx!.fillStyle = "#ffffff"
        } else if (Math.random() > 0.95) {
          ctx!.fillStyle = "#00ffaa" // bright teal accent
        } else {
          ctx!.fillStyle = "#00ff41" // classic Matrix green
        }

        ctx!.font = `${fontSize}px monospace`
        ctx!.fillText(char, x, y)

        // Reset drop randomly after it passes the bottom
        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
