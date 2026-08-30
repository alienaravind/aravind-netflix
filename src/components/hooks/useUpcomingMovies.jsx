import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../../utils/movieSlice";
import { TMDB_FUNCTION_URL } from "../../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const fetchUpcoming = async () => {
    try {
      const res = await fetch(TMDB_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint: "upcoming",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      dispatch(addUpcomingMovies(data?.data?.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    fetchUpcoming();
  }, []);
};

export default useUpcomingMovies;
