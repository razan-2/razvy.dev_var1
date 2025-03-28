"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"
import { createNoiseOverlay, randomGlitch } from "@/lib/glitch-effects"
import WhatBothersMeSection from "./WhatBothersMeSection"
import QuoteSection from "./QuoteSection"
import TechStoriesSection from "./TechStoriesSection"
import CommentsSection from "./CommentsSection"
import { useParams } from "react-router-dom"
import useBlogStore from "@/state/useBlogStore"
import { Loading } from "../Loading/Loading"

/**
 * BlogPost - A brutalist, glitch-inspired blog post component
 *
 * @param {Object} props
 * @param {Object} props.post - The blog post data
 * @param {string} props.post.title - Post title
 * @param {string} props.post.description - Post description
 * @param {string[]} props.post.subject - Post tags/subjects
 * @param {string} props.post.createdAt - Post creation date (ISO string)
 * @param {Array} props.post.whatBothersMeSections - "What Bothers Me" sections
 * @param {Object} props.post.quoteOfTheWeek - Quote of the week data
 * @param {Array} props.post.techStories - Tech stories sections
 * @param {Array} props.post.comments - User comments
 */
const BlogPost = () => {

  const [post, setPost] = useState(null);
  const { fetchBlogById } = useBlogStore();
  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      const fetchedBlog = await fetchBlogById(id);
      setPost(fetchedBlog);
    };
    getBlog();
  }, [id, fetchBlogById]);

  console.log(post);

  const containerRef = useRef(null)
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const { setRef: setGlitchHeaderRef, triggerGlitch } = useGlitch({
    randomInterval: true,
    intervalMin: 3000,
    intervalMax: 8000,
    duration: 400,
    addNoise: true,
  })

  // Apply noise overlay and scanlines to container
  useEffect(() => {
    if (containerRef.current) {
      createNoiseOverlay(containerRef.current)
      containerRef.current.classList.add("bg-scanlines")
    }

    // Connect glitch effect to header
    if (headerRef.current) {
      setGlitchHeaderRef(headerRef.current)
    }

    // Random glitch effect on load
    const timer = setTimeout(() => {
      triggerGlitch()
    }, 500)

    return () => clearTimeout(timer)
  }, [setGlitchHeaderRef, triggerGlitch, headerRef])

  // Format date
  const formattedDate = post?.createdAt?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return !post ? <Loading /> : (
    <div ref={containerRef} className="min-h-screen bg-black text-white p-4 md:p-8 relative overflow-hidden">
      {/* Blog Header */}
      <div
        ref={headerRef}
        className={`
          mb-12 border-b-4 border-[#00ff00] pb-4
          transition-all duration-700
          ${headerInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
        `}
      >
        <div className="flex flex-wrap justify-between items-baseline mb-4">
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter">
            <GlitchText text={post.title} intensity="high" className="text-[#00ff00]" />
          </h1>
          <div className="font-mono text-sm opacity-70">{formattedDate}</div>
        </div>

        <p className="text-xl md:text-2xl font-mono opacity-70 mt-4 mb-6">{post.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {post.subject.map((tag, index) => (
            <span
              key={index}
              className="bg-white text-black px-2 py-1 text-xs font-mono"
              onMouseEnter={(e) => randomGlitch(e.target, 200)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {/* What Bothers Me Section */}
        {post.whatBothersMeSections && post.whatBothersMeSections.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-mono font-bold border-l-4 border-[#ff00ff] pl-4">
              <GlitchText text="WHAT_BOTHERS_ME" intensity="medium" className="text-[#ff00ff]" />
            </h2>

            <div className="space-y-12">
              {post.whatBothersMeSections.map((section, index) => (
                <WhatBothersMeSection key={index} section={section} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Quote of the Week */}
        {post.quoteOfTheWeek && <QuoteSection quote={post.quoteOfTheWeek} />}

        {/* Tech Stories Section */}
        {post.techStories && post.techStories.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-mono font-bold border-l-4 border-[#00ffff] pl-4">
              <GlitchText text="DOSE_OF_TECH_STORIES" intensity="medium" className="text-[#00ffff]" />
            </h2>

            <div className="space-y-12">
              {post.techStories.map((section, index) => (
                <TechStoriesSection key={index} section={section} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        {post.comments && <CommentsSection comments={post.comments} />}
      </div>
    </div>
  )
}

export default BlogPost

