import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSuggestedMovies = () => {
  const { suggestedMovies, movieList } = useSelector((store) => store?.config);

  if (!suggestedMovies || suggestedMovies.length === 0) {
    return null;
  }

  console.log("Suggested Movies:", suggestedMovies);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 pb-20">
      {movieList.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={suggestedMovies[index]}
        />
      ))}
    </div>
  );
};

export default GptSuggestedMovies;
