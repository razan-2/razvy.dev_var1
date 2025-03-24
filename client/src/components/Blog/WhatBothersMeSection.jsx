"use client"

import { useRef } from "react"
import { useGlitch } from "@/hooks/use-glitch"

const WhatBothersMeSection = ({ section, index }) => {
  const sectionRef = useRef(null)
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
      `}
    >
      <h3 ref={(el) => setTitleRef(el)} className="text-2xl font-mono font-bold mb-4 text-[#ff00ff]">
        {section.subtitle}
      </h3>

      {hasImage ? (
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/2 order-2 md:order-1">
            <p className="font-mono leading-relaxed">{section.text}</p>
          </div>
          <div className="md:w-1/2 order-1 md:order-2 relative overflow-hidden border-4 border-white">
            <div className="relative w-full aspect-video">
              <img
                src={section.photo || "/placeholder.svg"}
                alt={section.subtitle}
                className={`
                  w-full h-full object-cover transition-transform duration-500
                  ${isInView ? "scale-100" : "scale-110"}
                `}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-l-4 border-[#ff00ff] pl-4">
          <p className="font-mono leading-relaxed">{section.text}</p>
        </div>
      )}
    </div>
  )
}

export default WhatBothersMeSection

