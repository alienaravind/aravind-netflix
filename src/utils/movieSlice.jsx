import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    backGroundVideo: null,
    searchActive: false,
  },

  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addVideoBackground: (state, action) => {
      state.backGroundVideo = action.payload;
    },
    toggleSearchActive: (state) => {
      state.searchActive = !state.searchActive;
    },
  },
});

export const {
  addNowPlayingMovies,
  addVideoBackground,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  toggleSearchActive,
} = movieSlice.actions;
export default movieSlice.reducer;
