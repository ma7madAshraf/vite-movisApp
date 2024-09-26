import moment from "moment";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useOutletContext } from "react-router-dom";
import SeasonContainer from "../components/SeasonContainer";

const TvSeasons = () => {
  const { mainData } = useOutletContext();
  const {
    poster_path: poster,
    name,
    release_date: release,
    id,
    seasons,
  } = mainData;
  return (
    <main>
      {" "}
      <div
        className="w-[100vw] h-28  flex items-center p-12"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(52.5, 31.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 31.5, 10.5, 0.84) 50%, rgba(52.5, 31.5, 10.5, 0.84) 100%)`,
        }}
      >
        <img
          src={`https://media.themoviedb.org/t/p/w58_and_h87_face${poster}`}
          alt=""
          className="rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-3xl font-bold text-neutral">
            {name}{" "}
            <span className="text-neutral-content font-medium">
              {" "}
              ({moment(release).format(`YYYY`)})
            </span>
          </h3>
          <Link
            to={`/tv/${id}`}
            className="flex items-center capitalize font-semibold"
          >
            <FaAngleLeft />
            back to main
          </Link>
        </div>
      </div>
      <section>
        {seasons.map((season) => (
          <SeasonContainer key={season.id} {...season} />
        ))}
      </section>
    </main>
  );
};

export default TvSeasons;
