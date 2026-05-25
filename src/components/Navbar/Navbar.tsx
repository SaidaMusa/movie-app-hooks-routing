import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? styles.activeLink
              : styles.link
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? styles.activeLink
              : styles.link
          }
        >
          About
        </NavLink>

        <button
          className={styles.themeBtn}
          onClick={toggleTheme}
        >
          <span className={styles.themeIcon}>
            {theme === "dark"
              ? "🌙"
              : "☀️"}
          </span>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;