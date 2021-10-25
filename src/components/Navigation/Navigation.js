import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => (
  <nav>
    <NavLink
      exact
      className={styles.link}
      to="/"
      activeClassName={styles.activeLink}
    >
      Home
    </NavLink>
    <NavLink
      className={styles.link}
      to="/movies"
      activeClassName={styles.activeLink}
    >
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
