import React from "react";
import BigCard from "./BigCard";
const SearchResults = ({ results, total_results, searchType }) => {
  return (
    <main>
      <section className=" py-6  px-8">
        <h5 className="mb-6 px-2 font-semibold text-base  capitalize badge badge-success">
          {total_results} results
        </h5>
        <div className="mt-4 grid gap-y-4 gap-x-4 auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center">
          {results?.map((item) => {
            return <BigCard key={item.id} {...item} searchType={searchType} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default SearchResults;
