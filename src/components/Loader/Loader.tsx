import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.wrapper} data-testid="loader">
      <div className={styles.dots}>
        
        <span />
        <span />
        <span />

      </div>
    </div>
  );
}

export default Loader;