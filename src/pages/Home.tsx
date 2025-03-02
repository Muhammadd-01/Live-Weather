import CurrentWeather from "../components/weather/CurrentWeather"
import HourlyForecast from "../components/weather/HourlyForecast"
import EmergencyAlert from "../components/emergency/EmergencyAlert"
import WeatherTrivia from "../components/weather/WeatherTrivia"
import AirQuality from "../components/weather/AirQuality"
import { useWeather } from "../context/WeatherContext"
import { useLanguage } from "../context/LanguageContext"

const Home = () => {
  const { currentWeather, loading } = useWeather()
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto">
      <EmergencyAlert />

      <h1 className="text-3xl font-bold mb-6">{t.currentWeather}</h1>

      <CurrentWeather />
      <HourlyForecast />
      <WeatherTrivia />
      <AirQuality />

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

