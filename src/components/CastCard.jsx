import React from "react";
import { Link } from "react-router-dom";

const CastCard = ({
  profile_path: profile,
  name,
  character,
  id,
  roles,
  total_episode_count,
}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-2xl">
      <Link to={`/person/${id}`}>
        <figure className="h-[175px] w-[135px]">
          <img
            src={`https://media.themoviedb.org/t/p/w138_and_h175_face/${profile}`}
            alt="Shoes"
          />
        </figure>
      </Link>
      <div className="card-body p-2">
        <Link
          to={`/person/${id}`}
          className="font-bold text-sm text-wrap hover:text-neutral-content"
        >
          {name}
        </Link>
        <p className=" text-sm text-wrap mb-0">
          {character ||
            roles
              .slice(0, 3)
              .map((role, ind) =>
                ind !== 0 ? ` / ${role.character}` : role.character
              )}
          {total_episode_count && (
            <span className="block text-neutral-content font-light text-xs mt-0">
              {total_episode_count}{" "}
              {total_episode_count > 1 ? "Episodes" : "Episode"}{" "}
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CastCard;
