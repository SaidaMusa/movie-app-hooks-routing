export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
    backdrop_path: string; 
}