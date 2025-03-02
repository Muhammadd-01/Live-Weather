import type React from "react"
import { useWeather } from "../../context/WeatherContext"
import { useLanguage } from "../../context/LanguageContext"

const WeatherMap: React.FC = () => {
  const { currentWeather } = useWeather()
  const { t } = useLanguage()

  if (!currentWeather) {
    return null
  }

  const { lat, lon } = currentWeather.coord

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{t.weatherMap}</h3>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={`https://openweathermap.org/weathermap?basemap=map&cities=true&layer=temperature&lat=${lat}&lon=${lon}&zoom=10`}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default WeatherMap

