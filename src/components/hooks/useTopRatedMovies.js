import React, { useEffect } from "react";
import { OPTIONS, TOP_RATED_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const fetchTopRated = async () => {
    const res = await fetch(TOP_RATED_URL, OPTIONS);
    const data = await res.json();
    const topRatedList = data?.results;
    dispatch(addTopRatedMovies(topRatedList));
  };
  useEffect(() => {
    fetchTopRated();
  }, []);
};

export default useTopRatedMovies;
