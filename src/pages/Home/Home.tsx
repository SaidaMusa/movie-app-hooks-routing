import { useSearchParams } from "react-router-dom";
import useMovies from "../../hooks/useMovies";
import useLocalStorage from "../../hooks/useLocalStorage";
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import ThrowErrorButton from "../../components/ThrowErrorButton/ThrowErrorButton";
import Details from "../Details/Details";

import styles from "./Home.module.css";

function Home() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const [recentSearches, setRecentSearches] =
    useLocalStorage<string[]>("recentSearches", []);

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const detailsId = searchParams.get("details");

  const { movies, loading } = useMovies(page, search);

  function handleSearch(value: string) {
    setSearchParams({
      page: "1",
      search: value,
    });

    if (value.trim()) {
      const updated = [
        value,
        ...recentSearches.filter((item) => item !== value),
      ].slice(0, 5); 

      setRecentSearches(updated);
    }
  }

  function handlePageChange(newPage: number) {
    const params: Record<string, string> = {
      page: String(newPage),
    };

    if (search) params.search = search;
    if (detailsId) params.details = detailsId;

    setSearchParams(params);
  }

  function closeDetails() {
    const params: Record<string, string> = {
      page: String(page),
    };

    if (search) params.search = search;

    setSearchParams(params);
  }

  const isDetailsOpen = Boolean(detailsId);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <SearchBar value={search} onChange={handleSearch} />

        <ThrowErrorButton />

        {recentSearches.length > 0 && (
          <div className={styles.recent}>
            <div>
              {recentSearches.map((item, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSearchParams({
                      page: "1",
                      search: item,
                    })
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading ? (
          <Loader />
        ) : movies.length === 0 ? (
          <div className={styles.empty}>
            <h3>No movies found...</h3>
          </div>
        ) : (
          <>
            <MovieList movies={movies} />

            <Pagination
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <div
        className={`${styles.right} ${
          !isDetailsOpen ? styles.hidden : ""
        }`}
      >
        {isDetailsOpen && (
          <button
            className={styles.closeBtn}
            onClick={closeDetails}
          >
            ✖ Close
          </button>
        )}

        {isDetailsOpen && <Details />}
      </div>
    </div>
  );
}

export default Home;