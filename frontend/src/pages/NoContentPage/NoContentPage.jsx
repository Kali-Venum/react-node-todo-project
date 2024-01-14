import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoContentPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    
    if (user?.role === "user") {
      navigate("/get-all-tasks");
    } else {
      navigate("/login");
    }
  }, []);
  return <div></div>;
};

export default NoContentPage;
