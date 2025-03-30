import React, { useState, useEffect, useRef } from 'react'
import { useGlitch } from '@/hooks/use-glitch'
import { X, AlertTriangle, Terminal, Loader2 } from 'lucide-react'

/**
 * A brutalist and glitch-inspired loading screen component
 */
export function Loading({
  isLoading = true,
  loadingText = "LOADING",
  subText = "INITIALIZING SYSTEM",
  onLoadingComplete,
  duration = 0,
  showProgress = true,
  children,
  className = ""
}) {
  const [progress, setProgress] = useState(0)
  const [internalLoading, setInternalLoading] = useState(true)
  const [exitAnimation, setExitAnimation] = useState(false)
  const loadingContainerRef = useRef(null)
  
  // Use the glitch hook for the main container
  const { glitchRef: containerGlitchRef } = useGlitch({
    isActive: internalLoading,
    intensity: 0.5,
    frequency: 0.1
  })
  
  // Use the glitch hook for the loading text
  const { glitchRef: textGlitchRef } = useGlitch({
    isActive: internalLoading,
    intensity: 2,
    frequency: 0.3
  })
  
  // Determine the actual loading state (either controlled or internal)
  const actualLoading = isLoading !== undefined ? isLoading : internalLoading
  
  // Handle progress updates
  useEffect(() => {
    if (!actualLoading || !showProgress) return
    
    let startTime = Date.now()
    let animationFrame
    
    const updateProgress = () => {
      if (duration <= 0) {
        // If no duration is set, use a slow continuous progress that never reaches 100%
        setProgress(prev => {
          const newProgress = prev + 0.1
          return newProgress < 95 ? newProgress : 95
        })
        animationFrame = requestAnimationFrame(updateProgress)
      } else {
        // Calculate progress based on elapsed time and duration
        const elapsed = Date.now() - startTime
        const calculatedProgress = Math.min((elapsed / duration) * 100, 100)
        setProgress(calculatedProgress)
        
        if (calculatedProgress < 100) {
          animationFrame = requestAnimationFrame(updateProgress)
        } else {
          // When progress reaches 100%, trigger exit animation
          handleLoadingComplete()
        }
      }
    }
    
    animationFrame = requestAnimationFrame(updateProgress)
    return () => cancelAnimationFrame(animationFrame)
  }, [actualLoading, duration, showProgress])
  
  // Handle automatic loading completion based on duration
  useEffect(() => {
    if (!actualLoading || duration <= 0) return
    
    const timer = setTimeout(() => {
      handleLoadingComplete()
    }, duration)
    
    return () => clearTimeout(timer)
  }, [actualLoading, duration])
  
  // Handle loading state changes
  useEffect(() => {
    if (isLoading !== undefined && !isLoading && internalLoading) {
      handleLoadingComplete()
    }
  }, [isLoading, internalLoading])
  
  // Handle loading completion
  const handleLoadingComplete = () => {
    if (!actualLoading) return
    
    // Start exit animation
    setExitAnimation(true)
    
    // After exit animation completes, set loading to false
    setTimeout(() => {
      setInternalLoading(false)
      if (onLoadingComplete) onLoadingComplete()
    }, 800) // Match this with the CSS animation duration
  }
  
  // Generate random glitch characters
  const getGlitchChar = () => {
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`'
    return chars[Math.floor(Math.random() * chars.length)]
  }
  
  // If not loading and not in exit animation, render children
  if (!actualLoading && !exitAnimation) {
    return <>{children}</>
  }
  
  return (
    <div 
      ref={containerGlitchRef}
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center ${exitAnimation ? 'animate-glitch-out' : 'animate-glitch-in'} ${className}`}
    >
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise opacity-10 pointer-events-none"></div>
      
      {/* CRT scanlines */}
      <div className="fixed inset-0 bg-scanlines opacity-15 pointer-events-none"></div>
      
      {/* Random glitch elements */}
      <div className="fixed top-0 left-0 w-full h-2 bg-neon-green opacity-30 animate-glitch-slide"></div>
      <div className="fixed bottom-0 right-0 w-full h-2 bg-neon-magenta opacity-30 animate-glitch-slide-reverse"></div>
      
      {/* Main content container */}
      <div 
        ref={loadingContainerRef}
        className="relative w-full max-w-md px-6 py-8 border-2 border-white"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-neon-green -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-4 h-4 bg-neon-magenta translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-neon-blue -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-neon-red translate-x-1/2 translate-y-1/2"></div>
        
        {/* Terminal header */}
        <div className="flex items-center justify-between mb-4 border-b border-white pb-2">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-neon-green" />
            <span className="text-neon-green text-xs uppercase tracking-wider">system.load</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/70 animate-pulse">
              {Math.floor(progress)}%
            </span>
            <X size={16} className="text-white/50" />
          </div>
        </div>
        
        {/* Loading text with glitch effect */}
        <div className="mb-6 text-center">
          <h2 
            ref={textGlitchRef}
            className="text-4xl md:text-5xl font-bold mb-2 text-white glitch-text"
            data-text={loadingText}
          >
            {loadingText}
          </h2>
          <div className="text-neon-green text-sm font-mono flex items-center justify-center gap-2">
            <Loader2 size={14} className="animate-spin" />
            <span>{subText}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        {showProgress && (
          <div className="relative h-6 border border-white mb-6 overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-neon-green transition-all duration-300 flex items-center justify-center"
              style={{ width: `${progress}%` }}
            >
              <span className="text-xs text-black font-bold mix-blend-difference">
                {Math.floor(progress)}%
              </span>
            </div>
            
            {/* Glitch lines on progress bar */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i}
                className="absolute top-0 h-full w-1 bg-black"
                style={{ 
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.8 + 0.2
                }}
              ></div>
            ))}
          </div>
        )}
        
        {/* Status messages */}
        <div className="font-mono text-xs text-white/80 h-20 overflow-hidden relative border border-white/30 p-2">
          <div className="animate-status-scroll">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-start gap-2 mb-1">
                <span className="text-neon-green">&gt;</span>
                <span className={i % 3 === 0 ? 'text-neon-red' : ''}>
                  {i % 4 === 0 && <AlertTriangle size={10} className="inline mr-1 text-neon-red" />}
                  {getRandomStatusMessage(i)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Random glitch characters */}
        <div className="absolute pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute text-neon-green opacity-70 font-mono text-xl"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animation: `glitch-appear ${Math.random() * 2 + 0.5}s forwards`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {getGlitchChar()}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom status text */}
      <div className="mt-8 text-white/50 text-xs font-mono">
        PRESS ANY KEY TO ABORT <span className="animate-blink">_</span>
      </div>
    </div>
  )
}

// Helper function to generate random status messages
function getRandomStatusMessage(index) {
  const messages = [
    "Initializing content buffer...",
    "Establishing neural connection...",
    "Decoding visual matrices...",
    "Compiling brutalist elements...",
    "Injecting glitch vectors...",
    "Synchronizing digital noise...",
    "Calibrating visual distortion...",
    "Loading typographic assets...",
    "ERROR: Buffer overflow in sector 7...",
    "Repairing corrupted data blocks...",
    "Optimizing render pipeline...",
    "Applying chaos algorithms...",
    "WARNING: Unstable connection detected...",
    "Bypassing content filters...",
    "Fragmenting interface elements..."
  ]
  
  return messages[index % messages.length]
}