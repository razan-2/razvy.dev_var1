"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AlertTriangle, Home, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGlitch } from "@/hooks/use-glitch"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const pageRef = useRef(null)
  const errorTextRef = useRef(null)
  const navigate = useNavigate();
  const { applyGlitchEffect } = useGlitch()

  // Handle initial mount animation with increasing glitch intensity
  useEffect(() => {
    setMounted(true)

    // Simulate increasing glitch intensity
    const intensityInterval = setInterval(() => {
      setGlitchIntensity((prev) => {
        if (prev >= 10) {
          clearInterval(intensityInterval)
          return 10
        }
        return prev + 1
      })
    }, 300)

    // Apply initial glitch effects
    if (pageRef.current) {
      setTimeout(() => {
        applyGlitchEffect(pageRef.current)
      }, 100)
    }

    // Apply repeated glitch effects to error text
    if (errorTextRef.current) {
      const glitchErrorInterval = setInterval(() => {
        applyGlitchEffect(errorTextRef.current)
      }, 2000)

      return () => {
        clearInterval(intensityInterval)
        clearInterval(glitchErrorInterval)
      }
    }
  }, [applyGlitchEffect])

  // Apply random glitch effects to elements
  useEffect(() => {
    if (!mounted) return

    const elements = [".error-code", ".error-message", ".error-details", ".error-cta", ".error-decorative"]

    const glitchInterval = setInterval(() => {
      const randomElement = document.querySelector(elements[Math.floor(Math.random() * elements.length)])

      if (randomElement) {
        applyGlitchEffect(randomElement)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [mounted, applyGlitchEffect])

  // Simulate terminal error messages
  const errorMessages = [
    "ERROR: Page not found",
    "SYSTEM FAILURE: Navigation corrupted",
    "CRITICAL ERROR: Route does not exist",
    "FATAL: Unable to locate requested resource",
    "SYSTEM CRASH: Invalid path detected",
  ]

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full overflow-hidden bg-black text-white flex flex-col items-center justify-center"
    >
      {/* Scanlines overlay with intensity based on state */}
      <div
        className="absolute inset-0 bg-scanlines pointer-events-none z-10"
        style={{ opacity: 0.1 + glitchIntensity * 0.03 }}
      ></div>

      {/* Noise texture with intensity based on state */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          opacity: 0.05 + glitchIntensity * 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          animation: "noise 150ms steps(2) infinite",
        }}
      ></div>

      {/* Glitch lines that increase with intensity */}
      {[...Array(glitchIntensity)].map((_, i) => (
        <div
          key={i}
          className="absolute error-decorative"
          style={{
            top: `${Math.random() * 100}%`,
            left: 0,
            right: 0,
            height: `${1 + Math.random() * 3}px`,
            backgroundColor: `rgba(${Math.random() > 0.7 ? "255,0,0" : "0,255,0"}, ${0.2 + Math.random() * 0.5})`,
            transform: `translateY(${Math.random() * 10 - 5}px)`,
            zIndex: 6,
          }}
        ></div>
      ))}

      {/* Broken pixel blocks */}
      <div className="absolute top-[15%] left-[20%] w-20 h-4 bg-red-500/30 error-decorative"></div>
      <div className="absolute top-[35%] right-[25%] w-4 h-20 bg-green-500/30 error-decorative"></div>
      <div className="absolute bottom-[25%] left-[30%] w-12 h-12 bg-green-500/30 error-decorative"></div>
      <div className="absolute bottom-[45%] right-[15%] w-16 h-6 bg-red-500/30 error-decorative"></div>

      {/* Main content container */}
      <div className="container relative z-20 mx-auto px-4 py-20 flex flex-col items-center text-center">
        {/* Error code with glitch effect */}
        <div
          ref={errorTextRef}
          className="error-code text-9xl md:text-[12rem] font-mono font-bold text-red-500 leading-none mb-6 glitch-text"
          data-text="404"
          style={{
            textShadow: `
              ${Math.random() * glitchIntensity - glitchIntensity / 2}px ${Math.random() * glitchIntensity - glitchIntensity / 2}px 0 rgba(0,255,0,0.5),
              ${Math.random() * glitchIntensity - glitchIntensity / 2}px ${Math.random() * glitchIntensity - glitchIntensity / 2}px 0 rgba(255,0,0,0.5)
            `,
          }}
        >
          404
        </div>

        {/* Error message */}
        <h1 className="error-message text-4xl md:text-5xl font-mono font-bold mb-8 relative">
          <span className="relative z-10">SYSTEM_CRASH</span>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-red-500/50"></div>
        </h1>

        {/* Error details */}
        <div className="error-details max-w-2xl mb-12">
          <div className="font-mono text-lg md:text-xl text-white/80 mb-4">
            {errorMessages[Math.floor(Math.random() * errorMessages.length)]}
          </div>

          <div className="font-mono text-sm text-white/60 p-4 border border-red-500/50 bg-black/50 mb-6">
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span>FATAL_ERROR_0x404</span>
            </div>
            <div className="text-left">
              <div>{"> Attempting to access non-existent route"}</div>
              <div>{"> Navigation system corrupted"}</div>
              <div>{"> Memory allocation failed"}</div>
              <div>{"> System recommends returning to homepage"}</div>
            </div>
          </div>

          {/* Simulated terminal with typing effect */}
          <div className="font-mono text-sm text-green-400/90 p-4 border border-green-500/50 bg-black/70 text-left">
            <div>{"> SYSTEM: Initiating recovery protocol..."}</div>
            <div>{"> SYSTEM: Analyzing navigation failure..."}</div>
            <div>{"> SYSTEM: Recovery options available:"}</div>
            <div className="pl-4 mt-2">{"1. Return to homepage (RECOMMENDED)"}</div>
            <div className="pl-4">{"2. Retry current request"}</div>
            <div className="mt-2">{"> SYSTEM: Please select an option to proceed."}</div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="error-cta flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/">
            <Button
              className="group px-6 py-5 text-lg bg-black hover:bg-green-900 text-green-500 font-mono border-2 border-green-500 hover:border-green-400 relative overflow-hidden"
              onClick={(e) => {
                e.preventDefault()
                applyGlitchEffect(document.querySelector(".error-cta"))
                setTimeout(() => {
                  navigate("/");
                }, 500)
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Home className="w-5 h-5" />
                RETURN_HOME.exe
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
            </Button>
          </Link>

          <Button
            className="group px-6 py-5 text-lg bg-black hover:bg-red-900 text-red-500 font-mono border-2 border-red-500 hover:border-red-400 relative overflow-hidden"
            onClick={() => {
              applyGlitchEffect(pageRef.current)
              setTimeout(() => {
                window.location.reload()
              }, 500)
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" />
              RETRY_REQUEST.exe
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-r"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-g"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 glitch-image-b"></div>
          </Button>
        </div>
      </div>

      {/* Decorative error windows */}
      <div className="absolute top-[10%] right-[10%] max-w-xs w-full error-decorative">
        <div className="bg-black border-2 border-red-500">
          <div className="flex items-center justify-between bg-red-500 px-3 py-1">
            <span className="font-mono text-sm">SYSTEM_ERROR</span>
            <X className="w-4 h-4" />
          </div>
          <div className="p-3 font-mono text-xs">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Critical failure detected</span>
            </div>
            <div>Route not found in navigation system.</div>
            <div>Error code: 0x00000404</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[15%] left-[10%] max-w-xs w-full error-decorative">
        <div className="bg-black border-2 border-green-500">
          <div className="flex items-center justify-between bg-green-500 px-3 py-1">
            <span className="font-mono text-sm text-black">RECOVERY_OPTIONS</span>
            <X className="w-4 h-4 text-black" />
          </div>
          <div className="p-3 font-mono text-xs">
            <div className="mb-2">Recovery protocol initiated.</div>
            <div>Recommended action:</div>
            <div className="text-green-500">Return to homepage</div>
          </div>
        </div>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-red-500/50 z-[15]"></div>
    </div>
  )
}

