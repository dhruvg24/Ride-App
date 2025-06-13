import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[94%] absolute top-0"
        onClick={() => props.setVehicleListPanelOpen(false)}
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div onClick={()=>{props.setConfirmRidePanel(true)}} className="flex active:border-2 mb-2 active:border-black rounded-xl  p-3 w-full items-center justify-between">
        <img
          src="/src/assets/auto-img-removebg-preview.png
"
          className="h-14"
          alt="autorickshaw-image"
        />
        <div className="w-1/2 ml-1">
          <h4 className="font-medium text-base">
            Auto{" "}
            <span>
              <i className="ri-user-3-fill"></i>3{/* capacity of passengers */}
            </span>
          </h4>
          <h5 className="font-medium text-sm">just 5 mins away</h5>
          <p className="font-normal text-xs text-gray-500">
            affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.auto}</h2>
      </div>

      <div onClick={()=>{props.setConfirmRidePanel(true)}} className="flex active:border-2 mb-2 active:border-black rounded-xl p-3 w-full items-center justify-between">
        <img
          src="/src/assets/car-img-removebg-preview.png
"
          className="h-14"
          alt="car-image"
        />
        <div className="w-1/2 ml-1">
          <h4 className="font-medium text-base">
            Car{" "}
            <span>
              <i className="ri-user-3-fill"></i>4{/* capacity of passengers */}
            </span>
          </h4>
          <h5 className="font-medium text-sm">just 10 mins away</h5>
          <p className="font-normal text-xs text-gray-500">
            affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.car}</h2>
      </div>

      <div onClick={()=>{props.setConfirmRidePanel(true)}} className="flex active:border-2 mb-2 active:border-black rounded-xl p-3 w-full items-center justify-between">
        <img
          src="/src/assets/bike-img-removebg-preview.png
"
          className="h-14"
          alt="bike-image"
        />
        <div className="w-1/2 -ml-6">
          <h4 className="font-medium text-base">
            Bike{" "}
            <span>
              <i className="ri-user-3-fill"></i>1{/* capacity of passengers */}
            </span>
          </h4>
          <h5 className="font-medium text-sm">just 9 mins away</h5>
          <p className="font-normal text-xs text-gray-500">
            affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹{props.fare.bike}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
