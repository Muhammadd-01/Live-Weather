"use client"

import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useTheme } from "./context/ThemeContext"
import Layout from "./components/layout/Layout"
import Home from "./pages/Home"
import Forecast from "./pages/Forecast"
import News from "./pages/News"
import Emergency from "./pages/Emergency"
import About from "./pages/About"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/news" element={<News />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App

