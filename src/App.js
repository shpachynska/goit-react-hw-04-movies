import { Switch, Route } from "react-router-dom";

import AppBar from "./components/AppBar/AppBar";
import Container from "./components/Container/Container";
import HomePage from "./views/HomePage/HomePage";
import MoviesPage from "./views/MoviesPage/MoviesPage";

// import BooksView from "./views/BooksView";
// import BookDetailsView from "./views/BookDetailsView";
// import NotFoundView from "./views/NotFoundView";

export default function App() {
  return (
    <Container>
      <AppBar />

      <Route path="/" exact>
        <HomePage />
      </Route>

      <Route path="/movies">
        <MoviesPage />
      </Route>
      {/* <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
        <Route path="/authors">
          <AuthorsView />
        </Route>

        <Route path="/books" exact>
          <BooksView />
        </Route>

        <Route path="/books/:bookId">
          <BookDetailsView />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch> */}
    </Container>
  );
}
