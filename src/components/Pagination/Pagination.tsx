import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, onPageChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
<span className={styles.page}>
  Page {currentPage}
</span>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;