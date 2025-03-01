import axios from "axios"

const API_KEY = import.meta.env.VITE_NEWS_API_KEY

const newsApi = axios.create({
  baseURL: "https://newsapi.org/v2",
})

export const getWeatherNews = async () => {
  const response = await newsApi.get("/everything", {
    params: {
      q: "weather OR climate OR storm OR hurricane OR flood",
      language: "en",
      sortBy: "publishedAt",
      pageSize: 10,
      apiKey: API_KEY,
    },
  })
  return response.data
}

