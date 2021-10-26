// import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../../services/moviedb-api";
import styles from "./Cast.module.css";

export default function Cast({ movieId }) {
  const [cast, setCast] = useState(null);
  // const { movieId } = useParams();

  useEffect(() => {
    API.getMovieCast(movieId).then((response) => {
      setCast(response.cast);
    });
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={styles.list}>
          {cast.map((cast) => {
            return (
              <li className={styles.listItem} key={cast.id}>
                {cast.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                    alt={cast.name}
                    width="100px"
                  />
                ) : (
                  <img
                    src="https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"
                    alt={cast.name}
                    width="100px"
                  ></img>
                )}
                <h4 className={styles.namehead}>{cast.name}</h4>
                <p className={styles.text}>Character: {cast.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
