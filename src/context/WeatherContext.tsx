"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { getCurrentWeather, getForecast, getWeatherByCity } from "../api/weatherApi"
import type { WeatherData, ForecastData } from "../types/weather"

interface WeatherContextType {
  currentWeather: WeatherData | null
  forecast: ForecastData | null
  loading: boolean
  error: string | null
  searchCity: (city: string) => Promise<void>
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherData = useCallback(async (lat: number, lon: number) => {
    try {
      setLoading(true)
      const [weatherData, forecastData] = await Promise.all([getCurrentWeather(lat, lon), getForecast(lat, lon)])
      setCurrentWeather(weatherData)
      setForecast(forecastData)
      setError(null)
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        fetchWeatherData(latitude, longitude)
      },
      (err) => {
        setError("Unable to retrieve your location. Please enter a city manually.")
        console.error(err)
        setLoading(false)
      },
    )
  }, [fetchWeatherData])

  const searchCity = async (city: string) => {
    try {
      setLoading(true)
      const weatherData = await getWeatherByCity(city)
      const { lat, lon } = weatherData.coord
      await fetchWeatherData(lat, lon)
    } catch (err) {
      setError("City not found. Please try another search.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <WeatherContext.Provider value={{ currentWeather, forecast, loading, error, searchCity }}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}

