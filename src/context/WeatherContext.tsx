"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"
import { getCurrentWeather, getForecast, getWeatherByCity } from "../api/weatherApi"
import type { WeatherData, ForecastData, WeatherContextType } from "../types/weather"

const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
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
    if (currentWeather && !locationLoading) {
      // Only refresh if we have coordinates from current weather
      const { lat, lon } = currentWeather.coord
      fetchWeatherData(lat, lon)
    }
  }, [units, currentWeather, currentWeather?.coord, locationLoading])

  const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"))
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      }
    })
  }

  const fetchWeatherData = async (lat: number, lon: number) => {
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
  }

  const refreshWeather = useCallback(async () => {
    try {
      setLocationLoading(true)
      // Only set general loading to true when we don't have any data yet
      if (!currentWeather) {
        setLoading(true)
      }
      const position = await getUserLocation()
      const { latitude, longitude } = position.coords
      await fetchWeatherData(latitude, longitude)
    } catch (err) {
      setError("Failed to get your location. Please enable location services.")
      console.error(err)
    } finally {
      setLocationLoading(false)
      setLoading(false)
    }
  }, [currentWeather, fetchWeatherData, getUserLocation])

  const searchCity = async (city: string) => {
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
  }

  useEffect(() => {
    refreshWeather()
  }, [refreshWeather])

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        loading,
        locationLoading,
        error,
        units,
        setUnits,
        searchCity,
        refreshWeather,
      }}
    >
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

