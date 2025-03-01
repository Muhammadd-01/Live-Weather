
"use client"

import { useState } from "react"
import { FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa"
import { useWeather } from "../../context/WeatherContext"

const EmergencyAlert = () => {
  const { currentWeather } = useWeather()
  const [dismissed, setDismissed] = useState(false)

  if (!currentWeather || dismissed) {
    return null
  }

  // Check for extreme weather conditions
  const weatherId = currentWeather.weather[0].id
  const temp = currentWeather.main.temp
  const windSpeed = currentWeather.wind.speed

  let emergency = null

  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    emergency = {
      type: "Thunderstorm",
      severity: "high",
      instructions: [
        "Stay indoors and away from windows",
        "Unplug electronic devices",
        "Avoid using plumbing fixtures",
        "If outside, seek shelter in a building or car",
      ],
    }
  }
  // Heavy rain or flood
  else if ((weatherId >= 500 && weatherId <= 504) || (weatherId >= 520 && weatherId <= 522)) {
    emergency = {
      type: "Heavy Rain",
      severity: "medium",
      instructions: [
        "Avoid driving through flooded areas",
        "Stay away from streams and drainage channels",
        "Move to higher ground if in a flood-prone area",
        "Prepare emergency supplies",
      ],
    }
  }
  // Snow
  else if (weatherId >= 600 && weatherId < 700) {
    emergency = {
      type: "Snow",
      severity: "medium",
      instructions: [
        "Limit outdoor exposure",
        "Drive carefully and avoid unnecessary travel",
        "Keep emergency supplies in your vehicle",
        "Check on elderly neighbors",
      ],
    }
  }
  // Extreme heat
  else if (temp > 35 && weatherId === 800) {
    // Over 95°F in metric
    emergency = {
      type: "Extreme Heat",
      severity: "high",
      instructions: [
        "Stay hydrated and drink plenty of water",
        "Avoid strenuous activities during peak heat",
        "Stay in air-conditioned areas when possible",
        "Check on vulnerable individuals",
      ],
    }
  }
  // High winds
  else if (windSpeed > 15) {
    // Over 33 mph in metric
    emergency = {
      type: "High Winds",
      severity: "medium",
      instructions: [
        "Secure loose outdoor items",
        "Stay away from trees and power lines",
        "Avoid driving high-profile vehicles",
        "Be prepared for power outages",
      ],
    }
  }

  if (!emergency) {
    return null
  }

  const severityColors = {
    low: "bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-200",
    medium:
      "bg-orange-100 border-orange-400 text-orange-800 dark:bg-orange-900 dark:border-orange-700 dark:text-orange-200",
    high: "bg-red-100 border-red-400 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200",
  }

  return (
    <div
      className={`mb-6 border-l-4 p-4 rounded-r-lg ${severityColors[emergency.severity as keyof typeof severityColors]}`}
    >
      <div className="flex items-start">
        <FaExclamationTriangle className="mt-1 mr-3 flex-shrink-0" />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{emergency.type} Alert</h3>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Dismiss"
            >
              <FaTimes />
            </button>
          </div>
          <p className="mb-2">Current conditions may be hazardous. Please take necessary precautions.</p>
          <div className="mt-3">
            <h4 className="font-medium flex items-center">
              <FaInfoCircle className="mr-2" /> Safety Instructions:
            </h4>
            <ul className="list-disc list-inside mt-1 ml-2 space-y-1">
              {emergency.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyAlert

