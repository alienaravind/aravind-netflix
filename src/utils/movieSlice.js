import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    titleDetails: null,
    videoDetails: null,
  },

  reducers: {
    addMovieTrailer: (state, action) => {
      state.videoDetails = action.payload;
    },
    addMovieTitle: (state, action) => {
      state.titleDetails = action.payload;
    },
  },
});

export const { addMovieTrailer, addMovieTitle } = movieSlice.actions;
export default movieSlice.reducer;
