"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { FaSearch } from "react-icons/fa"
import { useWeather } from "../../context/WeatherContext"
import { getCityAutocomplete } from "../../api/weatherApi"

const SearchBar: React.FC = () => {
  const { searchCity } = useWeather()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([])
        return
      }

      try {
        setIsLoading(true)
        const data = await getCityAutocomplete(query)
        setSuggestions(data)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(fetchSuggestions, 500)
    return () => clearTimeout(timeoutId)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (city: string) => {
    searchCity(city)
    setQuery("")
    setShowSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      handleSearch(query)
    }
  }

  const handleSuggestionClick = (city: string) => {
    handleSearch(city)
  }

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search city..."
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          type="submit"
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
        >
          Search
        </button>
      </form>

      {showSuggestions && query.length >= 3 && (
        <div className="absolute mt-1 w-64 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center text-gray-500 dark:text-gray-400">Loading...</div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(`${city.name}, ${city.country}`)}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {city.name}, {city.country}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-3 text-center text-gray-500 dark:text-gray-400">No cities found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar

