import {
  useState,
} from "react";

import {
  useSelectedMovies,
} from "../../store/useSelectedMovies";

import styles from "./Flyout.module.css";

function Flyout() {
  const [open, setOpen] =
    useState(false);

  const {
    selected,
    clearSelected,
  } = useSelectedMovies();

  if (
    selected.length === 0
  ) {
    return null;
  }

  function handleDownload() {
    const headers =
      "Title,Overview\n";

    const rows =
      selected
        .map(
          (movie) =>
            `"${movie.title}","${movie.overview}"`
        )
        .join("\n");

    const csv =
      headers + rows;

    const blob =
      new Blob([csv], {
        type: "text/csv",
      });

    const url =
      URL.createObjectURL(
        blob
      );

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download = `${selected.length}_items.csv`;

    a.click();

    URL.revokeObjectURL(
      url
    );

    setOpen(false);
  }

  function handleClear() {
    clearSelected();

    setOpen(false);
  }

  return (
    <div
      className={
        styles.wrapper
      }
    >
      <button
        className={
          styles.toggle
        }
        onClick={() =>
          setOpen(
            !open
          )
        }
      >
        Actions ▼
      </button>

      {open && (
        <div
          className={
            styles.flyout
          }
        >
          <p
            className={
              styles.info
            }
          >
            Selected:
            {" "}
            {
              selected.length
            }
          </p>

          <div
            className={
              styles.actions
            }
          >
            <button
              className={`${styles.button} ${styles.clear}`}
              onClick={
                handleClear
              }
            >
              Unselect all
            </button>

            <button
              className={`${styles.button} ${styles.download}`}
              onClick={
                handleDownload
              }
            >
              Download CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Flyout;