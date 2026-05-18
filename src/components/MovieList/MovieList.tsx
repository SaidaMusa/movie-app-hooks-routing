import MovieCard from "../MovieCard/MovieCard";
import type { Movie } from "../../types/movie";
import styles from "./MovieList.module.css";

type Props = {
  movies: Movie[];
};

function MovieList({ movies }: Props) {
  return (
    <div className={styles.list}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}

export default MovieList;