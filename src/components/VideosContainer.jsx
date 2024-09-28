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
              onClick={() =>
                document.getElementById(`my_modal_${item?.key}`).showModal()
              }
            />
            <dialog id={`my_modal_${item?.key}`} className="modal ">
              <div className="modal-box p-0 w-11/12 max-w-5xl aspect-video flex justify-center items-center">
                <iframe
                  id="vid"
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${item?.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
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
