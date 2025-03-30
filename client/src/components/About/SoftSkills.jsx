"use client"

import { useRef, useEffect, useState } from "react"
import { useGlitch } from "@/hooks/use-glitch"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Users, MessageSquare, Lightbulb } from "lucide-react"
import { Link } from "react-router-dom"

export default function SoftSkillsSection() {
  const containerRef = useRef(null)
  const headingRef = useRef(null)
  const {
    setRef: setGlitchRef,
    triggerGlitch,
    applyGlitchEffect,
  } = useGlitch({
    randomInterval: false,
    duration: 500,
  })
  const [isVisible, setIsVisible] = useState(false)

  // Set up intersection observer for viewport animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            triggerGlitch()

            // Apply glitch effect to all skill items with a delay
            const skillItems = containerRef.current?.querySelectorAll(".skill-item")
            skillItems?.forEach((item, index) => {
              setTimeout(() => {
                applyGlitchEffect(item)
              }, 100 * index)
            })
          } else {
            // When exiting viewport
            if (isVisible) {
              triggerGlitch()
              setIsVisible(false)
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [applyGlitchEffect, isVisible, triggerGlitch])

  // Soft Skills data
  const skillCategories = [
    {
      icon: <Brain className="h-6 w-6" />,
      name: "COGNITIVE",
      skills: ["Problem Solving", "Critical Thinking", "Adaptability", "Creativity"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      name: "INTERPERSONAL",
      skills: ["Teamwork", "Leadership", "Conflict Resolution", "Empathy"],
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      name: "COMMUNICATION",
      skills: ["Clear Writing", "Public Speaking", "Active Listening", "Feedback"],
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      name: "WORK ETHIC",
      skills: ["Time Management", "Organization", "Accountability", "Initiative"],
    },
  ]

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        setGlitchRef(el)
      }}
      className="w-full bg-black text-white py-12 px-4 md:px-8 border-b-4 border-[#00ff00] relative overflow-hidden"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
        }}
      ></div>

      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-8">
          <h2
            ref={headingRef}
            data-text="HUMAN INTERFACE"
            className="text-4xl md:text-5xl font-mono font-bold glitch-text text-[#00ff00]"
          >
            HUMAN INTERFACE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-item p-4 bg-black border-l-2 border-[#00ff00] hover:bg-black hover:border-l-8 transition-all duration-300"
            >
              <div className="flex items-center mb-3 space-x-2">
                <div className="text-[#00ff00]">{category.icon}</div>
                <h3 className="text-xl font-mono font-bold">{category.name}</h3>
              </div>
              <ul className="font-mono space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center" data-text={skill}>
                    <span className="mr-2 text-[#00ff00]">{"$"}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-start mt-8">
          <Link href="/about/soft-skills">
            <Button
              className="bg-black text-[#00ff00] border-2 border-[#00ff00] font-mono text-lg px-8 py-6 h-auto relative overflow-hidden hover:bg-[#00ff00] hover:text-black transition-colors"
              onMouseEnter={() => triggerGlitch()}
            >
              <span className="flex items-center">
                EXPLORE HUMAN SIDE
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

