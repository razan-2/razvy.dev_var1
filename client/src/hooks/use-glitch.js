"use client"

import { useEffect, useRef, useState } from "react"
import { randomGlitch, createNoiseOverlay } from "../utils/effects/glitch-effects"

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

  return { setRef, triggerGlitch, isGlitching }
}

