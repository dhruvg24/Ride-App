import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-2 text-center w-[94%] absolute top-0"
        onClick={() => props.waitingForDriver(false)}
      >
        <i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
     <div className='flex items-center justify-between'>
        <img
          src="/src/assets/car-img-removebg-preview.png"
          className="h-16"
          alt="car-image"
        />
        <div className='text-right'>
          <h2 className='text-lg font-medium -mt-1 -mb-1 capitalize'>{props.ride?.driver.fullname.firstname + ' ' + props.ride?.driver.fullname.lastname}</h2>
          <h4 className='text-xl font-semibold'>{props.ride?.driver.vehicle.plateNum}</h4>
          <p className='text-sm text-gray-600'>Maruti suzuki alto</p>
          <h1>OTP: {props.ride?.otp}</h1>
        </div>
     </div>
      <div className="flex gap-2 justify-between flex-col items-center">
       
        <div className="w-full mt-3">
          <div className="flex items-center gap-3 p-2 border-b-2">
            <i className="text-lg ri-map-pin-user-fill" />
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
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
       
      </div>
    </div>
  )
}

export default WaitingForDriver;