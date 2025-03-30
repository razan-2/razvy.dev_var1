import { useState } from "react"
import { useGlitch } from "@/hooks/use-glitch"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function BlogPostCard({ post }) {
  const [isHovered, setIsHovered] = useState(false)

  // Use the glitch hook properly - it will manage its own ref
  const { glitchRef } = useGlitch({
    isActive: isHovered,
    intensity: 2,
    frequency: 0.3,
  })

  return (
    <div
      ref={glitchRef}
      className="group relative border-2 border-white overflow-hidden cursor-pointer transition-all duration-300 hover:border-neon-green"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay for normal state */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-70 p-6 flex flex-col justify-between transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}
        >
          <div>
            <p className="text-neon-green font-bold tracking-wider mb-2">{post.subtitle}</p>
            <h3 className="text-3xl font-bold mb-4">{post.title}</h3>
          </div>

          <ul className="flex flex-wrap gap-2">
            {post.subject?.map((subject, index) => (
              <li key={index} className="bg-white text-black text-xs px-2 py-1 uppercase font-bold">
                {subject}
              </li>
            ))}
          </ul>
        </div>

        {/* Overlay for hovered state - FIXED to ensure visibility */}
        <div
          className={`absolute inset-0 bg-black p-6 flex flex-col justify-between transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="border-l-4 border-neon-green pl-3">
            <p className="text-neon-green font-bold tracking-wider mb-2">{post.subtitle}</p>
            <h3 className="text-3xl font-bold mb-4 text-white">{post.title}</h3>
            <p className="text-white text-lg leading-relaxed">{post.description}</p>
          </div>

          <div className="flex justify-end">
            <span className="uppercase font-bold flex items-center text-neon-green group-hover:animate-pulse">
              <Link to={`/side-quests/${post.id}`}>Read More</Link>
              <ChevronRight size={16} className="ml-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced glitch elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100">
        <div className="absolute top-0 left-0 w-full h-2 bg-neon-green animate-glitch-width"></div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-neon-magenta animate-glitch-width-reverse"></div>
        <div className="absolute top-0 right-0 w-2 h-full bg-neon-blue animate-glitch-height"></div>
        <div className="absolute bottom-0 left-0 w-2 h-full bg-neon-red animate-glitch-height-reverse"></div>
      </div>
    </div>
  )
}
