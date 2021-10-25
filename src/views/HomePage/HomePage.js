import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import * as API from "../../services/moviedb-api";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorView from "../../components/ErrorView/ErrorView";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const { url } = useRouteMatch();
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("pending");
    API.getTrending()
      .then((response) => {
        setTrendingMovies(response.results);
        setStatus("resolved");
      })
      .catch((error) => {
        setStatus("rejected");
      });
  }, []);

  return (
    <>
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
        <ul>
          {trendingMovies.map((movie) => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
