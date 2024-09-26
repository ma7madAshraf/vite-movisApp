import axios from "axios";
import React, { useState } from "react";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import BigCard from "../components/BigCard";
const KeywordQuery = (type, keyword) => {
  return {
    queryKey: ["keyword", keyword, type],
    queryFn: async () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/discover/${type}`,
        params: {
          include_adult: "false",
          include_video: "false",
          language: "en-US",
          page: "1",
          sort_by: "popularity.desc",
          with_keywords: keyword,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      };
      const resp = await axios(options);
      return resp.data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { type, keyword } = params;
    const resp = await queryClient.ensureQueryData(KeywordQuery(type, keyword));
    return resp;
  };
const Keyword = () => {
  const { keyword, type } = useParams();
  const data = useLoaderData();
  const location = useLocation();
  const keywordName = location.state?.keyword;
  const [listType, setListType] = useState(type);
  const [theList, setTheList] = useState(data.results);
  const [listPage, setListPage] = useState(1);

  const getMoreResults = async () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/${listType}`,
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: listPage + 1,
        sort_by: "popularity.desc",
        with_keywords: keyword,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    };
    const resp = await axios(options);
    setListPage(resp.data.page);
    const newList = [...theList, ...resp.data.results];
    setTheList(newList);
    return resp.data;
  };
  const changeType = async (e) => {
    setListType(e.target.value);
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/${e.target.value}`,
      params: {
        include_adult: "false",
        include_video: "false",
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
        with_keywords: keyword,
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    };
    const resp = await axios(options);
    setListPage(resp.data.page);
    setTheList(resp.data.results);
  };
  return (
    <main>
      <div
        className="  w-[100vw]  py-6"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(52.5, 31.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 31.5, 10.5, 0.84) 50%, rgba(52.5, 31.5, 10.5, 0.84) 100%)`,
        }}
      >
        <div className="my-align flex justify-between  items-center">
          <div className="flex flex-col">
            {" "}
            <h2 className="capitalize font-semibold text-xl ">{keywordName}</h2>
            <p className="font-light text-neutral-content text-base">
              {data.total_results} results
            </p>
          </div>
          <select
            className="select select-bordered w-full max-w-32"
            onChange={changeType}
          >
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        </div>
      </div>
      <section>
        <div className=" my-align mt-8 grid gap-y-4 gap-x-4 auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
          {theList.map((result) => (
            <BigCard key={result.id} {...result} type={listType} />
          ))}
        </div>
        {theList.length < data.total_results && (
          <button
            className=" btn btn-wide text-xl capitalize btn-primary mx-auto mt-8 mb-16 block "
            onClick={getMoreResults}
          >
            show more
          </button>
        )}
      </section>
    </main>
  );
};

export default Keyword;
