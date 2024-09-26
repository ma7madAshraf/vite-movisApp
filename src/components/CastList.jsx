import React from "react";
import CastCard from "./CastCard";
const CastList = ({ data }) => {
  return (
    <div className="flex gap-6 overflow-x-scroll">
      {data.slice(0, 9).map((cast) => {
        return <CastCard key={cast.id} {...cast} />;
      })}
    </div>
  );
};

export default CastList;
