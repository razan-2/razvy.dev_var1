import { useEffect, useRef } from "react"
import { useGlitch } from "@/hooks/use-glitch"
import ServiceCard from "@/components/Services/ServiceCard";
import HardSkill from "@/components/Services/HardSkill";
import SoftSkill from "@/components/Services/SoftSkill"
import SectionNav from "@/components/Services/SerivcesNav"
import { GlitchText } from "@/lib/glitch-text"
import { useLocation } from "react-router-dom";

export default function Services() {
  const { setRef: pageRef, triggerGlitch } = useGlitch({
    randomInterval: true,
    intervalMin: 3000,
    intervalMax: 8000,
  })

  // Trigger random glitches on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerGlitch()
    }, 1000)
    return () => clearTimeout(timer)
  }, [triggerGlitch])

  const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

  // Services data
  const services = [
    {
      id: "ecommerce",
      name: "E-Commerce",
      description:
        "Custom online stores with secure payment processing, inventory management, and responsive design for optimal mobile shopping experiences.",
      timeline: "4-8 weeks",
      videoSrc: "/videos/ecommerce-glitch.mp4",
    },
    {
      id: "web-apps",
      name: "Web Applications",
      description:
        "Interactive, data-driven applications with real-time features, user authentication, and complex business logic implementation.",
      timeline: "6-12 weeks",
      videoSrc: "/videos/webapp-glitch.mp4",
    },
    {
      id: "portfolio",
      name: "Portfolio Sites",
      description:
        "Distinctive personal or company showcases with unique visual identity, optimized for performance and search engine visibility.",
      timeline: "2-4 weeks",
      videoSrc: "/videos/portfolio-glitch.mp4",
    },
    {
      id: "landing",
      name: "Landing Pages",
      description:
        "High-converting, focused pages designed to capture leads and communicate value propositions with clear calls to action.",
      timeline: "1-2 weeks",
      videoSrc: "/videos/landing-glitch.mp4",
    },
  ]

  // Hard skills data
  const hardSkills = [
    {
      name: "React",
      logo: "/icons/react.svg",
      description: "Component-based UI development with state management and hooks",
    },
    {
      name: "Next.js",
      logo: "/icons/nextjs.svg",
      description: "Server-side rendering, static generation, and API routes",
    },
    {
      name: "TypeScript",
      logo: "/icons/typescript.svg",
      description: "Type-safe JavaScript development with enhanced tooling",
    },
    {
      name: "Tailwind CSS",
      logo: "/icons/tailwind.svg",
      description: "Utility-first CSS framework for rapid UI development",
    },
    {
      name: "Node.js",
      logo: "/icons/nodejs.svg",
      description: "Server-side JavaScript runtime for API development",
    },
    {
      name: "GraphQL",
      logo: "/icons/graphql.svg",
      description: "Query language for APIs with efficient data fetching",
    },
  ]

  // Soft skills data
  const softSkills = [
    {
      name: "Problem Solving",
      photo: "/images/problem-solving.jpg",
      description: "Breaking down complex issues into manageable components",
    },
    {
      name: "Communication",
      photo: "/images/communication.jpg",
      description: "Clear technical and non-technical information exchange",
    },
    {
      name: "Adaptability",
      photo: "/images/adaptability.jpg",
      description: "Quick adjustment to new technologies and requirements",
    },
    {
      name: "Time Management",
      photo: "/images/time-management.jpg",
      description: "Efficient prioritization and deadline adherence",
    },
  ]

  // Section refs for navigation
  const servicesRef = useRef(null)
  const skillsRef = useRef(null)

  return (
    <main ref={pageRef} className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Background noise and scanlines */}
      <div
        className="fixed inset-0 bg-black opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "url('data:image/png;base64,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')",
          backgroundRepeat: "repeat",
        }}
      ></div>
      <div className="fixed inset-0 bg-scanlines opacity-10 pointer-events-none z-0"></div>

      {/* Fixed navigation */}
      <SectionNav servicesRef={servicesRef} skillsRef={skillsRef} />

      {/* Services Section */}
      <section
        ref={servicesRef}
        id="services"
        className="relative py-20 px-4 md:px-8 border-b-4 border-[#00ff00] border-dashed"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-mono font-bold mb-12 glitch-text" data-text="WHAT CAN I DO?">
            <GlitchText text="WHAT CAN I DO?" intensity="high" className="uppercase tracking-tighter" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                name={service.name}
                description={service.description}
                timeline={service.timeline}
                videoSrc={service.videoSrc}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="relative py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-mono font-bold mb-12 glitch-text" data-text="SKILLS">
            <GlitchText text="SKILLS" intensity="high" className="uppercase tracking-tighter" />
          </h2>

          {/* Hard Skills */}
          <div className="mb-20">
            <h3 className="text-4xl font-mono font-bold mb-8 border-l-4 border-[#ff00ff] pl-4">
              <GlitchText text="HARD SKILLS" intensity="medium" className="uppercase" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {hardSkills.map((skill, index) => (
                <HardSkill
                  key={skill.name}
                  name={skill.name}
                  logo={skill.logo}
                  description={skill.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="text-4xl font-mono font-bold mb-8 border-l-4 border-[#00ffff] pl-4">
              <GlitchText text="SOFT SKILLS" intensity="medium" className="uppercase" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {softSkills.map((skill, index) => (
                <SoftSkill
                  key={skill.name}
                  name={skill.name}
                  photo={skill.photo}
                  description={skill.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

