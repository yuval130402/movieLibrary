import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Navbar } from "./components/Navbar";
import { Urls } from "./utilities/Constants";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { MovieDetailsPage } from "./pages/MovieDetailsPage";
import { SearchBar } from "./features/search/searchBar";
import { SearchMovies } from "./pages/SearchMovies";

function App() {
  return (
    <>
      <Navbar>
        <SearchBar />
      </Navbar>
      <Container className="mb-4">
        <Routes>
          <Route path={Urls.Home} element={<Home type="popular" />} />
          <Route path={Urls.NowPlaying} element={<Home type="now_playing" />} />
          <Route
            path={`${Urls.Home}/:movieId`}
            element={<MovieDetailsPage />}
          />
          <Route path={Urls.Favorites} element={<Favorites />} />
          <Route
            path={`${Urls.Search}/:searchTitle`}
            element={<SearchMovies />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
