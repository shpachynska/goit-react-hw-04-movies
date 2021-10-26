import { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";
import * as API from "../../services/moviedb-api";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import styles from "./MoviesPage.module.css";
import ErrorView from "../../components/ErrorView/ErrorView";

export default function MoviesPage() {
  const [status, setStatus] = useState("idle");
  const [resultList, setResultList] = useState(null);
  const [error, setError] = useState("");

  const history = useHistory();
  const location = useLocation();
  const searchRequest = new URLSearchParams(location.search).get("q");

  const handleInputSubmit = (userInput) => {
    history.push({ ...location, search: `q=${userInput}` });
  };

  useEffect(() => {
    if (location.search === "") {
      setStatus("idle");
      return;
    }
    setStatus("pending");
    API.searchMovies(searchRequest)
      .then((response) => {
        if (response.total_results === 0) {
          setStatus("rejected");
          setError("Nothing found");
          return;
        }
        setResultList(response.results);
        setStatus("resolved");
      })
      .catch((error) => {
        setError("Unexpected error occurred");
        setStatus("rejected");
      });
  }, [location.search, searchRequest]);

  return (
    <>
      <Searchbar onSubmit={handleInputSubmit} />
      {status === "idle" && <p>Enter your query</p>}
      {status === "pending" && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {status === "rejected" && <ErrorView />}
      {status === "resolved" && (
        <ul className={styles.list}>
          {resultList.map((item) => {
            return (
              <li className={styles.listItem} key={item.id}>
                <Link
                  className={styles.link}
                  to={{
                    pathname: `/movies/${item.id}`,
                    state: { from: location },
                  }}
                >
                  {item.original_title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
