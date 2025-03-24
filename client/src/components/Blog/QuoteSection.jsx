"use client"

import { useRef } from "react"
import { useGlitch } from "@/hooks/use-glitch"

const QuoteSection = ({ quote }) => {
  const quoteRef = useRef(null)
  const { setRef: setQuoteRef } = useGlitch({
    randomInterval: true,
    intervalMin: 4000,
    intervalMax: 10000,
    duration: 400,
  })

  const hasImage = !!quote.photo

  return (
    <section
      ref={quoteRef}
      className={`
        my-16 transition-all duration-1000
      `}
    >
      <h2 className="text-3xl font-mono font-bold border-l-4 border-[#ffff00] pl-4 mb-8 text-[#ffff00]">
        QUOTE_OF_THE_WEEK
      </h2>

      {hasImage ? (
        <div className="relative">
          <div className="relative w-full aspect-video mb-6 border-4 border-[#ffff00] overflow-hidden">
            <img
              src={quote.photo || "/placeholder.svg"}
              alt="Quote background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>

            <div ref={(el) => setQuoteRef(el)} className="absolute inset-0 flex items-center justify-center p-8">
              <blockquote className="text-2xl md:text-3xl font-mono text-[#ffff00] text-center">
                "{quote.quote}"<footer className="mt-4 text-base text-white opacity-80">— {quote.author}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      ) : (
        <div ref={(el) => setQuoteRef(el)} className="border-4 border-[#ffff00] p-8 bg-black">
          <blockquote className="text-2xl md:text-3xl font-mono text-[#ffff00] text-center">
            "{quote.quote}"<footer className="mt-4 text-base text-white opacity-80">— {quote.author}</footer>
          </blockquote>
        </div>
      )}
    </section>
  )
}

export default QuoteSection

