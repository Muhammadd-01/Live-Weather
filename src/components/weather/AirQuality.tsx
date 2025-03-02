import type React from "react"
import { FaWind } from "react-icons/fa"
import { useWeather } from "../../context/WeatherContext"
import { useLanguage } from "../../context/LanguageContext"

const AirQuality: React.FC = () => {
  const { currentWeather } = useWeather()
  const { t } = useLanguage()

  // This is a placeholder. In a real app, you'd fetch air quality data from an API
  const airQualityIndex = Math.floor(Math.random() * 5) + 1

  const getAirQualityDescription = (index: number) => {
    switch (index) {
      case 1:
        return "Good"
      case 2:
        return "Fair"
      case 3:
        return "Moderate"
      case 4:
        return "Poor"
      case 5:
        return "Very Poor"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg shadow-md mt-6 animate-fade-in">
      <div className="flex items-center mb-2">
        <FaWind className="text-green-500 mr-2" />
        <h3 className="text-lg font-semibold">{t.airQuality}</h3>
      </div>
      <p className="text-sm">
        {t.airQualityIndex}: {airQualityIndex} - {getAirQualityDescription(airQualityIndex)}
      </p>
    </div>
  )
}

export default AirQuality

