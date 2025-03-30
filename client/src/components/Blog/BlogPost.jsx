import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { GlitchText } from "@/lib/glitch-text"
import { useGlitch } from "@/hooks/use-glitch"
import { createNoiseOverlay, randomGlitch } from "@/lib/glitch-effects"
// import { formatDistanceToNow } from "date-fns"
import { useParams } from "react-router-dom"
import useBlogStore from "@/state/useBlogStore"
import { Loading } from "../Loading/Loading"

export default function BlogPost() {
  const { id } = useParams();
  const { fetchBlogById } = useBlogStore();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      const fetchedBlog = await fetchBlogById(id);
      setBlog(fetchedBlog);
    };
    getBlog();
  }, [id, fetchBlogById]);

  // Set up refs for glitch effects
  const containerRef = useRef(null)
  const titleRef = useRef(null)

  // Set up intersection observer hooks for animations
  const [headerRef, headerInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  const [descriptionRef, descriptionInView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  const [quoteRef, quoteInView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  // Use the glitch hook for container effects
  const { setRef: setGlitchRef, triggerGlitch } = useGlitch({
    randomInterval: true,
    intervalMin: 3000,
    intervalMax: 8000,
    duration: 400,
    addNoise: true,
  })

  // Apply noise overlay effect on mount
  useEffect(() => {
    if (containerRef.current) {
      createNoiseOverlay(containerRef.current)
      setGlitchRef(containerRef.current)
    }
  }, [setGlitchRef])

  // Random glitch effect on title when in view
  useEffect(() => {
    if (headerInView && titleRef.current) {
      const interval = setInterval(
        () => {
          randomGlitch(titleRef.current, 300)
        },
        Math.random() * 5000 + 2000,
      )

      return () => clearInterval(interval)
    }
  }, [headerInView])

//   Format date for display
//   const formatDate = (dateString) => {
//     try {
//       return formatDistanceToNow(new Date(dateString), { addSuffix: true })
//     } catch (err) {
//       console.log(err);
//       return err;
//     }
//   }

  // Intersection Observers for What Bothers Me Sections
  const whatBothersMeSectionRefs = useRef([])
  const [whatBothersMeSectionInView, setWhatBothersMeSectionInView] = useState([])

  useEffect(() => {
    whatBothersMeSectionRefs.current = whatBothersMeSectionRefs.current.slice(0, blog?.whatBothersMeSections.length)

    const observer = new IntersectionObserver(
      (entries) => {
        setWhatBothersMeSectionInView((prev) => {
          const updatedInView = [...prev]
          entries.forEach((entry) => {
            const i = whatBothersMeSectionRefs.current.indexOf(entry.target)
            if (i !== -1) {
              updatedInView[i] = entry.isIntersecting
            }
          })
          return updatedInView
        })
      },
      {
        triggerOnce: false,
        threshold: 0.2,
      },
    )

    whatBothersMeSectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      whatBothersMeSectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [blog?.whatBothersMeSections.length])

  // Intersection Observers for Tech Stories Sections
  const techStoriesSectionRefs = useRef([])
  const [techStoriesSectionInView, setTechStoriesSectionInView] = useState([])

  useEffect(() => {
    techStoriesSectionRefs.current = techStoriesSectionRefs.current.slice(0, blog?.techStories.length)

    const observer = new IntersectionObserver(
      (entries) => {
        setTechStoriesSectionInView((prev) => {
          const updatedInView = [...prev]
          entries.forEach((entry) => {
            const i = techStoriesSectionRefs.current.indexOf(entry.target)
            if (i !== -1) {
              updatedInView[i] = entry.isIntersecting
            }
          })
          return updatedInView
        })
      },
      {
        triggerOnce: false,
        threshold: 0.2,
      },
    )

    techStoriesSectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      techStoriesSectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [blog?.techStories.length])

  // Intersection Observers for Comments Sections
  const commentsSectionRefs = useRef([])
  const [commentsSectionInView, setCommentsSectionInView] = useState([])

  useEffect(() => {
    commentsSectionRefs.current = commentsSectionRefs.current.slice(0, blog?.comments.length)

    const observer = new IntersectionObserver(
      (entries) => {
        setCommentsSectionInView((prev) => {
          const updatedInView = [...prev]
          entries.forEach((entry) => {
            const i = commentsSectionRefs.current.indexOf(entry.target)
            if (i !== -1) {
              updatedInView[i] = entry.isIntersecting
            }
          })
          return updatedInView
        })
      },
      {
        triggerOnce: false,
        threshold: 0.2,
      },
    )

    commentsSectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      commentsSectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [blog?.comments.length])

  if (!blog) return <Loading />

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto px-4 md:px-6 py-8 bg-black text-white overflow-hidden"
    >
      {/* Background scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-0"></div>

      {/* Header section */}
      <header
        ref={headerRef}
        className={`mb-8 transition-all duration-700 ${
          headerInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between mb-4">
          <div className="flex-1 min-w-0 mr-4">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-2 tracking-tighter leading-none"
              data-text={blog.title}
            >
              <GlitchText text={blog.title} intensity="medium" />
            </h1>

            <div className="flex flex-wrap gap-2 mt-3">
              {blog.subject.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-mono bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-colors duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-end mt-2 md:mt-0">
            <div className="text-sm font-mono border border-white p-2 mb-2">
              <span className="text-green-400">&gt;_</span> {() => blog.createdAt.toLocaleString()}
            </div>
            {!blog.public && (
              <div className="text-sm font-mono border border-red-500 bg-red-500 bg-opacity-20 p-2 text-red-500">
                PRIVATE
              </div>
            )}
          </div>
        </div>

        <div
          ref={descriptionRef}
          className={`font-mono text-lg md:text-xl border-l-4 border-white pl-4 py-2 transition-all duration-700 ${
            descriptionInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {blog.description}
        </div>
      </header>

      {/* What Bothers Me Sections */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-mono font-bold mb-6 border-b-2 border-white pb-2">
          <span className="text-red-500">&gt;</span> What Bothers Me
        </h2>

        <div className="space-y-8">
          {blog.whatBothersMeSections.map((section, index) => {
            return (
              <div
                key={index}
                ref={(el) => (whatBothersMeSectionRefs.current[index] = el)}
                className={`transition-all duration-700 ${
                  whatBothersMeSectionInView[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-mono font-bold mb-3">
                  <GlitchText text={section.subtitle} intensity="low" />
                </h3>

                <div className={`${section.photo ? "flex flex-col md:flex-row gap-6" : ""}`}>
                  {section.photo && (
                    <div className="md:w-1/3 mb-4 md:mb-0 relative overflow-hidden">
                      <div className="relative w-full aspect-video">
                        <img
                          src={section.photo || "/placeholder.svg"}
                          alt={section.subtitle}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 border-4 border-white pointer-events-none"></div>
                      </div>
                    </div>
                  )}

                  <div className={section.photo ? "md:w-2/3" : "w-full"}>
                    <p className="font-mono leading-relaxed whitespace-pre-line">{section.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quote of the Week */}
      <section
        ref={quoteRef}
        className={`mb-12 transition-all duration-700 ${quoteInView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <h2 className="text-2xl md:text-3xl font-mono font-bold mb-6 border-b-2 border-white pb-2">
          <span className="text-green-400">&gt;</span> Quote of the Week
        </h2>

        <div className="relative border-4 border-white p-6 bg-black">
          <div className="absolute top-0 right-0 w-16 h-16 border-l-4 border-b-4 border-white -mt-4 -mr-4 bg-black"></div>

          <blockquote className="glitch-quote text-xl md:text-2xl font-mono mb-4">
            "{blog.quoteOfTheWeek.quote}"
          </blockquote>

          <div className="flex items-center mt-4">
            {blog.quoteOfTheWeek.photo && (
              <div className="mr-4 relative w-12 h-12 overflow-hidden border-2 border-white">
                <img
                  src={blog.quoteOfTheWeek.photo || "/placeholder.svg"}
                  alt={blog.quoteOfTheWeek.author}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <cite className="font-mono text-green-400 not-italic">— {blog.quoteOfTheWeek.author}</cite>
          </div>
        </div>
      </section>

      {/* Tech Stories */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-mono font-bold mb-6 border-b-2 border-white pb-2">
          <span className="text-blue-400">&gt;</span> Tech Stories
        </h2>

        <div className="space-y-8">
          {blog.techStories.map((story, index) => {
            return (
              <div
                key={index}
                ref={(el) => (techStoriesSectionRefs.current[index] = el)}
                className={`transition-all duration-700 ${
                  techStoriesSectionInView[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-xl md:text-2xl font-mono font-bold mb-3">
                  <GlitchText text={story.subtitle} intensity="low" />
                </h3>

                <div className={`${story.photo ? "flex flex-col md:flex-row gap-6" : ""}`}>
                  {story.photo && (
                    <div className="md:w-1/3 mb-4 md:mb-0 relative overflow-hidden">
                      <div className="relative w-full aspect-video">
                        <img
                          src={story.photo || "/placeholder.svg"}
                          alt={story.subtitle}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 border-4 border-white pointer-events-none"></div>
                      </div>
                    </div>
                  )}

                  <div className={story.photo ? "md:w-2/3" : "w-full"}>
                    <p className="font-mono leading-relaxed whitespace-pre-line">{story.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-mono font-bold mb-6 border-b-2 border-white pb-2">
          <span className="text-yellow-400">&gt;</span> Comments ({blog.comments.length})
        </h2>

        <div className="space-y-6">
          {blog.comments.map((comment, index) => {
            return (
              <div
                key={index}
                ref={(el) => (commentsSectionRefs.current[index] = el)}
                className={`border-2 border-white p-4 transition-all duration-700 ${
                  commentsSectionInView[index] ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono font-bold">{comment.user}</div>
                  <div className="text-xs font-mono text-gray-400">{() => comment.date.toLocaleString()}</div>
                </div>
                <p className="font-mono text-sm whitespace-pre-line">{comment.comment}</p>
              </div>
            )
          })}
        </div>

        {blog.comments.length === 0 && (
          <div className="border-2 border-dashed border-gray-600 p-6 text-center">
            <p className="font-mono text-gray-400">No comments yet. Be the first to comment.</p>
          </div>
        )}
      </section>
    </div>
  )
}

