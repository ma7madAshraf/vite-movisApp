import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BigCard from "../components/BigCard";
import { useAppProvider } from "../context/appContext";

const AllMovies = () => {
  const { type, list } = useParams();
  const [activePage, setActivePage] = useState(1);
  const { AllList, totalPages, loadList, updateList } = useAppProvider();
  const changePage = () => {
    if (totalPages > activePage) {
      updateList({ type, list, activePage });
      setActivePage(activePage + 1);
    }
  };
  useEffect(() => {
    loadList({ type, list });
  }, [type, list]);
  return (
    <main className="px-8">
      <h2 className="flex items-center font-semibold text-2xl gap-2 capitalize">
        {" "}
        {type === "tv" ? "TV Shows " : "Movies"}
        <span className="bg-primary p-2 rounded-xl">
          {list.replace("_", " ")}
        </span>
      </h2>
      <section className="mt-8 grid gap-y-4 gap-x-4 auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
        {AllList.map((ele) => (
          <BigCard key={ele.id} {...ele} type={type} />
        ))}
      </section>
      <button
        disabled={totalPages === activePage}
        className="btn btn-wide text-xl btn-primary block mx-auto my-12"
        onClick={changePage}
      >
        Load more
      </button>
    </main>
  );
};

export default AllMovies;
