import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import FullCastCard from "./FullCastCard";
import { customFetch } from "../utils";
import RateBadge from "./RateBadge";

const EpisodeContainer = ({
  air_date,
  episode_number,
  name,
  overview,
  runtime,
  season_number,
  show_id,
  still_path,
  vote_average: rating,
  crew,
  guest_stars,
}) => {
  const [expand, setExpand] = useState(false);
  const [images, setImages] = useState([]);
  const directors = crew.filter((e) => e.job === "Director");
  const writers = crew.filter((e) => e.job === "Writer");

  const getImages = async () => {
    const resp = await customFetch(
      `/tv/${show_id}/season/${season_number}/episode/${episode_number}/images`
    );
    setImages(resp.data.stills);
  };
  useEffect(() => {
    getImages();
  }, []);
  return (
    <main className="rounded-xl border mb-2">
      <article className="bordered  grid grid-cols-5 md:grid-cols-4 border-b last:border-b-0 py-4 px-2">
        <div className="hidden sm:block sm:col-span-2 md:col-span-1">
          <img
            src={`https://media.themoviedb.org/t/p/w227_and_h127_bestv2${still_path}`}
            alt={name}
            className="h-auto w-56 rounded-lg ml-auto mr-8"
          />
        </div>
        <div className="col-span-5 sm:col-span-3 md:col-span-3 flex flex-col justify-center ml-8">
          <div
            className="font-semibold text-xl mb-1 flex gap-x-2 hover:text-neutral-content cursor-pointer"
            onClick={() => setExpand(true)}
          >
            <span> {episode_number})</span>
            <span> {name}</span>
          </div>
          <div className="flex mb-2">
            {rating !== 0 && <RateBadge rating={rating} />}
            <p className="flex gap-x-3 text-neutral-content">
              <span className=""> {moment(air_date).format("ll")}</span>{" "}
              <span>
                {parseInt(runtime / 60)}h {runtime % 60}m
              </span>
            </p>
          </div>
          <p className="text-sm mt-2">{overview}</p>
        </div>
      </article>
      {expand && (
        <article>
          <div className="grid grid-cols-3">
            <div className="sm:col-span-1 hidden sm:block sm:text-sm p-4">
              <h4 className="font-semibold text-base mb-2 ">
                Crew <span className="font-light">{crew.length}</span>{" "}
              </h4>
              <p>
                <span className="font-bold"> Directed by:</span>
                {directors.map((e) => (
                  <Link
                    to={`/person/${e.id}`}
                    key={e.id}
                    className="inline-block ml-1 hover:text-neutral-content cursor-pointer"
                  >
                    {e.name}
                  </Link>
                ))}
              </p>
              <p>
                <span className="font-bold"> Written by: </span>
                {writers.map((e, ind) => {
                  return (
                    <React.Fragment key={e.id + ind}>
                      <Link
                        to={`/person/${e.id}`}
                        className="inline-block ml-1 hover:text-neutral-content cursor-pointer"
                      >
                        {e.name}
                      </Link>
                      {writers.length > ind + 1 ? "," : ""}{" "}
                    </React.Fragment>
                  );
                })}
              </p>
            </div>
            <div className="col-span-3  sm:col-span-2 p-4">
              <h4 className="font-semibold mb-4">
                Guest Stars{" "}
                <span className="font-light">{guest_stars.length}</span>
              </h4>
              <div className="grid grid-cols-2 gap-y-2 ">
                {guest_stars.map((star) => (
                  <FullCastCard key={star.id} {...star} />
                ))}
              </div>
            </div>
          </div>
          {images && (
            <div className=" border-t px-6 py-4">
              <h5 className="">
                Episode Images{" "}
                <span className="text-neutral-content">{images?.length}</span>{" "}
              </h5>
              <div className="flex gap-x-2 py-2  overflow-x-scroll ">
                {images?.map((img) => (
                  <a
                    key={img.file_path}
                    className="min-h-max min-w-max"
                    href={`https://image.tmdb.org/t/p/original${img.file_path}`}
                    target="_blank"
                  >
                    <img
                      src={`https://media.themoviedb.org/t/p/w160_and_h90_bestv2${img.file_path}`}
                      key={img.file_path}
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
      )}
      <div className="flex justify-center">
        <button
          className="btn btn-sm btn-circle btn-ghost"
          onClick={() => setExpand(!expand)}
        >
          {expand ? <FaAnglesUp /> : <FaAnglesDown />}
        </button>
      </div>
    </main>
  );
};

export default EpisodeContainer;
