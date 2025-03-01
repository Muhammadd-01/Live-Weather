"use client"

import React from "react"
import { FaSun, FaMoon, FaCog, FaGlobe, FaBell } from "react-icons/fa"
import { useTheme } from "../context/ThemeContext"
import { useWeather } from "../context/WeatherContext"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "../utils/translations"
import type { Language } from "../context/LanguageContext"

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { units, setUnits } = useWeather()
  const { language, setLanguage } = useLanguage()
  const [notifications, setNotifications] = React.useState(true)

  const t = translations[language]

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <FaCog className="text-blue-500 mr-3" size={24} />
        <h1 className="text-3xl font-bold">{t.settings}</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t.appearance}</h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {theme === "dark" ? (
                <FaMoon className="text-blue-400 mr-3" size={20} />
              ) : (
                <FaSun className="text-yellow-500 mr-3" size={20} />
              )}
              <div>
                <p className="font-medium">{t.theme}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.themeDescription}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span className="sr-only">{t.toggleTheme}</span>
              <span
                className={`${
                  theme === "dark" ? "translate-x-6 bg-blue-500" : "translate-x-1 bg-white"
                } inline-block h-4 w-4 transform rounded-full transition`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t.units}</h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="metric"
                name="units"
                checked={units === "metric"}
                onChange={() => setUnits("metric")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="metric" className="ml-2 block">
                <span className="font-medium">{t.metric}</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">{t.metricDescription}</span>
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="imperial"
                name="units"
                checked={units === "imperial"}
                onChange={() => setUnits("imperial")}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor="imperial" className="ml-2 block">
                <span className="font-medium">{t.imperial}</span>
                <span className="block text-sm text-gray-600 dark:text-gray-400">{t.imperialDescription}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t.notifications}</h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBell className="text-orange-500 mr-3" size={20} />
              <div>
                <p className="font-medium">{t.weatherAlerts}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.weatherAlertsDescription}</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span className="sr-only">{t.toggleNotifications}</span>
              <span
                className={`${
                  notifications ? "translate-x-6 bg-blue-500" : "translate-x-1 bg-white"
                } inline-block h-4 w-4 transform rounded-full transition`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t.language}</h2>

          <div className="flex items-center">
            <FaGlobe className="text-green-500 mr-3" size={20} />
            <div className="w-full">
              <p className="font-medium mb-2">{t.selectLanguage}</p>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">{t.english}</option>
                <option value="es">{t.spanish}</option>
                <option value="fr">{t.french}</option>
                <option value="de">{t.german}</option>
                <option value="ja">{t.japanese}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

