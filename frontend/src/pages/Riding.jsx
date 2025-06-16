// This is when user starts ride
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveLocationTracking from "../components/LiveLocationTracking";
import { toast } from "react-toastify";
const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  // retrive ride data
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  socket.on("ride-ended", () => {
    toast.success("Ride completed!");
    navigate("/home");
  });
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="right-2  top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line" />
      </Link>

      <div className="h-1/2">
        <LiveLocationTracking />
      </div>
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            src="/src/assets/car-img-removebg-preview.png"
            className="h-16"
            alt="car-image"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium -mt-1 -mb-1 capitalize">
              {ride?.driver.fullname.firstname +
                " " +
                ride?.driver.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold">
              {ride?.driver.vehicle.plateNum}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-3">
            <div className="flex items-center gap-3 p-2 border-b-2">
              <i className="text-lg ri-map-pin-2-fill" />
              <div>
                <h3 className="text-lg font-medium">123/B</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2">
              <i className="ri-currency-line" />
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="mt-9 h-10 w-full bg-green-600 font-semibold text-white rounded-lg">
          Make a payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
