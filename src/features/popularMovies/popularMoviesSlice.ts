import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "./types/movie";

// Define a type for the slice state
interface moviesState {
    movies: IMovie[];
    isLoading: boolean,
    error: string | null;
}

// Define the initial state using that type
const initialState: moviesState = {
  movies: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.isLoading = true;
      state.error = null;
    },

    fetchMoviesSuccess(state, action: PayloadAction<IMovie[]>) {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    fetchMoviesFailure(state, action: PayloadAction<string>) {
      state.movies = [];
      state.isLoading = false;
      state.error = action.payload;
    },

    
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure
} = moviesSlice.actions;

export default moviesSlice.reducer;
