import React from "react";

const ConfirmedRide = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[94%] absolute top-0"
        onClick={() => props.setConfirmRidePanel(false)}
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          src="/src/assets/car-img-removebg-preview.png"
          className="h-20"
          alt="car-image"
        />
        <div className="w-full mt-3">
          <div className="flex items-center gap-3 p-2 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 border-b-2">
            <i className="text-lg ri-map-pin-2-fill" />
            <div>
              <h3 className="text-lg font-medium">123/B</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2">
            <i className="ri-currency-line" />
            <div>
              <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Payment Method: Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true), props.setConfirmRidePanel(false), 
            props.createRide()
          }}
          className="mt-5 w-full bg-green-600 p-2 font-semibold text-white rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
