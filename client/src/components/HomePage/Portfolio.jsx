import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlitchText } from "@/lib/glitch-text"
import { randomGlitch } from "@/lib/glitch-effects"
import { ArrowRight, Github, Monitor, Terminal, Zap } from "lucide-react"

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering and secure checkout.",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "public",
  },
  {
    id: 2,
    name: "Pixel Glitch Generator",
    description: "An experimental tool that applies various glitch effects to images in real-time.",
    liveUrl: "https://example.com/glitch-generator",
    githubUrl: "https://github.com/example/glitch-generator",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "nerdy",
  },
  {
    id: 3,
    name: "Corporate Dashboard",
    description: "An interactive dashboard for corporate analytics with real-time data visualization.",
    liveUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/example/dashboard",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "public",
  },
]

export default function Portfolio() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)

  // Add noise overlay to the container
  useEffect(() => {
    if (containerRef.current) {
      // Use a lightweight CSS-based noise effect
      const noiseElement = document.createElement("div")
      noiseElement.className = "noise-overlay"
      containerRef.current.appendChild(noiseElement)
    }

    // Apply occasional glitch effect to title
    const titleElement = titleRef.current
    if (titleElement) {
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          // 30% chance to glitch
          randomGlitch(titleElement, 300)
        }
      }, 3000)

      return () => clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10 z-10"></div>

      {/* Featured projects section */}
      <section className="py-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-mono font-bold relative inline-block">
              <GlitchText text="FEATURED PROJECTS" intensity="medium" className="text-white" />
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-white animate-glitch-width"></div>
            </h2>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-16 h-16 opacity-20">
              <div className="w-full h-full border-t-2 border-r-2 border-white animate-glitch-rotate"></div>
            </div>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Featured project card component
function FeaturedProjectCard({ project }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Use intersection observer to trigger animations when card comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Apply random glitch effect to card periodically
  useEffect(() => {
    if (!isVisible || !cardRef.current) return

    // Apply initial glitch effect
    randomGlitch(cardRef.current, 300)

    // Set up interval for occasional glitches
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // 20% chance to glitch
        randomGlitch(cardRef.current, 200)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isVisible])

  const accentColor = project.category === "public" ? "#00ff00" : "#ff00ff"
  const categoryIcon = project.category === "public" ? <Zap size={14} /> : <Terminal size={14} />

  return (
    <div
      ref={cardRef}
      className={`relative border border-white/20 bg-black transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Category indicator */}
      <div
        className="absolute top-0 left-0 z-10 px-3 py-1 font-mono text-xs font-bold flex items-center gap-1"
        style={{ backgroundColor: accentColor }}
      >
        {categoryIcon}
        <span className="uppercase text-black">{project.category}</span>
      </div>

      {/* Image with distortion effect on hover */}
      <div className="relative aspect-video overflow-hidden group">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={project.imageUrl || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:filter-distort"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* RGB split effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-red-500/20 mix-blend-screen transform translate-x-[3px] translate-y-0"></div>
            <div className="absolute inset-0 bg-green-500/20 mix-blend-screen transform translate-x-0 translate-y-[2px]"></div>
            <div className="absolute inset-0 bg-blue-500/20 mix-blend-screen transform translate-x-[-3px] translate-y-0"></div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-6 h-6">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white"></div>
          <div className="absolute top-0 left-0 h-full w-[2px] bg-white"></div>
        </div>
        <div className="absolute top-0 right-0 w-6 h-6">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-white"></div>
          <div className="absolute top-0 right-0 h-full w-[2px] bg-white"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-6 h-6">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
          <div className="absolute bottom-0 left-0 h-full w-[2px] bg-white"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-6 h-6">
          <div className="absolute bottom-0 right-0 w-full h-[2px] bg-white"></div>
          <div className="absolute bottom-0 right-0 h-full w-[2px] bg-white"></div>
        </div>

        {/* Animated scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-[2px] bg-white/30 absolute top-0 left-0 animate-scan-down"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-mono font-bold mb-2 relative inline-block">
          <GlitchText text={project.name} intensity="low" className="text-white" />
          <div className="h-[2px] w-full mt-1 relative overflow-hidden" style={{ backgroundColor: accentColor }}>
            <div className="absolute inset-0 bg-white/50 w-1/4 h-full animate-glitch-slide"></div>
          </div>
        </h3>

        <p className="font-mono text-sm text-white/80 mb-4 relative">
          {project.description}
          <span className="absolute -left-2 top-0 w-1 h-full" style={{ backgroundColor: `${accentColor}20` }}></span>
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              className="flex items-center gap-1 px-3 py-1 font-mono text-xs font-bold bg-transparent text-white hover:text-black transition-colors relative group overflow-hidden"
              onMouseEnter={(e) => randomGlitch(e.currentTarget, 200)}
            >
              <div
                className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              ></div>
              <Monitor size={14} className="relative z-10" />
              <span className="relative z-10">LIVE</span>
            </Link>
          )}

          <Link
            href={project.githubUrl}
            className="flex items-center gap-1 px-3 py-1 font-mono text-xs font-bold bg-transparent text-white hover:text-black transition-colors relative group overflow-hidden"
            onMouseEnter={(e) => randomGlitch(e.currentTarget, 200)}
          >
            <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 bg-white"></div>
            <Github size={14} className="relative z-10" />
            <span className="relative z-10">GITHUB</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

