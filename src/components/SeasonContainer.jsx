import moment from "moment";
import React from "react";
import { Link, useParams } from "react-router-dom";
import RateBadge from "./RateBadge";

const SeasonContainer = ({
  air_date,
  episode_count,
  name,
  overview,
  poster_path,
  season_number,
  vote_average: rating,
}) => {
  const { id, type } = useParams();
  return (
    <article className="bordered  grid grid-cols-5 border-b last:border-b-0 py-4 px-2">
      <div className="col-span-1">
        <img
          src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${poster_path}`}
          alt={name}
          className="h-36 w-24 rounded-lg ml-auto mr-8"
        />
      </div>
      <div className="col-span-4 flex flex-col justify-center">
        <Link
          to={`/${type}/${id}/season/${season_number}`}
          className="font-semibold text-xl mb-1 hover:text-neutral-content cursor-pointer"
        >
          {name}
        </Link>
        <div className="flex mb-2">
          {rating !== 0 && <RateBadge rating={rating} />}
          <p className="flex gap-x-2">
            <span className="font-semibold">{air_date.substring(0, 4)}</span>
            <span>({episode_count} Episodes)</span>
          </p>
        </div>
        <p className="mb-4 text-sm">
          Season {season_number} of The Lord of the Rings: The Rings of Power
          premiered on {moment(air_date).format("ll")}.
        </p>
      </div>
    </article>
  );
};

export default SeasonContainer;
