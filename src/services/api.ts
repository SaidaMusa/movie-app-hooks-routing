import type { Movie, MovieDetails } from "../types/movie";
import { API_KEY } from "../../src/config/env";

const BASE_URL = "https://api.themoviedb.org/3";

export type MoviesResponse = {
  results: Movie[];
};

export async function getMovies(page: number, search: string): Promise<MoviesResponse> {
  const url = search
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load movies. Please try again.");
  }

  return response.json();
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to load movie details.");
  }

  return response.json();
}