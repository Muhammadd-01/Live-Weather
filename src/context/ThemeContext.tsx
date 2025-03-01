"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeType = "light" | "dark"

interface ThemeContextType {
  theme: ThemeType
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem("theme")
    return (savedTheme as ThemeType) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  })

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

