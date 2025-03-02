"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { translations, type Translations } from "../utils/translations"

export type Language = "en" | "es" | "fr" | "de" | "ja" | "zh" | "ru" | "ar" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      return savedLanguage || (navigator.language.split("-")[0] as Language) || "en"
    }
    return "en"
  })

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = translations[language]

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

