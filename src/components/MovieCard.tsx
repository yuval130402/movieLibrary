import { Link } from "react-router-dom";
import { IMovie } from "../features/popularMovies/types/movie";
import { IMAGES_URI, Urls } from "../utilities/Constants";
import { Card } from "react-bootstrap";

type MovieCardPropes = {
  movie: IMovie;
};

export function MovieCard({ movie }: MovieCardPropes) {
  return (
    <Link to={`${Urls.Home}/${movie.id}`} className="text-decoration-none">
      <Card className="h-100">
        <Card.Img
          src={`${IMAGES_URI}${movie.poster_path}`}
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title
            className="d-flex justify-content-center
                     mb-4"
          >
            <div className="fs-6">{movie.original_title}</div>
          </Card.Title>
          <div
            className="mt-auto text-muted d-flex justify-content-center"
            style={{ fontSize: "17px" }}
          >
            {movie.release_date}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
