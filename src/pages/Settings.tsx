"use client";

import React from "react";
import { FaSun, FaMoon, FaCog, FaGlobe, FaBell } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useWeather } from "../context/WeatherContext";
import { useLanguage } from "../context/LanguageContext";
import type { Language } from "../context/LanguageContext";

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { units, setUnits } = useWeather(); // ✅ Using units and setUnits properly
  const { language, setLanguage, t } = useLanguage();
  const [notifications, setNotifications] = React.useState(true);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <FaCog className="text-blue-500 mr-3" size={24} />
        <h1 className="text-3xl font-bold">{t?.settings || "Settings"}</h1>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t?.appearance || "Appearance"}
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {theme === "dark" ? (
                <FaMoon className="text-blue-400 mr-3" size={20} />
              ) : (
                <FaSun className="text-yellow-500 mr-3" size={20} />
              )}
              <div>
                <p className="font-medium">{t?.theme || "Theme"}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t?.themeDescription || "Toggle light/dark mode"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span className="sr-only">
                {t?.toggleTheme || "Toggle Theme"}
              </span>
              <span
                className={`${
                  theme === "dark"
                    ? "translate-x-6 bg-blue-500"
                    : "translate-x-1 bg-white"
                } inline-block h-4 w-4 transform rounded-full transition`}
              />
            </button>
          </div>
        </div>

        {/* Units Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">{t?.units || "Units"}</h2>

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
                <span className="font-medium">
                  {t?.metric || "Metric (°C, km/h)"}
                </span>
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
                <span className="font-medium">
                  {t?.imperial || "Imperial (°F, mph)"}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t?.notifications || "Notifications"}
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBell className="text-orange-500 mr-3" size={20} />
              <p className="font-medium">
                {t?.weatherAlerts || "Weather Alerts"}
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span className="sr-only">
                {t?.toggleNotifications || "Toggle Notifications"}
              </span>
              <span
                className={`${
                  notifications
                    ? "translate-x-6 bg-blue-500"
                    : "translate-x-1 bg-white"
                } inline-block h-4 w-4 transform rounded-full transition`}
              />
            </button>
          </div>
        </div>

        {/* Language Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t?.language || "Language"}
          </h2>

          <div className="flex items-center">
            <FaGlobe className="text-green-500 mr-3" size={20} />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            >
              {["en", "es", "fr", "de", "ja", "zh", "ru", "ar", "hi", "ur"].map(
                (lang) => (
                  <option key={lang} value={lang}>
                    {lang === "en" && "English (United States)"}
                    {lang === "es" && "Spanish (Spain)"}
                    {lang === "fr" && "French (France)"}
                    {lang === "de" && "German (Germany)"}
                    {lang === "ja" && "Japanese (Japan)"}
                    {lang === "zh" && "Chinese (China)"}
                    {lang === "ru" && "Russian (Russia)"}
                    {lang === "ar" && "Arabic (Saudi Arabia)"}
                    {lang === "hi" && "Hindi (India)"}
                    {lang === "ur" && "Urdu (Pakistan)"}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
