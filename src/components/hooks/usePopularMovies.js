import React, { useEffect } from "react";
import { OPTIONS, POPULAR_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../../utils/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const fetchPopular = async () => {
    const res = await fetch(POPULAR_URL, OPTIONS);
    const data = await res.json();
    const popularList = data?.results;
    dispatch(addPopularMovies(popularList));
  };
  useEffect(() => {
    fetchPopular();
  }, []);
};

export default usePopularMovies;
