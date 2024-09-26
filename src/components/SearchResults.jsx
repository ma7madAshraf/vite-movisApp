import React from "react";
import BigCard from "./BigCard";
const SearchResults = ({ results, total_results, searchType }) => {
  return (
    <main>
      <section className=" py-6  px-8">
        <h5 className="mb-6 px-2 font-semibold text-base  capitalize badge badge-success">
          {total_results} results
        </h5>
        <div className="grid grid-cols-4 gap-y-4">
          {results?.map((item) => {
            return <BigCard key={item.id} {...item} searchType={searchType} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default SearchResults;
