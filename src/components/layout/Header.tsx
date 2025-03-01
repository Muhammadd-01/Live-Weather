"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"
import SearchBar from "../weather/SearchBar"

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Forecast", path: "/forecast" },
    { name: "News", path: "/news" },
    { name: "Emergency", path: "/emergency" },
    { name: "About", path: "/about" },
    { name: "Settings", path: "/settings" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-500">
            WeatherApp
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav className={`md:flex md:justify-center ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 pb-4 md:pb-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block py-2 hover:text-blue-500 transition-colors ${
                    location.pathname === link.path ? "text-blue-500 font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

