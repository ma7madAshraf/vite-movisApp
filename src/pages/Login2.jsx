import React, { useEffect } from "react";
import { useAppProvider } from "../context/appContext";
import axios from "axios";
import { IoShieldCheckmark } from "react-icons/io5";
import { useLoaderData, useNavigate } from "react-router-dom";

export const loader = async () => {
  const token = localStorage.getItem("moviesApp-token");

  const options = {
    method: "POST",
    url: "https://api.themoviedb.org/4/auth/access_token",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
    data: {
      request_token: token,
    },
  };
  try {
    const resp = await axios(options);
    return resp.data;
  } catch (error) {
    return null;
  }
};

const Login2 = () => {
  const { getUser, getAll } = useAppProvider();
  const user = useLoaderData();
  const navigate = useNavigate();

  const completeLogin = () => {
    if (user?.success) {
      getUser(user.account_id, user.access_token);
      navigate("/");
    }
  };
  useEffect(() => {
    completeLogin();
  }, [user]);

  return (
    <section className="h-[60vh] w-full flex justify-center items-center">
      {!user && <span className="loading loading-dots loading-lg"></span>}
      {user.success && (
        <div className="flex flex-col  items-center">
          {" "}
          <IoShieldCheckmark className="text-7xl text-primary" />
          <h1 className="text-3xl uppercase">success</h1>
        </div>
      )}
    </section>
  );
};

export default Login2;
