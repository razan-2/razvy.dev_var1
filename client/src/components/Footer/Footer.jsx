"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Github, Linkedin, Mail, Terminal, Facebook, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGlitch } from "@/hooks/use-glitch";
import { Link } from "react-router-dom"
import "../../assets/index.css";

// Custom Instagram icon component
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export default function BrutalistFooter() {
  const [isGlitching, setIsGlitching] = useState(false)
  const [email, setEmail] = useState("")
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      setIsGlitching(true)
      const timer = setTimeout(() => setIsGlitching(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [inView])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmail("")
    // Handle newsletter signup
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "github" },
    { icon: Linkedin, href: "https://linkedin.com", label: "linkedin" },
    { icon: Mail, href: "mailto:example@example.com", label: "email" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "facebook" },
    { icon: Phone, href: "tel:+1234567890", label: "phone" },
  ]

  return (
    <footer
      ref={ref}
      className={`
        relative bg-black text-white font-mono w-full overflow-hidden
        border-t-2 border-white
        ${isGlitching ? "animate-glitch" : ""}
      `}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen">
        <div className="absolute inset-0 animate-noise bg-noise" />
      </div>

      <div className="w-full max-w-[90vw] px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mx-auto">
        {/* Logo/Name Block */}
        <div className="glitch-container max-w-full">
          <h2 className="text-3xl md:text-4xl font-bold glitch-text break-words" data-text="RAZVY.DEV">
            RAZVY.DEV
          </h2>
          <div className="mt-2 text-sm opacity-70">
            <span className="text-green-400">&gt;_</span> FULL STACK DEVELOPER
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 max-w-full">
          <h3 className="text-sm text-green-400 mb-4">/navigation</h3>
          {[
            ["HOME", "/"],
            ["PROJECTS", "/projects"],
            ["ABOUT", "/about"],
            ["CONTACT", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="block hover:text-green-400 glitch-link transform transition-transform duration-100 truncate"
              style={{ "--glitch-transform": useGlitch() }}
            >
              <span className="text-green-400">&gt;</span> {label}
            </Link>
          ))}
        </nav>

        {/* System Info & Contact */}
        <div className="space-y-4 max-w-full">
          <div className="terminal-window p-4 bg-black border border-white">
            <div className="space-y-1 text-sm">
              <p className="text-green-400">System Status:</p>
              <p className="truncate">Running BrutalOS v1.4</p>
              <p className="animate-pulse truncate">Status: Glitching...</p>
              <p className="truncate">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="flex items-center space-x-1 hover:text-green-400 transition-colors duration-200 p-1 border border-transparent hover:border-green-400 truncate"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm truncate">/root/{label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-4 max-w-full">
          <h3 className="text-sm text-green-400">/subscribe</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 flex-shrink-0" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter_email >_"
                className="bg-transparent border-white text-white placeholder-gray-500 w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black hover:bg-green-400 hover:text-white transition-colors"
            >
              EXECUTE SUBSCRIBE.SH
            </Button>
          </form>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-white mt-4">
        <div className="w-full px-4 py-4 mx-auto">
          <div className="text-red-500 animate-pulse text-sm truncate">
            WARNING: © 2024 - Unauthorized duplication may corrupt the system
          </div>
        </div>
      </div>
    </footer>
  )
}

