import React from "react";

const SwitchList = ({ list, value, onChange }) => {
  return (
    <div className=" text-base flex rounded-3xl font-semibold   shadow-inner shadow-black cursor-pointer duration-1000 w-fit max-w-full ">
      {list.map((item) => {
        return (
          <p
            className={` flex justify-center items-center rounded-3xl w-28 text-sm sm:text-base  capitalize text-nowrap ${
              value === item && `primaryBtn text-slate-950`
            } `}
            key={item}
            onClick={(e) => onChange(e.target.textContent)}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};

export default SwitchList;
