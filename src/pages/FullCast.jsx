import moment from "moment";
import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import FullCastCard from "../components/FullCastCard";
import { useAppProvider } from "../context/appContext";

const FullCast = () => {
  const { id, type } = useParams();
  const { movieData } = useAppProvider();
  const { mainData, creditsData } = movieData;
  const {
    poster_path: poster,
    original_title: title,
    name,
    release_date: release,
  } = mainData;
  const { cast, crew } = creditsData;
  return (
    <section>
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
          <h3 className="text-xl md:text-3xl font-bold text-neutral">
            {title || name}{" "}
            <span className="text-neutral-content font-medium">
              {" "}
              ({moment(release).format(`YYYY`)})
            </span>
          </h3>
          <Link
            to={`/${type}/${id}`}
            className="flex items-center capitalize font-semibold text-sm md:text-base"
          >
            <FaAngleLeft />
            back to main
          </Link>
        </div>
      </div>
      <article className="my-align grid grid-cols-1 md:grid-cols-2 mt-12">
        <div className="col-span-1">
          <h4 className="font-semibold text-lg capitalize mb-4">
            cast <span className="font-light">({cast.length})</span>
          </h4>
          <div className="grid gap-y-4">
            {cast.map((person) => (
              <FullCastCard key={person.id} {...person} />
            ))}
          </div>
        </div>
        <div className="col-span-1">
          {" "}
          <h4 className="font-semibold text-lg capitalize mb-4">
            crew<span className="font-light">({crew.length})</span>
          </h4>
          <div className="grid gap-y-4">
            {crew.map((person) => (
              <FullCastCard
                key={person.id + person.department + person.job}
                {...person}
              />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default FullCast;
