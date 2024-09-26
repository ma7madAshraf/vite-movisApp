import moment from "moment";
import React from "react";
import {
  Link,
  useLoaderData,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  FaAngleLeft,
  FaArrowRightLong,
  FaArrowLeftLong,
} from "react-icons/fa6";
import EpisodeContainer from "../components/EpisodeContainer";
import { customFetch } from "../utils";
export const loader = async ({ params }) => {
  const { id, season } = params;
  const resp = await customFetch(`/tv/${id}/season/${season}?language=en-US`);
  return resp.data;
};

const TvSeason = () => {
  const { id, type } = useParams();
  const { mainData } = useOutletContext();
  const tvSeason = useLoaderData();
  const { poster_path: poster, name, air_date, episodes } = tvSeason;
  const { seasons } = mainData;

  const shownSeason = seasons.find((e) => e.name === name);
  const prevSeason = seasons[seasons.indexOf(shownSeason) - 1];

  const nextSeason = seasons[seasons.indexOf(shownSeason) + 1];

  return (
    <main>
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
            <h3 className="text-3xl font-bold text-neutral">
              {name}{" "}
              <span className="text-neutral-content font-medium">
                {" "}
                ({moment(air_date).format(`YYYY`)})
              </span>
            </h3>
            <Link
              to={`/tv/${id}/seasons`}
              className="flex items-center capitalize font-semibold"
            >
              <FaAngleLeft />
              back to seasons list
            </Link>
          </div>
        </div>
        <div className="flex justify-between px-12 py-2 border-b">
          {prevSeason?.name && (
            <Link
              to={`/${type}/${id}/season/${prevSeason.season_number}`}
              className="flex items-center gap-x-2 hover:text-neutral-content cursor-pointer"
            >
              <FaArrowLeftLong className="mt-1" />
              {prevSeason.name}
            </Link>
          )}
          {nextSeason?.name && (
            <Link
              to={`/${type}/${id}/season/${nextSeason.season_number}`}
              className="flex items-center gap-x-2 hover:text-neutral-content cursor-pointer ml-auto "
            >
              {nextSeason.name}
              <FaArrowRightLong className="mt-1 " />
            </Link>
          )}
        </div>
      </section>

      <section className="p-12">
        <h3 className="font-semibold text-lg mb-4">
          Episodes{" "}
          <span className="text-neutral-content">{episodes.length}</span>{" "}
        </h3>
        {episodes.map((epi) => (
          <EpisodeContainer key={epi.id} {...epi} />
        ))}
      </section>
    </main>
  );
};

export default TvSeason;
