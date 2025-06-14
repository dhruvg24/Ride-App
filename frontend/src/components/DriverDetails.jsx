import React, {useContext} from "react";
import {DriverContextData} from '../context/DriverContext'
const DriverDetails = () => {

  const {driver} = useContext(DriverContextData)

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://media.istockphoto.com/id/1182697148/photo/elegant-and-handsome-driver-waiting.jpg?s=612x612&w=0&k=20&c=M9il-C5NggIGFlkLs7H3NBS9NqWwOWb_g80g5w1aptQ="
            alt="user-img"
          />
          <h4 className="text-lg font-medium capitalize">{driver.fullname.firstname+ " "+ driver.fullname.lastname}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">Rs. 294.6</h4>
          <p className="text-sm text-gray-600 ">Earned</p>
        </div>
      </div>

      <div className="flex p-4  bg-gray-100 rounded-2xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-time-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line" />
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
