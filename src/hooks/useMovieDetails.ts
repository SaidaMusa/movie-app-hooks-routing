import { useEffect, useState } from "react";
import type { MovieDetails } from "../types/movie";

const API_KEY = import.meta.env.VITE_API_KEY;

function useMovieDetails(id: string | undefined) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        setMovie(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  return { movie, loading };
}

export default useMovieDetails;