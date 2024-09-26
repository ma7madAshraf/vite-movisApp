import React, { useEffect, useState } from "react";
import { Outlet, useLoaderData, useParams } from "react-router-dom";
import { customFetch } from "../utils";
import { useAppProvider } from "../context/appContext";

const SingleQuery = (id, type) => {
  return {
    queryKey: ["SingleLayout", id],
    queryFn: async () => {
      let allData;
      const url = `${type}/${id}`;
      const [main, reviews, images, videos, recommendations, externalIDs] =
        await Promise.allSettled([
          customFetch(`${url}?language=en-US`),
          customFetch(`${url}/reviews?language=en-US`),
          customFetch(`${url}/images`),
          customFetch(`${url}/videos?language=en-US`),
          customFetch(`${url}/recommendations?language=en-US`),
          customFetch(`${url}/external_ids`),
        ]);
      allData = {
        mainData: main.value.data,
        reviewsData: reviews.value.data.results,
        imagesData: images.value.data,
        videosData: videos.value.data.results,
        recommendationsData: recommendations.value.data.results,
        externalIDs: externalIDs.value.data,
      };
      if (type === "movie") {
        const credits = await customFetch(`${url}/credits?language=en-US`);
        allData.creditsData = credits.data;
        const keywords = await customFetch(`${url}/keywords`);
        allData.keywords = keywords.data.keywords;
      } else if (type === "tv") {
        const credits = await customFetch(
          `${url}/aggregate_credits?language=en-US`
        );
        allData.creditsData = credits.data;
        const keywords = await customFetch(`${url}/keywords`);
        allData.keywords = keywords.data.results;
      }

      return allData;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id, type } = params;
    const resp = await queryClient.ensureQueryData(SingleQuery(id, type));
    return resp;
  };
const SingleLayout = () => {
  const { id, type } = useParams();
  const { updateMovie } = useAppProvider();
  const allData = useLoaderData();
  const { mainData } = allData;

  useEffect(() => {
    updateMovie(allData);
  }, [id, type]);
  return (
    <Outlet
      context={{
        mainData,
      }}
    />
  );
};

export default SingleLayout;
