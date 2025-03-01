import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import BackgroundAnimation from "../ui/BackgroundAnimation"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundAnimation />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

