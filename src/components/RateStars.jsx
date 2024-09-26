import React, { useEffect } from "react";

const RateStars = ({ value, onChange }) => {
  useEffect(() => {}, [value]);
  return (
    <div className="rating rating-lg rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        checked={value === 1}
        onChange={() => onChange(1)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        checked={value === 2}
        onChange={() => onChange(2)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        checked={value === 3}
        onChange={() => onChange(3)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        checked={value === 4}
        onChange={() => onChange(4)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        checked={value === 5}
        onChange={() => onChange(5)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        checked={value === 6}
        onChange={() => onChange(6)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        checked={value === 7}
        onChange={() => onChange(7)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        checked={value === 8}
        onChange={() => onChange(8)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-green-500"
        checked={value >= 9}
        onChange={() => onChange(9)}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-green-500"
        checked={value >= 10}
        onChange={() => onChange(10)}
      />
    </div>
  );
};

export default RateStars;
