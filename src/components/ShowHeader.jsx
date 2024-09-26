import React from "react";
import { FaHeart, FaBookmark } from "react-icons/fa6";
import moment from "moment";
import RateSpan from "../components/RateSpan";
import { Link } from "react-router-dom";
import { useAppProvider } from "../context/appContext";
import RateModal from "./RateModal";
import ExternalLinks from "./ExternalLinks";

const ShowHeader = ({
  poster_path: poster,
  backdrop_path: backdrop,
  original_title,
  release_date: release,
  first_air_date,
  vote_average: rate,
  origin_country,
  tagline,
  runtime,
  overview,
  name,
  created_by,
  genres,
  trailer,
  id,
  type,
}) => {
  const {
    userLists,
    addToFavorite,
    addToWatchList,
    removeFromFavorite,
    removeFromWatchList,
    movieData,
  } = useAppProvider();
  const isRated = userLists?.[
    type === "movie" ? "ratedMovies" : "ratedTv"
  ]?.find((e) => e.id === id);
  const isFavorite = userLists?.[
    type === "movie" ? "favoriteMovies" : "favoriteTv"
  ]?.find((e) => e.id === id);
  const isListed = userLists?.[
    type === "movie" ? "watchlistMovies" : "watchlistTv"
  ]?.find((e) => e.id === id);
  const { externalIDs } = movieData;
  return (
    <article
      className="hero min-h-[60vh]  max-w-screen"
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop})`,
      }}
    >
      <div
        className="hero-overlay bg-opacity-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(52.5, 31.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 31.5, 10.5, 0.84) 50%, rgba(52.5, 31.5, 10.5, 0.84) 100%)`,
        }}
      ></div>
      <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="hidden md:block   m-auto col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`}
            className="hidden md:block max-h-[50vh]  mx-auto col-span-1 rounded-2xl"
          />
        </div>
        <div className="lg:col-span-2 text-primary-content px-4 md:px-0 py-12 md:py-24">
          <div className="mb-6">
            <h2 className="text-4xl font-bold">
              {original_title || name}{" "}
              <span className="text-neutral-content font-medium text-3xl">
                {" "}
                ({moment(release || first_air_date).format(`YYYY`)})
              </span>
            </h2>
            <p className="flex gap-x-2 m ">
              <span>
                {moment(release || first_air_date).format("l")}(
                {origin_country?.[0]})
              </span>
              <span>
                {genres?.map((e, ind) => {
                  return genres.length > ind + 1 ? `${e.name},` : e.name;
                })}
              </span>{" "}
              {runtime && (
                <span>
                  {(runtime / 60).toFixed(0)}h {""}
                  {runtime % 60}m
                </span>
              )}
            </p>
          </div>

          <div className="-mb-10 flex sm:-mb-10 md:mb-6">
            <div className="sm:py-6 md:py-0">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1 ">
                  <RateSpan rate={rate} size="4rem" text="text-xl" />
                  <h4 className="text-md font-semibold capitalize">
                    user
                    <br />
                    score
                  </h4>
                </div>
                {isRated ? (
                  <RateModal id={id} prevRating={isRated.rating} type={type} />
                ) : (
                  <RateModal id={id} type={type} />
                )}
              </div>
              <div className="flex gap-x-3 items-center  ">
                {isFavorite ? (
                  <div className="dropdown dropdown-hover">
                    <button
                      className="btn btn-circle text-red-700 "
                      tabIndex="0"
                      role="button"
                      onClick={() => removeFromFavorite(type, id)}
                    >
                      <FaHeart />
                    </button>

                    <p
                      tabIndex="0"
                      className="dropdown-content bg-base-100 rounded-box z-[1] w-fit text-nowrap capitalize p-2 shadow"
                    >
                      remove from favorite
                    </p>
                  </div>
                ) : (
                  <div className="dropdown dropdown-hover">
                    <button
                      className="btn btn-circle "
                      tabIndex="0"
                      role="button"
                      onClick={() => addToFavorite(type, id)}
                    >
                      <FaHeart />
                    </button>

                    <p
                      tabIndex="0"
                      className="dropdown-content bg-base-100 rounded-box z-[1] w-fit text-nowrap capitalize p-2 shadow"
                    >
                      mark as favorite
                    </p>
                  </div>
                )}

                {isListed ? (
                  <div className="dropdown dropdown-hover">
                    <button
                      className="btn btn-circle text-orange-600"
                      tabIndex="0"
                      role="button"
                      onClick={() => removeFromWatchList(type, id)}
                    >
                      <FaBookmark />
                    </button>
                    <p
                      tabIndex="0"
                      className="dropdown-content bg-base-100 rounded-box z-[1] w-fit text-nowrap capitalize p-2 shadow"
                    >
                      remove from watchlist
                    </p>
                  </div>
                ) : (
                  <div className="dropdown dropdown-hover">
                    <button
                      className="btn btn-circle"
                      tabIndex="0"
                      role="button"
                      onClick={() => addToWatchList(type, id)}
                    >
                      <FaBookmark />
                    </button>
                    <p
                      tabIndex="0"
                      className="dropdown-content bg-base-100 rounded-box z-[1] w-fit text-nowrap capitalize p-2 shadow"
                    >
                      add to watchlist
                    </p>
                  </div>
                )}
                <a
                  className="font-bold tracking-wide"
                  href="#"
                  onClick={() => {
                    window.open(
                      `/play/${trailer.key}`,
                      "myWindow",
                      "menubar=1,resizable=1,width=800,height=450"
                    );
                  }}
                >
                  Play Trailer
                </a>
              </div>
            </div>{" "}
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`}
              className="md:hidden max-h-[200px] sm:max-h-[250px]  m-auto col-span-1 rounded-2xl"
            />
          </div>

          <p className="block">{tagline}</p>
          <div className="mt-2">
            <h3 className="uppercase text-xl font-bold">overview</h3>
            <p className="leading-6  mr-2">{overview}</p>
          </div>
          <div className="flex gap-x-24 mt-8 mr-2 flex-wrap gap-y-12">
            {created_by?.map((p) => {
              const { name, id } = p;
              return (
                <div key={id}>
                  <Link
                    to={`/person/${id}`}
                    className="font-bold hover:text-neutral-content"
                  >
                    {name}
                  </Link>
                  <p>creator</p>
                </div>
              );
            })}
            <ExternalLinks {...externalIDs} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default ShowHeader;
