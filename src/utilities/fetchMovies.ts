import { IMovie } from "../features/popularMovies/types/movie";
import { API_BASE_URI, ACCESS_TOKEN } from "./Constants";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

// make AJAX requests to fetch movies info.
export const fetchMovies = async (pageNumber: number = 1, type: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URI}movie/${type}?language=en-US&page=${pageNumber}`,
      options
    );
    const data = await response.json();
    const movies: IMovie[] = data.results;
    const pageData = {
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResult: data.total_results,
    };
    return {
      apiResponse: "Success",
      fetchedMovies: movies,
      pageData: pageData,
    };
  } catch (error: any) {
    console.log("Error fetching movies: ", error);
    return {
      apiResponse: error.status_message,
      fetchedMovies: [],
      pageData: null,
    };
  }
};

// make AJAX requests to fetch movie details.
export const fetchData = async (url: string) => {
  return fetch(url, options).then((response) => response.json());
};
