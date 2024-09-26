import React from "react";
import TrendingList from "../components/TrendingList";
import SearchSection from "../components/SearchSection";
import MoviesLists from "../components/MoviesLists";
import TvLists from "../components/TvLists";

const Landing = () => {
  return (
    <>
      <SearchSection />
      <TrendingList />
      <MoviesLists />
      <TvLists />
    </>
  );
};

export default Landing;
