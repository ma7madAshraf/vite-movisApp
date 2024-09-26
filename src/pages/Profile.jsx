import React from "react";
import { useAppProvider } from "../context/appContext";
import ProfileHeader from "../components/ProfileHeader";
import { Navigate, useLocation } from "react-router-dom";
import ProfileLists from "../components/ProfileLists";
const Profile = () => {
  const { user } = useAppProvider();
  const location = useLocation();
  const target = location.state?.target;

  if (!user) {
    return <Navigate to="/" />;
  }
  if (user) {
    return (
      <div>
        <ProfileHeader {...user} />
        <ProfileLists target={target} />
      </div>
    );
  }
};

export default Profile;
