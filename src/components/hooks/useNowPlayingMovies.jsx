import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../../utils/movieSlice";
import { TMDB_FUNCTION_URL } from "../../utils/constants";


const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch(TMDB_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: "now_playing",
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(addNowPlayingMovies(data?.data?.results));
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);
};

export default useNowPlayingMovies;