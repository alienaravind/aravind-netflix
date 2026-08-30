import React from "react";
import GptSearchBar from "./GptSearchBar";
import { NETFLIX_BG } from "../utils/constants";
// import GptMovieSuggestions from "./GptMovieSuggestions";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute">
        <img className="min-h-screen" alt="netflix-bg" src={NETFLIX_BG} />
      </div>
      <GptSearchBar />
      {/* <GptMovieSuggestions /> */}

    </div>
  );
};

export default GptSearch;
