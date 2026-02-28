import React, { useEffect } from "react";
import { OPTIONS, URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../../utils/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const fetchNowPlaying = async () => {
    const res = await fetch(URL, OPTIONS);
    const data = await res.json();
    const trailer = data.results.filter((video) => video.type === "Trailer");
    const selectedTrailer = trailer.length > 0 ? trailer[0] : data.results[0];
    dispatch(addMovieTrailer(selectedTrailer));
  };
  useEffect(() => {
    fetchNowPlaying();
  }, []);
};

export default useNowPlayingMovies;
