import React, { useEffect, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import SearchResults from "../components/SearchResults";
import Pagination from "../components/Pagination";
import { useAppProvider } from "../context/appContext";

const Search = () => {
  const { searchResults, searchTerm, searchType, searchPage, setSearch } =
    useAppProvider();
  const [resultsPage, setResultsPage] = useState(searchPage);

  useEffect(() => {
    setSearch(searchTerm, searchType, resultsPage);
  }, [resultsPage]);

  return (
    <section>
      <SearchHeader />
      {searchResults && (
        <SearchResults {...searchResults} searchType={searchType} />
      )}
      {searchResults?.total_pages > 1 && (
        <Pagination
          page={resultsPage}
          total={searchResults.total_pages}
          onChange={(val) => setResultsPage(val)}
        />
      )}
    </section>
  );
};

export default Search;
