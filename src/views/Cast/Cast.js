import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "../../services/moviedb-api";

export default function Cast({ movies }) {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    API.getMovieCast(movieId).then((response) => {
      setCast(response.cast);
    });
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map((cast) => {
            return (
              <li key={cast.id}>
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

                {cast.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
