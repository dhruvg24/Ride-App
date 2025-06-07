import React, { useState } from "react";
import { Link } from "react-router-dom";
// import UserSignup from "./UserSignup";
import { DriverContextData } from "../context/DriverContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DriverSignup = () => {
  //2 way binding
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [userData, setUserData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { driver, setDriver } = React.useContext(DriverContextData);

  const submitHandler = async (e) => {
    e.preventDefault();
    const driverData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plateNum: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/drivers/register-driver`,
      driverData
    );

    if (response.status === 201) {
      const data = response.data;
      setDriver(data.driver);
      localStorage.setItem("token", data.token);
      navigate("/driver-home");
    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
    // This will reset/clear the vehicle details.
  };
  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img className="w-16 mb-4" src="/src/assets/Logo.png" alt="logo"></img>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-base w-full font-medium mb-2">
            What's our Driver's Name
          </h3>
          <div className="flex gap-3 mb-5">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="first name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="last name"
            />
          </div>

          <h3 className="text-base font-medium mb-2">
            What's our Driver's email
          </h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-white mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />

          <h3 className="text-lg mb-2 font-medium">Vehicle Details</h3>
          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="vehicle color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />

            <input
              required
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="vehicle plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-4 mb-7">
            <input
              required
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="number"
              placeholder="vehicle capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/login-driver" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        {/* terms/policy */}
        <p className="text-xs text-gray-500 text-center leading-tight">
          By proceeding you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default DriverSignup;
