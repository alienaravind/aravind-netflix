import React from "react";

const MovieTitle = ({ original_title, overview }) => {
  return (
    <div className="absolute bottom-50 left-15 flex flex-col gap-4 z-1">
      <h1 className="w-1/4 text-4xl font-bold text-white">{original_title}</h1>

      <p className="w-1/4 text-white text-sm leading-relaxed">{overview}</p>

      <div className="flex gap-3 font-semibold">
        <button
          className="cursor-pointer px-6 py-2 rounded-lg bg-white text-black
                           transition-all duration-300 ease-in-out
                           hover:bg-gray-300 hover:scale-105"
        >
          ▶ Play
        </button>

        <button
          className="cursor-pointer px-6 py-2 rounded-lg bg-gray-500 text-white
                           transition-all duration-300 ease-in-out
                           hover:bg-gray-700 hover:opacity-80 hover:scale-105"
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default MovieTitle;
