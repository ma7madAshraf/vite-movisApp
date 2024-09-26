import React from "react";

import CastList from "../components/CastList";
import ReviewsContainer from "../components/ReviewsContainer";
import { Link, useParams } from "react-router-dom";
import MediaContainer from "../components/MediaContainer";
import Recommendations from "../components/Recommendations";
import { useAppProvider } from "../context/appContext";
import ShowHeader from "../components/ShowHeader";
import Keywords from "../components/Keywords";

const SingleMovie = ({ mainData }) => {
  const { id, type } = useParams();
  const { movieData } = useAppProvider();
  const {
    creditsData,
    reviewsData,
    imagesData,
    videosData,
    recommendationsData,
    keywords,
  } = movieData;
  const trailer = videosData?.find((e) => e.type === "Trailer");

  return (
    <>
      <ShowHeader {...mainData} trailer={trailer} type={type} />
      <section className="my-align my-24">
        {creditsData && (
          <article className="mt-12 border-b pb-6">
            <h3 className="text-2xl capitalize font-bold mb-6">
              Top Billed Cast
            </h3>
            <CastList data={creditsData?.cast} />
            <Link
              to={`/${type}/${id}/casting`}
              className="capitalize font-semibold block w-fit mt-4 text-lg hover:text-secondary-content "
            >
              full cast & crew
            </Link>
          </article>
        )}
        {reviewsData?.length > 0 && (
          <article className="mt-12 border-b pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">Reviews</h3>
            <ReviewsContainer {...reviewsData?.[reviewsData.length - 1]} />
            <Link
              to={`/${type}/${id}/reviews`}
              className="capitalize font-semibold block w-fit mt-4 text-lg hover:text-secondary-content "
            >
              see all reviews
            </Link>
          </article>
        )}
        {imagesData && (
          <article className="mt-12 border-b pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">media</h3>
            <MediaContainer videos={videosData} images={imagesData} />
          </article>
        )}
        {keywords && (
          <article className="mt-12  pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">keywords</h3>
            <Keywords list={keywords} type={type} />
          </article>
        )}
        <article className="mt-12  pb-6">
          <h3 className="text-2xl capitalize font-bold mb-5">
            Recommendations
          </h3>
          {recommendationsData && (
            <Recommendations recommendations={recommendationsData} />
          )}{" "}
        </article>
      </section>
    </>
  );
};

export default SingleMovie;

