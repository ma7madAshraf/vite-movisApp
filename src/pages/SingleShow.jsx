import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { SingleMovie, SingleTv } from "./";
const SingleShow = () => {
  const { type } = useParams();
  const { mainData } = useOutletContext();

  if (type === "movie") {
    return <SingleMovie mainData={mainData} />;
  }
  if (type === "tv") {
    return <SingleTv mainData={mainData} />;
  }
};

export default SingleShow;
