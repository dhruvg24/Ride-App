import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const DriverLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}/drivers/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login-driver"); // Redirect to login page
      }
    });
  return <div>DriverLogout</div>;
};

export default DriverLogout;
