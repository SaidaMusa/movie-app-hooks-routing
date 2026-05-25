import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import useMovies from "../../hooks/useMovies";

import useLocalStorage from "../../hooks/useLocalStorage";

import MovieList from "../../components/MovieList/MovieList";

import Pagination from "../../components/Pagination/Pagination";

import SearchBar from "../../components/SearchBar/SearchBar";

import Loader from "../../components/Loader/Loader";

import ThrowErrorButton from "../../components/ThrowErrorButton/ThrowErrorButton";

import Flyout from "../../components/Flyout/Flyout";

import styles from "./Home.module.css";

function Home() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    recentSearches,
    setRecentSearches,
  ] = useLocalStorage<string[]>(
    "recentSearches",
    []
  );

  const page = Number(
    searchParams.get("page") || 1
  );

  const search =
    searchParams.get("search") || "";

  const {
    movies,
    loading,
    error,
    refetch,
    isFetching,
  } = useMovies(
    page,
    search
  );

  async function handleRefresh() {
    await refetch();
  }

  function handleSearch(
    value: string
  ) {
    setSearchParams({
      page: "1",
      search: value,
    });

    if (value.trim()) {
      const updated = [
        value,
        ...recentSearches.filter(
          (item) =>
            item !== value
        ),
      ].slice(0, 5);

      setRecentSearches(
        updated
      );
    }
  }

  function handlePageChange(
    newPage: number
  ) {
    const params: Record<
      string,
      string
    > = {
      page: String(newPage),
    };

    if (search) {
      params.search =
        search;
    }

    setSearchParams(
      params
    );
  }

  function closeDetails() {
    navigate(
      `/?page=${page}&search=${search}`
    );
  }

  const isDetailsOpen =
    location.pathname.includes(
      "/movie/"
    );

  return (
    <div
      className={
        styles.container
      }
    >
      <div
        className={
          styles.left
        }
      >
        <SearchBar
          value={search}
          onChange={
            handleSearch
          }
        />

        <div
          className={
            styles.topBar
          }
        >
          <button
            className={
              styles.refreshBtn
            }
            onClick={
              handleRefresh
            }
          >
            ↻ Refresh
          </button>

          {isFetching && (
            <span
              className={
                styles.refreshing
              }
            >
              Refreshing...
            </span>
          )}

          <Flyout />
        </div>

        <ThrowErrorButton />

        {recentSearches.length >
          0 && (
          <div
            className={
              styles.recent
            }
          >
            <div
              className={
                styles.recentButtons
              }
            >
              {recentSearches.map(
                (item) => (
                  <button
                    key={item}
                    className={
                      styles.recentBtn
                    }
                    onClick={() =>
                      setSearchParams(
                        {
                          page: "1",
                          search:
                            item,
                        }
                      )
                    }
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {error && (
          <div
            className={
              styles.error
            }
          >
            Failed to load movies.
            Please try again.
          </div>
        )}

        {loading ? (
          <Loader />
        ) : movies.length ===
          0 ? (
          <div
            className={
              styles.empty
            }
          >
            <h3>
              No movies found...
            </h3>
          </div>
        ) : (
          <>
            <MovieList
              movies={
                movies
              }
            />

            <Pagination
              currentPage={
                page
              }
              onPageChange={
                handlePageChange
              }
            />
          </>
        )}
      </div>

      <div
        className={`${styles.right} ${
          !isDetailsOpen
            ? styles.hidden
            : ""
        }`}
      >
        {isDetailsOpen && (
          <>
            <button
              className={
                styles.closeBtn
              }
              onClick={
                closeDetails
              }
            >
              ✖ Close
            </button>

            <Outlet />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;