import React, { useRef, useEffect, useState } from 'react'
import { useGlitch } from '@/hooks/use-glitch'
import { GlitchText } from '@/lib/glitch-text'
import { createNoiseOverlay } from '@/lib/glitch-effects'

// Components for each section
import WhatBothersMeSection from './WhatBothersMeSection'
import QuoteSection from './QuoteSection'
import TechStoriesSection from './TechStoriesSection'
import CommentsSection from './CommentsSection'
import useBlogStore from '@/state/useBlogStore'
import { useParams } from 'react-router-dom'

const BlogPost = () => {
  // State to store the blog data that will be provided externally
  const [loading, setLoading] = useState(true)

  const fetchBlogById = useBlogStore((state) => state.fetchBlogById);
  const [blog, setBlog] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getBlog = async () => {
      const fetchedBlog = await fetchBlogById(id);
      setBlog(fetchedBlog);
    };
    getBlog();
  }, [id, fetchBlogById]);

  console.log(blog)
  
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  
  const { setRef: setGlitchHeaderRef } = useGlitch({ 
    randomInterval: true, 
    intervalMin: 3000, 
    intervalMax: 8000,
    duration: 400,
    addNoise: true
  })
  
  useEffect(() => {
    // Add noise overlay to the container
    if (containerRef.current) {
      createNoiseOverlay(containerRef.current)
      containerRef.current.classList.add('bg-scanlines')
    }
    
    // Connect the glitch effect to the header
    if (headerRef.current) {
      setGlitchHeaderRef(headerRef.current)
    }
    
    // This is where you'll add your function to fetch the blog data
    // For now, we'll use a placeholder timeout to simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
      // You'll replace this with your actual data fetching
      // setBlog(yourBlogDataFunction())
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [setGlitchHeaderRef])
  
  // Placeholder for loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="font-mono text-[#00ff00] text-2xl">
          <GlitchText text="LOADING_DATA..." intensity="high" />
        </div>
      </div>
    )
  }
  
  // Placeholder for when blog data is not available
  if (!blog) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="font-mono text-[#ff0000] text-2xl">
          <GlitchText text="ERROR_LOADING_BLOG" intensity="high" />
        </div>
      </div>
    )
  }
  
  // Format date
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  
  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black text-white p-4 md:p-8 relative"
    >
      {/* Blog Header */}
      <div 
        ref={headerRef}
        className="mb-12 border-b-4 border-[#00ff00] pb-4"
      >
        <div className="flex flex-wrap justify-between items-baseline mb-4">
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter">
            <GlitchText text={blog.title} intensity="high" className="text-[#00ff00]" />
          </h1>
          <div className="font-mono text-sm opacity-70">
            {formattedDate}
          </div>
        </div>
        
        <p className="text-xl md:text-2xl font-mono opacity-70 mt-4 mb-6">
          {blog.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.subject?.map((tag, index) => (
            <span 
              key={index} 
              className="bg-white text-black px-2 py-1 text-xs font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="space-y-16">
        {/* What Bothers Me Section */}
        {blog.whatBothersMe && blog.whatBothersMe.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-mono font-bold border-l-4 border-[#ff00ff] pl-4">
              <GlitchText text="WHAT_BOTHERS_ME" intensity="medium" className="text-[#ff00ff]" />
            </h2>
            
            <div className="space-y-12">
              {blog?.whatBothersMe.map((section, index) => (
                <WhatBothersMeSection 
                  key={index} 
                  section={section} 
                  index={index} 
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Quote of the Week */}
        {blog.quoteOfTheWeek && (
          <QuoteSection quote={blog.quoteOfTheWeek} />
        )}
        
        {/* Tech Stories Section */}
        {blog.doseOfTechStories && blog.doseOfTechStories.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-mono font-bold border-l-4 border-[#00ffff] pl-4">
              <GlitchText text="DOSE_OF_TECH_STORIES" intensity="medium" className="text-[#00ffff]" />
            </h2>
            
            <div className="space-y-12">
              {blog.doseOfTechStories.map((section, index) => (
                <TechStoriesSection 
                  key={index} 
                  section={section} 
                  index={index} 
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Comments Section */}
        {blog.comments && (
          <CommentsSection comments={blog.comments} />
        )}
      </div>
    </div>
  )
}

export default BlogPost
