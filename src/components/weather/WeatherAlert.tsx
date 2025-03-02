import type React from "react"
import { FaExclamationTriangle } from "react-icons/fa"
import { useWeather } from "../../context/WeatherContext"
import { useLanguage } from "../../context/LanguageContext"

const WeatherAlert: React.FC = () => {
  const { currentWeather } = useWeather()
  const { t } = useLanguage()

  if (!currentWeather || !currentWeather.alerts || currentWeather.alerts.length === 0) {
    return null
  }

  return (
    <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg shadow-md mt-6 animate-fade-in">
      <div className="flex items-center mb-2">
        <FaExclamationTriangle className="text-red-500 mr-2" />
        <h3 className="text-lg font-semibold">{t.weatherAlert}</h3>
      </div>
      {currentWeather.alerts.map((alert, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{alert.event}</p>
          <p className="text-sm">{alert.description}</p>
        </div>
      ))}
    </div>
  )
}

export default WeatherAlert

