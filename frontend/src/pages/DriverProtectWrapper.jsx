import React, { useContext, useEffect, useState } from "react";
import { DriverContextData } from "../context/DriverContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DriverProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const { driver, setDriver } = useContext(DriverContextData);

  const [isLoading, setIsLoading] = useState(true);

  // if user is not logged in, redirect to login page else render the children components.
  useEffect(() => {
    if (!token) {
      navigate("/login-driver");
    }
    // the below code is needed when to ensure that the token belongs to driver and not user. Otherwise, the user may login homepage of driver and vice versa.
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/drivers/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setDriver(response.data.driver);
          setIsLoading(false); // Set loading to false after fetching driver data
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login-driver"); // Redirect to login page
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

export default DriverProtectWrapper;
