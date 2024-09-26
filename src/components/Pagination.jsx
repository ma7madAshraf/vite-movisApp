import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const Pagination = ({ page, onChange, total: pageCount }) => {
  const handleNavigation = (pageNumber) => {
    onChange(pageNumber);
  };

  if (pageCount < 2) return null;

  return (
    <>
      <div className="join flex w-full justify-center mt-16">
        <button
          className={`${page <= 9 && `hidden`} join-item btn btn-sm `}
          onClick={() => {
            handleNavigation(1);
          }}
        >
          &lt;&lt;
        </button>
        <button
          className="join-item btn btn-sm "
          disabled={page === 1}
          onClick={() => {
            handleNavigation(page - 1);
          }}
        >
          &lt;
        </button>
        <div>
          {Array.from({ length: pageCount }, (_, index) => {
            return (
              <input
                className={` join-item btn btn-sm  ${
                  page === index + 1 && `bg-base-300 border-base-300 `
                } ${(index >= page + 1 || index <= page - 3) && `hidden`}`}
                type="radio"
                key={index}
                name="options"
                aria-label={index + 1}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(index + 1);
                }}
              />
            );
          })}
        </div>
        <button
          className="join-item btn btn-sm"
          disabled={page === pageCount}
          onClick={() => handleNavigation(page + 1)}
        >
          &gt;
        </button>
        <button
          className={`${
            page + 7 >= pageCount && `hidden`
          } join-item btn btn-sm `}
          disabled={page === pageCount}
          onClick={() => handleNavigation(pageCount)}
        >
          &gt;&gt;
        </button>
      </div>
    </>
  );
};

export default Pagination;
