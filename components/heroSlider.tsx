"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

type HeroSlide = {
  image: string
  title: string
  subtitle: string
}

interface HeroSliderProps {
  slides: HeroSlide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  // Fix image paths - remove "/public" if present
  const fixImagePath = (path: string) => {
    return path.replace(/^\/public/, "")
  }

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image - Using div with background-image instead of Next.js Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${fixImagePath(slide.image)})` }}
          />

          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                y: currentSlide === index ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center text-white px-4 max-w-4xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
              <Link href="/category/all">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 transition-transform hover:scale-105"
                >
                  {t.shopNow || "Shop Now"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
