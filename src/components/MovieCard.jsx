import React from "react";
import RateSpan from "./RateSpan";
import moment from "moment";
import { Link } from "react-router-dom";

const MovieCard = ({
  poster_path: poster,
  original_title: title,
  release_date: release,
  vote_average: rate,
  media_type,
  type,
  name,
  id,
}) => {
  return (
    <article className="min-w-[150px]">
      <div className="relative  w-fit h-fit ">
        <div className="rounded-3xl overflow-hidden">
          <Link to={`/${type || media_type}/${id}`} className=" cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster}`}
              alt={title || name}
              className="w-[150px] "
            />
          </Link>
        </div>
        <div className="absolute  -translate-y-1/2">
          <RateSpan rate={rate} size="2rem" text="text-xs" />
        </div>
      </div>
      <div className="mt-4 text-sm">
        <Link
          to={`/${type || media_type}/${id}`}
          className="font-bold hover:text-primary cursor-pointer"
        >
          {title || name}
        </Link>
        {release && <p>{moment(release).format("ll")}</p>}
      </div>
    </article>
  );
};

export default MovieCard;
