import React, { useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const Backdrops = ({ data }) => {
  const [short, setShort] = useState(true);
  const images = short
    ? data.slice(0, 8)
    : data.length > 12
    ? data.slice(0, 12)
    : data.slice(0, data.length);
  return (
    <div className="flex max-w-full items-center">
      {images.map((item) => {
        return (
          <a
            key={item.file_path}
            className="min-h-max min-w-max"
            href={`https://image.tmdb.org/t/p/original${item.file_path}`}
            target="_blank"
          >
            <img
              src={`https://media.themoviedb.org/t/p/w533_and_h300_bestv2${item.file_path}`}
              className="h-36 w-[250px] md:h-72 md:min-w-[500px]"
            />
          </a>
        );
      })}
      <button
        className="btn  text-xl ml-2  capitalize "
        onClick={() => setShort(!short)}
      >
        {short ? (
          <>
            see more <FaArrowRightLong className="mt-2" />
          </>
        ) : (
          <>
            see less <FaArrowLeftLong className="mt-2" />
          </>
        )}
      </button>
    </div>
  );
};

export default Backdrops;
