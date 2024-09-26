import { useParams } from "react-router-dom";

const Play = () => {
  const { id } = useParams();

  return (
    <>
      <div>
        <iframe
          id="vid"
          width="800"
          height="450"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          aut
        ></iframe>
      </div>
    </>
  );
};
export default Play;
