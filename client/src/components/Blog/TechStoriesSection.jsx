import { useInView } from "react-intersection-observer"
import { useGlitch } from "@/hooks/use-glitch"
import { randomGlitch } from "@/lib/glitch-effects"

/**
 * TechStoriesSection - A section for "Tech Stories"
 *
 * @param {Object} props
 * @param {Object} props.section - Section data
 * @param {string} props.section.subtitle - Section subtitle
 * @param {string|null} props.section.photo - Section image URL or null
 * @param {string} props.section.text - Section text content
 * @param {number} props.index - Section index for alternating animations
 */
const TechStoriesSection = ({ section }) => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const { setRef: setTitleRef } = useGlitch({
    randomInterval: true,
    intervalMin: 5000,
    intervalMax: 15000,
  })

  const hasImage = !!section.photo

  return (
    <div
      ref={sectionRef}
      className={`
        transition-all duration-700 
        ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
      `}
      onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
    >
      <h3 ref={(el) => setTitleRef(el)} className="text-2xl font-mono font-bold mb-4 text-[#00ffff]">
        {section.subtitle}
      </h3>

      {hasImage ? (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/2 relative overflow-hidden border-4 border-white">
            <div className="relative w-full aspect-video">
              <img
                src={section.photo || "/placeholder.svg?height=300&width=500"}
                alt={section.subtitle}
                className={`
                  w-full h-full object-cover transition-transform duration-500
                  ${sectionInView ? "scale-100" : "scale-110"}
                `}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="font-mono leading-relaxed">{section.text}</p>
          </div>
        </div>
      ) : (
        <div className="border-l-4 border-[#00ffff] pl-4">
          <p className="font-mono leading-relaxed">{section.text}</p>
        </div>
      )}
    </div>
  )
}

export default TechStoriesSection

