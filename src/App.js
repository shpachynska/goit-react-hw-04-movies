import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppBar from "./components/AppBar/AppBar";
import Container from "./components/Container/Container";
import Loader from "react-loader-spinner";

const HomePage = lazy(() =>
  import("./views/HomePage/HomePage.js" /* webpackChunkName: "Home_page" */)
);
const MoviesPage = lazy(() =>
  import(
    "./views/MoviesPage/MoviesPage.js" /* webpackChunkName: "Movies_page" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    "./views/MoviesDetailsPage/MoviesDetailsPage.js" /* webpackChunkName: "movies_details_page" */
  )
);

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
