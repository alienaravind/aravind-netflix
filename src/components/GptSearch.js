import React from "react";
import GptSearchBar from "./GptSearchBar";
import { NETFLIX_BG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div className="absolute">
        <img className="min-h-screen" alt="netflix-bg" src={NETFLIX_BG} />
      </div>
      <GptSearchBar />
    </div>
  );
};

export default GptSearch;
