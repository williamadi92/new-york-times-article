import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import ArticleList from "./components/ArticleList";
import { useArticles } from "./hooks/useArticles";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      if (inputValue.trim() !== query) {
        setQuery(inputValue.trim());
      }
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputValue]);

  const { articles, loading, error, loader } = useArticles(query);

  return (
    <div className="bg-gray-100">
      <div className="max-w-xl min-h-screen flex flex-col items-center mx-auto bg-white py-8">
        <SearchBar inputValue={inputValue} onChange={setInputValue} />
        <ArticleList articles={articles} />
        {loading && <p className="mt-4">Loading more...</p>}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        <div ref={loader} />
      </div>
    </div>
  );
};

export default App;
