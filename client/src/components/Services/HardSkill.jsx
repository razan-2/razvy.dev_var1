import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"

/**
 * Hard Skill Component
 * @param {Object} props
 * @param {string} props.name - Skill name
 * @param {string} props.logo - Logo URL
 * @param {string} props.description - Skill description
 * @param {number} props.index - Index for animation delay
 */
export default function HardSkill({ name, logo, description, index }) {
  // Glitch effect hook
  const { setRef, applyGlitchEffect } = useGlitch({
    randomInterval: true,
    intervalMin: 5000,
    intervalMax: 10000,
    duration: 300,
  })

  // Intersection observer for viewport animations
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  // Apply glitch effect when entering/exiting viewport
  useEffect(() => {
    if (ref.current) {
      applyGlitchEffect(ref.current)
    }
  }, [inView, applyGlitchEffect])

  // Staggered animation delay based on index
  const animationDelay = `${index * 100}ms`

  return (
    <div
      ref={(el) => {
        ref(el)
        setRef(el)
      }}
      className={`relative bg-[#111] border border-[#333] p-4 transition-all duration-500 transform ${
        inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
      }`}
      style={{
        animationDelay,
        boxShadow: "3px 3px 0px #00ff00",
      }}
    >
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 mr-3 bg-white p-1 relative overflow-hidden">
          <img
            src={logo || "/placeholder.svg?height=48&width=48"}
            alt={name}
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-[noise_2s_linear_infinite]"></div>
        </div>

        <h4 className="text-xl font-mono font-bold">
          <GlitchText text={name} intensity="low" />
        </h4>
      </div>

      <p className="font-mono text-sm text-gray-300">{description}</p>

      {/* Decorative elements */}
      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-[#00ffff]"></div>
      <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-[#ff00ff]"></div>
    </div>
  )
}

