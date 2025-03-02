import type React from "react"
import CurrentWeather from "../components/weather/CurrentWeather"
import HourlyForecast from "../components/weather/HourlyForecast"
import EmergencyAlert from "../components/emergency/EmergencyAlert"
import WeatherTrivia from "../components/weather/WeatherTrivia"
import AirQuality from "../components/weather/AirQuality"
import WeatherMap from "../components/weather/WeatherMap"
import WeatherDetails from "../components/weather/WeatherDetails"
import WeatherAlerts from "../components/weather/WeatherAlerts"
import { useWeather } from "../context/WeatherContext"
import { useLanguage } from "../context/LanguageContext"

const Home: React.FC = () => {
  const { currentWeather, loading } = useWeather()
  const { t } = useLanguage()

  return (
    <div className="max-w-full mx-auto">
      <EmergencyAlert />
      <WeatherAlerts />

      <h1 className="text-3xl font-bold mb-6">{t.currentWeather}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CurrentWeather />
          <WeatherDetails />
          <HourlyForecast />
          <WeatherTrivia />
          <AirQuality />
        </div>
        <div>
          <WeatherMap />
        </div>
      </div>

      {!loading && currentWeather && (
        <div className="mt-8 text-center">
          <button
            onClick={() => (window.location.href = "/forecast")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
          >
            {t.viewFullForecast}
          </button>
        </div>
      )}
    </div>
  )
}

export default Home

