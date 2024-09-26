import React from "react";
import { Link } from "react-router-dom";

const FullCastCard = ({
  profile_path: profile,
  name,
  id,
  character,
  job,
  roles,
  jobs,
  gender,
}) => {
  const movieJob = character || job;
  const tvJob = roles || jobs;
  return (
    <Link to={`/person/${id}`} className="flex gap-2 ">
      <img
        src={
          profile
            ? `https://media.themoviedb.org/t/p/w138_and_h175_face/${profile}`
            : gender === 2
            ? `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg`
            : `https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-36-user-female-grey-d9222f16ec16a33ed5e2c9bbdca07a4c48db14008bbebbabced8f8ed1fa2ad59.svg`
        }
        alt="No img"
        className="h-16 w-14 rounded-xl text-sm text-center "
      />
      <div className=" p-2">
        <h2 className="font-bold text-sm text-wrap">{name}</h2>
        <p className=" text-sm text-wrap">
          {movieJob ||
            tvJob?.map((role, ind) => {
              const job = role.character || role.job;
              return ind !== 0
                ? ` , ${job} (${role.episode_count} ${
                    role.episode_count > 1 ? `Episodes` : `episode`
                  })`
                : `  ${job} (${role.episode_count} ${
                    role.episode_count > 1 ? `Episodes` : `episode`
                  })`;
            })}
        </p>
      </div>
    </Link>
  );
};

export default FullCastCard;
