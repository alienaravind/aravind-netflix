import React, { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { NETFLIX_LOGO } from "../utils/constants";
import useAuthentication from "./hooks/useAuthentication";
const Header = () => {
  const [hoverActive, setHoverActive] = useState(false);
  const [hoverActiveComp, setHoverActiveComp] = useState(false);
  const leftItems = [
    "Home",
    "Shows",
    "Movies",
    "Games",
    "New & Popular",
    "My List",
    "Browse by Languages",
  ];
  useAuthentication();
  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-18 bg-linear-to-b from-black/90 to-black/5 backdrop-blur-xs">
        <img
          className="absolute w-28 h-12 left-11 top-3 cursor-pointer"
          src={NETFLIX_LOGO}
        />
        <div className="flex text-[14px]">
          <ul className="fixed flex gap-5 top-18 text-gray-100">
            {leftItems.map((left, i) => (
              <li
                className="relative left-48 bottom-12 cursor-pointer font-semibold  hover:text-gray-400 duration-300 ease-in"
                key={i}
              >
                {left}
              </li>
            ))}
          </ul>
        </div>
        <h1 className="fixed top-7 right-34 text-white text-[14px] font-semibold">
          Children
        </h1>
        <div>
          <img
            onMouseEnter={() => {
              setHoverActive(true);
              setHoverActiveComp(true);
            }}
            onMouseLeave={() => {
              setHoverActive(true);
              setHoverActiveComp(true);
            }}
            className="fixed top-6 right-22 rounded-lg cursor-pointer"
            src="https://occ-0-2086-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTYnodXHkY9ZEfEYXCZQm4sPSlT6I_0akZyGKI8erclmvj8ms37-Nwp_Q4sWYk3ozpViIBr0-Fa5u6L91rlt7HIe7TzgUK8.png?r=e31"
            alt="profile-logo"
          />
        </div>
        <div
          onMouseEnter={() => {
            setHoverActive(true);
            setHoverActiveComp(true);
          }}
          onMouseLeave={() => {
            setHoverActive(true);
            setHoverActiveComp(true);
          }}
          className={`fixed top-8 right-18 text-xs cursor-pointer text-[10px] text-white animate-pulse transition-transform duration-300 ${
            hoverActive ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </div>
        <div>
          {hoverActiveComp && (
            <div
              onMouseEnter={() => {
                setHoverActive(true);
                setHoverActiveComp(true);
              }}
              onMouseLeave={() => {
                setHoverActiveComp(false);
                setHoverActive(false);
              }}
            >
              <ProfileDropDown />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
