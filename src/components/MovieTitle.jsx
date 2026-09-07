import React from "react";

const MovieTitle = ({ original_title, overview }) => {
  return (
    <div
      className="
        absolute
        bottom-5
        left-5
        w-[calc(100%-40px)]

        flex
        flex-col
        gap-4
        z-10

        md:bottom-24
        md:left-15
        md:w-1/2
      "
    >
      <h1 className="text-2xl md:text-5xl font-bold text-white">
        {original_title}
      </h1>

      <p className="text-sm md:text-base text-white leading-relaxed">
        {overview}
      </p>

      <div className="flex gap-3 font-semibold">
        <button
          className="
            cursor-pointer
            px-4 py-2
            md:px-6
            text-sm md:text-xl
            rounded-lg
            bg-white
            text-black
            transition-all
            duration-300
            ease-in-out
            hover:bg-gray-300
            hover:scale-105
          "
        >
          ▶ Play
        </button>

        <button
          className="
            cursor-pointer
            px-4 py-2
            md:px-6
            text-sm md:text-xl
            rounded-lg
            bg-gray-500
            text-white
            transition-all
            duration-300
            ease-in-out
            hover:bg-gray-700
            hover:opacity-80
            hover:scale-105
          "
        >
          More Info
        </button>
      </div>
    </div>
  );
};

export default MovieTitle;