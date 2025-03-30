"use client"

import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Github, Instagram, Linkedin, Phone, Search, Menu, X, ChevronDown } from "lucide-react"
import { useGlitch } from "@/hooks/use-glitch"
import { randomGlitch } from "@/lib/glitch-effects"
import './navbar.css';
import SearchBar from "../SearchBar/SearchBar"

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  // const [searchActive, setSearchActive] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const logoRef = useRef(null)
  const menuRef = useRef(null)
  const overlayRef = useRef(null)

  const { setRef: setLogoGlitchRef, triggerGlitch: triggerLogoGlitch } = useGlitch({
    randomInterval: true,
    intervalMin: 3000,
    intervalMax: 8000,
    duration: 300,
    addNoise: true,
  })

  const { setRef: setMenuGlitchRef, triggerGlitch: triggerMenuGlitch } = useGlitch({
    randomInterval: false,
    duration: 500,
    addNoise: true,
  })

  const toggleMenu = () => {
    if (!menuOpen) {
      triggerMenuGlitch()
      setTimeout(() => {
        setMenuOpen(true)
      }, 100)
    } else {
      triggerMenuGlitch()
      setTimeout(() => {
        setMenuOpen(false)
      }, 300)
    }
  }

  const toggleSubmenu = (menu) => {
    triggerMenuGlitch()
    setActiveSubmenu(activeSubmenu === menu ? null : menu)
  }

  useEffect(() => {
    // Apply refs after component mounts
    if (logoRef.current) setLogoGlitchRef(logoRef.current)
    if (menuRef.current) setMenuGlitchRef(menuRef.current)

    // Apply glitch effect to random elements periodically
    const interval = setInterval(() => {
      const elements = document.querySelectorAll(".nav-item")
      const randomElement = elements[Math.floor(Math.random() * elements.length)]
      if (randomElement) {
        randomGlitch(randomElement, 200)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [setLogoGlitchRef, setMenuGlitchRef])

  return (
    <header className="w-full sticky top-0 left-0 z-50 bg-secondary-foreground">
      {/* Main Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-dark border-b-4 border-gold">
        {/* Logo */}
        <div ref={logoRef} className="text-2xl font-bold tracking-tighter cursor-pointer" onClick={triggerLogoGlitch}>
          <span className="glitch-text" data-text="RAZVY.DEV">
            RAZVY.DEV
          </span>
        </div>

        {/* navigation links, not the menu */}

        <div className="hidden md:flex items-center justify-center space-x-8 py-3 bg-dark-light">
          <Link to="/" className="nav-item text-lg font-bold hover:text-gold transition-colors">
            HOME
          </Link>
          <Link to="/about" className="nav-item text-lg font-bold hover:text-gold transition-colors">
            ABOUT
          </Link>
          <Link to="/portfolio" className="nav-item text-lg font-bold hover:text-gold transition-colors">
            PORTFOLIO
          </Link>
          <Link to="/contact" className="nav-item text-lg font-bold hover:text-gold transition-colors">
            CONTACT
          </Link>
        </div>

        {/* Menu Button */}
        <div className="flex">
            <div className="hidden md:block">
                <SearchBar />
            </div>
            <button
            ref={menuRef}
            onClick={toggleMenu}
            className="flex items-center justify-center w-10 h-10 bg-dark-light hover:bg-gold hover:text-dark transition-colors"
            aria-label="Toggle menu"
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-dark z-50 transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-full"} glitch-scrollbar`}
      >
        <div className="container mx-auto px-4 py-12 h-full flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="w-12 h-12 flex items-center justify-center bg-dark-light hover:bg-gold hover:text-dark transition-colors"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Search Bar - Mobile */}
        <div className="mb-20">
            <SearchBar />
        </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-6 text-3xl font-bold">
            <Link
              to="/"
              className="nav-item border-b-2 border-dark hover:border-gold pb-2 transition-all"
              onClick={toggleMenu}
            >
              HOME
            </Link>

            <Link
              to="/about"
              className="nav-item border-b-2 border-dark hover:border-gold pb-2 transition-all"
              onClick={toggleMenu}
            >
              ABOUT
            </Link>

            {/* Portfolio with submenu */}
            <div className="space-y-4">
              <div
                className="nav-item flex items-center justify-between border-b-2 border-dark hover:border-gold pb-2 cursor-pointer transition-all"
                onClick={() => toggleSubmenu("portfolio")}
              >
                <span>PORTFOLIO</span>
                <ChevronDown className={`transition-transform ${activeSubmenu === "portfolio" ? "rotate-180" : ""}`} />
              </div>

              {activeSubmenu === "portfolio" && (
                <div className="pl-6 space-y-4 text-2xl content-glitching">
                  <Link
                    to="/portfolio/public"
                    className="nav-item block border-b border-dark hover:border-gold pb-1 transition-all"
                    onClick={toggleMenu}
                  >
                    PUBLIC PROJECTS
                  </Link>
                  <Link
                    to="/portfolio/nerdy"
                    className="nav-item block border-b border-dark hover:border-gold pb-1 transition-all"
                    onClick={toggleMenu}
                  >
                    NERDY PROJECTS
                  </Link>
                </div>
              )}
            </div>

            {/* Services with submenu */}
            <div className="space-y-4">
              <div
                className="nav-item flex items-center justify-between border-b-2 border-dark hover:border-gold pb-2 cursor-pointer transition-all"
                onClick={() => toggleSubmenu("services")}
              >
                <span>SERVICES</span>
                <ChevronDown className={`transition-transform ${activeSubmenu === "services" ? "rotate-180" : ""}`} />
              </div>

              {activeSubmenu === "services" && (
                <div className="pl-6 space-y-4 text-2xl content-glitching">
                  <Link
                    to="/services#skills"
                    className="nav-item block border-b border-dark hover:border-gold pb-1 transition-all"
                    onClick={toggleMenu}
                  >
                    SKILLS
                  </Link>
                  <Link
                    to="/services#services"
                    className="nav-item block border-b border-dark hover:border-gold pb-1 transition-all"
                    onClick={toggleMenu}
                  >
                    WHAT CAN I DO?
                  </Link>
                </div>
              )}
            </div>

            <Link
                to="/side-quests"
                className="nav-item border-b-2 border-dark hover:border-gold pb-2 transition-all"
                onClick={toggleMenu}
              >
                SIDE QUESTS
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="mt-auto">
            <div className="flex space-x-6 justify-center md:justify-start">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item w-12 h-12 flex items-center justify-center bg-dark-light hover:bg-gold hover:text-dark transition-colors"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item w-12 h-12 flex items-center justify-center bg-dark-light hover:bg-gold hover:text-dark transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item w-12 h-12 flex items-center justify-center bg-dark-light hover:bg-gold hover:text-dark transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="tel:+1234567890"
                className="nav-item w-12 h-12 flex items-center justify-center bg-dark-light hover:bg-gold hover:text-dark transition-colors"
                aria-label="Phone"
              >
                <Phone size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

