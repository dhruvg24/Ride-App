import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token"); // Remove token from local storage
        toast.success("Logged out successfully");
        navigate("/login-user"); // Redirect to login page
      }
    })
    .catch((err) => {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error", err);
    });
  return <div>UserLogout</div>;
};

export default UserLogout;
