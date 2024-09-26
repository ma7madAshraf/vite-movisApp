import moment from "moment";
import React, { useState } from "react";
import RateBadge from "./RateBadge";

const ReviewsContainer = ({
  author,
  author_details: details,
  content,
  created_at,
}) => {
  const [short, setShort] = useState(true);
  const { rating } = details || 0;

  return (
    <article className="rounded-btn shadow-2xl p-4 shadow-black ">
      <div className="flex">
        <div className="bg-accent text-neutral w-12 h-12  rounded-full flex items-center justify-center">
          <span className="font-bold ">{author[0]}</span>
        </div>
        <div className="ml-4">
          <h4 className="font-semibold capitalize mb-2">
            a review by {author}
          </h4>
          <h6 className="text-xs">
            {rating && <RateBadge rating={rating} />}
            written by {author} on {moment(created_at).format("LL")}
          </h6>
        </div>
      </div>
      <p className="mt-4 p-2 leading-6">
        {content.length < 600
          ? content
          : short
          ? `${content.substring(0, 600)}  ...`
          : content}
        {content.length > 600 && (
          <button
            className="link capitalize ml-4"
            onClick={() => setShort(!short)}
          >
            {short ? `see more` : `see less`}
          </button>
        )}
      </p>
    </article>
  );
};

export default ReviewsContainer;
