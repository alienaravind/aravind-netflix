import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../utils/authentication";
import { signOut } from "firebase/auth";
import { PROFILE_LOGO } from "../utils/constants";

const ProfileDropDown = () => {
  const user = useSelector((store) => store?.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="ease-in top-18 right-16 text-white flex flex-col absolute h-26 w-50 border border-gray-800 bg-black opacity-70 p-2">
      <img
        className="mx-2 mt-1 w-8 h-8 rounded-lg"
        src={PROFILE_LOGO}
        alt="profile-logo"
      />
      <h1 className="left-15 absolute text-sm bottom-16 hover:underline cursor-pointer">
        {user.displayName}
      </h1>
      <p className="mt-2 w-full h-px bg-white" />
      <a
        onClick={handleLogout}
        className="mt-2 text-white relative left-7 text-sm hover:underline"
        href="/"
      >
        Sign out of Netflix
      </a>
    </div>
  );
};

export default ProfileDropDown;
