import React from "react";
import { Link } from "react-router-dom";

const ActCard = ({
  poster_path: poster,
  title,
  name,
  character,
  episode_count,
  id,
  media_type: type,
}) => {
  return (
    <Link className="min-w-32" to={`/${type}/${id}`}>
      <img
        src={`https://media.themoviedb.org/t/p/w150_and_h225_bestv2${poster}`}
        alt={title}
        className="h-48 rounded-xl"
      />
      <div>
        <h6 className="font-semibold">{title || name}</h6>
        {character && (
          <p className="text-sm text-neutral-content">{character}</p>
        )}{" "}
        {episode_count && (
          <p className="text-xs font-light">({episode_count} episodes)</p>
        )}
      </div>
    </Link>
  );
};

export default ActCard;
