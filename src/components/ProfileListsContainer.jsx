import React, { useState } from "react";
import { useAppProvider } from "../context/appContext";
import ProfileShowsCard from "./ProfileShowsCard";

const ProfileListsContainer = ({ listType, subtype }) => {
  const { userLists } = useAppProvider();
  const targetList = listType + subtype;
  const theList = userLists[targetList];
  const [listSize, setListSize] = useState(10);
  return (
    <section className="mt-8 px-8">
      <h2 className=" capitalize text-2xl font-semibold mb-8">
        {`${listType} ${subtype === "Movies" ? subtype : "TV Shows"}`}{" "}
        <span className="text-base text-neutral-content">
          ( {theList.length} )
        </span>
      </h2>
      <div className="flex flex-col gap-y-5 ">
        {theList?.slice(0, listSize).map((ele) => {
          return <ProfileShowsCard key={ele.id} {...ele} subtype={subtype} />;
        })}
      </div>
      {theList.length > 10 &&
        (theList.length > listSize ? (
          <button
            className=" btn btn-wide text-xl capitalize btn-primary mx-auto mt-4 mb-12 block "
            onClick={() =>
              setListSize(
                listSize + 10 >= theList.length ? theList.length : listSize + 10
              )
            }
          >
            show more
          </button>
        ) : (
          <button
            className=" btn btn-wide text-xl capitalize btn-primary mx-auto mt-4 mb-12 block"
            onClick={() => setListSize(10)}
          >
            show less
          </button>
        ))}
    </section>
  );
};

export default ProfileListsContainer;
