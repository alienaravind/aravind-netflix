import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
    movieList: null,
    suggestedMovies: null,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
    setMovieList: (state, action) => {
      state.movieList = action.payload;
    },
    setSuggestedMovies: (state, action) => {
      state.suggestedMovies = action.payload;
    },
  },
});

export const { changeLanguage, setMovieList, setSuggestedMovies } =
  configSlice.actions;
export default configSlice.reducer;
