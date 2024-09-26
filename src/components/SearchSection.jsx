import React, { useState } from "react";
import sectionBg from "../assets/searchSectionBg.webp";
import { useAppProvider } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { setSearch } = useAppProvider();
  const handleSearch = () => {
    setSearch(searchValue, "all", 1);
    navigate("/search");
  };
  return (
    <div
      className="h-80 max-w-screen bg-no-repeat bg-cover bg-center flex flex-col items-start pl-8 justify-center gap-12 "
      style={{
        backgroundImage: `url(${sectionBg})`,
      }}
    >
      {" "}
      <div>
        {" "}
        <h2 className="text-5xl font-bold">Welcome.</h2>
        <p className="block text-2xl font-semibold">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
      </div>
      <label className="input input-bordered w-5/6 rounded-3xl flex items-center justify-between gap-2 pr-0">
        <input
          type="text"
          className="grow"
          placeholder="Search for a movie, tv show, person...."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="btn primaryBtn w-2/6 sm:w-1/6 rounded-3xl font-bold text-lg md:text-xl  "
          onClick={handleSearch}
        >
          Search
        </button>
      </label>
    </div>
  );
};

export default SearchSection;
