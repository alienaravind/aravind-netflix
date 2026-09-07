import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;
  console.log("MovieList Movies:", movies);

  return (
    <div className="relative left-5 md:px-16 pb-2">
      <h1 className="text-white text-lg font-bold pt-4 mb-4">{title}</h1>

      <div className="flex gap-3 mb-5 overflow-x-scroll scroll-smooth no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
