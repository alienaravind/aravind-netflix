import React from "react";
import { NOW_PLAYING_CARD_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="min-w-40 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:z-30">
      <img
        className="rounded-lg shadow-lg"
        alt="Now Playing"
        src={NOW_PLAYING_CARD_URL + posterPath}
      />
    </div>
  );
};

export default MovieCard;
