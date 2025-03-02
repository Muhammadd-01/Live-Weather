"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { FaLightbulb } from "react-icons/fa"

const WeatherTrivia: React.FC = () => {
  const { language } = useLanguage()
  const [currentFact, setCurrentFact] = useState("")

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const response = await fetch("http://numbersapi.com/random/date?json")
        const data = await response.json()
        setCurrentFact(data.text)
      } catch (error) {
        console.error("Error fetching trivia:", error)
        setCurrentFact("Did you know? Weather affects our daily lives in countless ways!")
      }
    }

    fetchTrivia()
  }, [])

  return (
    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-md mt-6 animate-fade-in">
      <div className="flex items-center mb-2">
        <FaLightbulb className="text-yellow-400 mr-2" />
        <h3 className="text-lg font-semibold">Weather Trivia</h3>
      </div>
      <p className="text-sm">{currentFact}</p>
    </div>
  )
}

export default WeatherTrivia

