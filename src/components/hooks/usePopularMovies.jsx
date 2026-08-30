import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../../utils/movieSlice";
import { TMDB_FUNCTION_URL } from "../../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const fetchPopular = async () => {
    try {
      const res = await fetch(TMDB_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: "popular",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(addPopularMovies(data?.data?.results));
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);
};

export default usePopularMovies;
