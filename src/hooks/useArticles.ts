import { useCallback, useEffect, useRef, useState } from "react";
import type { Article } from "../types/Article";

const API_ENDPOINT = import.meta.env.VITE_NYT_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const useArticles = (query: string) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loader = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchArticles = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_ENDPOINT}/articlesearch.json?q=${query}&page=${page}&api-key=${API_KEY}`
        );
        if (!res.ok) throw new Error("Failed to fetch...");
        const data = await res.json();
        const docs = data.response.docs as Article[];
        setArticles((prev) => (page === 0 ? docs : [...prev, ...docs]));
        setHasMore(docs.length > 0);
      } catch (err: any) {
        setError(err.message || "Something went wrong...");
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  // Fetch on page change
  useEffect(() => {
    fetchArticles(page);
  }, [page, fetchArticles]);

  // Infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;
    const currentLoader = loader.current;
    if (!currentLoader) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    observer.current.observe(currentLoader);

    return () => {
      observer.current?.disconnect();
    };
  }, [loading, hasMore]);

  // Refetch on query change
  useEffect(() => {
    setPage(0);
    setArticles([]);
    setError(null);
  }, [query]);

  return { articles, loading, error, loader };
};
