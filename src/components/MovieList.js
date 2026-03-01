import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="relative px-16 mt-[-130] pb-2">
      <h1 className="text-white text-lg font-bold mb-4">{title}</h1>

      <div className="flex gap-3 mb-40 overflow-x-scroll scroll-smooth no-scrollbar">
        {movies.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
