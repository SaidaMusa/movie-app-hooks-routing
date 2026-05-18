import { Link, useSearchParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import styles from "./MovieCard.module.css";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const [searchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  params.set("details", String(movie.id));

  const query = `/?${params.toString()}`;

  return (
    <Link to={query} className={styles.link}>
      <div className={styles.card}>
        <img
          className={styles.image}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
        />

        <div className={styles.content}>
          <h3 className={styles.title}>
            {movie.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;