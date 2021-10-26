import { useState } from "react";
import styles from "./Searchbar.module.css";
import PropTypes from "prop-types";

export default function Searchbar({ onSubmit }) {
  const [searchRequest, setSearchRequest] = useState("");

  const handleInputChange = (event) => {
    setSearchRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchRequest.trim() === "") {
      alert("Enter your search query!");
      return;
    }

    onSubmit(searchRequest);
    setSearchRequest("");
    event.target.reset();
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
