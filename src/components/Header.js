import React from "react";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  return (
    <div>
      <img className="absolute w-40 left-80 top-13" src={NETFLIX_LOGO} />
    </div>
  );
};

export default Header;
