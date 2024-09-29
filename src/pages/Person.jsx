import React, { useState } from "react";
import moment from "moment";
import ActCard from "../components/ActCard";
import { useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import ExternalLinks from "../components/ExternalLinks";
const personQuery = (id) => {
  return {
    queryKey: ["landingQuery", id],
    queryFn: async () => {
      const [main, casting, externalIDs] = await Promise.allSettled([
        customFetch(`/person/${id}?language=en-US`),
        customFetch(`/person/${id}/combined_credits?language=en-US`),
        customFetch(`/person/${id}/external_ids`),
      ]);
      const allData = {
        personData: main.value.data,
        personData2: casting.value.data,
        externalIDs: externalIDs.value.data,
      };
      return allData;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    const resp = await queryClient.ensureQueryData(personQuery(id));

    return resp;
  };
const Person = () => {
  const { personData, personData2, externalIDs } = useLoaderData();
  const {
    also_known_as,
    biography,
    birthday,
    deathday,
    gender,
    homepage,
    id,
    imdb_id,
    known_for_department,
    name,
    place_of_birth,
    popularity,
    profile_path,
  } = personData;
  const [type, setType] = useState("all");
  const [shorten, setShorten] = useState(true);
  return (
    <main className="my-align">
      <div className=" grid grid-cols-7">
        <div className="side col-span-2 text-sm sm:text-base">
          <img
            src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
            alt={name}
            className="rounded-xl"
          />
          {externalIDs && (
            <div className="mt-4">
              <ExternalLinks {...externalIDs} type="name" />
            </div>
          )}
          <div className="mt-4">
            <h5 className="font-semibold text-md capitalize ">Known for</h5>
            <p className="text-md text-neutral-content text-sm sm:text-base">
              {known_for_department}
            </p>
          </div>
          <div className="mt-2">
            <h5 className="font-semibold text-md capitalize">gender</h5>
            <p className="text-md text-neutral-content">
              {gender === 0
                ? "Not set"
                : gender === 1
                ? "Female"
                : gender === 2
                ? "Male"
                : "Non-binary"}
            </p>
          </div>
          <div className="mt-2">
            <h5 className="font-semibold text-md capitalize">birthday</h5>
            {birthday ? (
              <p className="text-md text-neutral-content">
                {moment(birthday).format("MMM Do YYYY")}

                {!deathday && (
                  <span className="ml-1">
                    (
                    {moment(birthday, "YYYYMMDD")
                      .fromNow()
                      .replace("ago", "old")}
                    )
                  </span>
                )}
              </p>
            ) : (
              <p>unknown</p>
            )}
          </div>
          <div className="mt-2">
            <h5 className="font-semibold text-md capitalize">Place of birth</h5>
            <p className="text-md text-neutral-content">
              {place_of_birth || "unknown"}
            </p>
          </div>
          {deathday && (
            <div className="mt-2">
              <h5 className="font-semibold text-md capitalize">deathday</h5>
              <p className="text-md text-neutral-content">
                {`${moment(deathday).format("MMM Do YYYY")} (${moment(deathday)
                  .from(moment(birthday))
                  .replace("in", "")})`}
              </p>
            </div>
          )}
        </div>
        {/* main */}
        <div className="main px-4 col-span-5">
          <h2 className="text-4xl font-bold">{name}</h2>
          <div className="mt-2">
            <h5 className="font-semibold text-xl capitalize mb-2">Biography</h5>
            <p
              className="text-xs sm:text-sm md:text-base lg:leading-7 text-neutral-content cursor-pointer"
              onClick={() => setShorten(!shorten)}
            >
              {shorten
                ? ` ${biography.substring(0, 600)}...See More`
                : biography}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="font-semibold text-lg sm:text-xl capitalize w-fit">
            Filmography
          </h5>
          <select
            className="select w-fit font-semibold"
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="all" selected>
              All
            </option>
            <option value="movie">Movie</option>
            <option value="tv">Tv</option>
          </select>
        </div>
        <div className="flex gap-4 overflow-x-scroll">
          {type === "all"
            ? personData2?.cast?.map((act, ind) => (
                <ActCard key={act.id + ind} {...act} />
              ))
            : personData2?.cast
                ?.filter((e) => e["media_type"] === type)
                .map((act, ind) => <ActCard key={act.id + ind} {...act} />)}
          {type === "all"
            ? personData2?.crew?.map((act, ind) => (
                <ActCard key={act.id + ind} {...act} />
              ))
            : personData2?.crew
                ?.filter((e) => e["media_type"] === type)
                .map((act, ind) => <ActCard key={act.id + ind} {...act} />)}
        </div>
      </div>
    </main>
  );
};

export default Person;
