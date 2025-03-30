"use client"

import { useState, useEffect, useRef } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import "../../assets/index.css";

export default function Scrollbar() {
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [lastScrollTime, setLastScrollTime] = useState(0)
  const scrollbarRef = useRef(null)
  const thumbRef = useRef(null)
  const dragStartRef = useRef(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const percentage = (scrollTop / scrollHeight) * 100
      setScrollPercentage(percentage)

      // Trigger glitch effect on scroll
      const now = Date.now()
      if (now - lastScrollTime > 50) {
        // Throttle glitch effect
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 300)
        setLastScrollTime(now)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollTime])

  // Handle scrollbar thumb drag
  const handleDragStart = (e) => {
    setIsDragging(true)
    setIsGlitching(true)

    if (isMobile) {
      dragStartRef.current = e.clientX || (e.touches && e.touches[0].clientX)
    } else {
      dragStartRef.current = e.clientY || (e.touches && e.touches[0].clientY)
    }

    document.addEventListener("mousemove", handleDrag)
    document.addEventListener("touchmove", handleDrag, { passive: false })
    document.addEventListener("mouseup", handleDragEnd)
    document.addEventListener("touchend", handleDragEnd)

    // Prevent text selection during drag
    e.preventDefault()
  }

  const handleDrag = (e) => {
    if (!isDragging || !scrollbarRef.current) return

    let position, scrollbarSize, clientPosition

    if (isMobile) {
      clientPosition = e.clientX || (e.touches && e.touches[0].clientX)
      scrollbarSize = scrollbarRef.current.offsetWidth
      position = (clientPosition - scrollbarRef.current.getBoundingClientRect().left) / scrollbarSize
    } else {
      clientPosition = e.clientY || (e.touches && e.touches[0].clientY)
      scrollbarSize = scrollbarRef.current.offsetHeight
      position = (clientPosition - scrollbarRef.current.getBoundingClientRect().top) / scrollbarSize
    }

    // Clamp position between 0 and 1
    position = Math.max(0, Math.min(1, position))

    // Calculate scroll position
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const newScrollPosition = position * scrollHeight

    // Scroll to position
    window.scrollTo({
      top: newScrollPosition,
      behavior: "auto",
    })

    // Keep glitch effect active during drag
    setIsGlitching(true)

    // Prevent default to avoid page scrolling during drag on mobile
    if (e.cancelable) e.preventDefault()
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsGlitching(false), 300)

    document.removeEventListener("mousemove", handleDrag)
    document.removeEventListener("touchmove", handleDrag)
    document.removeEventListener("mouseup", handleDragEnd)
    document.removeEventListener("touchend", handleDragEnd)
  }

  // Handle click on scrollbar track
  const handleTrackClick = (e) => {
    if (thumbRef.current && e.target !== thumbRef.current) {
      let position

      if (isMobile) {
        const trackLeft = scrollbarRef.current.getBoundingClientRect().left
        position = (e.clientX - trackLeft) / scrollbarRef.current.offsetWidth
      } else {
        const trackTop = scrollbarRef.current.getBoundingClientRect().top
        position = (e.clientY - trackTop) / scrollbarRef.current.offsetHeight
      }

      // Clamp position between 0 and 1
      position = Math.max(0, Math.min(1, position))

      // Calculate scroll position
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const newScrollPosition = position * scrollHeight

      // Scroll to position with smooth behavior
      window.scrollTo({
        top: newScrollPosition,
        behavior: "smooth",
      })

      // Trigger glitch effect
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 500)
    }
  }

  return (
    <div
      className={`glitch-scrollbar ${isMobile ? "mobile" : "desktop"} ${isGlitching ? "glitching" : ""}`}
      ref={scrollbarRef}
      onClick={handleTrackClick}
    >
      <div
        className="glitch-scrollbar-thumb"
        ref={thumbRef}
        style={{
          [isMobile ? "left" : "top"]: `${scrollPercentage}%`,
          [isMobile ? "transform" : "transform"]: `translate${isMobile ? "X" : "Y"}(-${scrollPercentage}%)`,
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="glitch-scrollbar-thumb-inner"></div>
        <div className="glitch-scrollbar-thumb-glitch"></div>
      </div>
    </div>
  )
}

