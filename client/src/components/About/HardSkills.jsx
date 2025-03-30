"use client"

import { useRef, useEffect, useState } from "react"
import { useGlitch } from "@/hooks/use-glitch"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Globe, Terminal } from "lucide-react"
import { Link } from "react-router-dom"

export default function SkillsSection() {
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

  // Skills data
  const skillCategories = [
    {
      icon: <Code className="h-6 w-6" />,
      name: "FRONTEND",
      skills: ["React", "JavaScript", "Next.js", "Tailwind"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      name: "BACKEND",
      skills: ["Node.js", "Python", "SQL", "MongoDB"],
    },
    {
      icon: <Terminal className="h-6 w-6" />,
      name: "TOOLS",
      skills: ["Git", "Docker", "AWS", "Linux"],
    },
    {
      icon: <Globe className="h-6 w-6" />,
      name: "OTHER",
      skills: ["UI/UX", "SEO", "Testing", "CI/CD"],
    },
  ]

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        setGlitchRef(el)
      }}
      className="w-full bg-black text-white py-12 px-4 md:px-8 border-t-4 border-[#00ff00] relative overflow-hidden"
    >
      {/* Scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        <h2
          ref={headingRef}
          data-text="TECHNICAL ARSENAL"
          className="text-4xl md:text-5xl font-mono font-bold mb-8 glitch-text text-[#00ff00]"
        >
          TECHNICAL ARSENAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-item border-2 border-[#00ff00] p-4 bg-black hover:bg-[#00ff00] hover:text-black transition-colors duration-300"
            >
              <div className="flex items-center mb-3 space-x-2">
                <div className="text-[#00ff00] group-hover:text-black">{category.icon}</div>
                <h3 className="text-xl font-mono font-bold">{category.name}</h3>
              </div>
              <ul className="font-mono space-y-1">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center" data-text={skill}>
                    <span className="mr-2 text-[#00ff00]">{">"}</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <Link href="/skills">
            <Button className="bg-[#00ff00] text-black border-2 border-[#00ff00] font-mono text-lg px-8 py-6 h-auto relative overflow-hidden hover:bg-black hover:text-[#00ff00] transition-colors">
              <span className="flex items-center">
                EXPLORE FULL SKILLSET
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

