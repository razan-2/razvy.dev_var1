import { useState, useEffect } from "react"
import { useGlitch } from "@/hooks/use-glitch"

/**
 * Section Navigation Component
 * @param {Object} props
 * @param {React.RefObject} props.servicesRef - Reference to services section
 * @param {React.RefObject} props.skillsRef - Reference to skills section
 */
export default function SectionNav({ servicesRef, skillsRef }) {
  const [activeSection, setActiveSection] = useState("services")

  // Glitch effect hook
  const { setRef, triggerGlitch } = useGlitch({
    randomInterval: true,
    intervalMin: 5000,
    intervalMax: 10000,
    duration: 300,
  })

  // Scroll to section
  const scrollToSection = (sectionRef, sectionId) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      triggerGlitch()
    }
  }

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const servicesTop = servicesRef.current?.offsetTop || 0
      const skillsTop = skillsRef.current?.offsetTop || 0
      const scrollPosition = window.scrollY + window.innerHeight / 3

      if (scrollPosition >= skillsTop) {
        setActiveSection("skills")
      } else if (scrollPosition >= servicesTop) {
        setActiveSection("services")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [servicesRef, skillsRef])

  return (
    <div ref={setRef} className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col items-center space-y-8">
        {/* Line connecting the dots */}
        <div className="absolute left-3 top-0 w-0.5 h-full bg-white"></div>

        {/* Services dot */}
        <button
          onClick={() => scrollToSection(servicesRef, "services")}
          className={`relative z-10 w-6 h-6 rounded-full border-2 transition-all ${
            activeSection === "services" ? "border-[#00ff00] bg-[#00ff00]" : "border-white bg-black"
          }`}
          aria-label="Go to Services section"
        >
          <span
            className={`absolute left-8 whitespace-nowrap font-mono text-xs ${
              activeSection === "services" ? "text-[#00ff00]" : "text-white"
            }`}
          >
            SERVICES
          </span>
        </button>

        {/* Skills dot */}
        <button
          onClick={() => scrollToSection(skillsRef, "skills")}
          className={`relative z-10 w-6 h-6 rounded-full border-2 transition-all ${
            activeSection === "skills" ? "border-[#00ffff] bg-[#00ffff]" : "border-white bg-black"
          }`}
          aria-label="Go to Skills section"
        >
          <span
            className={`absolute left-8 whitespace-nowrap font-mono text-xs ${
              activeSection === "skills" ? "text-[#00ffff]" : "text-white"
            }`}
          >
            SKILLS
          </span>
        </button>
      </div>
    </div>
  )
}

