import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <div className="my-10">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default HomeLayout;
