export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-black border-t border-green-500/15 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400 font-bold text-lg tracking-widest font-mono uppercase">
                DreamTeam<span className="text-white">_</span>Apps
              </span>
            </div>
            <p className="text-green-900 text-xs font-mono leading-relaxed max-w-xs">
              // Premium iOS applications built with passion,<br />
              // precision, and purpose.<br />
              // Available on the Apple App Store.
            </p>
          </div>

          {/* Apps */}
          <div>
            <h4 className="text-green-600 font-mono text-xs font-bold mb-4 uppercase tracking-widest">&gt; Apps</h4>
            <ul className="space-y-2">
              {["FishingPalPro", "PlayListAI", "DreamTeam VPN"].map((app) => (
                <li key={app}>
                  <a href="#apps" className="text-green-900 hover:text-green-500 text-xs font-mono transition-colors">
                    ./{app}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-green-600 font-mono text-xs font-bold mb-4 uppercase tracking-widest">&gt; Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Support", href: "#support" },
                { label: "Contact", href: "#contact" },
                { label: "Privacy Policy", href: "/privacy" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-green-900 hover:text-green-500 text-xs font-mono transition-colors">
                    ./{item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-green-900 text-xs font-mono">
            © {year} DreamTeam Apps. All rights reserved.
          </p>
          <p className="text-green-900 text-xs font-mono">
            [[ Crafted with ❤️ for iOS users worldwide ]]
          </p>
        </div>
      </div>
    </footer>
  )
}
