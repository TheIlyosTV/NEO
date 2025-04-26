import type { Language } from "@/context/language-context"

/**
 * Updates the application language and ensures all components are notified
 * @param newLanguage The language to switch to
 */
export function updateAppLanguage(newLanguage: Language): void {
  console.log("Updating app language to:", newLanguage)

  // Update localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("currentLanguage", newLanguage)

    // Dispatch a custom event to notify all components
    const event = new CustomEvent("languageChange", { detail: { language: newLanguage } })
    window.dispatchEvent(event)

    // Force a page refresh if needed (uncomment if other methods fail)
    // window.location.reload()
  }
}

/**
 * Gets the current language from localStorage or returns the default
 * @param defaultLanguage The default language to use if none is stored
 * @returns The current language
 */
export function getCurrentLanguage(defaultLanguage: Language = "UZB"): Language {
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("currentLanguage") as Language | null
    if (storedLanguage && ["UZB", "ENG", "RUS"].includes(storedLanguage)) {
      return storedLanguage as Language
    }
  }
  return defaultLanguage
}
