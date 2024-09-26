import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
const VideosContainer = ({ data }) => {
  return (
    <div className="flex max-w-full">
      {data.map((item) => {
        return (
          <div key={item.key} className="relative">
            <FaCirclePlay
              className="absolute text-6xl cursor-pointer hover:text-secondary-content top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              onClick={() => {
                window.open(
                  `https://mov-movies.netlify.app/play/${item.key}`,
                  "myWindow",
                  "menubar=1,resizable=1,width=800,height=450"
                );
              }}
            />
            <img
              src={`https://i3.ytimg.com/vi/${item.key}/maxresdefault.jpg`}
              alt=""
              className="h-36 min-w-[250px] md:h-72 md:min-w-[500px]"
            />
          </div>
        );
      })}
    </div>
  );
};

export default VideosContainer;
