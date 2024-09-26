import React from "react";
import VideosContainer from "./VideosContainer";
import Backdrops from "./Backdrops";
import Posters from "./Posters";

const MediaContainer = ({ videos, images, url }) => {
  return (
    <section className="w-full">
      <div role="tablist" className="tabs tabs-bordered ">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-nowrap"
          aria-label={`Videos (${videos.length}) `}
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10 overflow-x-scroll">
          <VideosContainer data={videos} />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab  text-nowrap"
          aria-label={`Backdrops {${images?.backdrops?.length})`}
        />
        <div role="tabpanel" className="tab-content p-10 overflow-x-scroll">
          <Backdrops data={images.backdrops} url={url} />
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab text-nowrap"
          aria-label={`Posters {${images?.posters?.length})`}
        />
        <div role="tabpanel" className="tab-content p-10 overflow-x-scroll">
          <Posters data={images.posters} />
        </div>
      </div>
    </section>
  );
};

export default MediaContainer;
