import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { GlitchText } from "@/lib/glitch-text"
import { randomGlitch } from "@/lib/glitch-effects"
import { Github, Monitor, Zap, Terminal } from "lucide-react"

// Project data
const publicProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout process. Implemented with modern web technologies and optimized for performance.",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/example/ecommerce",
    techStack: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
    completionDate: "2023-06-15",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    name: "Corporate Dashboard",
    description:
      "An interactive dashboard for corporate analytics with real-time data visualization, user management, and reporting features. Built with a focus on security and scalability.",
    liveUrl: "https://example.com/dashboard",
    githubUrl: "https://github.com/example/dashboard",
    techStack: ["Vue.js", "Express", "PostgreSQL", "D3.js", "Docker"],
    completionDate: "2023-09-22",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    name: "Healthcare Portal",
    description:
      "A HIPAA-compliant healthcare portal allowing patients to schedule appointments, access medical records, and communicate with healthcare providers securely.",
    liveUrl: "https://example.com/healthcare",
    githubUrl: "https://github.com/example/healthcare",
    techStack: ["Angular", "Java Spring", "MySQL", "OAuth 2.0", "Azure"],
    completionDate: "2023-11-30",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

const nerdyProjects = [
  {
    id: 1,
    name: "Pixel Glitch Generator",
    description:
      "An experimental tool that applies various glitch effects to images in real-time. Users can adjust parameters to create unique digital artifacts and export the results.",
    liveUrl: "https://example.com/glitch-generator",
    githubUrl: "https://github.com/example/glitch-generator",
    techStack: ["JavaScript", "WebGL", "Canvas API", "Web Workers"],
    completionDate: "2023-04-10",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    name: "Terminal-Based RPG",
    description:
      "A text-based role-playing game that runs entirely in the terminal. Features procedurally generated dungeons, turn-based combat, and a save system using local storage.",
    liveUrl: null,
    githubUrl: "https://github.com/example/terminal-rpg",
    techStack: ["Python", "Curses", "SQLite"],
    completionDate: "2023-07-05",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    name: "Neural Network Visualizer",
    description:
      "A tool for visualizing neural networks during training. Shows real-time updates of weights, biases, and activation functions to help understand the learning process.",
    liveUrl: "https://example.com/nn-visualizer",
    githubUrl: "https://github.com/example/nn-visualizer",
    techStack: ["TensorFlow.js", "React", "Three.js", "Web Sockets"],
    completionDate: "2023-10-18",
    imageUrl: "/placeholder.svg?height=400&width=600",
  },
]

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("public")
  const containerRef = useRef(null)

  // Set up intersection observer to update active section based on scroll position
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    // Use a debounced version of the observer callback to reduce processing
    let timeout = null
    const handleIntersection = (entries) => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "public-section") {
              setActiveSection("public")
            } else if (entry.target.id === "nerdy-section") {
              setActiveSection("nerdy")
            }
          }
        })
      }, 100) // 100ms debounce
    }

    const observer = new IntersectionObserver(handleIntersection, options)

    const publicSection = document.getElementById("public-section")
    const nerdySection = document.getElementById("nerdy-section")

    if (publicSection) observer.observe(publicSection)
    if (nerdySection) observer.observe(nerdySection)

    return () => {
      if (timeout) clearTimeout(timeout)
      observer.disconnect()
    }
  }, [])

  // Add noise overlay to the container
  useEffect(() => {
    if (containerRef.current) {
      // Use a lightweight CSS-based noise effect instead of canvas
      const noiseElement = document.createElement("div")
      noiseElement.className = "noise-overlay"
      containerRef.current.appendChild(noiseElement)
    }
  }, [])

  // Scroll to section function with debounce
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      // Use native scrollTo for better performance
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white flex relative">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-scanlines opacity-10 z-10"></div>

      {/* Navigation sidebar - fixed position with solid background */}
      <nav className="w-24 h-screen bg-black flex flex-col items-center justify-center fixed left-0 top-0 border-r border-white/10">
        <div className="h-full flex flex-col items-center justify-center relative">
          {/* Vertical line with animated pulse */}
          <div className="absolute h-full w-[2px] bg-white/30 top-0 left-1/2 transform -translate-x-1/2 overflow-hidden">
            <div className="absolute w-full h-20 bg-white/50 top-0 animate-pulse-down"></div>
          </div>

          {/* Navigation nodes */}
          <div className="flex flex-col items-center justify-center h-full relative z-20 py-20 space-y-32">
            <NavNode
              label="PUBLIC"
              isActive={activeSection === "public"}
              onClick={() => scrollToSection("public-section")}
              color="#00ff00"
              icon={<Zap size={14} />}
            />

            <NavNode
              label="NERDY"
              isActive={activeSection === "nerdy"}
              onClick={() => scrollToSection("nerdy-section")}
              color="#ff00ff"
              icon={<Terminal size={14} />}
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-t-2 border-l-2 border-white/30 animate-glitch-rotate"></div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 border-b-2 border-r-2 border-white/30 animate-glitch-rotate-reverse"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pl-24 overflow-y-auto">
        {/* Public Projects Section */}
        <section id="public-section" className="min-h-screen">
          {/* Section header */}
          <div className="flex items-start min-h-[50vh] sticky top-0 left-0 bg-black z-20">
            <div className="w-24 h-full flex items-center justify-center">
              {/* Vertical colored line with animated pulse */}
              <div className="w-1 h-full bg-[#00ff00] relative overflow-hidden">
                <div className="absolute w-full h-20 bg-white/50 top-0 animate-pulse-down"></div>
              </div>
            </div>

            <div className="py-16 px-8 relative">
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-24 h-24 opacity-20">
                <div className="w-full h-full border-t-2 border-r-2 border-[#00ff00] animate-glitch-rotate"></div>
              </div>

              <h2 className="text-7xl md:text-8xl font-mono font-bold relative mb-4 inline-block">
                <GlitchText text="HARD" intensity="medium" className="text-white" />
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#00ff00] animate-glitch-width"></div>
              </h2>
              <p className="font-mono text-lg max-w-xl relative">
                Professional web development projects created for clients and organizations. Each project demonstrates
                technical expertise and business solutions.
                <span className="absolute -left-4 top-0 w-2 h-full bg-[#00ff00]/20"></span>
              </p>

              {/* Binary decorative text */}
              <div className="absolute bottom-4 right-4 font-mono text-xs text-[#00ff00]/30 animate-blink">
                01001000 01000001 01010010 01000100
              </div>
            </div>
          </div>

          {/* Projects list */}
          <div className="py-16">
            {publicProjects.map((project, index) => (
              <ProjectEntry key={project.id} project={project} type="public" isEven={index % 2 === 0} />
            ))}
          </div>
        </section>

        {/* Nerdy Projects Section */}
        <section id="nerdy-section" className="min-h-screen">
          {/* Section header */}
          <div className="flex items-start min-h-[50vh] sticky top-0 left-0 bg-black z-20">
            <div className="w-24 h-full flex items-center justify-center">
              {/* Vertical colored line with animated pulse */}
              <div className="w-1 h-full bg-[#ff00ff] relative overflow-hidden">
                <div className="absolute w-full h-20 bg-white/50 top-0 animate-pulse-down"></div>
              </div>
            </div>

            <div className="py-16 px-8 relative">
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-24 h-24 opacity-20">
                <div className="w-full h-full border-t-2 border-r-2 border-[#ff00ff] animate-glitch-rotate-reverse"></div>
              </div>

              <h2 className="text-7xl md:text-8xl font-mono font-bold relative mb-4 inline-block">
                <GlitchText text="SOFT" intensity="medium" className="text-white" />
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#ff00ff] animate-glitch-width"></div>
              </h2>
              <p className="font-mono text-lg max-w-xl relative">
                Personal experiments, tools, and passion projects. These showcase my curiosity and willingness to
                explore new technologies and concepts.
                <span className="absolute -left-4 top-0 w-2 h-full bg-[#ff00ff]/20"></span>
              </p>

              {/* Binary decorative text */}
              <div className="absolute bottom-4 right-4 font-mono text-xs text-[#ff00ff]/30 animate-blink">
                01010011 01001111 01000110 01010100
              </div>
            </div>
          </div>

          {/* Projects list */}
          <div className="py-16">
            {nerdyProjects.map((project, index) => (
              <ProjectEntry key={project.id} project={project} type="nerdy" isEven={index % 2 === 0} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

// Enhanced NavNode component with animations
function NavNode({ label, isActive, onClick, color, icon }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={onClick}
        className="relative w-6 h-6 rounded-full border-2 border-white flex items-center justify-center group transition-transform hover:scale-110"
        aria-label={`Navigate to ${label} section`}
        onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
      >
        {isActive ? (
          <div className="w-4 h-4 rounded-full absolute animate-pulse" style={{ backgroundColor: color }}></div>
        ) : (
          <div
            className="w-4 h-4 rounded-full absolute opacity-0 group-hover:opacity-30 transition-opacity"
            style={{ backgroundColor: color }}
          ></div>
        )}

        {/* Icon that appears on hover */}
        <div
          className={`absolute opacity-0 group-hover:opacity-100 transition-opacity text-black z-10 ${isActive ? "text-black" : "text-white"}`}
        >
          {icon}
        </div>
      </button>
      <span
        className={`font-mono text-xs font-bold transform -rotate-90 origin-center whitespace-nowrap ${
          isActive ? "text-white" : "text-white/50"
        } group-hover:text-white transition-colors`}
        data-text={label}
      >
        {label}
      </span>
    </div>
  )
}

// Enhanced ProjectEntry component with animations
function ProjectEntry({ project, type, isEven }) {
  const projectRef = useRef(null)
  const imageRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Use intersection observer to trigger animations when project comes into view
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

    if (projectRef.current) {
      observer.observe(projectRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const accentColor = type === "public" ? "#00ff00" : "#ff00ff"

  // Apply random glitch effect to image periodically
  useEffect(() => {
    if (!isVisible || !imageRef.current) return

    // Apply initial glitch effect
    randomGlitch(imageRef.current, 500)

    // Set up interval for occasional glitches
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to glitch
        randomGlitch(imageRef.current, 300)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <div
      ref={projectRef}
      className={`w-[80%] mx-auto mb-32 relative transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16`}>
        {/* Image section */}
        <div className="w-full md:w-1/2 relative" ref={imageRef}>
          <div className="aspect-video relative overflow-hidden group">
            {/* Image with distortion effect on hover */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.name}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:filter-distort"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* RGB split effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-red-500/20 mix-blend-screen transform translate-x-[3px] translate-y-0"></div>
                <div className="absolute inset-0 bg-green-500/20 mix-blend-screen transform translate-x-0 translate-y-[2px]"></div>
                <div className="absolute inset-0 bg-blue-500/20 mix-blend-screen transform translate-x-[-3px] translate-y-0"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-white"></div>
              <div className="absolute top-0 left-0 h-full w-[2px] bg-white"></div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-[2px] bg-white"></div>
              <div className="absolute top-0 right-0 h-full w-[2px] bg-white"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
              <div className="absolute bottom-0 left-0 h-full w-[2px] bg-white"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <div className="absolute bottom-0 right-0 w-full h-[2px] bg-white"></div>
              <div className="absolute bottom-0 right-0 h-full w-[2px] bg-white"></div>
            </div>

            {/* Animated scan line */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-[2px] bg-white/30 absolute top-0 left-0 animate-scan-down"></div>
            </div>

            {/* Date overlay with glitch effect */}
            <div className="absolute top-4 right-4 z-10">
              <div
                className="px-3 py-1 font-mono text-xs font-bold bg-black text-white relative overflow-hidden group-hover:animate-glitch-text"
                onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
              >
                {new Date(project.completionDate).getFullYear()}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:animate-glitch-slide"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-4">
            <h3 className="text-3xl font-mono font-bold mb-4 relative inline-block">
              <GlitchText text={project.name} intensity="medium" className="text-white" />
              <div className="h-1 w-full mt-1 relative overflow-hidden" style={{ backgroundColor: accentColor }}>
                <div className="absolute inset-0 bg-white/50 w-1/4 h-full animate-glitch-slide"></div>
              </div>
            </h3>

            <p className="font-mono text-sm leading-relaxed mb-6 relative">
              {project.description}
              <span
                className="absolute -left-2 top-0 w-1 h-full"
                style={{ backgroundColor: `${accentColor}20` }}
              ></span>
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-mono bg-white text-black hover:bg-black hover:text-white border border-white transition-colors duration-300 relative overflow-hidden group"
                  onMouseEnter={(e) => randomGlitch(e.currentTarget, 200)}
                >
                  {tech}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:animate-glitch-slide"></div>
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  className="flex items-center gap-1 px-4 py-2 font-mono text-sm font-bold bg-transparent text-white hover:text-black transition-colors relative group overflow-hidden"
                  onMouseEnter={(e) => randomGlitch(e.currentTarget, 200)}
                >
                  <div
                    className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: accentColor }}
                  ></div>
                  <Monitor size={16} className="relative z-10" />
                  <span className="relative z-10">LIVE SITE</span>
                </Link>
              )}

              <Link
                href={project.githubUrl}
                className="flex items-center gap-1 px-4 py-2 font-mono text-sm font-bold bg-transparent text-white hover:text-black transition-colors relative group overflow-hidden"
                onMouseEnter={(e) => randomGlitch(e.currentTarget, 200)}
              >
                <div className="absolute inset-0 w-0 group-hover:w-full transition-all duration-300 bg-white"></div>
                <Github size={16} className="relative z-10" />
                <span className="relative z-10">GITHUB</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal line separator with animated glitch */}
      <div className="w-full h-[1px] bg-white/20 mt-16 relative overflow-hidden">
        <div
          className="absolute h-full w-[20%] bg-white/50 animate-glitch-slide"
          style={{ animationDelay: `${Math.random() * 2}s` }}
        ></div>
      </div>
    </div>
  )
}

