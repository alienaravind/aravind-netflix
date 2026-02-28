import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../utils/authentication";
import { signOut } from "firebase/auth";

const ProfileDropDown = () => {
  const user = useSelector((store) => store?.user);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="top-18 right-16 text-white flex flex-col absolute h-26 w-50 border border-gray-800 bg-black opacity-70 p-2">
      <img
        className="mx-2 mt-1 w-8 h-8 rounded-lg"
        src="https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABWd3YdaNDpKVmeZmtUARwy3zKAJKo4JRj6TNTykQ_vm9uqzCthRJBYcJMQT-IzqnbYWiTwUO1NZnIh93Kj1lJhnyzKd-yuw.png?r=3a2"
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
