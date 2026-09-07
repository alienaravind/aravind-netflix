import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import {
  OPENAI_FUNCTION_URL,
  TMDB_SEARCH_FUNCTION_URL,
} from "../utils/constants";
import { setMovieList, setSuggestedMovies } from "../utils/configSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const translate = useSelector((store) => store.config.lang);

  const searchText = useRef();

  const findMovieByName = async (movieName) => {
    try {
      const response = await fetch(TMDB_SEARCH_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieName: movieName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("TMDB search failed:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  const handleSearchClick = async () => {
    const query = searchText.current.value.trim();

    if (!query) {
      alert("Please enter a search query.");
      return;
    }

    try {
      setLoading(true);

      // 1. Ask OpenAI for movie names
      const response = await fetch(OPENAI_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
Return only movie names as a comma-separated list.

Rules:
- No numbering
- No bullets
- No explanations
- No quotes
- No extra text
- Return exactly the number of movies requested by the user
- Every item must be a real movie title

User request: ${query}
          `,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "OpenAI request failed");
      }

      const movieNameList = data.response
        .split(",")
        .map((movie) => movie.trim())
        .filter(Boolean);

      console.log("Movie Name List:", movieNameList);

      dispatch(setMovieList(movieNameList));

      // 2. Search TMDB for each movie
      const movies = await Promise.all(
        movieNameList.map((movie) => findMovieByName(movie)),
      );

      // 3. Store results
      dispatch(
        setSuggestedMovies(
          movies?.map((result) => result?.data?.results || []),
        ),
      );
    } catch (error) {
      console.error("Error fetching movie suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-20 flex justify-center right-1/2md:px-4">
      <form
        className="
          flex
          w-full
          max-w-2xl
          items-center
          gap-3
          rounded-lg
          bg-black/80
          p-3
          shadow-2xl
        "
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchClick();
        }}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[translate].getSearchPlaceholder}
          className="
            flex-1
            rounded-md
            border-2
            border-transparent
            bg-white
            p-3
            text-black
            outline-none
            focus:border-red-500
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            rounded-md
            bg-red-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-red-700
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "Searching..." : lang[translate].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
