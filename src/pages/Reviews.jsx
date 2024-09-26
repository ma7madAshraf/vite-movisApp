import React from "react";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import ReviewsContainer from "../components/ReviewsContainer";
import { useAppProvider } from "../context/appContext";

const Reviews = () => {
  const { id, type } = useParams();
  const { movieData } = useAppProvider();
  const { mainData, reviewsData } = movieData;
  const {
    poster_path: poster,
    original_title: title,
    release_date: release,
    name,
  } = mainData;
  return (
    <section>
      <div
        className="w-[100vw] h-28  flex items-center p-12"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(52.5, 31.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 31.5, 10.5, 0.84) 50%, rgba(52.5, 31.5, 10.5, 0.84) 100%)`,
        }}
      >
        <img
          src={`https://media.themoviedb.org/t/p/w58_and_h87_face${poster}`}
          alt=""
          className="rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-3xl font-bold text-neutral">
            {title || name}{" "}
            <span className="text-neutral-content font-medium">
              {" "}
              ({moment(release).format(`YYYY`)})
            </span>
          </h3>
          <Link
            to={`/${type}/${id}`}
            className="flex items-center capitalize font-semibold"
          >
            <FaAngleLeft />
            back to main
          </Link>
        </div>
      </div>
      <article className="my-align flex flex-col gap-y-12 py-12">
        {reviewsData.map((review) => (
          <ReviewsContainer key={review.id} {...review} />
        ))}
      </article>
    </section>
  );
};

export default Reviews;
