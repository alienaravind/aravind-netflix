import React from "react";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import { useSelector } from "react-redux";

const BrowseBody = () => {
  useNowPlayingMovies();
  const movie = useSelector((store) => store.movie?.videoDetails);
  // console.log(movie);
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full scale-135 h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${movie?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie?.key}`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default BrowseBody;
