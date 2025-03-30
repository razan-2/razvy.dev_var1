import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Code, Terminal, Zap, X, Hash, Cpu, Maximize } from "lucide-react"

export default function AboutHeader() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef(null)

  // Handle cursor movement for distortion effect
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setCursorPosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      })
    }
  }

  // Trigger animations on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Random glitch effect for elements
  const triggerRandomGlitch = () => {
    const elements = document.querySelectorAll(".can-glitch")
    const randomIndex = Math.floor(Math.random() * elements.length)
    const element = elements[randomIndex]

    if (element) {
      element.classList.add("glitching")
      setTimeout(() => {
        element.classList.remove("glitching")
      }, 500)
    }
  }

  // Set up interval for random glitches
  useEffect(() => {
    const interval = setInterval(() => {
      triggerRandomGlitch()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full overflow-hidden bg-black text-white min-h-[100vh] border-b-8 border-white"
    >
      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 51%, rgba(255, 255, 255, 0.05) 100%)",
          backgroundSize: "100% 4px",
        }}
      ></div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Cursor distortion effect */}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-20 mix-blend-difference"
          style={{
            left: `${cursorPosition.x}%`,
            top: `${cursorPosition.y}%`,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
            opacity: 0.2,
          }}
        ></div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-4 border-l-4 border-white opacity-70 can-glitch"></div>
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 border-b-4 border-r-4 border-white opacity-70 can-glitch"></div>

      {/* Animated decorative icons */}
      <div className="absolute top-[20%] right-[5%] hidden md:block can-glitch">
        <Terminal className="text-[#00ff00] w-12 h-12 animate-pulse" />
      </div>
      <div className="absolute bottom-[20%] left-[5%] hidden md:block can-glitch">
        <Code className="text-[#ff00ff] w-12 h-12 animate-pulse" />
      </div>
      <div className="absolute top-[40%] left-[8%] hidden lg:block can-glitch">
        <Hash className="text-white w-10 h-10 opacity-30" />
      </div>
      <div className="absolute bottom-[40%] right-[8%] hidden lg:block can-glitch">
        <Cpu className="text-white w-10 h-10 opacity-30" />
      </div>

      {/* Animated lines */}
      <div
        className={`absolute left-0 h-px bg-[#00ff00] transition-all duration-1000 ease-in-out ${isLoaded ? "w-full" : "w-0"}`}
        style={{ top: "30%" }}
      ></div>
      <div
        className={`absolute right-0 h-px bg-[#ff00ff] transition-all duration-1000 ease-in-out delay-300 ${isLoaded ? "w-full" : "w-0"}`}
        style={{ top: "70%" }}
      ></div>

      {/* Glitch blocks */}
      <div className="absolute top-[10%] left-[20%] w-8 h-8 bg-[#00ff00] opacity-80 animate-bounce hidden md:block"></div>
      <div className="absolute bottom-[15%] right-[25%] w-6 h-12 bg-[#ff00ff] opacity-80 animate-pulse hidden md:block"></div>
      <div className="absolute top-[60%] right-[15%] w-12 h-4 bg-white opacity-50 animate-ping hidden lg:block"></div>

      {/* Main content container */}
      <div className="container mx-auto px-4 py-16 md:py-24 min-h-screen flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Text content */}
          <div
            className={`order-2 md:order-1 space-y-8 transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-[#ff00ff] animate-pulse"></div>
                <div className="text-sm font-mono opacity-70">ABOUT.ME</div>
                <div className="flex-grow h-px bg-white opacity-30"></div>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tighter leading-none relative can-glitch group">
                <span className="relative inline-block group-hover:animate-glitch">
                  WHO AM I?
                  <span className="absolute -inset-0.5 text-[#0ff] opacity-0 group-hover:opacity-50 blur-[2px]">
                    WHO AM I?
                  </span>
                  <span className="absolute -inset-0.5 text-[#f0f] opacity-0 group-hover:opacity-50 blur-[2px] -translate-x-0.5 translate-y-0.5">
                    WHO AM I?
                  </span>
                </span>
              </h1>

              <div className="flex items-center space-x-2 my-6">
                <div className="h-2 w-16 md:w-32 bg-[#00ff00]"></div>
                <X className="w-4 h-4 text-[#00ff00]" />
                <div className="h-px flex-grow bg-[#00ff00] opacity-50"></div>
              </div>

              <p className="text-lg md:text-xl lg:text-2xl font-mono leading-relaxed max-w-xl can-glitch">
                Full-stack developer with a passion for creating digital experiences that break conventional design
                norms. I blend technical expertise with creative vision to build memorable web applications that stand
                out from the crowd.
              </p>

              <div className="pt-4 font-mono text-xs opacity-70 flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00ff00] animate-pulse"></span>
                <span>ONLINE</span>
                <span className="inline-block w-2 h-2 bg-[#ff00ff]"></span>
                <span>AVAILABLE FOR HIRE</span>
              </div>
            </div>

            <div className="mt-8 can-glitch">
              <Link
                href="/contact"
                className="group relative inline-flex items-center bg-white text-black font-mono text-lg px-6 py-3 md:px-8 md:py-4 overflow-hidden border-2 border-white hover:bg-black hover:text-white transition-colors duration-300"
              >
                <span className="relative z-10 flex items-center">
                  GET IN TOUCH
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-[#ff00ff] opacity-0 group-hover:opacity-20 transition-opacity"></span>
                <span className="absolute inset-0 border border-[#00ff00] opacity-0 group-hover:opacity-100 scale-105 group-hover:scale-100 transition-all duration-300"></span>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className={`order-1 md:order-2 relative transition-all duration-1000 ease-out delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Decorative frame */}
              <div className="absolute inset-0 border-4 border-white transform translate-x-4 translate-y-4 can-glitch"></div>

              {/* Main image container */}
              <div className="relative w-full h-full overflow-hidden border-4 border-white bg-black can-glitch">
                {/* Image */}
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="Developer portrait"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />

                {/* RGB split layers */}
                <div className="absolute inset-0 bg-red-500 opacity-20 mix-blend-screen transform -translate-x-2"></div>
                <div className="absolute inset-0 bg-blue-500 opacity-20 mix-blend-screen transform translate-x-2"></div>

                {/* Glitch lines */}
                <div className="absolute top-1/4 left-0 right-0 h-px bg-white opacity-70"></div>
                <div className="absolute top-2/4 left-0 right-0 h-px bg-white opacity-70"></div>
                <div className="absolute top-3/4 left-0 right-0 h-px bg-white opacity-70"></div>

                {/* Animated corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00ff00]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00ff00]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00ff00]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00ff00]"></div>

                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 font-mono text-xs text-[#00ff00] flex justify-between items-center">
                  <span>DEV_PORTRAIT.JPG</span>
                  <span className="animate-pulse">REC</span>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 bg-[#00ff00] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center can-glitch">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>

              <div className="absolute -top-6 -left-6 flex items-center space-x-2 can-glitch">
                <div className="w-3 h-3 bg-[#ff00ff]"></div>
                <div className="w-3 h-3 bg-white"></div>
                <div className="w-3 h-3 bg-[#00ff00]"></div>
              </div>

              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 hidden md:block">
                <div className="h-20 w-px bg-white"></div>
                <Maximize className="text-white w-6 h-6 transform translate-x-[-50%] translate-y-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom pixel pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23000'/%3E%3Crect x='1' width='1' height='1' fill='%23000'/%3E%3Crect x='2' width='1' height='1' fill='%23000'/%3E%3Crect x='3' width='1' height='1' fill='%23000'/%3E%3Crect x='4' width='1' height='1' fill='%23000'/%3E%3Crect x='5' width='1' height='1' fill='%23000'/%3E%3Crect x='6' width='1' height='1' fill='%23000'/%3E%3Crect x='7' width='1' height='1' fill='%23000'/%3E%3Crect y='1' width='1' height='1' fill='%23000'/%3E%3Crect x='1' y='1' width='1' height='1' fill='%23fff'/%3E%3Crect x='2' y='1' width='1' height='1' fill='%23000'/%3E%3Crect x='3' y='1' width='1' height='1' fill='%23fff'/%3E%3Crect x='4' y='1' width='1' height='1' fill='%23000'/%3E%3Crect x='5' y='1' width='1' height='1' fill='%23fff'/%3E%3Crect x='6' y='1' width='1' height='1' fill='%23000'/%3E%3Crect x='7' y='1' width='1' height='1' fill='%23fff'/%3E%3Crect y='2' width='1' height='1' fill='%23000'/%3E%3Crect x='1' y='2' width='1' height='1' fill='%23000'/%3E%3Crect x='2' y='2' width='1' height='1' fill='%23fff'/%3E%3Crect x='3' y='2' width='1' height='1' fill='%23000'/%3E%3Crect x='4' y='2' width='1' height='1' fill='%23fff'/%3E%3Crect x='5' y='2' width='1' height='1' fill='%23000'/%3E%3Crect x='6' y='2' width='1' height='1' fill='%23fff'/%3E%3Crect x='7' y='2' width='1' height='1' fill='%23000'/%3E%3Crect y='3' width='1' height='1' fill='%23000'/%3E%3Crect x='1' y='3' width='1' height='1' fill='%23fff'/%3E%3Crect x='2' y='3' width='1' height='1' fill='%23000'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23fff'/%3E%3Crect x='4' y='3' width='1' height='1' fill='%23000'/%3E%3Crect x='5' y='3' width='1' height='1' fill='%23fff'/%3E%3Crect x='6' y='3' width='1' height='1' fill='%23000'/%3E%3Crect x='7' y='3' width='1' height='1' fill='%23fff'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        ></div>
      </div>

      {/* Add CSS for glitch animation */}
      <style jsx>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .glitching {
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        
        @media (max-width: 768px) {
          .can-glitch {
            transform: scale(0.95);
          }
        }
      `}</style>
    </section>
  )
}

