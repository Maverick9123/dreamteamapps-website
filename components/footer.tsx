     "use client"

import Image from "next/image"

const DTA_LOGO = "https://galaxy-prod.tlcdn.com/gen/user_33ij5Gxezez5LoutRhuzSKmJeV9/d1504e15-6c07-4b1b-97b4-50ca248ffbfb.png"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const apps = [
    { name: "FishingPalPro", href: "/#apps" },
    { name: "PlayListAI", href: "/#apps" },
    { name: "SkinGuardAI", href: "/#apps" },
    { name: "SiriNotes Pro", href: "/#apps" },
  ]

  const links = [
    { name: "Home", href: "/#" },
    { name: "Apps", href: "/#apps" },
    { name: "About", href: "/#about" },
    { name: "Support", href: "/#support" },
    { name: "Contact", href: "/#contact" },
  ]

  return (
    <footer className="bg-black border-t border-green-500/20 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={DTA_LOGO}
                alt="DreamTeamApps Logo"
                width={48}
                height={48}
                className="object-contain"
                unoptimized
              />
              <div>
                <div className="text-white font-mono font-bold text-lg leading-tight">DreamTeamApps</div>
                <div className="text-green-400 font-mono text-xs">// Building the future</div>
              </div>
            </div>
            <p className="text-gray-500 font-mono text-xs leading-relaxed max-w-xs">
              // Innovative mobile apps crafted for iOS.<br />
              // Powered by AI. Built by dreamers.
            </p>
            <div className="mt-4 text-green-900 font-mono text-xs">
              // btwynn@bellsouth.net
            </div>
          </div>

          {/* Apps */}
          <div>
            <div className="text-green-400 font-mono text-xs mb-4">// Our_Apps</div>
            <ul className="space-y-2">
              {apps.map((app) => (
                <li key={app.name}>
                  <a
                    href={app.href}
                    className="text-gray-500 hover:text-green-400 font-mono text-xs transition-colors duration-200"
                  >
                    ./{app.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-green-400 font-mono text-xs mb-4">// Navigation</div>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-500 hover:text-green-400 font-mono text-xs transition-colors duration-200"
                  >
                    ./{link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-500/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 font-mono text-xs">
            © {currentYear} DreamTeamApps. All rights reserved.
          </div>
          <div className="text-green-900 font-mono text-xs">
            // www.DreamTeamApps.com
          </div>
        </div>
      </div>
    </footer>
  )
}
