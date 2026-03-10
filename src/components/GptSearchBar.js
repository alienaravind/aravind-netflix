import React, { useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const translate = useSelector((store) => store.config.lang);
  const searchText = useRef();
  console.log(searchText);
  return (
    <div>
      <form
        className="fixed left-70 p-2 rounded-md mt-30 items-start grid grid-cols-10 gap-4 w-6/12 m-auto bg-black"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          placeholder={lang[translate].getSearchPlaceholder}
          className="bg-white col-span-7 p-3 rounded-md border-2 border-black text-black"
        />

        <button className="cursor-pointer col-span-3 p-3 font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition">
          {lang[translate].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
