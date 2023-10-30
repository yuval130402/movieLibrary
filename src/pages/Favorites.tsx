import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { PageHeader } from "../components/pageHeader";
import { MovieGrid } from "../components/MovieGrid";
import { PaginatedFooter } from "../features/pagination/paginatedFooter";
import { changePage, resetPage } from "../features/pagination/pageSlice";
import { PER_PAGE } from "../utilities/Constants";
import { ClearButton } from "../components/ClearButton";

export function Favorites() {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(
    (state) => state.favoriteMovies.favoriteMovies
  );
  const currentPage = useAppSelector((state) => state.page.currentPage);
  const firstItemIndex = (currentPage - 1) * PER_PAGE;
  const lastItemIndex = currentPage * PER_PAGE;
  const total = Math.ceil(favoriteMovies.length / PER_PAGE);

  const handlePageChange = (page: number) => {
    dispatch(changePage(page));
  };

  useEffect(() => {
    dispatch(resetPage());
  }, []);

  return (
    <>
      <PageHeader title="My Favorite Movies">
      {favoriteMovies.length !== 0 ? (<ClearButton />):<></>}
        </PageHeader>
      {favoriteMovies.length !== 0 ? (
        <MovieGrid
          movies={favoriteMovies.slice(firstItemIndex, lastItemIndex)}
        />
      ) : (
        <center>
          <p> There are no movies.</p>
        </center>
      )}
      <br />
      <br />
      <br />
      <br />
      {favoriteMovies.length !== 0 ? (
      <PaginatedFooter
        totalPages={total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />) : <></>}
    </>
  );
}
