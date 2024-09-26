import React from "react";
import RecommendCard from "./RecommendCard";

const Recommendations = ({ recommendations }) => {
  return (
    <article className="flex gap-4  overflow-x-scroll">
      {recommendations.map((item) => {
        return <RecommendCard key={item.id} {...item} />;
      })}
    </article>
  );
};

export default Recommendations;

