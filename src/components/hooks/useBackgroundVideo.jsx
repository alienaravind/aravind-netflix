import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addVideoBackground } from "../../utils/movieSlice";
import { TMDB_VIDEO_FUNCTION_URL } from "../../utils/constants";

const useBackgroundVideo = () => {
  const dispatch = useDispatch();

  const fetchNowPlayingTitle = async () => {
    try {
      const res = await fetch(TMDB_VIDEO_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: 1323244,
          endpoint: "videos",
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch(addVideoBackground(data?.data));
    } catch (error) {
      console.error("Failed to fetch video background:", error);
    }
  };
  useEffect(() => {
    fetchNowPlayingTitle();
  }, []);
};

export default useBackgroundVideo;
