import React from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useDispatch, useSelector } from "react-redux";
import { setMovieList, setSuggestedMovies } from "../utils/configSlice";

const Browse = () => {
  const checkActive = useSelector((store) => store.movie.searchActive);
  const dispatch = useDispatch();
  if (!checkActive) {
    dispatch(setMovieList(null));
    dispatch(setSuggestedMovies(null));
  }
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      {checkActive ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
