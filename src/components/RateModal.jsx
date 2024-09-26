import React, { useState } from "react";
import RateStars from "./RateStars";
import { FaStar } from "react-icons/fa6";
import RateSpan from "./RateSpan";
import { useAppProvider } from "../context/appContext";

const RateModal = ({ id, prevRating, type, view }) => {
  const [rating, setRating] = useState(prevRating || 7);
  const data = { value: rating };
  const { addRate, removeRate } = useAppProvider();

  return (
    <div>
      {prevRating ? (
        <div
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => {
            document.getElementById(`my_modal_${id}`).showModal();
          }}
        >
          {" "}
          <RateSpan rate={prevRating} size="2rem" text="text-sm" />
          <h4
            className={`text-md font-semibold capitalize ${
              view && `hidden sm:inline-block text-sm text-wrap`
            }`}
          >
            your
            {!view && <br />} rate
          </h4>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-warning btn-circle btn-sm mr-2"
            onClick={() => {
              document.getElementById(`my_modal_${id}`).showModal();
            }}
          >
            <FaStar />
          </button>
          <span className="text-neutral-content hidden sm:inline-block">
            Rate It!
          </span>
        </div>
      )}
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-2">Your Rating</h3>
          <RateStars value={rating} onChange={setRating} />
          <div className="modal-action  w-full  flex justify-between">
            <div>
              <button
                className="btn btn-sm md:btn-md  btn-primary text-base  md:text-lg capitalize mr-2 "
                onClick={() => addRate(id, type, data)}
              >
                add rating{" "}
              </button>
              {prevRating && (
                <button
                  className="btn btn-sm md:btn-md  btn-error text-base  md:text-lg capitalize "
                  onClick={() => removeRate(id, type)}
                >
                  remove{" "}
                </button>
              )}
            </div>
            <form method="dialog">
              <button className="btn block  btn-sm md:btn-md  text-base  md:text-lg capitalize">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RateModal;
