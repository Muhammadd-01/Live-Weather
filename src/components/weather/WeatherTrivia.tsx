"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useLanguage } from "../../context/LanguageContext"
import { FaLightbulb } from "react-icons/fa"

const weatherFacts = {
  en: [
    "Lightning strikes the Earth 100 times every second.",
    "A hurricane can release the energy of 10,000 nuclear bombs.",
    "The fastest wind speed ever recorded was 253 mph.",
    "Raindrops can be the size of a housefly and fall at more than 20 mph.",
    "The coldest temperature ever recorded on Earth was -128.6°F in Antarctica.",
  ],
  // Add translations for other languages here
}

const WeatherTrivia: React.FC = () => {
  const { language } = useLanguage()
  const [currentFact, setCurrentFact] = useState("")

  useEffect(() => {
    const facts = weatherFacts[language] || weatherFacts.en
    const randomFact = facts[Math.floor(Math.random() * facts.length)]
    setCurrentFact(randomFact)
  }, [language])

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

