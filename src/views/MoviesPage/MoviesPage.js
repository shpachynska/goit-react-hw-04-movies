import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";
import * as API from "../../services/moviedb-api";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [status, setStatus] = useState("idle");
  const [searchRequest, setSearchRequest] = useState("");
  const [resultList, setResultList] = useState(null);

  const handleInputSubmit = (userInput) => {
    setSearchRequest(userInput);
  };

  useEffect(() => {
    if (searchRequest === "") {
      return;
    } else {
      setStatus("pending");
      API.searchMovies(searchRequest)
        .then((response) => {
          setResultList(response.results);
          setStatus("resolved");
        })
        .catch((error) => {
          setStatus("rejected");
        });
    }
  }, [searchRequest]);

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
      {status === "rejected" && <p>Nothing found</p>}
      {status === "resolved" && (
        <ul>
          {resultList.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/movies/${item.id}`}>{item.original_title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
