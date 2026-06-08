import { useState } from "react";
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

import Modal from "../../components/Modal/Modal";
import Form from "../../components/Form/Form";
import SubmissionCard from "../../components/SubmissionCard/SubmissionCard";

import { useFormsStore } from "../../store/useFormsStore";

import styles from "./Home.module.css";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";

  const { movies, loading, error, refetch, isFetching } = useMovies(
    page,
    search
  );

  const submissions = useFormsStore((state) => state.submissions);
  const removeSubmission = useFormsStore((state) => state.removeSubmission);

  const isDetailsOpen = location.pathname.includes("/movie/");

  // ✅ FIX: refetch type error
  const handleRefresh = () => {
    refetch();
  };

  function handleSearch(value: string) {
    setSearchParams({ page: "1", search: value });

    if (value.trim()) {
      const updated = [
        value,
        ...recentSearches.filter((i) => i !== value),
      ].slice(0, 5);

      setRecentSearches(updated);
    }
  }

  function handlePageChange(newPage: number) {
    const params: Record<string, string> = {
      page: String(newPage),
    };

    if (search) params.search = search;

    setSearchParams(params);
  }

  function closeDetails() {
    navigate(`/?page=${page}&search=${search}`);
  }

  return (
    <div className={styles.container}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <SearchBar value={search} onChange={handleSearch} />

        <div className={styles.topBar}>
          <button className={styles.refreshBtn} onClick={handleRefresh}>
            ↻ Refresh
          </button>

          {isFetching && (
            <span className={styles.refreshing}>Refreshing...</span>
          )}

          <Flyout />
        </div>

        <ThrowErrorButton />

        {error && (
          <div className={styles.error}>
            Failed to load movies
          </div>
        )}

        {loading ? (
          <Loader />
        ) : movies.length === 0 ? (
          <div className={styles.empty}>
            <h3>No movies found</h3>
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

      {/* RIGHT SIDE (PROFESSIONAL PANEL) */}
      <div
        className={`${styles.right} ${
          !isDetailsOpen ? styles.hidden : ""
        }`}
      >
        <div className={styles.rightHeader}>
          {isDetailsOpen && (
            <button
              className={styles.closeBtn}
              onClick={closeDetails}
            >
              ✖ Close
            </button>
          )}

          <button
            className={styles.addBtn}
            onClick={() => setIsModalOpen(true)}
          >
            + Add Submission
          </button>
        </div>

        <Outlet />

        <div className={styles.submissions}>
          {submissions.length > 0 && (
            <h3 className={styles.sectionTitle}>
              Form Submissions
            </h3>
          )}

          {submissions.map((item) => (
            <SubmissionCard
              key={item.id}
              item={item}
              onDelete={removeSubmission}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Form onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Home;