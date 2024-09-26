import React from "react";
import CastList from "../components/CastList";
import ReviewsContainer from "../components/ReviewsContainer";
import { Link, useParams } from "react-router-dom";
import MediaContainer from "../components/MediaContainer";
import Recommendations from "../components/Recommendations";
import CurrentSeason from "../components/CurrentSeason";
import { useAppProvider } from "../context/appContext";
import ShowHeader from "../components/ShowHeader";
import Keywords from "../components/Keywords";

const SingleTv = ({ mainData }) => {
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
  const { seasons, next_episode_to_air, last_episode_to_air } = mainData;
  const trailer = videosData?.find((e) => e.type === "Trailer");

  return (
    <>
      {mainData && <ShowHeader {...mainData} trailer={trailer} type={type} />}
      <section className="my-align mb-24 mt-16">
        {creditsData?.id && (
          <article className="mt-12 border-b pb-6">
            <h3 className="text-2xl capitalize font-bold mb-6">
              Top Billed Cast
            </h3>
            <CastList data={creditsData.cast} />
            <Link
              to={`/${type}/${id}/casting`}
              className="capitalize font-semibold block w-fit mt-4 text-lg hover:text-secondary-content "
            >
              full cast & crew
            </Link>
          </article>
        )}
        {seasons?.length > 0 && (
          <article className="mt-12  pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">
              current season
            </h3>
            <CurrentSeason
              season={seasons[seasons.length - 1]}
              nextEpisode={next_episode_to_air}
              lastEpisode={last_episode_to_air}
              showID={id}
            />
            <Link
              to={`/${type}/${id}/seasons`}
              className="capitalize font-semibold block w-fit mt-4 text-lg hover:text-secondary-content "
            >
              view all seasons
            </Link>
          </article>
        )}
        {reviewsData?.length > 0 && (
          <article className="mt-12 border-b pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">Reviews</h3>
            <ReviewsContainer {...reviewsData[reviewsData.length - 1]} />
            <Link
              to={`/${type}/${id}/reviews`}
              className="capitalize font-semibold block w-fit mt-4 text-lg hover:text-secondary-content "
            >
              see all reviews
            </Link>
          </article>
        )}
        {videosData?.length > 0 && (
          <article className="mt-12 border-b pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">media</h3>
            <MediaContainer
              videos={videosData}
              images={imagesData}
              url={{ id, type }}
            />
          </article>
        )}
        {keywords && (
          <article className="mt-12  pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">keywords</h3>
            <Keywords list={keywords} type={type} />
          </article>
        )}
        {recommendationsData?.length > 0 && (
          <article className="mt-12  pb-6">
            <h3 className="text-2xl capitalize font-bold mb-5">
              Recommendations
            </h3>
            <Recommendations recommendations={recommendationsData} />
          </article>
        )}
      </section>
    </>
  );
};

export default SingleTv;

{
  /* {mainData && (
        <div
          className="hero min-h-[60vh]  max-w-screen"
          style={{
            backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop})`,
          }}
        >
          <div
            className="hero-overlay bg-opacity-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(52.5, 31.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(52.5, 31.5, 10.5, 0.84) 50%, rgba(52.5, 31.5, 10.5, 0.84) 100%)`,
            }}
          ></div>
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`}
              className="hidden md:block max-h-[50vh]  m-auto col-span-1 rounded-2xl"
            />
            <div className="lg:col-span-2 text-primary-content px-4 md:px-0 py-6 md:py-12">
              <div className="mb-6">
                <h2 className="text-4xl font-bold">
                  {title}{" "}
                  <span className="text-neutral-content font-medium text-3xl">
                    {" "}
                    ({moment(release).format(`YYYY`)})
                  </span>
                </h2>
                <p className="flex gap-x-2 m ">
                  <span>
                    {genres?.map((e, ind) => {
                      return genres.length > ind + 1 ? `${e.name},` : e.name;
                    })}
                  </span>{" "}
                </p>
              </div>

              <div className="-mb-10 flex sm:-mb-10 md:mb-6">
                <div className="sm:py-6 md:py-0">
                  <div className="flex items-center mb-3">
                    <RateSpan rate={rate} size="4rem" text="text-xl" />
                    <h4 className="text-md font-semibold capitalize">
                      user
                      <br />
                      score
                    </h4>
                  </div>
                  <div className="flex gap-x-3 items-center  ">
                    <div className="dropdown dropdown-hover">
                      <button
                        className="btn btn-circle "
                        tabIndex="0"
                        role="button"
                      >
                        <FaHeart />
                      </button>

                      <p
                        tabIndex="0"
                        className="dropdown-content bg-base-100 rounded-box z-[1] w-fit text-nowrap capitalize p-2 shadow"
                      >
                        mark as favorite
                      </p>
                    </div>
                    <div className="dropdown dropdown-hover">
                      <button
                        className="btn btn-circle"
                        tabIndex="0"
                        role="button"
                      >
                        <FaBookmark />
                      </button>
                      <p
                        tabIndex="0"
                        className="dropdown-content bg-base-100 rounded-box z-[1] w-fit text-nowrap capitalize p-2 shadow"
                      >
                        add to watchlist
                      </p>
                    </div>
                    <a
                      className="font-bold tracking-wide"
                      href="#"
                      onClick={() => {
                        window.open(
                          `/play/${trailer.key}`,
                          "myWindow",
                          "menubar=1,resizable=1,width=800,height=450"
                        );
                      }}
                    >
                      Play Trailer
                    </a>
                  </div>
                </div>{" "}
                <img
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster}`}
                  className="md:hidden max-h-[200px] sm:max-h-[250px]  m-auto col-span-1 rounded-2xl"
                />
              </div>

              <p className="block">{tagline}</p>
              <div className="mt-2">
                <h3 className="uppercase text-xl font-bold">overview</h3>
                <p className="leading-6  mr-2">{overview}</p>
              </div>
              <div className="flex gap-x-24 mt-8">
                {created_by?.map((p) => {
                  const { name, id } = p;
                  return (
                    <div key={id}>
                      <Link
                        to={`/person/${id}`}
                        className="font-bold hover:text-neutral-content"
                      >
                        {name}
                      </Link>
                      <p>creator</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )} */
}
