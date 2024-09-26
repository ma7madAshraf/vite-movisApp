import React from "react";

const RateSpan = ({ rate, size, text }) => {
  rate = Math.round(rate * 10);
  const color =
    rate >= 70
      ? "before:text-green-400 after:text-green-400"
      : "before:text-yellow-500 after:text-yellow-500";
  return (
    <div
      className={` radial-progress bg-base-300 text-neutral-content  border-base-300 border-4 ${color} flex  items-center `}
      style={{ "--value": rate, "--size": size }}
      role="progressbar"
    >
      <span className={`font-bold ${text}`}>{rate}</span>
      <span className="text-[6px]">%</span>
    </div>
  );
};

export default RateSpan;
