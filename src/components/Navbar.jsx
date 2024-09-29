import React from "react";
import ThemeController from "./ThemeController";
import { Link } from "react-router-dom";
import { TbLogout, TbLogin2 } from "react-icons/tb";
import { useAppProvider } from "../context/appContext";
const Navbar = () => {
  const { user, handleLogout } = useAppProvider();
  return (
    <div className="navbar px-0 bg-base-300">
      <div className="px-4 sm:px-8 w-full flex justify-between ">
        <div className="">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link>Movies</Link>
                <ul className="p-2">
                  <li>
                    <Link to={`/tm/movie/popular`}>popular</Link>
                  </li>
                  <li>
                    <Link to={`/tm/movie/now_playing`}>now Playing</Link>
                  </li>
                  <li>
                    <Link to={`/tm/movie/upcoming`}>upcoming</Link>
                  </li>
                  <li>
                    <Link to={`/tm/movie/top_rated`}>top rated</Link>
                  </li>
                </ul>
              </li>
              <li className="">
                <Link>TV Shows</Link>
                <ul className="p-2">
                  <li>
                    <Link to={`/tm/tv/popular`}>popular</Link>
                  </li>
                  <li>
                    <Link to={`/tm/tv/airing_today`}>Airing today</Link>
                  </li>
                  <li>
                    <Link to={`/tm/tv/on_the_air`}>on TV</Link>
                  </li>
                  <li>
                    <Link to={`/tm/tv/top_rated`}>top rated</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link className="hidden  sm:inline-flex btn btn-secondary text-xl text-slate-800 font-bold ">
            MoviesApp
          </Link>
        </div>
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1 font-bold">
                Movies
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 capitalize font-s p-2 shadow"
              >
                <li>
                  <Link to={`/tm/movie/popular`}>popular</Link>
                </li>
                <li>
                  <Link to={`/tm/movie/now_playing`}>now Playing</Link>
                </li>
                <li>
                  <Link to={`/tm/movie/upcoming`}>upcoming</Link>
                </li>
                <li>
                  <Link to={`/tm/movie/top_rated`}>top rated</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover">
              <div tabIndex={0} role="button" className="btn m-1 font-bold">
                TV Shows
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 capitalize font-s p-2 shadow"
              >
                <li>
                  <Link to={`/tm/tv/popular`}>popular</Link>
                </li>
                <li>
                  <Link to={`/tm/tv/airing_today`}>Airing today</Link>
                </li>
                <li>
                  <Link to={`/tm/tv/on_the_air`}>on TV</Link>
                </li>
                <li>
                  <Link to={`/tm/tv/top_rated`}>top rated</Link>
                </li>
              </ul>
            </div>
          </ul>
        </div>
        <div className="">
          {/* <ThemeController /> */}
          {user && (
            <div className="dropdown dropdown-end  ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost  btn-circle avatar placeholder"
              >
                <div className="bg-secondary text-neutral-content w-12 rounded-full flex justify-center items-center">
                  <span className="capitalize font-bold text-lg text-neutral">
                    {user.username[0]}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-2"
              >
                <li className="border-b pb-2">
                  <Link
                    to="/profile"
                    className="text-lg flex flex-col items-start font-semibold gap-0"
                  >
                    {user.username}
                    <span className="text-xs block font-normal">
                      view Profile
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/profile" state={{ target: "favorite" }}>
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/profile" state={{ target: "watchlist" }}>
                    Watchlist
                  </Link>
                </li>
                <li>
                  <Link to="/profile" state={{ target: "rated" }}>
                    Ratings
                  </Link>
                </li>
                <li className="border-t pt-2">
                  <a onClick={handleLogout}>
                    Logout <TbLogout />
                  </a>
                </li>
              </ul>
            </div>
          )}
          {!user && (
            <Link to="/login" className="btn ml-2 ">
              Login <TbLogin2 className="text-lg" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
