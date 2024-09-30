import React from "react";
import RateSpan from "./RateSpan";
import RateModal from "./RateModal";
import moment from "moment";
import { FaHeart, FaBookmark } from "react-icons/fa6";
import { useAppProvider } from "../context/appContext";
import { Link } from "react-router-dom";

const ProfileShowsCard = ({
  id,
  overview,
  poster_path: poster,
  release_date,
  title,
  name,
  vote_average,
  subtype,
}) => {
  const {
    addToFavorite,
    addToWatchList,
    removeFromFavorite,
    removeFromWatchList,
    userLists,
  } = useAppProvider();
  const isRated = userLists?.[
    subtype === "Movies" ? "ratedMovies" : "ratedTv"
  ]?.find((e) => e.id === id);
  const isFavorite = userLists?.[
    subtype === "Movies" ? "favoriteMovies" : "favoriteTv"
  ]?.find((e) => e.id === id);
  const isListed = userLists?.[
    subtype === "Movies" ? "watchlistMovies" : "watchlistTv"
  ]?.find((e) => e.id === id);
  return (
    <article className=" max-h-52 rounded-lg border overflow-hidden flex shadow-neutral-content shadow-sm">
      <img
        src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${poster}`}
        alt=""
        className=" w-24 sm:w-32 sm:h-52 "
        to={`/${subtype.toLowerCase().replace("s", "")}/${id}`}
      />
      <div className="flex flex-col justify-around sm:justify-between py-2 ml-4 pr-2">
        <div className="flex flex-col sm:flex-row-reverse  justify-between sm:justify-end gap-2">
          <div className="flex flex-col">
            <Link to={`/${subtype.toLowerCase().replace("s", "")}/${id}`}>
              <h3 className="font-semibold text-base sm:text-lg hover:text-neutral-content cursor-pointer">
                {title || name}
              </h3>
            </Link>
            <p className="text-neutral-content text-sm">
              {moment(release_date).format("ll")}
            </p>
          </div>{" "}
          <div className="hidden sm:inline-block">
            <RateSpan rate={vote_average} size="3rem" text="text-sm" />
          </div>
          {/* <div className="sm:hidden flex justify-start items-center gap-x-1">
            <RateSpan rate={vote_average} size="2rem" text="text-sm" />
            <h5>Users Rate</h5>
          </div> */}
        </div>
        <p className="text-xs  md:text-sm hidden sm:inline-block">
          {overview.length > 200
            ? overview.substring(0, 200) + "..."
            : overview}
        </p>
        <div className="flex sm:gap-x-3 md:gap-x-5 items-center  justify-between sm:justify-start ">
          {isRated ? (
            <RateModal
              id={id}
              prevRating={isRated.rating}
              type={subtype === "Movies" ? "movie" : "tv"}
              view="card"
            />
          ) : (
            <div>
              <RateModal
                id={id}
                type={subtype === "Movies" ? "movie" : "tv"}
                view="card"
              />
            </div>
          )}
          <div>
            {isFavorite ? (
              <button
                className="btn btn-circle btn-sm text-red-600 mr-2 "
                onClick={() =>
                  removeFromFavorite(subtype === "Movies" ? "movie" : "tv", id)
                }
              >
                <FaHeart />
              </button>
            ) : (
              <button
                className="btn btn-circle btn-sm mr-2 "
                onClick={() =>
                  addToFavorite(subtype === "Movies" ? "movie" : "tv", id)
                }
              >
                <FaHeart />
              </button>
            )}
            <span className="text-neutral-content hidden sm:inline-block">
              Favorite
            </span>
          </div>
          <div>
            {isListed ? (
              <button
                className="btn btn-circle btn-sm mr-2 text-orange-600"
                onClick={() =>
                  removeFromWatchList(subtype === "Movies" ? "movie" : "tv", id)
                }
              >
                <FaBookmark />
              </button>
            ) : (
              <button
                className="btn btn-circle btn-sm mr-2"
                onClick={() =>
                  addToWatchList(subtype === "Movies" ? "movie" : "tv", id)
                }
              >
                <FaBookmark />
              </button>
            )}

            <span className="text-neutral-content hidden sm:inline-block">
              WatchList
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileShowsCard;
