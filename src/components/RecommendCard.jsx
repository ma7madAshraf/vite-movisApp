import React from "react";
import { Link } from "react-router-dom";

const RecommendCard = ({
  backdrop_path: poster,
  id,
  title,
  name,
  media_type: type,
  vote_average: rate,
}) => {
  const theTitle = title || name;
  return (
    <Link className="min-w-48 md:min-w-64" to={`/${type}/${id}`}>
      <img
        src={`https://media.themoviedb.org/t/p/w250_and_h141_face${poster}`}
        alt={title}
        className="h-28 md:h-36 w-48 md:w-64 rounded-lg"
      />
      <div className="flex justify-between p-1 text-sm md:text-base">
        <span>
          {theTitle.length > 18 ? theTitle.substring(0, 20) + "..." : theTitle}
        </span>{" "}
        <span>{Math.round(rate * 10)}%</span>
      </div>
    </Link>
  );
};

export default RecommendCard;
