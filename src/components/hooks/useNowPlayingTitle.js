import React, { useEffect } from "react";
import { TITLE_OPTIONS, TITLE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTitle } from "../../utils/movieSlice";

const useNowPlayingTitle = () => {
  const dispatch = useDispatch();
  const fetchNowPlayingTitle = async () => {
    const res = await fetch(TITLE_URL, TITLE_OPTIONS);
    const data = await res.json();
    // console.log(data);
    dispatch(addMovieTitle(data));
  };
  useEffect(() => {
    fetchNowPlayingTitle();
  }, []);
};

export default useNowPlayingTitle;
