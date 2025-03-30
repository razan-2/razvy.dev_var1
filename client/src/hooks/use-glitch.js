"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { randomGlitch, createNoiseOverlay } from "../lib/glitch-effects"

/**
 * Custom hook for applying glitch effects to elements
 * @param {Object} options - Configuration options for the glitch effect
 * @param {boolean} options.randomInterval - Whether to apply glitches at random intervals
 * @param {number} options.intervalMin - Minimum time between random glitches (ms)
 * @param {number} options.intervalMax - Maximum time between random glitches (ms)
 * @param {number} options.duration - Duration of each glitch effect (ms)
 * @param {boolean} options.addNoise - Whether to add a noise overlay to the element
 * @returns {Object} - Object containing the ref setter and glitch trigger function
 */
export function useGlitch(options = {}) {
  const { randomInterval = true, intervalMin = 2000, intervalMax = 10000, duration = 300, addNoise = false } = options

  const elementRef = useRef(null)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Set up reference
  const setRef = (el) => {
    elementRef.current = el
    setIsReady(!!el)
  }

  // Effect to add noise overlay after component is mounted and rendered
  useEffect(() => {
    if (isReady && elementRef.current && addNoise) {
      // Delay noise overlay creation to ensure element is fully rendered
      const timer = setTimeout(() => {
        createNoiseOverlay(elementRef.current)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isReady, addNoise])

  // Trigger glitch manually
  const triggerGlitch = () => {
    if (!elementRef.current) return

    setIsGlitching(true)
    randomGlitch(elementRef.current, duration)
    setTimeout(() => setIsGlitching(false), duration)
  }

  // Set up random interval glitching
  useEffect(() => {
    if (!randomInterval || !elementRef.current) return

    const getRandomInterval = () => Math.floor(Math.random() * (intervalMax - intervalMin) + intervalMin)

    let timeout

    const scheduleGlitch = () => {
      timeout = setTimeout(() => {
        if (elementRef.current) {
          triggerGlitch()
        }
        scheduleGlitch()
      }, getRandomInterval())
    }

    scheduleGlitch()

    return () => clearTimeout(timeout)
  }, [randomInterval, intervalMin, intervalMax, duration, isReady])

  const applyGlitchEffect = useCallback((element) => {
    if (!element) return

    // Add content-glitching class to trigger animation
    element.classList.add("content-glitching")

    // Remove the class after animation completes
    setTimeout(() => {
      element.classList.remove("content-glitching")
    }, 600)

    // Create glitch text effect for any elements with data-text attribute
    const glitchTextElements = element.querySelectorAll("[data-text]")
    glitchTextElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        const text = el.getAttribute("data-text") || ""

        // Apply glitch animation
        el.classList.add("glitch-text")

        // Remove animation after a short time
        setTimeout(() => {
          el.classList.remove("glitch-text")
        }, 500)
      }
    })

    // Apply random offset glitches to child elements
    const childElements = element.children
    if (childElements.length > 0) {
      const randomIndex = Math.floor(Math.random() * childElements.length)
      const randomChild = childElements[randomIndex]

      if (randomChild instanceof HTMLElement) {
        // Apply a brief transform glitch
        const originalTransform = randomChild.style.transform
        const originalTransition = randomChild.style.transition

        // Random glitch transform
        const glitchTransforms = [
          "translateX(5px)",
          "translateY(-5px)",
          "translateX(-3px) translateY(2px)",
          "translateY(4px) translateX(2px)",
          "scale(1.05)",
          "scale(0.95) translateX(3px)",
          "skewX(2deg)",
          "skewY(-2deg)",
        ]

        const randomTransform = glitchTransforms[Math.floor(Math.random() * glitchTransforms.length)]

        randomChild.style.transition = "none"
        randomChild.style.transform = randomTransform

        // Reset after a short delay
        setTimeout(() => {
          randomChild.style.transition = originalTransition
          randomChild.style.transform = originalTransform
        }, 150)
      }
    }
  }, [])

  return { setRef, triggerGlitch, isGlitching, applyGlitchEffect }
}

