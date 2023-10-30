import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SearchState {
  searchStr: string;
}

// Define the initial state using that type
const initialState: SearchState = {
  searchStr: "",
};

export const searchSlice = createSlice({
  name: "search",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateSearch: (state, newSearchStr: PayloadAction<string>) => {
      state.searchStr = newSearchStr.payload;
    },
    clearSearch: (state) => {
      state.searchStr = "";
    },
  },
});

export const { updateSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
