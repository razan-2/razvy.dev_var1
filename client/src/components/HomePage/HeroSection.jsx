"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Instagram, Github, Linkedin, Phone, Code, Terminal, Database, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGlitch } from "@/hooks/use-glitch"

export default function HeroSection() {
  const [typingComplete, setTypingComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [mounted, setMounted] = useState(false)
  const nameRef = useRef(null)
  const roleRef = useRef(null)
  const contentRef = useRef(null)

  const { applyGlitchEffect } = useGlitch()

  // Handle initial mount animation
  useEffect(() => {
    setMounted(true)

    // Apply initial glitch effect to the entire section
    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      applyGlitchEffect(heroSection)
    }

    // Apply random glitch effects to decorative elements
    const decorativeElements = document.querySelectorAll(".decorative-element")
    decorativeElements.forEach((el, index) => {
      setTimeout(() => {
        applyGlitchEffect(el)
      }, 100 * index) // Stagger the animations
    })
  }, [applyGlitchEffect])

  // Typing animation for name
  useEffect(() => {
    const nameElement = nameRef.current
    const roleElement = roleRef.current

    if (!nameElement || !roleElement) return

    const nameText = "razvy.dev"
    const roleText = "Full Stack Web Developer"
    let nameIndex = 0
    let roleIndex = 0
    let nameTyping
    let roleTyping

    // Start typing name
    nameTyping = setInterval(() => {
      if (nameIndex < nameText.length) {
        nameElement.textContent = nameText.slice(0, nameIndex + 1) + "█"
        nameIndex++
      } else {
        nameElement.textContent = nameText
        clearInterval(nameTyping)

        // Start typing role after name is complete
        roleTyping = setInterval(() => {
          if (roleIndex < roleText.length) {
            roleElement.textContent = roleText.slice(0, roleIndex + 1) + "█"
            roleIndex++
          } else {
            roleElement.textContent = roleText
            clearInterval(roleTyping)
            setTypingComplete(true)
          }
        }, 100)
      }
    }, 150)

    return () => {
      clearInterval(nameTyping)
      clearInterval(roleTyping)
    }
  }, [])

  // Show content with glitch effect after typing is complete
  useEffect(() => {
    if (typingComplete && contentRef.current) {
      const timer = setTimeout(() => {
        setShowContent(true)
        applyGlitchEffect(contentRef.current)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [typingComplete, applyGlitchEffect])

  // Apply random glitch effects to decorative elements periodically
  useEffect(() => {
    if (mounted) {
      const decorativeElements = document.querySelectorAll(".decorative-element")

      const glitchInterval = setInterval(() => {
        const randomElement = decorativeElements[Math.floor(Math.random() * decorativeElements.length)]
        if (randomElement) {
          applyGlitchEffect(randomElement)
        }
      }, 3000)

      return () => clearInterval(glitchInterval)
    }
  }, [mounted, applyGlitchEffect])

  return (
    <section className="hero-section relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-10"></div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none z-[5]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          animation: "noise 150ms steps(2) infinite",
        }}
      ></div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-[2]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-green-500 z-[6] decorative-element"></div>
      <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-green-500 z-[6] decorative-element"></div>
      {/* <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-green-500 z-[6] decorative-element"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-green-500 z-[6] decorative-element"></div> */}

      {/* Decorative tech symbols */}
      <div className="absolute top-[20%] left-[5%] opacity-20 decorative-element">
        <Code className="w-12 h-12 text-green-500" />
      </div>
      <div className="absolute top-[70%] left-[8%] opacity-20 decorative-element">
        <Terminal className="w-10 h-10 text-green-500" />
      </div>
      <div className="absolute top-[15%] right-[7%] opacity-20 decorative-element">
        <Database className="w-8 h-8 text-green-500" />
      </div>
      <div className="absolute top-[60%] right-[5%] opacity-20 decorative-element">
        <Server className="w-10 h-10 text-green-500" />
      </div>

      {/* Binary code decorative elements */}
      <div className="absolute top-[30%] left-[2%] font-mono text-xs opacity-20 text-green-500 decorative-element">
        01001100
        <br />
        10101010
        <br />
        01010101
        <br />
        11001100
      </div>
      <div className="absolute bottom-[20%] right-[3%] font-mono text-xs opacity-20 text-green-500 decorative-element">
        10101010
        <br />
        01010101
        <br />
        11001100
        <br />
        01001100
      </div>

      {/* Broken pixel blocks */}
      <div className="absolute top-[25%] left-[25%] w-4 h-20 bg-green-500/30 decorative-element"></div>
      <div className="absolute top-[45%] right-[30%] w-20 h-4 bg-green-500/30 decorative-element"></div>
      <div className="absolute bottom-[35%] left-[40%] w-8 h-8 bg-green-500/30 decorative-element"></div>

      {/* Error message decorative elements */}
      <div className="absolute top-[10%] right-[15%] font-mono text-xs text-red-500 bg-black/80 p-2 border border-red-500 decorative-element">
        ERROR_0x94A2: SYSTEM_OVERRIDE
      </div>
      <div className="absolute bottom-[15%] left-[20%] font-mono text-xs text-yellow-500 bg-black/80 p-2 border border-yellow-500 decorative-element">
        WARNING: MEMORY_CORRUPTION
      </div>

      {/* Diagonal glitch lines */}
      <div className="absolute top-0 left-[20%] w-[1px] h-screen bg-green-500/50 transform rotate-[15deg] decorative-element"></div>
      <div className="absolute top-0 right-[30%] w-[1px] h-screen bg-green-500/50 transform -rotate-[20deg] decorative-element"></div>

      {/* Broken grid sections */}
      <div
        className="absolute top-[40%] left-[10%] w-40 h-40 decorative-element"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          clipPath: "polygon(0 0, 100% 20%, 80% 100%, 20% 80%)",
        }}
      ></div>
      <div
        className="absolute bottom-[30%] right-[15%] w-40 h-40 decorative-element"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          clipPath: "polygon(20% 0, 100% 30%, 80% 100%, 0 70%)",
        }}
      ></div>

      {/* Main content */}
      <div className="container relative z-20 mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-start justify-between gap-8">
        <div className="w-full md:w-7/12 space-y-8">
          {/* Name with typing effect */}
          <div className="relative">
            <h1
              ref={nameRef}
              className="text-5xl md:text-7xl font-mono font-bold tracking-tighter glitch-text"
              data-text="razvy.dev"
              aria-label="razvy.dev"
            >
              █
            </h1>
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-green-500"></div>
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-green-500"></div>
          </div>

          {/* Role with typing effect */}
          <div className="relative">
            <h2
              ref={roleRef}
              className="text-2xl md:text-3xl font-mono text-green-500 mt-2"
              aria-label="Full Stack Web Developer"
            >
              █
            </h2>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 opacity-30"></div>
          </div>

          {/* Content that appears after typing with glitch effect */}
          <div
            ref={contentRef}
            className={`space-y-6 transition-opacity duration-300 ${showContent ? "opacity-100" : "opacity-0"}`}
          >
            <div className="glitch-quote text-lg md:text-xl max-w-2xl relative">
              <div className="absolute -left-4 top-1/2 w-2 h-20 -translate-y-1/2 bg-green-500"></div>
              Building digital experiences that break conventional boundaries. I specialize in creating web applications
              that combine cutting-edge technology with bold, unconventional design.
              <div className="mt-4 font-mono text-sm text-green-500 opacity-80">
                // Expertise in React, Node.js, and modern web technologies
              </div>
            </div>

            {/* Social icons */}
            <div className="flex flex-wrap gap-6 mt-8">
              <Link href="https://instagram.com" className="group">
                <div className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Instagram className="w-6 h-6 relative z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
                </div>
              </Link>

              <Link href="https://github.com" className="group">
                <div className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Github className="w-6 h-6 relative z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
                </div>
              </Link>

              <Link href="https://linkedin.com" className="group">
                <div className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Linkedin className="w-6 h-6 relative z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
                </div>
              </Link>

              <Link href="tel:+1234567890" className="group">
                <div className="relative p-3 bg-white/10 hover:bg-white/20 border border-white/30 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Phone className="w-6 h-6 relative z-10" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
                </div>
              </Link>
            </div>

            {/* CTA Button */}
            <div className="relative mt-8 inline-block">
              <div className="absolute -inset-1 bg-green-500/30 animate-pulse"></div>
              <Button
                className="cta-button px-8 py-6 text-lg bg-black hover:bg-green-900 text-green-500 font-mono border-2 border-green-500 hover:border-green-400 relative overflow-hidden group"
                onClick={() => applyGlitchEffect(document.querySelector(".cta-button"))}
              >
                <span className="relative z-10">CONTACT_ME.exe</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
              </Button>
            </div>
          </div>
        </div>

        {/* Image with glitch effect */}
        <div
          className={`w-full md:w-5/12 transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}
        >
          <div className="relative border-4 border-white/50 overflow-hidden">
            {/* Decorative elements on image */}
            <div className="absolute top-0 left-0 w-full h-8 bg-green-500/20 z-10"></div>
            <div className="absolute top-8 left-0 w-8 h-40 bg-green-500/20 z-10"></div>
            <div className="absolute bottom-0 right-0 w-full h-8 bg-green-500/20 z-10"></div>
            <div className="absolute bottom-8 right-0 w-8 h-40 bg-green-500/20 z-10"></div>

            {/* Error message decorative element */}
            <div className="absolute top-4 right-4 z-20 bg-black/80 border border-red-500 p-2 font-mono text-xs text-red-500">
              ERROR_0x94A2: SYSTEM_OVERRIDE
            </div>

            <div className="glitch-image-container">
              <img
                src="/placeholder.svg?height=600&width=500"
                alt="Razvy - Full Stack Developer"
                width={500}
                height={600}
                className="w-full object-cover"
              />
              <div className="glitch-image-r"></div>
              <div className="glitch-image-g"></div>
              <div className="glitch-image-b"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-4 bg-green-500"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-4 bg-green-500"></div>
            <div className="absolute top-4 right-0 w-4 h-20 bg-green-500"></div>

            {/* Image caption */}
            <div className="absolute bottom-8 left-8 font-mono text-xs bg-black/70 p-2 border-l-2 border-green-500">
              <div className="text-green-500">STATUS: ONLINE</div>
              <div className="text-white/70">ID: DEV_7734</div>
            </div>
          </div>

          {/* Technical specs decorative element */}
          <div className="mt-4 font-mono text-xs text-white/50 p-3 border border-white/20 bg-black/50">
            <div className="flex justify-between">
              <span>FRONTEND:</span>
              <span className="text-green-500">React.js | Next.js | TypeScript</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>BACKEND:</span>
              <span className="text-green-500">Node.js | Express | MongoDB</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>TOOLS:</span>
              <span className="text-green-500">Git | Docker | AWS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500/50 z-[15]"></div>

      {/* Animated glitch blocks that appear on load */}
      <div
        className={`absolute top-[15%] left-[15%] w-4 h-20 bg-green-500/30 decorative-element transition-all duration-500 ${mounted ? "opacity-30" : "opacity-0 translate-x-10"}`}
      ></div>
      <div
        className={`absolute top-[45%] right-[20%] w-20 h-4 bg-green-500/30 decorative-element transition-all duration-500 delay-100 ${mounted ? "opacity-30" : "opacity-0 -translate-y-10"}`}
      ></div>
      <div
        className={`absolute bottom-[25%] left-[30%] w-8 h-8 bg-green-500/30 decorative-element transition-all duration-500 delay-200 ${mounted ? "opacity-30" : "opacity-0 translate-y-10"}`}
      ></div>
    </section>
  )
}

