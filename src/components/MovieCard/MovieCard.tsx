import {
  Link,
  useSearchParams,
} from "react-router-dom";

import type {
  Movie,
} from "../../types/movie";

import styles from "./MovieCard.module.css";

import {
  useSelectedMovies,
} from "../../store/useSelectedMovies";

type Props = {
  movie: Movie;
};

function MovieCard({
  movie,
}: Props) {
  const [searchParams] =
    useSearchParams();

  const page =
    searchParams.get("page") ||
    "1";

  const search =
    searchParams.get(
      "search"
    ) || "";

  const {
    toggleMovie,
    isSelected,
  } = useSelectedMovies();

  const imageUrl =
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://dummyimage.com/300x450/cccccc/000000&text=No+Image";

  return (
    <div
      className={
        styles.wrapper
      }
    >
      <input
        type="checkbox"
        checked={isSelected(
          movie.id
        )}
        onClick={(e) =>
          e.stopPropagation()
        }
        onChange={() =>
          toggleMovie({
            id: movie.id,
            title:
              movie.title,
            overview:
              movie.overview,
          })
        }
      />

      <Link
        to={`/movie/${movie.id}?page=${page}&search=${search}&details=1`}
      >
        <div
          className={
            styles.card
          }
        >
          <img
            className={
              styles.image
            }
            src={imageUrl}
            alt={movie.title}
          />

          <div
            className={
              styles.content
            }
          >
            <h3
              className={
                styles.title
              }
            >
              {movie.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;