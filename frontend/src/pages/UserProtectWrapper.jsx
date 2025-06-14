import React, { useContext, useEffect, useState } from "react";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  // const {user, setUser} = useContext(UserContextData);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContextData);
  const [isLoading, setIsLoading] = useState(true);
  // if user is not logged in, redirect to login page else render the children components.
  useEffect(() => {
    if (!token) {
      navigate("/login-user");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response.data);
          setUser(response.data);
          // not to use response.data.user -> will only create a context for nested object -> name, email, id and not token, socketId etc.

          setIsLoading(false); // Set loading to false after fetching user data
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login-user"); // Redirect to login page
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {children}
      {/* Render children components if user is logged in */}
    </>
  );
};

export default UserProtectWrapper;
