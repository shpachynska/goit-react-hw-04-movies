import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./MoviesDetailsPage.module.css";
import * as API from "../../services/moviedb-api";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    API.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <p>{movieId}</p>
      {movie && (
        <>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.original_title}
            />
          ) : (
            <img
              src="https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image.jpg"
              alt={movie.original_title}
            ></img>
          )}
          <h2>
            {movie.original_title} ({new Date(movie.release_date).getFullYear()}
            )
          </h2>
          <p>User Score: {movie.vote_average} of 10</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map((genre) => (
              <li>{genre.name}</li>
            ))}
          </ul>
          <h4>Additional Information</h4>
        </>
      )}
    </>
  );
}
