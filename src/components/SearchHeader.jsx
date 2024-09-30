import React, { useState } from "react";
import sectionBg from "../assets/searchSectionBg.webp";
import RadioInput from "./RadioInput";
import { useAppProvider } from "../context/appContext";
const SearchHeader = () => {
  const { setSearch, searchTerm, searchType: val } = useAppProvider();
  const [searchValue, setSearchValue] = useState(searchTerm || "");
  const [searchType, setSearchType] = useState(
    val === "multi" ? "all" : val || "all"
  );
  const handleSearch = () => {
    if (searchValue === "") return;
    setSearch(searchValue, searchType);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="h-60 max-w-screen bg-no-repeat bg-cover bg-center flex flex-col items-center pl-8 justify-center  "
      style={{
        backgroundImage: `url(${sectionBg})`,
      }}
    >
      {" "}
      <label className="input input-bordered w-5/6 rounded-3xl flex items-center justify-between gap-2 pr-0">
        <input
          type="text"
          onKeyDown={handleKeyDown}
          className="grow"
          placeholder="Search for a movie, tv show, person...."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <button
          className="btn primaryBtn w-2/6 sm:w-1/6 rounded-3xl font-bold text-lg md:text-xl  "
          onClick={handleSearch}
        >
          Search
        </button>
      </label>
      <RadioInput
        list={["all", "movie", "tv", "person"]}
        value={searchType}
        setSearchType={setSearchType}
      />
    </div>
  );
};

export default SearchHeader;
