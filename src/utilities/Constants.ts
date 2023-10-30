export const API_BASE_URI = "https://api.themoviedb.org/3/";
export const IMAGES_URI = "https://image.tmdb.org/t/p/w220_and_h330_face/";
export const API_KEY = "0ef9953783230a88303b8354d62a4199";
export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWY5OTUzNzgzMjMwYTg4MzAzYjgzNTRkNjJhNDE5OSIsInN1YiI6IjY1MzJmOTdhOWFjNTM1MDg3ODZhNGZjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IceV2AggjqbOnOapRdGje1_2SCQTXM_xTbjct0zHPYw";
export const TIMEOUT = 2000;
export const MAX_PAGE = 500;
export const PER_PAGE = 5;
export enum Urls {
  Favorites = "/favorites",
  Home = "/popular",
  NowPlaying = "/now_playing",
  Search = "/search",
}
