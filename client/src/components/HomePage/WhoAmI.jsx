"use client"

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGlitch } from "@/hooks/use-glitch"

export default function WhoAmISection() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef(null)
  const { applyGlitchEffect } = useGlitch()

  // Handle initial mount animation
  useEffect(() => {
    setMounted(true)

    // Apply initial glitch effect to the entire section
    if (sectionRef.current) {
      setTimeout(() => {
        applyGlitchEffect(sectionRef.current)
      }, 500)
    }

    // Apply random glitch effects to decorative elements
    const decorativeElements = document.querySelectorAll(".who-decorative")
    decorativeElements.forEach((el, index) => {
      setTimeout(
        () => {
          applyGlitchEffect(el)
        },
        800 + 100 * index,
      ) // Stagger the animations
    })
  }, [applyGlitchEffect])

  // Set up interval for random glitch effects
  useEffect(() => {
    if (!mounted) return

    const glitchInterval = setInterval(() => {
      const elements = [".who-title", ".who-image-container", ".who-text", ".who-cta"]

      const randomElement = document.querySelector(elements[Math.floor(Math.random() * elements.length)])

      if (randomElement) {
        applyGlitchEffect(randomElement)
      }
    }, 5000)

    return () => clearInterval(glitchInterval)
  }, [mounted, applyGlitchEffect])

  return (
    <section ref={sectionRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-black text-white">
      {/* Decorative elements */}
      {/* <div className="absolute top-0 left-0 w-full h-1 bg-green-500/70 who-decorative"></div> */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-green-500/70 who-decorative"></div>

      {/* Diagonal glitch line */}
      <div className="absolute top-0 left-[40%] w-[1px] h-full bg-green-500/30 transform rotate-[15deg] who-decorative"></div>

      {/* Broken shapes */}
      <div
        className="absolute top-[20%] right-[5%] w-20 h-20 who-decorative"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 60% 80%, 20% 100%, 0 70%)",
          background: "linear-gradient(45deg, rgba(0,255,0,0.1), rgba(0,255,0,0.2))",
        }}
      ></div>

      <div
        className="absolute bottom-[10%] left-[5%] w-16 h-16 who-decorative"
        style={{
          clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)",
          background: "linear-gradient(135deg, rgba(0,255,0,0.1), rgba(0,255,0,0.2))",
        }}
      ></div>

      <div className="container relative z-10 mx-auto px-4">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          {/* Image on the left */}
          <div className="w-full md:w-5/12 who-image-container">
            <div className="relative border-4 border-white/50 overflow-hidden">
              <div className="glitch-image-container">
                <img
                  src="/placeholder.svg?height=600&width=500"
                  alt="Razvy - About Me"
                  width={500}
                  height={600}
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="glitch-image-r"></div>
                <div className="glitch-image-g"></div>
                <div className="glitch-image-b"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/2 h-4 bg-green-500"></div>
              <div className="absolute bottom-0 left-0 w-1/3 h-4 bg-green-500"></div>

              {/* Glitch overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Content on the right */}
          <div className="w-full md:w-7/12 space-y-6">
            <h2 className="text-4xl md:text-5xl font-mono font-bold tracking-tighter who-title">
              <span className="inline-block relative">
                <span className="relative z-10">WHO_AM_I?</span>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500/50"></div>
              </span>
            </h2>

            <div className="space-y-4 who-text">
              <p className="text-lg md:text-xl">
                I'm a <span className="text-green-400 font-semibold">Full Stack Developer</span> with a passion for
                creating digital experiences that challenge conventional design norms.
              </p>

              <p className="text-lg md:text-xl">
                My work sits at the intersection of{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">technology</span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500/30"></div>
                </span>{" "}
                and
                <span className="relative inline-block ml-2">
                  <span className="relative z-10">creative expression</span>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500/30"></div>
                </span>
                , pushing boundaries while maintaining functionality.
              </p>

              <p className="text-lg md:text-xl">
                With expertise in React, Node.js, and modern web technologies, I build applications that are not just
                functional but memorable.
              </p>
            </div>

            <div className="flex items-center gap-2 who-decorative">
              <Zap className="w-5 h-5 text-green-500" />
              <span className="text-green-400 font-mono">5+ years of experience</span>
            </div>

            <div className="pt-4 who-cta">
              <Link href="/about">
                <Button
                  className="group px-6 py-5 text-lg bg-black hover:bg-green-900 text-green-500 font-mono border-2 border-green-500 hover:border-green-400 relative overflow-hidden"
                  onClick={(e) => {
                    e.preventDefault()
                    applyGlitchEffect(document.querySelector(".who-cta"))
                    setTimeout(() => {
                      window.location.href = "/about"
                    }, 500)
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    LEARN_MORE.exe
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

