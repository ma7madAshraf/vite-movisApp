import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SwitchList from "./SwitchList";
import { customFetch } from "../utils";
const TrendingList = () => {
  const [list, setList] = useState("today");
  const [theList, setTheList] = useState([]);

  const changeList = async () => {
    const resp = await customFetch(
      `/trending/all/${list === "today" ? "day" : "week"}?language=en-US`
    );
    setTheList(resp.data.results);
  };

  useEffect(() => {
    changeList();
  }, [list]);
  return (
    <section className="p-8 py-10">
      <div className="flex gap-y-4 flex-col sm:flex-row">
        <h4 className="w-fit text-xl font-semibold mr-8 "> Trending</h4>
        <SwitchList
          list={["today", "this week"]}
          value={list}
          onChange={setList}
        />
      </div>
      <div className="flex gap-6 overflow-x-scroll mt-6 shadow-inner shadow-black p-4 rounded-btn">
        {theList.map((ele) => {
          return <MovieCard key={ele.id} {...ele} />;
        })}
      </div>
    </section>
  );
};

export default TrendingList;
