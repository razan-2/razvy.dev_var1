"use client"

import { useGlitch } from "@/hooks/use-glitch"
import { useRef, useEffect } from "react"

export function GlitchText({ text, className = "", intensity = "medium", onHover = true }) {
  const textRef = useRef(null)
  const { triggerGlitch } = useGlitch({
    randomInterval: false,
    duration: 500,
  })

  const intensityClasses = {
    low: "before:opacity-30 after:opacity-30 before:translate-x-[1px] after:translate-x-[-1px]",
    medium: "before:opacity-50 after:opacity-50 before:translate-x-[2px] after:translate-x-[-2px]",
    high: "before:opacity-70 after:opacity-70 before:translate-x-[3px] after:translate-x-[-3px]",
  }

  useEffect(() => {
    if (textRef.current) {
      textRef.current.setAttribute("data-text", text)
    }
  }, [text])

  return (
    <span
      ref={textRef}
      data-text={text}
      className={`relative inline-block ${className} ${intensityClasses[intensity]} 
                 before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:text-[#0ff] before:z-[-1]
                 after:content-[attr(data-text)] after:absolute after:left-0 after:top-0 after:text-[#f0f] after:z-[-2]
                 ${onHover ? "hover:before:animate-glitch hover:after:animate-glitch hover:after:animation-delay-50" : ""}`}
      onMouseEnter={onHover ? () => triggerGlitch() : undefined}
    >
      {text}
    </span>
  )
}

