import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-cover bg-[url(https://thumbs.dreamstime.com/z/ordering-hailing-ride-car-ordering-hailing-ride-car-online-concept-traveller-standing-suitcase-165344673.jpg?ct=jpeg)] bg-center h-screen pt-8 flex flex-col justify-between  w-full items-start bg-red-300">
        <img className='w-16 ml-8' src='/src/assets/Logo.png' alt='logo'></img>
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get ready to book your ride with ease!</h2>
          <Link to='/login-user' className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded-lg mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};
export default Home;


