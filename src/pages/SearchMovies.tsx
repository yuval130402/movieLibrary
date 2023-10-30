import { useEffect, useState } from "react";
import { fetchData } from "../utilities/fetchMovies";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { PageHeader } from "../components/pageHeader";
import { MovieGrid } from "../components/MovieGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PaginatedFooter } from "../features/pagination/paginatedFooter";
import { changePage } from "../features/pagination/pageSlice";
import { Alert } from "react-bootstrap";
import { API_BASE_URI } from "../utilities/Constants";
import { IMovie } from "../features/popularMovies/types/movie";
import { useParams } from "react-router-dom";

export function SearchMovies() {
  const dispatch = useAppDispatch();
  const { searchTitle } = useParams();
  const [searchMovies, setSearchMovies] = useState<IMovie[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const [totalPage, setTotalPage] = useState(1);
  const searchQuery = useAppSelector((state) => state.search.searchStr);
  const handlePageChange = (page: number) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    // Define the URL of the API you want to fetch data from
    const apiUrl = `${API_BASE_URI}search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
    if (searchQuery) {
      fetchData(apiUrl)
        .then((data) => {
          console.log("success");
          setSearchMovies(data?.results);
          setTotalPage(data?.total_pages);
          setIsLoading(false);
          setError(null);
        })
        .catch((err) => {
          console.log("fail");
          setSearchMovies([]);
          setTotalPage(1);
          setIsLoading(false);
          setError(err);
        });
    }
  }, []);

  return (
    <>
      <PageHeader title="Movies Search Result" />
      {isLoading ? (
        <div role="status" className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div role="status" className="flex justify-center items-center">
          <Alert key="danger" variant="danger">
            {error.message}
          </Alert>
        </div>
      ) : searchMovies?.length !== 0 ? (
        <MovieGrid movies={searchMovies ? searchMovies : []} />
      ) : (
        <center>
          <p> There are no movies with '{searchTitle}' title</p>
        </center>
      )}
      <br />
      <br />
      <br />
      <br />
      <PaginatedFooter
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
