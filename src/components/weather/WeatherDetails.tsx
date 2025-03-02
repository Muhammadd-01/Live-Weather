import type React from "react"
import { useWeather } from "../../context/WeatherContext"
import { useLanguage } from "../../context/LanguageContext"
import { FaThermometerHalf, FaTint, FaWind, FaCompass, FaSun, FaMoon } from "react-icons/fa"

const WeatherDetails: React.FC = () => {
  const { currentWeather } = useWeather()
  const { t } = useLanguage()

  if (!currentWeather) return null

  const { main, wind, sys } = currentWeather

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-xl font-semibold mb-4">{t.weatherDetails}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <FaThermometerHalf className="text-red-500 mr-2" />
          <div>
            <p className="font-medium">{t.feelsLike}</p>
            <p>{Math.round(main.feels_like)}°C</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaTint className="text-blue-500 mr-2" />
          <div>
            <p className="font-medium">{t.humidity}</p>
            <p>{main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaWind className="text-gray-500 mr-2" />
          <div>
            <p className="font-medium">{t.windSpeed}</p>
            <p>{wind.speed} m/s</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCompass className="text-green-500 mr-2" />
          <div>
            <p className="font-medium">{t.windDirection}</p>
            <p>{wind.deg}°</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaSun className="text-yellow-500 mr-2" />
          <div>
            <p className="font-medium">{t.sunrise}</p>
            <p>{formatTime(sys.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaMoon className="text-blue-300 mr-2" />
          <div>
            <p className="font-medium">{t.sunset}</p>
            <p>{formatTime(sys.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails

