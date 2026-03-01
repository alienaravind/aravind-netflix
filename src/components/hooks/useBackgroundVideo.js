import React, { useEffect } from "react";
import { VIDEO_OPTIONS, VIDEO_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addVideoBackground } from "../../utils/movieSlice";

const useBackgroundVideo = () => {
  const dispatch = useDispatch();
  const fetchNowPlayingTitle = async () => {
    const res = await fetch(VIDEO_URL, VIDEO_OPTIONS);
    const data = await res.json();
    dispatch(addVideoBackground(data));
  };
  useEffect(() => {
    fetchNowPlayingTitle();
  }, []);
};

export default useBackgroundVideo;
