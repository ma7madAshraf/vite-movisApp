import React from "react";
import {
  FaImdb,
  FaFacebook,
  FaInstagram,
  FaSquareXTwitter,
} from "react-icons/fa6";
const ExternalLinks = ({
  imdb_id,
  facebook_id,
  instagram_id,
  twitter_id,
  type,
}) => {
  return (
    <div className="flex gap-x-2">
      {facebook_id && (
        <a href={`https://www.facebook.com/${facebook_id}`} target="_blank">
          <FaFacebook className="text-2xl cursor-pointer" />
        </a>
      )}
      {instagram_id && (
        <a href={`https://www.instagram.com/${instagram_id}`} target="_blank">
          <FaInstagram className="text-2xl cursor-pointer" />
        </a>
      )}
      {twitter_id && (
        <a href={`https://x.com/${twitter_id}`} target="_blank">
          {" "}
          <FaSquareXTwitter className="text-2xl cursor-pointer" />
        </a>
      )}
      {imdb_id && (
        <a
          href={`https://www.imdb.com/${
            type === "" ? "title" : type
          }/${imdb_id}`}
          target="_blank"
        >
          <FaImdb className="text-2xl cursor-pointer" />
        </a>
      )}
    </div>
  );
};

export default ExternalLinks;
