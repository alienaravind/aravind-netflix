import React, { useState } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { LANGUAGES, NETFLIX_LOGO, PROFILE_LOGO } from "../utils/constants";
import useAuthentication from "./hooks/useAuthentication";
import { toggleSearchActive } from "../utils/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const dispatch = useDispatch();
  const [hoverActive, setHoverActive] = useState(false);
  const [hoverActiveComp, setHoverActiveComp] = useState(false);

  const checkActive = useSelector((store) => store.movie.searchActive);

  useAuthentication();

  const handleToggleAISearch = () => {
    dispatch(toggleSearchActive());
  };
  const handleToggleLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div
      className="z-20 fixed top-0 left-0 w-full h-18 
                bg-linear-to-b from-black/90 to-black/5 
                backdrop-blur-xs
                px-4 sm:px-6 md:px-8"
    >
      <div className="h-full flex items-center justify-between">
        <img
          className="
              w-24
              sm:w-28
              cursor-pointer
            "
          src={NETFLIX_LOGO}
        />
        <div
          className="
              flex
              items-center
              gap-2
              sm:gap-3
              md:gap-4
            "
        >
          {checkActive && (
            <select
              onChange={handleToggleLanguage}
              className="
                  w-16
                  sm:w-20
                  rounded-md
                  bg-gray-950
                  text-white
                  cursor-pointer
                  border-2
                  border-black
                  text-sm
                  sm:text-base
                "
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleToggleAISearch}
            className="
                px-3
                sm:px-4
                py-1
                rounded-lg
                cursor-pointer
                hover:text-white
                duration-200
                ease-in
                bg-violet-500
                text-black
                text-sm
                sm:text-base
                whitespace-nowrap
              "
          >
            {checkActive ? "Home" : "AI Search"}
          </button>
          <div className="flex items-center gap-1">
            <img
              onMouseEnter={() => {
                setHoverActive(true);
                setHoverActiveComp(true);
              }}
              onMouseLeave={() => {
                setHoverActive(true);
                setHoverActiveComp(true);
              }}
              className="
                    w-8
                    sm:w-9
                    md:w-10
                    rounded-lg
                    cursor-pointer
                  "
              src={PROFILE_LOGO}
              alt="profile-logo"
            />
          </div>
          <span
            onMouseEnter={() => {
              setHoverActive(true);
              setHoverActiveComp(true);
            }}
            onMouseLeave={() => {
              setHoverActive(true);
              setHoverActiveComp(true);
            }}
            className={`
                    text-[10px]
                    text-white
                    cursor-pointer
                    animate-pulse
                    transition-transform
                    duration-300
                    ${hoverActive ? "rotate-180" : "rotate-0"}
                  `}
          >
            ▼
          </span>
          <div>
            {hoverActiveComp && (
              <div
                className="w-2"
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
    </div>
  );
};
export default Header;
