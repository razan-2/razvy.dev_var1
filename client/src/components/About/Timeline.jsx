"use client"

import { useState, useEffect, useRef } from "react"
import { useGlitch } from "@/hooks/use-glitch"

// Sample timeline data - replace with your actual events
const timelineEvents = [
  {
    id: 1,
    title: "FIRST_WEBSITE.launch",
    date: "2018-05-12",
    description:
      "Created my first professional website for a local business, implementing responsive design principles and modern JavaScript frameworks to deliver an engaging user experience.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "STARTUP_COLLAB.begin",
    date: "2019-11-03",
    description:
      "Joined a tech startup as lead frontend developer, where I architected and built the company's flagship product from the ground up using React and Node.js.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "OPEN_SOURCE.contribute",
    date: "2020-07-22",
    description:
      "Made significant contributions to several open-source projects, including a popular React component library and a state management solution that gained traction in the developer community.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "AGENCY_WORK.expand",
    date: "2021-03-15",
    description:
      "Expanded my freelance work into a small digital agency, bringing on two additional developers and a designer to tackle larger projects for clients across multiple industries.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "TECH_CONFERENCE.speak",
    date: "2022-09-08",
    description:
      "Delivered my first conference talk on 'Breaking Design Conventions with Purpose' at a major tech conference, sharing insights on brutalist web design and innovative user experiences.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function TimelineSection() {
  const [mounted, setMounted] = useState(false)
  const [visibleEvents, setVisibleEvents] = useState([])
  const timelineRef = useRef(null)
  const { applyGlitchEffect } = useGlitch()

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Handle initial mount animation
  useEffect(() => {
    setMounted(true)

    // Apply initial glitch effect to the entire section
    if (timelineRef.current) {
      setTimeout(() => {
        applyGlitchEffect(timelineRef.current)
      }, 500)
    }

    // Staggered reveal of timeline events
    const revealEvents = () => {
      timelineEvents.forEach((_, index) => {
        setTimeout(() => {
          setVisibleEvents((prev) => [...prev, index])
        }, 400 * index)
      })
    }

    // Start revealing events after a short delay
    setTimeout(revealEvents, 800)

    // Apply random glitch effects to timeline elements
    const timelineElements = document.querySelectorAll(".timeline-decorative")
    timelineElements.forEach((el, index) => {
      setTimeout(
        () => {
          applyGlitchEffect(el)
        },
        1000 + 150 * index,
      )
    })
  }, [applyGlitchEffect])

  // Set up interval for random glitch effects
  useEffect(() => {
    if (!mounted) return

    const glitchInterval = setInterval(() => {
      const eventElements = document.querySelectorAll(".timeline-event")
      if (eventElements.length === 0) return

      const randomIndex = Math.floor(Math.random() * eventElements.length)
      applyGlitchEffect(eventElements[randomIndex])
    }, 6000)

    return () => clearInterval(glitchInterval)
  }, [mounted, applyGlitchEffect])

  return (
    <section ref={timelineRef} className="relative w-full py-24 overflow-hidden bg-black text-white">
      {/* Section title */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-mono font-bold tracking-tighter timeline-decorative">
          <span className="inline-block relative">
            <span className="relative z-10">TIMELINE_EVENTS</span>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-green-500/50"></div>
          </span>
        </h2>
        <p className="mt-4 text-lg text-white/70 max-w-2xl">
          A chronological journey through key milestones that shaped my career and technical expertise.
        </p>
      </div>

      {/* Main timeline */}
      <div className="container mx-auto px-4 relative">
        {/* Timeline center line - visible on md screens and up */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-green-500/30 transform -translate-x-1/2 hidden md:block timeline-decorative"></div>

        {/* Timeline events */}
        <div className="relative z-10">
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className={`timeline-event mb-16 md:mb-32 transition-all duration-700 ${
                visibleEvents.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12`}
              >
                {/* Image container */}
                <div className="w-full md:w-5/12">
                  <div
                    className="relative border-2 border-white/30 overflow-hidden group"
                    onMouseEnter={(e) => applyGlitchEffect(e.currentTarget)}
                  >
                    <div className="glitch-image-container">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={600}
                        height={400}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="glitch-image-r"></div>
                      <div className="glitch-image-g"></div>
                      <div className="glitch-image-b"></div>
                    </div>

                    {/* Decorative elements */}
                    <div
                      className={`absolute top-0 ${index % 2 === 0 ? "right" : "left"}-0 w-1/3 h-2 bg-green-500`}
                    ></div>
                    <div
                      className={`absolute bottom-0 ${index % 2 === 0 ? "left" : "right"}-0 w-1/4 h-2 bg-green-500`}
                    ></div>

                    {/* Date overlay */}
                    <div
                      className={`absolute ${index % 2 === 0 ? "left-0" : "right-0"} bottom-0 bg-black/80 p-2 border-t border-${index % 2 === 0 ? "r" : "l"} border-green-500/70`}
                    >
                      <span className="font-mono text-green-400 text-sm">{formatDate(event.date)}</span>
                    </div>
                  </div>
                </div>

                {/* Content container */}
                <div className="w-full md:w-7/12 flex flex-col justify-center">
                  {/* Timeline node - visible on md screens and up */}
                  <div
                    className={`hidden md:block absolute left-1/2 top-1/2 w-4 h-4 bg-green-500 transform -translate-x-1/2 ${
                      index % 2 === 0 ? "-translate-y-1/2" : "-translate-y-1/2"
                    }`}
                  ></div>

                  {/* Timeline connector - visible on md screens and up */}
                  <div
                    className={`hidden md:block absolute top-1/2 w-[100px] h-[1px] bg-green-500/70 transform -translate-y-1/2 ${
                      index % 2 === 0 ? "left-[calc(50%-100px)]" : "left-1/2"
                    }`}
                  ></div>

                  {/* Event title */}
                  <h3 className="text-2xl md:text-3xl font-mono font-bold mb-3">
                    <span className="relative inline-block">
                      {event.title}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-green-500/50"></div>
                    </span>
                  </h3>

                  {/* Event description */}
                  <p className="text-lg text-white/80 mb-4">{event.description}</p>

                  {/* Mobile date display */}
                  <div className="md:hidden font-mono text-green-400 text-sm">{formatDate(event.date)}</div>
                </div>
              </div>

              {/* Decorative glitch elements */}
              {index % 2 === 0 && (
                <div
                  className="absolute -left-4 top-1/2 w-8 h-8 opacity-30 timeline-decorative"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 30% 50%)",
                    background: "linear-gradient(45deg, rgba(0,255,0,0.2), rgba(0,255,0,0.3))",
                  }}
                ></div>
              )}

              {index % 2 !== 0 && (
                <div
                  className="absolute -right-4 top-1/2 w-8 h-8 opacity-30 timeline-decorative"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 70% 50%, 100% 100%, 0 100%)",
                    background: "linear-gradient(135deg, rgba(0,255,0,0.2), rgba(0,255,0,0.3))",
                  }}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-green-500/30 timeline-decorative"></div>
      <div className="absolute bottom-0 right-0 w-2/3 h-1 bg-green-500/30 timeline-decorative"></div>

      {/* Diagonal glitch lines */}
      <div className="absolute top-0 left-[20%] w-[1px] h-full bg-green-500/20 transform rotate-[75deg] timeline-decorative"></div>
      <div className="absolute top-0 right-[20%] w-[1px] h-full bg-green-500/20 transform -rotate-[75deg] timeline-decorative"></div>
    </section>
  )
}

