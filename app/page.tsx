"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { AppsSection } from "@/components/apps-section"
import { AboutSection } from "@/components/about-section"
import { SupportSection } from "@/components/support-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1f3d]">
      <Navbar />
      <Hero />
      <AppsSection />
      <AboutSection />
      <SupportSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
