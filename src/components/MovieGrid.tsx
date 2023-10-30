import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../components/MovieCard";
import { IMovie } from "../features/popularMovies/types/movie";
import { IFavoriteMovie } from "../features/favoriteMovies/types/favoriteMovie";


interface MovieGridProps {
    movies: IMovie[] | IFavoriteMovie[];
    favorite?: boolean;
}

export function MovieGrid({movies}: MovieGridProps) {
  return (
    <Row md={2} xs={1} lg={4} xl={5} className="g-3">
      {movies?.map((movie) => (
        <Col key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}