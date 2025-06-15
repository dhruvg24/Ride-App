import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ConfirmRidePopup = (props) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: { rideId: props.ride._id, otp: otp },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/driver-riding");
    }
  };
  return (
    <div>
      <h5
        className="p-2 text-center w-[94%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center p-3 rounded-lg bg-yellow-400 justify-between mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://media.istockphoto.com/id/1182697148/photo/elegant-and-handsome-driver-waiting.jpg?s=612x612&w=0&k=20&c=M9il-C5NggIGFlkLs7H3NBS9NqWwOWb_g80g5w1aptQ="
            alt="user-img"
          ></img>
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-3">
          <div className="flex items-center gap-3 p-2 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.user.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">123/B</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.user.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <i className="ri-currency-line" />
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              type="text"
              className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3"
              placeholder="Enter OTP"
            />
            <button className="mt-5 w-full p-2 flex text-lg justify-center bg-green-600 font-semibold text-white rounded-lg">
              Confirm
            </button>

            <button
              onClick={() => {
                props.setConfirmRidePopupPanel(false);
                props.setRidePopupPanel(false);
              }}
              className="mt-2 w-full text-lg p-2 bg-red-600 font-semibold text-white rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
