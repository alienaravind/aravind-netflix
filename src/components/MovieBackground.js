import React from "react";

const MovieBackground = ({ videoKey }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full scale-135 h-full pointer-events-none"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoKey}`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieBackground;
