import React from "react";
import type { Article } from "../types/Article";

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const thumbnailUrl = article.multimedia?.thumbnail?.url;

  return (
    <a href={article.web_url} target="_blank" rel="noopener noreferrer">
      <div className="shadow p-4 w-full mt-4 rounded hover:bg-gray-200 transition-colors duration-300">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt={article.multimedia?.caption}
            className="md:w-20 md:h-20 w-16 h-16 object-cover rounded mb-4"
          />
        )}
        <p className="md:text-lg text-base font-semibold">
          {article.headline.main}
        </p>
        <p className="md:text-sm text-xs font-semibold mt-2">
          {article.byline?.original}
        </p>
        <p className="md:text-xs text-[10px] text-gray-500 mt-2">
          {new Date(article.pub_date).toLocaleString()}
        </p>
        <p className="mt-2 md:text-sm text-xs text-gray-500">
          {article.abstract.length > 200
            ? `${article.abstract.substring(0, 200)}...`
            : article.abstract}
        </p>
      </div>
    </a>
  );
};

export default ArticleCard;
