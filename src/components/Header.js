import React from "react";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  return (
    <div className="flex justify-between w-screen bg-black h-30">
      <img className="absolute left-30 top-7 lg:w-50" src={NETFLIX_LOGO} />
    </div>
  );
};

export default Header;
