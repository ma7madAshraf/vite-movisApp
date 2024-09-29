import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SwitchList from "./SwitchList";
import { customFetch } from "../utils";

const TvLists = () => {
  const [list, setList] = useState("airing today");
  const [theList, setTheList] = useState([]);

  const changeList = async () => {
    const resp = await customFetch(
      `tv/${list.replaceAll(" ", "_")}?language=en-US&page=1
      }`
    );
    setTheList(resp.data.results);
  };

  useEffect(() => {
    changeList();
  }, [list]);

  return (
    <section className="p-8 py-10">
      <div className="flex  gap-y-4 flex-col sm:flex-row ">
        <h4 className="w-fit text-xl font-semibold mr-8 "> Tv Series</h4>
        <SwitchList
          list={["airing today", "on the air", "popular", "top rated"]}
          value={list}
          onChange={setList}
        />
      </div>
      <div className="flex gap-6 overflow-x-scroll mt-6 ">
        {theList.map((ele) => {
          return <MovieCard key={ele.id} {...ele} type="tv" />;
        })}
      </div>
    </section>
  );
};

export default TvLists;
