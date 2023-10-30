import { useEffect, useState } from "react";
import { fetchMovies } from "../utilities/fetchMovies";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import {
  fetchMoviesFailure,
  fetchMoviesStart,
  fetchMoviesSuccess,
} from "../features/popularMovies/popularMoviesSlice";
import { PageHeader } from "../components/pageHeader";
import { MovieGrid } from "../components/MovieGrid";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PaginatedFooter } from "../features/pagination/paginatedFooter";
import { changePage } from "../features/pagination/pageSlice";
import { Alert } from "react-bootstrap";
import { MAX_PAGE } from "../utilities/Constants";

export interface HomeProps {
  type: string;
}

export function Home({ type }: HomeProps) {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const error = useAppSelector((state) => state.movies.error);
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const searchQuery = useAppSelector((state) => state.search.searchStr);
  const [totalPage, setTotalPage] = useState(MAX_PAGE);
  const handlePageChange = (page: number) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchMoviesStart());
      fetchMovies(currentPage, type).then((result) => {
        if (result.apiResponse == "Success") {
          dispatch(fetchMoviesSuccess(result.fetchedMovies));
        } else {
          dispatch(fetchMoviesFailure(result.apiResponse));
        }
        if (result.pageData?.totalPages > 500) {
          setTotalPage(MAX_PAGE);
        } else {
          setTotalPage(result.pageData?.totalPages);
        }
      });
    }
  }, [currentPage, searchQuery, type]);

  return (
    <>
      <PageHeader
        title={type === "popular" ? "Popular Movies" : "Now Playing Movies"}
      />
      {isLoading ? (
        <div role="status" className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div role="status" className="flex justify-center items-center">
          <Alert key="danger" variant="danger">
            {error}
          </Alert>
        </div>
      ) : (
        <MovieGrid movies={movies} />
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
