import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"
import { createGlitchImage } from "@/lib/glitch-effects"

/**
 * Soft Skill Component
 * @param {Object} props
 * @param {string} props.name - Skill name
 * @param {string} props.photo - Photo URL
 * @param {string} props.description - Skill description
 * @param {number} props.index - Index for animation delay
 */
export default function SoftSkill({ name, photo, description, index }) {
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

  // Image container ref for glitch effect
  const imageContainerRef = useRef(null)

  // Apply glitch effect when entering/exiting viewport
  useEffect(() => {
    if (ref.current) {
      applyGlitchEffect(ref.current)
    }
  }, [inView, applyGlitchEffect])

  // Create glitch image effect
  useEffect(() => {
    if (imageContainerRef.current) {
      // Clear previous content
      imageContainerRef.current.innerHTML = ""

      // Create glitch image
      createGlitchImage(photo || "/placeholder.svg?height=200&width=300", imageContainerRef.current)
    }
  }, [photo])

  // Staggered animation delay based on index
  const animationDelay = `${index * 150}ms`

  return (
    <div
      ref={(el) => {
        ref(el)
        setRef(el)
      }}
      className={`relative bg-[#111] border-2 border-[#333] transition-all duration-500 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        animationDelay,
        boxShadow: "5px 5px 0px #00ffff",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div ref={imageContainerRef} className="h-48 md:h-full relative overflow-hidden md:col-span-1">
          {/* Glitch image will be inserted here by createGlitchImage */}
        </div>

        <div className="p-4 md:col-span-2">
          <h4 className="text-2xl font-mono font-bold mb-3 border-b border-[#00ffff] pb-2">
            <GlitchText text={name} intensity="medium" />
          </h4>

          <p className="font-mono text-sm text-gray-300">{description}</p>

          {/* Decorative elements */}
          <div className="mt-4 w-full h-2 bg-gradient-to-r from-[#00ffff] via-transparent to-[#ff00ff]"></div>
        </div>
      </div>
    </div>
  )
}

