"use client"

import { useRef, useEffect, useState } from "react"
import { Phone, Mail, Instagram, Linkedin, Github, Facebook } from "lucide-react"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"
import { randomGlitch } from "@/lib/glitch-effects"

export default function SocialMediaSection() {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Set up glitch effect for the container
  const { setRef: setGlitchRef, triggerGlitch } = useGlitch({
    randomInterval: true,
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

  // Apply random glitch to social media items when they appear
  useEffect(() => {
    if (isVisible && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".social-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          randomGlitch(item, 300)
        }, index * 150)
      })
    }
  }, [isVisible])

  const socialLinks = [
    {
      name: "Phone",
      icon: <Phone className="w-6 h-6" />,
      link: "tel:+1234567890",
      color: "bg-green-500/10 border-green-500 hover:bg-green-500/20",
    },
    {
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:contact@example.com",
      color: "bg-blue-500/10 border-blue-500 hover:bg-blue-500/20",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      link: "https://instagram.com",
      color: "bg-pink-500/10 border-pink-500 hover:bg-pink-500/20",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      link: "https://linkedin.com",
      color: "bg-blue-700/10 border-blue-700 hover:bg-blue-700/20",
    },
    {
      name: "GitHub",
      icon: <Github className="w-6 h-6" />,
      link: "https://github.com",
      color: "bg-gray-500/10 border-gray-500 hover:bg-gray-500/20",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      link: "https://facebook.com",
      color: "bg-blue-600/10 border-blue-600 hover:bg-blue-600/20",
    },
  ]

  return (
    <div
      ref={containerRef}
      className={`relative mt-12 mb-20 md:w-[70vw] overflow-hidden bg-black p-8 border-4 border-white
                 ${isVisible ? "content-glitching" : ""} bg-scanlines`}
    >
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-8">
          <div className="w-4 h-8 bg-green-500 mr-3 animate-pulse"></div>
          <h2 className="text-4xl font-mono font-bold text-white" data-text="CONNECT_">
            <GlitchText text="CONNECT_" intensity="high" className="tracking-tight" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item group relative p-5 border-2 ${social.color}
                        transform transition-all duration-300 hover:scale-105
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                        transition-all duration-500 ease-out`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white"></div>

              <div className="flex items-center">
                <div className="flex justify-center items-center w-10 h-10 mr-4 text-white bg-black rounded-none">
                  {social.icon}
                </div>
                <div className="font-mono text-white text-lg">{social.name}</div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-mono">
                  {">>"}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 p-4 border-l-4 border-green-500 bg-black/50 font-mono text-sm text-white">
          <div className="glitch-quote">{"> "}Connect with me across platforms or send a direct message.</div>
          <div className="mt-2 text-green-400 animate-pulse">{"> "}STATUS: ONLINE_</div>
        </div>
      </div>
    </div>
  )
}

