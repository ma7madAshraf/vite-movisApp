import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SwitchList from "./SwitchList";
import { customFetch } from "../utils";
const MoviesLists = () => {
  const [list, setList] = useState("now playing");
  const [theList, setTheList] = useState([]);

  const changeList = async () => {
    const resp = await customFetch(
      `movie/${list.replace(" ", "_")}?language=en-US&page=1`
    );
    setTheList(resp.data.results);
  };

  useEffect(() => {
    changeList();
  }, [list]);

  return (
    <section className="px-1 sm:px-8 py-10 bg-base-300   ">
      <div className="flex  gap-y-4 flex-col sm:flex-row  pl-4 sm:pl-0">
        <h4 className="w-fit text-xl font-semibold mr-8 "> Movies</h4>
        <SwitchList
          list={["now playing", "popular", "upcoming", "top rated"]}
          value={list}
          onChange={setList}
        />
      </div>
      <div className="flex gap-6 overflow-x-scroll mt-6">
        {theList.map((ele) => {
          return <MovieCard key={ele.id} {...ele} type="movie" />;
        })}
      </div>
    </section>
  );
};

export default MoviesLists;
