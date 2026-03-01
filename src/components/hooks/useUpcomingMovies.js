import React, { useEffect } from "react";
import { OPTIONS, POPULAR_URL, UPCOMING_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../../utils/movieSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const fetchUpcoming = async () => {
    const res = await fetch(UPCOMING_URL, OPTIONS);
    const data = await res.json();
    const upcomingList = data?.results;
    dispatch(addUpcomingMovies(upcomingList));
  };
  useEffect(() => {
    fetchUpcoming();
  }, []);
};

export default useUpcomingMovies;
