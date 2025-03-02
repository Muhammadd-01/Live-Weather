import type React from "react"
import Header from "./Header"
import Footer from "./Footer"
import WeatherBackground from "../ui/WeatherBackground"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <WeatherBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout

