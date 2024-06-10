import React from "react";
import { useLocation } from "react-router-dom";
import Profile from "./Profile";

const ProfileWrapper = () => {
    
  const location = useLocation();
  const user = location.state?.user || JSON.parse(localStorage.getItem("user"));
    console.log('in profilewraper--',user);
  return <Profile user={user} />;
};

export default ProfileWrapper;
