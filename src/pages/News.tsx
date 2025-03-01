"use client"

import { useState, useEffect } from "react"
import { getWeatherNews } from "../api/newsApi"
import NewsCard from "../components/news/NewsCard"

const News = () => {
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const data = await getWeatherNews()
        setNews(data.articles)
        setError(null)
      } catch (err) {
        setError("Failed to fetch news. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weather News</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
          <p>{error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

export default News

