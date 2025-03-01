"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaSun, FaMoon, FaBars, FaTimes, FaSearch } from "react-icons/fa"
import { useTheme } from "../../context/ThemeContext"
import { useLanguage } from "../../context/LanguageContext"
import SearchBar from "../weather/SearchBar"

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.forecast, path: "/forecast" },
    { name: t.news, path: "/news" },
    { name: t.emergency, path: "/emergency" },
    { name: t.about, path: "/about" },
    { name: t.settings, path: "/settings" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-500">
            WeatherApp
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-blue-500 transition-colors ${
                  location.pathname === link.path ? "text-blue-500 font-medium" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === "dark" ? t.switchToLightMode : t.switchToDarkMode}
            >
              {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={t.toggleSearch}
            >
              <FaSearch />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === "dark" ? t.switchToLightMode : t.switchToDarkMode}
            >
              {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        )}

        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col space-y-2">
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
        )}
      </div>
    </header>
  )
}

export default Header

