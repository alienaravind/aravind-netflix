import React from "react";
import GptSearchBar from "./GptSearchBar";
import { NETFLIX_BG } from "../utils/constants";
import GptSuggestedMovies from "./GptSuggestedMovies";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-50">
        <img
          src={NETFLIX_BG}
          alt="netflix-bg"
          className="h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Search + Results */}
      <div className="relative z-10 min-h-screen pt-28">
        <GptSearchBar />

        <GptSuggestedMovies />
      </div>
    </div>
  );
};

export default GptSearch;