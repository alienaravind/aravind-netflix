import React from "react";
import MovieTitle from "./MovieTitle";
import MovieBackground from "./MovieBackground";
import useNowPlayingMovies from "./hooks/useNowPlayingMovies";
import useBackgroundVideo from "./hooks/useBackgroundVideo";
import { useSelector } from "react-redux";
import usePopularMovies from "./hooks/usePopularMovies";
import useTopRatedMovies from "./hooks/useTopRatedMovies";
import useUpcomingMovies from "./hooks/useUpcomingMovies";

const MainContainer = () => {
  useBackgroundVideo();
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const title = useSelector((store) => store.movie?.nowPlayingMovies);
  const video = useSelector((store) => store.movie?.backGroundVideo);
  if (!title || !video) return null;

  const filterMovie = title?.find((title) => title.id == video?.id);

  const background = video.results ? video.results[0] : video.results[1];

  const { original_title, overview } = filterMovie;

  const { key } = background || [];

  return (
    <div>
      <MovieTitle original_title={original_title} overview={overview} />
      <MovieBackground videoKey={key} />
    </div>
  );
};

export default MainContainer;
