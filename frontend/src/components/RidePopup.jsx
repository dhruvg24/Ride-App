import React from "react";

const RidePopup = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[94%] absolute top-0"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New ride Available!</h3>
      <div className="flex items-center p-3 rounded-lg bg-yellow-400 justify-between mt-3">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://media.istockphoto.com/id/1182697148/photo/elegant-and-handsome-driver-waiting.jpg?s=612x612&w=0&k=20&c=M9il-C5NggIGFlkLs7H3NBS9NqWwOWb_g80g5w1aptQ="
            alt="user-img"
          ></img>
          <h2 className="text-lg font-medium">
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
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">123/B</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
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

        <div className="flex w-full items-center justify-between mt-3">
          <button
            onClick={() => {
              props.setRidePopupPanel(false);
            }}
            className="mt-2 p-3 px-8 bg-gray-300 font-semibold text-gray-600 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopupPanel(true)
              props.confirmRide()
            }}
            className="mt-5  bg-green-600 p-3 px-8 font-semibold text-white rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopup;
