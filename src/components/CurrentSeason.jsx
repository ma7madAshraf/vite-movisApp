import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import RateBadge from "./RateBadge";

const CurrentSeason = ({ season, nextEpisode, lastEpisode, showID }) => {
  const {
    air_date,
    episode_count,
    name,
    overview,
    poster_path,
    season_number,
    vote_average,
  } = season;

  return (
    <article className="bordered rounded-lg bg-base-300 p-2 ">
      <div className="grid grid-cols-5  ">
        <div className="col-span-1 flex justify-center items-center ">
          <img
            src={`https://media.themoviedb.org/t/p/w130_and_h195_bestv2${poster_path}`}
            alt=""
            className="rounded-lg"
          />
        </div>
        <div className="col-span-4 pl-4 pr-2 md:pr-4">
          <Link to={`/tv/${showID}/season/${season_number}`}>
            <h3 className="font-semibold text-xl">{name}</h3>
          </Link>
          <div className="flex mt-2">
            <RateBadge rating={vote_average} />
            <p className="flex gap-x-2">
              <span className="font-semibold">{air_date.substring(0, 4)}</span>
              <span>({episode_count} Episodes)</span>
            </p>
          </div>
          <p className="">
            {overview.length > 200
              ? overview.substring(0, 200) + "..."
              : overview}
          </p>
        </div>
      </div>

      <div className=" w-full flex flex-col md:flex-row justify-between">
        {" "}
        {lastEpisode && (
          <div className="mt-4 flex gap-x-3">
            <h6 className="font-semibold">Last Episode: </h6>
            <p>
              <Link
                to={`/tv/${lastEpisode.show_id}/season/${season_number}`}
                className="link"
              >
                {lastEpisode.name}
              </Link>{" "}
              ({moment(lastEpisode.air_date).format("ll")})
            </p>
          </div>
        )}
        {nextEpisode && (
          <div className="mt-4 flex gap-x-3">
            <h6 className="font-semibold">Next Episode: </h6>
            <p>
              <Link
                to={`/tv/${nextEpisode.show_id}/season/${season_number}`}
                className="link"
              >
                {nextEpisode.name}
              </Link>{" "}
              ({moment(nextEpisode.air_date).format("ll")})
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default CurrentSeason;
