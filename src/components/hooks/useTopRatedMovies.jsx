import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../../utils/movieSlice";
import { TMDB_FUNCTION_URL } from "../../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const fetchTopRated = async () => {
    try {
      const res = await fetch(TMDB_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: "top_rated",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(addTopRatedMovies(data?.data?.results));
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    fetchTopRated();
  }, []);
};

export default useTopRatedMovies;
