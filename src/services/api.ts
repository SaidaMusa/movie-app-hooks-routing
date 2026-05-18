export async function getMovies(page: number, search: string) {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const url = search
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}&page=${page}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("API failed");
  }

  return res.json();
}