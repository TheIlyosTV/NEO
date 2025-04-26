"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "@/components/translations"

// Define the available languages
export type Language = "UZB" | "ENG" | "RUS"

// Define the translations type based on the actual structure
type TranslationsType = typeof translations
type TranslationKeys = keyof TranslationsType
type TranslationValues = TranslationsType[TranslationKeys]

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: Record<string, string>
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "UZB",
  setLanguage: () => {},
  t: translations.UZB,
})

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext)

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with UZB, but will check localStorage on mount
  const [language, setLanguageState] = useState<Language>("UZB")
  const [t, setTranslations] = useState<Record<string, string>>(translations.UZB)

  // Set language and update localStorage
  const setLanguage = (newLanguage: Language) => {
    console.log("Language changing to:", newLanguage)
    setLanguageState(newLanguage)

    // Always update translations when language changes
    // Use type assertion to tell TypeScript that newLanguage is a valid key
    const newTranslations = translations[newLanguage as keyof typeof translations] || translations.UZB
    setTranslations(newTranslations)
    console.log("New translations set:", Object.keys(newTranslations).length)

    // Save to localStorage if in browser environment
    if (typeof window !== "undefined") {
      localStorage.setItem("currentLanguage", newLanguage)

      // Dispatch a custom event for components that might not be in the React tree
      const event = new CustomEvent("languageChange", { detail: { language: newLanguage } })
      window.dispatchEvent(event)
    }
  }

  // Initialize language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("currentLanguage") as Language | null
      if (storedLanguage && ["UZB", "ENG", "RUS"].includes(storedLanguage)) {
        console.log("Loading language from localStorage:", storedLanguage)
        setLanguageState(storedLanguage)
        // Use type assertion here as well
        setTranslations(translations[storedLanguage as keyof typeof translations] || translations.UZB)
      }

      // Listen for language change events from other components
      const handleLanguageChange = (event: Event) => {
        const customEvent = event as CustomEvent
        const newLanguage = customEvent.detail?.language
        if (newLanguage && ["UZB", "ENG", "RUS"].includes(newLanguage)) {
          console.log("Language change event received:", newLanguage)
          setLanguageState(newLanguage as Language)
          // Use type assertion here as well
          setTranslations(translations[newLanguage as keyof typeof translations] || translations.UZB)
        }
      }

      window.addEventListener("languageChange", handleLanguageChange)
      return () => {
        window.removeEventListener("languageChange", handleLanguageChange)
      }
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}
