import {
  useSearchParams,
} from "react-router-dom";

import useMovieDetails from "../../hooks/useMovieDetails";

import Loader from "../../components/Loader/Loader";

import styles from "./Details.module.css";

function Details() {
  const [searchParams] =
    useSearchParams();

  const id =
    searchParams.get("details");

  const { movie, loading } =
    useMovieDetails(
      id || undefined
    );

  if (!id) return null;

  return (
    <div className={styles.panel}>
      {loading && <Loader />}

      {!loading && movie && (
        <>
          <img
            className={styles.image}
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : "https://via.placeholder.com/600x300?text=No+Image"
            }
            alt={movie.title}
          />

          <h2 className={styles.title}>
            {movie.title}
          </h2>

          <p className={styles.text}>
            {movie.overview ||
              "No description available."}
          </p>

          <p className={styles.rating}>
            ⭐{" "}
            {movie.vote_average ||
              "N/A"}
          </p>
        </>
      )}

      {!loading && !movie && (
        <p className={styles.text}>
          Movie not found
        </p>
      )}
    </div>
  );
}

export default Details;