import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { getMovies } from "../services/api";

function useMovies(page: number, search: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      try {
        const data = await getMovies(page, search);

        setMovies(data.results || []);
      } catch (err) {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [page, search]);

  return {
    movies,
    loading,
  };
}

export default useMovies;