import React, { useEffect } from "react";
import { OPTIONS, NOW_PLAYING_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const fetchNowPlaying = async () => {
    const res = await fetch(NOW_PLAYING_URL, OPTIONS);
    const data = await res.json();
    const nowPlayingMoviesList = data?.results;
    dispatch(addNowPlayingMovies(nowPlayingMoviesList));
  };
  useEffect(() => {
    fetchNowPlaying();
  }, []);
};

export default useNowPlayingMovies;
