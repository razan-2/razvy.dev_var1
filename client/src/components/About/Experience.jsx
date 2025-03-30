import { useState, useEffect } from "react"
import { Calendar, Briefcase, ExternalLink, ChevronRight, Hash, ArrowRight } from "lucide-react"

// Experience data
const experiences = [
  {
    id: 1,
    company: "DIGITAL FRONTIER",
    role: "Senior Frontend Developer",
    period: "2020 - Present",
    description:
      "Led development of interactive web applications using React, Next.js, and Three.js. Implemented design systems and component libraries that improved development efficiency by 40%. Mentored junior developers and conducted code reviews.",
    image: "/placeholder.svg?height=300&width=400",
    color: "#00ff00",
  },
  {
    id: 2,
    company: "TECH INNOVATIONS",
    role: "Full Stack Engineer",
    period: "2018 - 2020",
    description:
      "Architected and built scalable backend systems using Node.js and Express. Developed RESTful APIs and GraphQL endpoints. Collaborated with design team to implement responsive frontend interfaces.",
    image: "/placeholder.svg?height=300&width=400",
    color: "#ff00ff",
  },
  {
    id: 3,
    company: "CREATIVE LABS",
    role: "Web Developer",
    period: "2016 - 2018",
    description:
      "Created interactive websites and digital experiences for clients across various industries. Utilized JavaScript frameworks and CSS animations to build engaging user interfaces. Optimized site performance and accessibility.",
    image: "/placeholder.svg?height=300&width=400",
    color: "#00ffff",
  },
]

export default function ExperienceSection() {
  const [activeCard, setActiveCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Simple animation on mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-16 md:py-24 lg:py-32 border-b-8 border-white">
      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 51%, rgba(255, 255, 255, 0.05) 100%)",
          backgroundSize: "100% 4px",
        }}
      ></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-l-4 border-white opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-r-4 border-white opacity-70"></div>

      {/* Animated lines */}
      <div
        className={`absolute left-0 h-px bg-[#00ff00] transition-all duration-1000 ease-in-out ${isVisible ? "w-full" : "w-0"}`}
        style={{ top: "20%" }}
      ></div>
      <div
        className={`absolute right-0 h-px bg-[#ff00ff] transition-all duration-1000 ease-in-out delay-300 ${isVisible ? "w-full" : "w-0"}`}
        style={{ bottom: "20%" }}
      ></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-[#00ff00]"></div>
            <div className="text-sm font-mono opacity-70">EXPERIENCE.log</div>
            <div className="flex-grow h-px bg-white opacity-30"></div>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tighter leading-none relative mb-6">
            <span className="relative inline-block">
              EXPERIENCE
              <span className="absolute -inset-0.5 text-[#0ff] opacity-0 blur-[2px] hover:opacity-50">EXPERIENCE</span>
            </span>
          </h2>

          <div className="flex items-center space-x-2 my-6">
            <div className="h-2 w-16 md:w-32 bg-[#00ffff]"></div>
            <Briefcase className="w-4 h-4 text-[#00ffff]" />
            <div className="h-px flex-grow bg-[#00ffff] opacity-50"></div>
          </div>

          <p className="text-lg md:text-xl font-mono leading-relaxed max-w-3xl">
            A chronological journey through my professional career, showcasing key roles and projects that have shaped
            my expertise in web development and design.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${index % 2 === 0 ? "lg:translate-x-0" : "lg:translate-x-8"}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`relative group border-2 border-white bg-black overflow-hidden
                  ${activeCard === exp.id ? "scale-[1.02] z-10" : "scale-100 z-0"}
                  transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                onMouseEnter={() => setActiveCard(exp.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card content */}
                <div className="p-6 md:p-8">
                  {/* Company and role */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-2 h-2" style={{ backgroundColor: exp.color }}></div>
                      <div className="text-xs font-mono opacity-70 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold font-mono tracking-tight mb-2 relative">
                      {exp.company}
                    </h3>

                    <div className="text-lg md:text-xl font-mono text-gray-300 mb-4 relative">
                      {exp.role}
                      <span
                        className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: exp.color }}
                      ></span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <div className="text-xs font-mono uppercase">Description</div>
                    </div>

                    <p className="font-mono text-sm md:text-base leading-relaxed text-gray-300">{exp.description}</p>
                  </div>

                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden border border-gray-700 mb-4">
                    <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
                    <img
                      src={exp.image || "/placeholder.svg"}
                      alt={`${exp.company} project`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Glitch lines */}
                    <div className="absolute top-1/3 left-0 right-0 h-px bg-white opacity-30"></div>
                    <div className="absolute top-2/3 left-0 right-0 h-px bg-white opacity-30"></div>
                  </div>

                  {/* View details link */}
                  <div className="flex justify-end">
                    <button className="flex items-center text-sm font-mono group/btn">
                      <span className="mr-1 relative">
                        VIEW DETAILS
                        <span
                          className="absolute bottom-0 left-0 w-0 h-px group-hover/btn:w-full transition-all duration-300"
                          style={{ backgroundColor: exp.color }}
                        ></span>
                      </span>
                      <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Decorative corner elements */}
                <div
                  className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2"
                  style={{ borderColor: exp.color }}
                ></div>
                <div
                  className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2"
                  style={{ borderColor: exp.color }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2"
                  style={{ borderColor: exp.color }}
                ></div>
                <div
                  className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2"
                  style={{ borderColor: exp.color }}
                ></div>
              </div>

              {/* Decorative element */}
              <div
                className="absolute -bottom-4 -right-4 w-8 h-8 flex items-center justify-center"
                style={{ backgroundColor: exp.color }}
              >
                <ChevronRight className="w-5 h-5 text-black" />
              </div>
            </div>
          ))}
        </div>

        {/* Timeline element */}
        <div
          className={`mt-16 relative h-px bg-white/30 transition-all duration-1000 ease-out ${isVisible ? "w-full opacity-100" : "w-0 opacity-0"}`}
        >
          <div className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-[#00ff00] to-transparent"></div>
          <div className="absolute left-1/3 top-0 h-full w-1/3 bg-gradient-to-r from-[#ff00ff] to-transparent"></div>
          <div className="absolute left-2/3 top-0 h-full w-1/3 bg-gradient-to-r from-[#00ffff] to-transparent"></div>

          <div className="absolute -top-1.5 left-0 w-3 h-3 bg-[#00ff00] rounded-full"></div>
          <div className="absolute -top-1.5 left-1/3 w-3 h-3 bg-[#ff00ff] rounded-full"></div>
          <div className="absolute -top-1.5 left-2/3 w-3 h-3 bg-[#00ffff] rounded-full"></div>
          <div className="absolute -top-1.5 right-0 w-3 h-3 bg-white rounded-full"></div>

          <div className="absolute top-4 left-0 text-xs font-mono text-[#00ff00]">2016</div>
          <div className="absolute top-4 left-1/3 text-xs font-mono text-[#ff00ff]">2018</div>
          <div className="absolute top-4 left-2/3 text-xs font-mono text-[#00ffff]">2020</div>
          <div className="absolute top-4 right-0 text-xs font-mono text-white">NOW</div>
        </div>

        {/* View all experiences button */}
        <div
          className={`mt-24 text-center transition-all duration-1000 ease-out delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <button className="group relative inline-flex items-center bg-white text-black font-mono text-lg px-6 py-3 md:px-8 md:py-4 overflow-hidden border-2 border-white hover:bg-black hover:text-white transition-colors duration-300">
            <span className="relative z-10 flex items-center">
              VIEW ALL EXPERIENCE
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-[#00ffff] opacity-0 group-hover:opacity-20 transition-opacity"></span>
            <span className="absolute inset-0 border border-[#00ffff] opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  )
}

