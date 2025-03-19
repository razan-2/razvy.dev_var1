"use client"

import { useState } from "react"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div className="relative">
      <div
        className={`flex items-center bg-dark-light border-2 ${isActive ? "border-gold" : "border-gray-700"} transition-all`}
      >
        <input
          type="text"
          placeholder="SEARCH..."
          className="w-full bg-transparent border-none px-3 py-1 focus:outline-none text-white"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
        <button className="px-2 py-1 bg-gold flex items-center justify-center">
          <Search className="text-dark" size={18} />
        </button>
      </div>
    </div>
  )
}

