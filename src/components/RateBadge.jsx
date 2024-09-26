import React from "react";
import { FaStar } from "react-icons/fa6";

const RateBadge = ({ rating }) => {
  return (
    <span className="btn btn-xs btn-primary text-xs font-bold mr-2">
      <FaStar />
      {parseInt(rating * 10)}
      <span className="text-[8px]">%</span>
    </span>
  );
};

export default RateBadge;
