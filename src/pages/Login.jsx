import React, { useEffect } from "react";

import { useAppProvider } from "../context/appContext";

const Login = () => {
  const { token, getToken } = useAppProvider();

  useEffect(() => {
    getToken();
  }, []);
  return (
    <section className="max-h-screen">
      <h1 className="w-fit text-3xl mx-auto font-bold border-b pb-6 mb-12 tracking-wide">
        Login
      </h1>
      <div className="h-[40vh] flex justify-center items-center">
        {" "}
        <a
          href={`https://www.themoviedb.org/auth/access?request_token=${token}

`}
          className={`btn primaryBtn text-2xl capitalize px-8 py-3 h-auto ${
            !token && "btn-disabled pointer-events-none"
          } `}
        >
          {" "}
          login with TMDB{" "}
        </a>
      </div>
    </section>
  );
};

export default Login;
