"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { getCurrentWeather, getForecast, getWeatherByCity } from "../api/weatherApi"
import type { WeatherData, ForecastData, WeatherContextType } from "../types/weather"

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [locationLoading, setLocationLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [units, setUnits] = useState<"metric" | "imperial">(() => {
    const savedUnits = localStorage.getItem("units")
    return (savedUnits as "metric" | "imperial") || "metric"
  })

  useEffect(() => {
    localStorage.setItem("units", units)
  }, [units])

  const getUserLocation = useCallback((): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"))
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }
    })
  }, [])

  const fetchWeatherData = useCallback(
    async (lat: number, lon: number) => {
      try {
        setLoading(true)
        const weatherData = await getCurrentWeather(lat, lon, units)
        const forecastData = await getForecast(lat, lon, units)
        setCurrentWeather(weatherData)
        setForecast(forecastData)
        setError(null)
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [units],
  )

  const refreshWeather = useCallback(async () => {
    try {
      setLocationLoading(true)
      const position = await getUserLocation()
      const { latitude, longitude } = position.coords
      await fetchWeatherData(latitude, longitude)
    } catch (err) {
      setError("Failed to get your location. Please enable location services.")
      console.error(err)
    } finally {
      setLocationLoading(false)
    }
  }, [fetchWeatherData, getUserLocation])

  const searchCity = useCallback(
    async (city: string) => {
      try {
        setLoading(true)
        const weatherData = await getWeatherByCity(city, units)
        const { lat, lon } = weatherData.coord
        const forecastData = await getForecast(lat, lon, units)
        setCurrentWeather(weatherData)
        setForecast(forecastData)
        setError(null)
      } catch (err) {
        setError("City not found. Please try another search.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    },
    [units],
  )

  useEffect(() => {
    refreshWeather()
  }, [refreshWeather])

  const contextValue = useMemo(
    () => ({
      currentWeather,
      forecast,
      loading,
      locationLoading,
      error,
      units,
      setUnits,
      searchCity,
      refreshWeather,
    }),
    [currentWeather, forecast, loading, locationLoading, error, units, searchCity, refreshWeather],
  )

  return <WeatherContext.Provider value={contextValue}>{children}</WeatherContext.Provider>
}

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider")
  }
  return context
}

