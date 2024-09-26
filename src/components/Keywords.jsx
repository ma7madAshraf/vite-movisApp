import React from "react";
import { Link } from "react-router-dom";

const Keywords = ({ list, type }) => {
  return (
    <div>
      {list.map((key) => (
        <Link
          to={`/keyword/${type}/${key.id}`}
          state={{ keyword: key.name }}
          key={key.id}
          className="capitalize text-base btn mx-2 "
        >
          {key.name}
        </Link>
      ))}
    </div>
  );
};

export default Keywords;
