import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef= useRef(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24
        // opacity: 1
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding : 0
        // opacity: 0 
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })

    }
  }, [panelOpen]);

  return (
    <>
      <div className="h-screen relative">
        <img
          className="w-18 absolute left-4 top-4"
          src="/src/assets/Logo.png"
          alt="logo"
        />

        <div className="h-screen w-screen">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1200/1*hpuwAa_brbyYGZusWhzuIQ.gif"
            alt="maps-image"
          />
        </div>

        {/* The below logic is for moving the section up/down of finding a trip, when a user input some data this div should move to the top else remain downwards*/}
        <div className=" flex flex-col justify-end h-screen absolute  w-full top-0">
          <div className="h-[30%] p-6 bg-white relative">
            <h5 ref={panelCloseRef} onClick={()=>{
              setPanelOpen(false)
              }} className="absolute top-6 right-6 opacity-0 text-2xl">
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className="line absolute h-16 top-[45%] w-1 left-8 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                }}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Add a pickup location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                }}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter your destination"
              />
            </form>
          </div>

          <div ref={panelRef} className="bg-white h-0">
            {/* to enable set h-[70%] */}
            {<LocationSearchPanel />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
