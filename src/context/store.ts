/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import moviesReducer from "../features/popularMovies/popularMoviesSlice";
import pageReducer from "../features/pagination/pageSlice";
import favoriteMoviesReducer from "../features/favoriteMovies/favoriteMoviesSlice";
import searchReducer from "../features/search/searchSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  page: pageReducer,
  search: searchReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];