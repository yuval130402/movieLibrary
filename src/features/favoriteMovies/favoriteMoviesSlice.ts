import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../popularMovies/types/movie";
import { IFavoriteMovie } from "./types/favoriteMovie";


// Define a type for the slice state
interface favoriteMoviesState {
  favoriteMovies: IMovie[];
}

// Define the initial state using that type
const initialState: favoriteMoviesState = {
  favoriteMovies: [],
};

const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    insertMovie(state, action: PayloadAction<IMovie>) {
      const indexOfMovie = state.favoriteMovies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (indexOfMovie === -1) {
        state.favoriteMovies.push(<IFavoriteMovie>action.payload);
      }
    },

    removeMovie(state, action: PayloadAction<IMovie>) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id );
    },

    clearMovies(state) {
      state.favoriteMovies = [];
    },
  },
});

export const { insertMovie, removeMovie, clearMovies } =
  favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
