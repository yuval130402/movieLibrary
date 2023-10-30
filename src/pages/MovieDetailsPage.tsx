import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URI, IMAGES_URI } from '../utilities/Constants';
import { fetchData } from '../utilities/fetchMovies';
import { PageHeader } from '../components/pageHeader';
import { Button, Card } from 'react-bootstrap';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { IMovieDetails } from '../features/popularMovies/types/movieDetails';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { insertMovie, removeMovie } from '../features/favoriteMovies/favoriteMoviesSlice';
import { IMovie } from '../features/popularMovies/types/movie';


export const MovieDetailsPage = () => {
  const [movieData, setMovieData] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector((state) => state.favoriteMovies.favoriteMovies);
  const movies = useAppSelector((state) => state.movies.movies);
  const movie: IMovie = movies?.find((m) => m.id.toString() === movieId);

  useEffect(() => {
    // Define the URL of the API you want to fetch data from
    const apiUrl = `${API_BASE_URI}/movie/${movieId}?language=en-US`
    fetchData(apiUrl)
    .then((data) => {
      setMovieData(data); // Data is loaded, set loading to false
      setLoading(false); // Data is loaded, set loading to false
    })
    .catch((err) => {
      setError(err); // Handle any errors that occur during the fetch
      setLoading(false); // Data is not loaded, set loading to false
    });
  }, []);

  
  // Render the card details
  return (
    <>
      <PageHeader title={movieData?.title ?? ""} />
      {loading ? (
        <div role="status" className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p>Error: {error?.message}</p>
      ) : movieData ? (
          <Card>
          <div className="row">
            {/* Movie Poster (Left Side) */}
            <div className="col-md-4">
              <Card.Img src={`${IMAGES_URI}${movieData.poster_path}`}
              style={{ objectFit: "cover" }} alt={movieData.title} />
            </div>
            {/* Movie Details (Right Side) */}
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>{movieData.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {movieData.release_date} | &nbsp;
                  {movieData.genres?.map((g) => g.name).join(', ')}
              </Card.Subtitle>
                <Card.Text>
                  <strong>Overview</strong> 
                  <br/>{movieData.overview}
                  <br/><br/>
                </Card.Text>
                <div style={{ position: 'absolute', bottom:0, right: 0, padding: "10px"}}>
                    {favoriteMovies.findIndex((movie) => movie.id === movieData.id) !== -1 ? (
                      <Button variant='secondary' onClick={() => dispatch(removeMovie(movie))}>
                        Remove from Favorites -
                      </Button>
                    ) : (
                      <Button variant='secondary' onClick={() => dispatch(insertMovie(movie))}>
                        Add To Favorites +
                      </Button>
                    )}
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      ) : null}
    </>
  );
};
