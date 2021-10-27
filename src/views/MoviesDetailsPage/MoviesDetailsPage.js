import { useState, useEffect, lazy, Suspense } from "react";
import Loader from "react-loader-spinner";
import {
  useParams,
  NavLink,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import styles from "./MoviesDetailsPage.module.css";
import * as API from "../../services/moviedb-api";

const Cast = lazy(() =>
  import("../Cast/Cast.js" /* webpackChunkName: "cast" */)
);

const Reviews = lazy(() =>
  import("../Reviews/Reviews.js" /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  // console.log("location state: ", location.state.from.state);
  // console.log("history: ", history);
  const [locationState, setLocationState] = useState(null);

  useEffect(() => {
    API.getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  useEffect(() => {
    location?.state?.from && setLocationState(location.state.from);
  }, [location]);

  const onGoBack = () => {
    history.push(locationState ?? "/");
  };

  return (
    <>
      <button type="button" onClick={onGoBack} className={styles.button}>
        Go back
      </button>
      {movie && (
        <div className={styles.container}>
          <div className={styles.info__container}>
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
            <div className={styles.overview}>
              <h2>
                {movie.original_title} (
                {new Date(movie.release_date).getFullYear()})
              </h2>
              <p>User Score: {movie.vote_average} of 10</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
          <h3>Genres</h3>
          <ul className={styles.list}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <h4>Additional Information</h4>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `${url}/cast`,
                  state: { from: locationState },
                }}
              >
                Cast
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                className={styles.link}
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: locationState },
                }}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
          <hr />
          <Suspense fallback={<Loader />}>
            <Route path="/movies/:movieId/cast">
              {<Cast movieId={movieId} />}
            </Route>
            <Route path="/movies/:movieId/reviews">
              {<Reviews movieId={movieId} />}
            </Route>
          </Suspense>
        </div>
      )}
    </>
  );
}
