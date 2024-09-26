import React from "react";

const RadioInput = ({ list, value, setSearchType }) => {
  return (
    <article className="flex">
      {list?.map((item) => {
        return (
          <div className="form-control" key={item}>
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-primary-content"
                value={item}
                checked={value === item}
                onChange={(e) => {
                  setSearchType(e.target.value);
                }}
              />
              <span className="label-text font-semibold capitalize ml-1">
                {item}
              </span>
            </label>
          </div>
        );
      })}
    </article>
  );
};

export default RadioInput;
