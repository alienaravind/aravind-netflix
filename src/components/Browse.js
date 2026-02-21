import React, { useState } from "react";
import Header from "./Header";
import { NETFLIX_LOGO } from "../utils/constants";

const Browse = () => {
  const [hoverActive, setHoverActive] = useState(false);
  const leftItems = [
    "Home",
    "Shows",
    "Movies",
    "Games",
    "New & Popular",
    "My List",
    "Browse by Languages",
  ];
  const rightItems = ["Children"];

  const handleHover = () => {
    setHoverActive(!hoverActive);
  };

  return (
    <div>
      <img
        className="absolute h-screen"
        src="https://wallpapercave.com/wp/wp7098963.jpg"
        alt="browse-bg"
      />
      <div className="flex justify-between top-5 bg-linear-to-b from-black/90 to-black/10 backdrop-blur-xs h-20">
        <img className="relative left-10 cursor-pointer" src={NETFLIX_LOGO} />
        <img
          onClick={handleHover}
          className={
            "relative items-center w-9 h-9 rounded-lg left-[-100] top-[25] cursor-pointer"
          }
          src="https://occ-0-2086-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTYnodXHkY9ZEfEYXCZQm4sPSlT6I_0akZyGKI8erclmvj8ms37-Nwp_Q4sWYk3ozpViIBr0-Fa5u6L91rlt7HIe7TzgUK8.png?r=e31"
          alt="profile-logo"
        />
      </div>
      <div>{}</div>

      <div className="flex justify-between">
        <ul className="absolute flex gap-5 text-gray-100">
          {leftItems.map((left, i) => (
            <li className="relative left-60 bottom-13 cursor-pointer" key={i}>
              {left}
            </li>
          ))}
        </ul>
        <ul className="absolute flex gap-5 text-gray-100">
          {rightItems.map((right, i) => (
            <li className="relative left-280 bottom-13 cursor-pointer" key={i}>
              {right}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Browse;
