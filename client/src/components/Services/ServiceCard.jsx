import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"
import { randomGlitch } from "@/lib/glitch-effects"

/**
 * Service Card Component
 * @param {Object} props
 * @param {string} props.name - Service name
 * @param {string} props.description - Service description
 * @param {string} props.timeline - Service timeline
 * @param {string} props.videoSrc - Video source URL
 * @param {number} props.index - Index for animation delay
 */
export default function ServiceCard({ name, description, timeline, videoSrc, index }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)

  // Glitch effect hook
  const { setRef, triggerGlitch, applyGlitchEffect } = useGlitch({
    randomInterval: false,
    duration: 400,
  })

  // Intersection observer for viewport animations
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  // Handle video play/pause
  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
      triggerGlitch()
    }
  }

  // Apply glitch effect when entering/exiting viewport
  useEffect(() => {
    if (ref.current) {
      applyGlitchEffect(ref.current)
    }
  }, [inView, applyGlitchEffect])

  // Staggered animation delay based on index
  const animationDelay = `${index * 150}ms`

  return (
    <div
      ref={(el) => {
        ref(el)
        setRef(el)
      }}
      className={`relative border-2 border-white p-4 transition-all duration-500 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{
        animationDelay,
        boxShadow: "5px 5px 0px #00ff00, -5px -5px 0px #ff00ff",
      }}
    >
      <h3 className="text-3xl font-mono font-bold mb-4">
        <GlitchText text={name} intensity="medium" />
      </h3>

      <div className="relative mb-4 bg-black overflow-hidden" style={{ height: "200px" }}>
        <video
          ref={videoRef}
          src={videoSrc || "/placeholder.svg?height=200&width=400"}
          className="w-full h-full object-cover"
          loop
          muted
          onClick={toggleVideo}
        />

        <button
          onClick={toggleVideo}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-30 transition-all"
        >
          <span className="text-white font-mono text-lg border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
            {isPlaying ? "PAUSE" : "PLAY"}
          </span>
        </button>
      </div>

      <p className="font-mono text-sm mb-4 leading-relaxed">{description}</p>

      <div className="flex justify-between items-center mb-4">
        <div className="border border-dashed border-[#00ff00] p-2">
          <span className="text-[#00ff00] font-mono text-sm">TIMELINE: {timeline}</span>
        </div>

        <Link
          href="/portfolio"
          className="font-mono text-sm underline text-[#00ffff] hover:text-white transition-colors"
          onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
        >
          View Examples
        </Link>
      </div>

      <button
        className="w-full bg-[#ff00ff] hover:bg-[#ff33ff] text-black font-mono font-bold py-3 px-4 border-2 border-black transition-colors"
        onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
        onClick={triggerGlitch}
      >
        CONTACT FOR THIS PROJECT
      </button>
    </div>
  )
}

