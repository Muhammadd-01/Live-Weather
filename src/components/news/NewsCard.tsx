import { FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa"

interface NewsCardProps {
  article: {
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    source: {
      name: string
    }
  }
}

const NewsCard = ({ article }: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={article.urlToImage || "/placeholder.svg?height=200&width=200"}
            alt={article.title}
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-3">{article.description}</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{article.source.name}</span>
              <span className="mx-2">•</span>
              <FaCalendarAlt className="mr-1" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-blue-500 hover:text-blue-600"
            >
              Read more <FaExternalLinkAlt className="ml-1 text-xs" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard

