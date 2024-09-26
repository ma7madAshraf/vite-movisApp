import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import RateSpan from "./RateSpan";
import imgErr from "../assets/imgError.jpg";

const BigCard = ({
  id,
  poster_path: poster,
  release_date,
  title,
  name,
  vote_average: rating,
  media_type,
  profile_path,
  type,
  searchType,
}) => {
  return (
    <div className="card bg-base-300 w-44 shadow-xl h-full">
      <figure className="h-fit min-h-64 w-44 bg-white">
        <Link to={`/${type || media_type || searchType || "person"}/${id}`}>
          <img
            src={
              poster
                ? `https://media.themoviedb.org/t/p/w220_and_h330_face${poster}`
                : profile_path
                ? `https://media.themoviedb.org/t/p/w220_and_h330_face${profile_path}`
                : imgErr
            }
            alt=""
          />{" "}
        </Link>
      </figure>
      <div className="p-3 relative">
        {" "}
        {rating > 0 && (
          <div className="absolute -top-5 left-0">
            <RateSpan rate={rating} size="2rem" text="text-xs" />
          </div>
        )}
        <Link
          to={`/${type || media_type || "person"}/${id}`}
          className="font-semibold cursor-pointer hover:text-neutral-content"
        >
          {title || name}
        </Link>
        <p className="text-sm text-neutral-content">
          {moment(release_date).format("ll")}
        </p>
      </div>
    </div>
  );
};

export default BigCard;
