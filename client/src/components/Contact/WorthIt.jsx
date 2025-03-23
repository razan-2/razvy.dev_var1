"use client"

import { useRef, useEffect, useState } from "react"
import { Check, Clock, Zap, MessageSquare, Clock3, Shield } from "lucide-react"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"
import { randomGlitch } from "@/lib/glitch-effects"

export default function WorhIt() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const messageRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [responseTime, setResponseTime] = useState(5)

  // Set up glitch effect for the container, but remove the random interval
  const { setRef: setGlitchRef, triggerGlitch } = useGlitch({
    randomInterval: false, // Changed to false to remove trembling
    intervalMin: 3000,
    intervalMax: 8000,
    duration: 400,
    addNoise: true,
  })

  // Set up intersection observer for viewport animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Only trigger glitch once when it becomes visible
            triggerGlitch()
          } else {
            setIsVisible(false)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
      setGlitchRef(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [setGlitchRef, triggerGlitch])

  return (
    <div
      ref={containerRef}
      className={`relative mb-16 overflow-hidden bg-black p-8 border-b-4 border-white
                ${isVisible ? "content-glitching" : ""} bg-scanlines`}
    >
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

      {/* Scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none z-0"></div>

      <div className="relative z-10">
        {/* Header with terminal-style elements */}
        <div className="flex items-center mb-8">
          <div className="w-4 h-8 bg-green-500 mr-3 animate-pulse"></div>
          <h2 className="text-4xl font-mono font-bold text-white">
            <GlitchText text="IS IT WORTH IT?" intensity="high" className="tracking-tight" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* User photo with glitch effect - 4 columns */}
          <div className="md:col-span-4 relative">
            <div
              ref={imageRef}
              className="relative aspect-square overflow-hidden border-4 border-white group"
              onMouseEnter={() => randomGlitch(imageRef.current, 300)}
            >
              {/* Replace with actual user image */}
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="User profile"
                className="w-full h-full object-cover"
              />

              {/* RGB split layers for glitch effect */}
              <div className="absolute inset-0 bg-red-500/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-1"></div>
              <div className="absolute inset-0 bg-green-500/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-blue-500/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1"></div>

              {/* Technical overlay */}
              <div className="absolute inset-0 border-4 border-white border-dashed opacity-0 group-hover:opacity-30 transition-opacity"></div>

              {/* Status indicator */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 font-mono text-xs text-white flex justify-between">
                <span>ID:USER_01</span>
                <span className="text-green-400 animate-pulse">ACTIVE</span>
              </div>
            </div>

            {/* Response time indicator */}
            <div className="mt-4 bg-black border-2 border-white p-2">
              <div className="flex items-center justify-between font-mono text-white text-sm">
                <Clock className="h-4 w-4 text-green-500" />
                <span>RESPONSE_TIME:</span>
                <span className="text-green-400">{responseTime} MIN</span>
              </div>
            </div>

            {/* Technical data */}
            <div className="mt-4 font-mono text-xs text-white/50 border-l-2 border-white/30 pl-2">
              <div>{"// AVAILABILITY: 09:00-18:00"}</div>
              <div>{"// TIMEZONE: GMT+2"}</div>
              <div>{"// CHANNELS: EMAIL, WHATSAPP, SLACK"}</div>
            </div>
          </div>

          {/* Content - 8 columns */}
          <div className="md:col-span-8">
            {/* Main text */}
            <div className="font-mono text-white space-y-4 mb-8">
              <p className="text-xl border-b border-white pb-2">
                Time is the most valuable asset. I understand that when you reach out, you need answers quickly.
              </p>
              <p>
                My average response time is under 5 minutes during business hours. No automated responses, no chatbots -
                just real-time human interaction.
              </p>

              {/* Four boxes in a grid - Added two more boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="border-2 border-white p-3 bg-black/50">
                  <div className="flex items-center text-green-400 mb-2">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="font-bold">QUICK SOLUTIONS</span>
                  </div>
                  <p className="text-sm">
                    Fast responses mean faster solutions to your problems, keeping your project on track.
                  </p>
                </div>

                <div className="border-2 border-white p-3 bg-black/50">
                  <div className="flex items-center text-green-400 mb-2">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span className="font-bold">REAL COMMUNICATION</span>
                  </div>
                  <p className="text-sm">
                    Immediate feedback creates a productive dialogue that moves your project forward.
                  </p>
                </div>

                {/* New box 1 */}
                <div className="border-2 border-white p-3 bg-black/50">
                  <div className="flex items-center text-green-400 mb-2">
                    <Clock3 className="h-4 w-4 mr-2" />
                    <span className="font-bold">TIME EFFICIENCY</span>
                  </div>
                  <p className="text-sm">
                    Minimize waiting periods and maximize productivity with rapid turnaround times on all
                    communications.
                  </p>
                </div>

                {/* New box 2 */}
                <div className="border-2 border-white p-3 bg-black/50">
                  <div className="flex items-center text-green-400 mb-2">
                    <Shield className="h-4 w-4 mr-2" />
                    <span className="font-bold">RELIABILITY</span>
                  </div>
                  <p className="text-sm">
                    Count on consistent response times and dependable communication throughout your entire project
                    lifecycle.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp message visualization */}
            <div className="relative border-4 border-white p-4 bg-black/30">
              <div className="absolute top-2 right-2 font-mono text-xs text-white flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                ONLINE
              </div>

              <div className="flex flex-col space-y-4 mt-2">
                {/* Incoming message */}
                <div className="flex items-start">
                  <div className="bg-gray-800 text-white p-3 rounded-tr-lg rounded-br-lg rounded-bl-lg max-w-xs">
                    <p className="font-mono">Hey, can we discuss the project?</p>
                    <p className="text-xs text-gray-400 text-right mt-1">10:30 AM</p>
                  </div>
                </div>

                {/* Outgoing message with seen status */}
                <div className="flex items-start justify-end">
                  <div
                    ref={messageRef}
                    className="bg-green-900 text-white p-3 rounded-tl-lg rounded-bl-lg rounded-br-lg max-w-xs"
                  >
                    <p className="font-mono">I'm available now. Let's talk.</p>
                    <div className="flex items-center justify-end mt-1 space-x-1">
                      <p className="text-xs text-gray-300">10:32 AM</p>
                      <div className="flex">
                        <Check className="h-3 w-3 text-blue-400" />
                        <Check className="h-3 w-3 text-blue-400 -ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response metrics section removed */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 border-t-2 border-white/30 font-mono text-xs text-white flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span>SYSTEM_ACTIVE</span>
          </div>
          <div className="text-white/50 flex items-center">
            <span className="mr-4">UPTIME: 99.8%</span>
            <span>ID: #RT-95123</span>
          </div>
        </div>
      </div>
    </div>
  )
}

