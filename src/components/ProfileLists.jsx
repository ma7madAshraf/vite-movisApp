import React, { useState } from "react";
import ProfileListsContainer from "./ProfileListsContainer";

const ProfileLists = ({ target }) => {
  const typesArray = ["favorite", "watchlist", "rated"];
  const [type, setType] = useState(target || "favorite");
  const [subtype, setSubtype] = useState("Movies");
  return (
    <section>
      <div className="flex justify-center mt-6">
        <ul className="menu menu-horizontal bg-base-200 rounded-box p-0 ">
          {typesArray.map((oneType) => {
            return (
              <li key={oneType}>
                <div className="dropdown dropdown-hover p-0 ">
                  <div
                    tabIndex={0}
                    role="button"
                    className={`btn w-28 sm:w-40 md:w-52 text-lg sm:text-xl capitalize px-2 py-1 ${
                      oneType === type && "btn-active"
                    }`}
                  >
                    {oneType}
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content top-12 -left-3 menu bg-base-100 rounded-box z-[1] w-36 sm:w-40 md:w-52  shadow"
                  >
                    <li>
                      <a
                        onClick={() => {
                          setType(oneType);
                          setSubtype("Movies");
                        }}
                      >
                        Movies
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setType(oneType);
                          setSubtype("Tv");
                        }}
                      >
                        Tv
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ProfileListsContainer listType={type} subtype={subtype} />{" "}
    </section>
  );
};

export default ProfileLists;
