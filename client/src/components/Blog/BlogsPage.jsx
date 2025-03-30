import { useState, useEffect, useRef } from "react"
import { useGlitch } from "@/hooks/use-glitch"
import { X, Send, ChevronRight, AlertCircle, CheckCircle, Terminal, Code, Zap } from "lucide-react"
import BlogPostCard from "./BlogPostCard"
import useBlogStore from "@/state/useBlogStore"
import { Loading } from "../Loading/Loading"

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "DIGITAL DECAY",
    subtitle: "POST_01",
    image: "/placeholder.svg?height=400&width=600",
    subjects: ["Web Design", "Brutalism", "Digital Art"],
    excerpt:
      "Exploring the aesthetics of digital decay and how intentional glitches can create compelling visual narratives in modern web design.",
  },
  {
    id: 2,
    title: "BROKEN INTERFACES",
    subtitle: "POST_02",
    image: "/placeholder.svg?height=400&width=600",
    subjects: ["UI/UX", "Anti-Design", "Interaction"],
    excerpt:
      "Breaking conventional UI patterns to create memorable user experiences that challenge the status quo of digital interfaces.",
  },
  {
    id: 3,
    title: "RAW CODE",
    subtitle: "POST_03",
    image: "/placeholder.svg?height=400&width=600",
    subjects: ["Development", "Code Art", "Minimalism"],
    excerpt:
      "Embracing the raw nature of code as an artistic medium, where function and form collide in unexpected ways.",
  },
  {
    id: 4,
    title: "SYSTEM FAILURE",
    subtitle: "POST_04",
    image: "/placeholder.svg?height=400&width=600",
    subjects: ["Error States", "Glitch Art", "Typography"],
    excerpt:
      "Investigating how system failures and error states can be repurposed as intentional design elements in digital experiences.",
  },
]

// Typing animation component
function TypingAnimation({ text, speed = 50, onComplete, className = "" }) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return <span className={className}>{displayText}</span>
}

// Glitch text component
function GlitchText({ text, className = "", intensity = "medium" }) {
  const intensityValues = {
    low: 1,
    medium: 1.5,
    high: 2.5,
  }

  const { glitchRef } = useGlitch({
    isActive: true,
    intensity: intensityValues[intensity] || 1.5,
    frequency: 0.2,
  })

  return (
    <span ref={glitchRef} className={`glitch-text ${className}`} data-text={text}>
      {text}
    </span>
  )
}

// Terminal text component
function TerminalText({ children, className = "" }) {
  return (
    <div className={`font-mono bg-black border border-neon-green p-3 ${className}`}>
      <div className="flex items-center gap-2 mb-2 text-neon-green">
        <Terminal size={14} />
        <span className="text-xs uppercase tracking-wider">terminal</span>
      </div>
      <div className="text-white">
        <span className="text-neon-green mr-2">&gt;</span>
        {children}
      </div>
    </div>
  )
}

export default function BlogPage() {
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [animationState, setAnimationState] = useState({
    titleComplete: false,
    subtitleComplete: false,
    descriptionVisible: false,
    ctaVisible: false,
  })

  // Create a standard React ref for the page container
  const pageRef = useRef(null)

  // Use the glitch hook properly - it will manage its own ref
  const { glitchRef: pageGlitchRef } = useGlitch({
    isActive: true,
    intensity: 0.3,
    frequency: 0.05,
  })

  // Animation sequence
  useEffect(() => {
    if (animationState.subtitleComplete) {
      const timer = setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, descriptionVisible: true }))
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [animationState.subtitleComplete])

  const { displayBlogs, fetchDisplayBlogs } = useBlogStore();

  useEffect(() => {
    fetchDisplayBlogs();
  }, [fetchDisplayBlogs]);

  useEffect(() => {
    if (animationState.descriptionVisible) {
      const timer = setTimeout(() => {
        setAnimationState((prev) => ({ ...prev, ctaVisible: true }))
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [animationState.descriptionVisible])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
    if (!formData.message.trim()) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate form submission
      console.log("Form submitted:", formData)
      setFormSubmitted(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false)
        setShowContactForm(false)
        setFormData({ name: "", email: "", message: "" })
      }, 3000)
    }
  }

  return (
    // Use the pageGlitchRef directly - the hook will handle the ref assignment
    <div ref={pageGlitchRef} className="min-h-screen bg-black text-white font-mono overflow-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 bg-noise opacity-5 pointer-events-none"></div>

      {/* CRT scanlines */}
      <div className="fixed inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

      {/* Random glitch elements */}
      <div className="fixed top-0 left-0 w-full h-2 bg-neon-green opacity-30 animate-glitch-slide"></div>
      <div className="fixed bottom-0 right-0 w-full h-2 bg-neon-magenta opacity-30 animate-glitch-slide-reverse"></div>
      <div className="fixed top-1/4 right-0 w-2 h-32 bg-neon-blue opacity-40 animate-glitch-height"></div>
      <div className="fixed bottom-1/3 left-0 w-2 h-24 bg-neon-red opacity-40 animate-glitch-height"></div>

      {/* Redesigned Hero Section */}
      <header className="relative min-h-[90vh] flex flex-col justify-center border-b-4 border-white pt-16 pb-12 px-4 md:px-8 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
          {Array.from({ length: 12 }).map((_, rowIndex) =>
            Array.from({ length: 12 }).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`border border-white/5 ${Math.random() > 0.95 ? "bg-neon-green/10" : ""} ${Math.random() > 0.95 ? "bg-neon-magenta/10" : ""}`}
              ></div>
            )),
          )}
        </div>

        {/* Asymmetric layout container */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
          {/* Left column - Main title and subtitle */}
          <div className="md:col-span-7 md:pr-8">
            {/* Glitched title with frame */}
            <div className="relative mb-6">
              {/* Frame */}
              <div className="absolute -inset-4 border-2 border-neon-green/50 -skew-x-3 -skew-y-1"></div>

              {/* Title */}
              <div className="glitch-container relative">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase inline-block">
                  {!animationState.titleComplete ? (
                    <TypingAnimation
                      text="DIGITAL_NOISE"
                      speed={80}
                      onComplete={() => setAnimationState((prev) => ({ ...prev, titleComplete: true }))}
                      className="inline-block"
                    />
                  ) : (
                    <GlitchText text="DIGITAL_NOISE" intensity="high" />
                  )}
                </h1>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-neon-green"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-neon-magenta"></div>
              </div>
            </div>

            {/* Subtitle with terminal effect */}
            <div className="mb-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-neon-green animate-pulse"></div>
              <h2 className="text-xl md:text-2xl font-bold text-neon-green tracking-widest pl-4 h-8">
                {animationState.titleComplete && (
                  <TypingAnimation
                    text="&gt;_ A BRUTALIST BLOG EXPERIMENT"
                    speed={40}
                    onComplete={() => setAnimationState((prev) => ({ ...prev, subtitleComplete: true }))}
                    className="inline-block"
                  />
                )}
              </h2>
            </div>

            {/* Description with terminal-like container */}
            <div
              className={`transition-all duration-500 transform ${animationState.descriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <TerminalText className="mb-8">
                <p className="text-lg leading-relaxed font-glitch">
                  This blog embraces the raw, unfiltered aesthetic of digital brutalism. We reject conventional
                  smoothness in favor of harsh, impactful visuals where errors and distortions are not flaws but core
                  design features.
                </p>
              </TerminalText>
            </div>

            {/* CTA buttons with enhanced effects */}
            <div
              className={`flex flex-wrap gap-4 transition-all duration-500 transform ${animationState.ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <button
                className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-neon-green hover:text-black transition-colors duration-300 flex items-center group relative overflow-hidden border-2 border-white"
                onClick={() =>
                  window.scrollTo({ top: document.getElementById("blog-posts")?.offsetTop || 0, behavior: "smooth" })
                }
              >
                <span className="relative z-10 flex items-center">
                  <Code size={18} className="mr-2" />
                  Read Posts
                </span>
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                <span className="absolute inset-0 w-0 bg-neon-green group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </button>

              <button
                className="px-6 py-3 border-2 border-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-300 flex items-center group relative overflow-hidden"
                onClick={() => setShowContactForm(true)}
              >
                <span className="relative z-10 flex items-center">
                  <Zap size={18} className="mr-2" />
                  Contact
                </span>
                <Send className="ml-2 group-hover:translate-x-1 transition-transform relative z-10" size={18} />
                <span className="absolute inset-0 w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </button>
            </div>
          </div>

          {/* Right column - Visual elements */}
          <div className="md:col-span-5 hidden md:block relative">
            {/* Glitched image frame */}
            <div className="absolute inset-0 border-4 border-white transform rotate-2 overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-20"></div>
              <div className="absolute inset-0 bg-scanlines opacity-30"></div>

              {/* Animated glitch bars */}
              <div className="absolute top-1/4 left-0 right-0 h-8 bg-neon-green/30 animate-glitch-width"></div>
              <div className="absolute top-2/4 left-0 right-0 h-4 bg-neon-magenta/30 animate-glitch-width-reverse"></div>
              <div className="absolute top-3/4 left-0 right-0 h-6 bg-neon-blue/30 animate-glitch-width"></div>

              {/* Code-like visual elements */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-neon-green font-mono text-sm opacity-70">
                <div>
                  <div>&lt;!DOCTYPE html&gt;</div>
                  <div>&lt;html lang="en"&gt;</div>
                  <div>&lt;head&gt;</div>
                  <div className="ml-4">&lt;title&gt;DIGITAL_NOISE&lt;/title&gt;</div>
                  <div className="ml-4">&lt;meta charset="UTF-8"&gt;</div>
                  <div>&lt;/head&gt;</div>
                  <div>&lt;body class="glitch"&gt;</div>
                </div>

                <div>
                  <div>&lt;/body&gt;</div>
                  <div>&lt;/html&gt;</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-neon-green/50 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-neon-magenta/50 animate-pulse"></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
        <div className="absolute bottom-2 left-0 w-full h-px bg-white opacity-50"></div>
        <div className="absolute bottom-4 left-0 w-full h-px bg-white opacity-20"></div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <ChevronRight size={16} className="transform rotate-90" />
        </div>
      </header>

      {/* Blog posts section */}
      <section id="blog-posts" className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-bold mb-12 uppercase tracking-tight border-l-4 border-neon-green pl-4 glitch-text"
            data-text="Latest Posts"
          >
            Latest Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {displayBlogs.length === 0 ? (
                <Loading />
              ) : (
              displayBlogs.map((blog) => (
                <BlogPostCard key={blog.id} post={blog} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact form modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-black border-4 border-white max-w-md w-full p-6 relative animate-glitch-in">
            <button
              className="absolute top-4 right-4 text-white hover:text-neon-green"
              onClick={() => {
                if (!formSubmitted) {
                  setShowContactForm(false)
                  setFormErrors({})
                }
              }}
            >
              <X size={24} />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle size={64} className="mx-auto mb-4 text-neon-green animate-pulse" />
                <h2 className="text-2xl font-bold mb-2 text-neon-green glitch-text" data-text="MESSAGE SENT">
                  MESSAGE SENT
                </h2>
                <p className="text-white">Your message has been received!</p>
              </div>
            ) : (
              <>
                <h2
                  className="text-2xl font-bold mb-6 uppercase tracking-tight text-neon-green glitch-text"
                  data-text="&gt;_ SUBMIT_IDEA"
                >
                  &gt;_ SUBMIT_IDEA
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1 uppercase text-sm tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-black border-2 ${formErrors.name ? "border-neon-red" : "border-white"} p-2 text-white focus:border-neon-green focus:outline-none transition-colors`}
                      required
                    />
                    {formErrors.name && (
                      <div className="flex items-center mt-1 text-neon-red text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 uppercase text-sm tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-black border-2 ${formErrors.email ? "border-neon-red" : "border-white"} p-2 text-white focus:border-neon-green focus:outline-none transition-colors`}
                      required
                    />
                    {formErrors.email && (
                      <div className="flex items-center mt-1 text-neon-red text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block mb-1 uppercase text-sm tracking-wider">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full bg-black border-2 ${formErrors.message ? "border-neon-red" : "border-white"} p-2 text-white focus:border-neon-green focus:outline-none resize-none transition-colors`}
                      required
                    ></textarea>
                    {formErrors.message && (
                      <div className="flex items-center mt-1 text-neon-red text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {formErrors.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-neon-green transition-colors duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Submit</span>
                    <span className="absolute inset-0 w-0 bg-neon-green group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  </button>
                </form>
              </>
            )}

            {/* Glitch decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-neon-green"></div>
            <div className="absolute bottom-0 right-0 w-full h-1 bg-neon-magenta"></div>
          </div>
        </div>
      )}
    </div>
  )
}