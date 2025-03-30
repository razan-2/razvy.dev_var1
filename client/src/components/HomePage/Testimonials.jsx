"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "ALEX_TURNER",
    job: "FRONTEND_ENGINEER",
    message:
      "Working with Razvy was an eye-opening experience. Their approach to problem-solving is unlike anything I've seen before. The solutions they create are both technically impressive and visually striking.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "SARAH_CHEN",
    job: "UX_RESEARCHER",
    message:
      "Razvy's ability to blend technical expertise with creative vision is remarkable. They consistently push boundaries and challenge conventional thinking in ways that elevate the entire project.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "MARCUS_JOHNSON",
    job: "TECH_LEAD",
    message:
      "I've worked with many developers, but Razvy stands out for their unique perspective and relentless pursuit of innovation. They don't just write code; they craft digital experiences.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function GlitchTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [prevIndex, setPrevIndex] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoplayTimerRef = useRef(null)

  // Handle navigation
  const goToNext = () => {
    setPrevIndex(currentIndex)
    triggerGlitch(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    })
  }

  const goToPrev = () => {
    setPrevIndex(currentIndex)
    triggerGlitch(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    })
  }

  // Glitch effect when changing testimonials
  const triggerGlitch = (callback) => {
    setIsGlitching(true)
    setTimeout(() => {
      callback()
      setTimeout(() => {
        setIsGlitching(false)
      }, 400)
    }, 200)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current

    // If the difference is significant enough to be considered a swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go to next
        handleManualNavigation("next")
      } else {
        // Swipe right, go to previous
        handleManualNavigation("prev")
      }
    }
  }

  // Auto-cycling testimonials
  useEffect(() => {
    const startAutoplay = () => {
      autoplayTimerRef.current = setInterval(() => {
        goToNext()
      }, 5000)
    }

    startAutoplay()

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [])

  // Reset autoplay timer when manually navigating
  const handleManualNavigation = (direction) => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }

    if (direction === "next") {
      goToNext()
    } else {
      goToPrev()
    }

    autoplayTimerRef.current = setInterval(() => {
      goToNext()
    }, 5000)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className="relative w-full max-w-5xl mx-auto overflow-hidden bg-black border-4 border-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Noise overlay with animation */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none animate-noise"></div>

      {/* CRT scanlines */}
      <div className="absolute inset-0 z-10 opacity-5 pointer-events-none bg-scanlines"></div>

      <div className="relative p-8 overflow-hidden">
        <div className="testimonial-container">
          <div className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-[1fr_2fr] items-center">
            {/* Image section with glitch effect */}
            <div className="relative mx-auto w-48 h-48 md:w-64 md:h-64 overflow-hidden">
              <div className={cn("absolute inset-0 glitch-image-container", isGlitching && "content-glitching")}>
                <img
                  src={currentTestimonial.image || "/placeholder.svg"}
                  alt={currentTestimonial.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-full grayscale"
                />
                <div className="glitch-image-r"></div>
                <div className="glitch-image-g"></div>
                <div className="glitch-image-b"></div>
              </div>
              <div className="absolute inset-0 border-4 border-white"></div>
            </div>

            {/* Content section */}
            <div className="relative overflow-hidden">
              <div
                className={cn(
                  "mb-6 font-mono text-xl font-bold text-white md:text-2xl glitch-text overflow-hidden",
                  isGlitching && "content-glitching",
                )}
                data-text={currentTestimonial.name}
              >
                {currentTestimonial.name}
              </div>
              <div
                className={cn(
                  "mb-4 font-mono text-sm text-[#00ff00] uppercase md:text-base",
                  isGlitching && "content-glitching",
                )}
              >
                {">"} {currentTestimonial.job}
              </div>
              <div className="relative font-mono text-white overflow-hidden">
                <div className={cn("glitch-quote overflow-hidden", isGlitching && "content-glitching")}>
                  {currentTestimonial.message}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => handleManualNavigation("prev")}
              className="px-4 py-2 font-mono text-black transition-transform bg-white border-2 border-white hover:bg-black hover:text-white hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="font-mono text-white">
              {currentIndex + 1} / {testimonials.length}
            </div>

            <button
              onClick={() => handleManualNavigation("next")}
              className="px-4 py-2 font-mono text-black transition-transform bg-white border-2 border-white hover:bg-black hover:text-white hover:translate-x-[2px] hover:translate-y-[-2px] active:translate-x-0 active:translate-y-0"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

