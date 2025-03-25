import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useGlitch } from "@/hooks/use-glitch"
import { GlitchText } from "@/lib/glitch-text"
import { randomGlitch } from "@/lib/glitch-effects"

/**
 * CommentsSection - A section for user comments and comment form
 *
 * @param {Object} props
 * @param {Array} props.comments - Array of comment objects
 */
const CommentsSection = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(initialComments || [])
  const [newComment, setNewComment] = useState({
    user: "",
    email: "",
    comment: "",
  })

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const { setRef: setTitleRef } = useGlitch({
    randomInterval: true,
    intervalMin: 5000,
    intervalMax: 15000,
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!newComment.user || !newComment.email || !newComment.comment) {
      return
    }

    const comment = {
      ...newComment,
      date: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment({
      user: "",
      email: "",
      comment: "",
    })

    // Apply glitch effect to the form
    if (sectionRef.current) {
      randomGlitch(sectionRef.current, 300)
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`
        mt-16 pt-8 border-t-4 border-white
        transition-all duration-700 
        ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
      `}
    >
      <h2 ref={(el) => setTitleRef(el)} className="text-3xl font-mono font-bold mb-8">
        <GlitchText text="USER_COMMENTS" intensity="medium" />
      </h2>

      <div className="space-y-8 mb-12">
        {comments.map((comment, index) => {
          // Format date
          // const formattedDate = comment.date.toLocaleDateString("en-US", {
          //   year: "numeric",
          //   month: "short",
          //   day: "numeric",
          // })

          return (
            <div
              key={index}
              className="border-4 border-white p-4 relative"
              onMouseEnter={(e) => randomGlitch(e.currentTarget, 300)}
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-mono font-bold text-[#00ff00]">{comment.user}</h3>
                <span className="text-xs font-mono opacity-70">{comment.date.toLocaleDateString()}</span>
              </div>
              <p className="font-mono">{comment.comment}</p>
            </div>
          )
        })}
      </div>

      <div className="border-4 border-[#00ff00] p-6">
        <h3 className="text-xl font-mono font-bold mb-4 text-[#00ff00]">ADD_COMMENT</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="user" className="block font-mono text-sm mb-1">
                USERNAME
              </label>
              <input
                id="user"
                type="text"
                value={newComment.user}
                onChange={(e) => setNewComment({ ...newComment, user: e.target.value })}
                className="w-full bg-black border-2 border-white p-2 font-mono text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-mono text-sm mb-1">
                EMAIL (NOT_DISPLAYED)
              </label>
              <input
                id="email"
                type="email"
                value={newComment.email}
                onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                className="w-full bg-black border-2 border-white p-2 font-mono text-white"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block font-mono text-sm mb-1">
              COMMENT
            </label>
            <textarea
              id="comment"
              value={newComment.comment}
              onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
              className="w-full bg-black border-2 border-white p-2 font-mono text-white min-h-[100px]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#00ff00] text-black hover:bg-white font-mono border-2 border-[#00ff00] px-4 py-2"
          >
            SUBMIT_COMMENT
          </button>
        </form>
      </div>
    </section>
  )
}

export default CommentsSection

