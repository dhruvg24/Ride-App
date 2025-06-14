import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehicleListPanelOpen, setVehicleListPanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);


  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handlePickupChange = async (e) => {
    const val = e.target.value;
    setPickup(val);
    // if (!val.trim()) {
    //   //clear suggestions when i/p empty
    //   setPickupSuggestions([]);
    //   return;
    // }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-address-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(res.data || []);
    } catch (err) {
      // handling error
      console.error("Failed to fetch pickup suggestions", err);
      throw err;
    }
  };

  const handleDestinationChange = async (e) => {
    const val = e.target.value;
    setDestination(val);
    // if (!val.trim()) {
    //   //clear suggestions when i/p empty
    //   setPickupSuggestions([]);
    //   return;
    // }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-address-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(res.data || []);
    } catch (err) {
      // handling error
      console.error("Failed to fetch destination suggestions", err);
      throw err;
    }
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity: 1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity: 0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehicleListPanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleListPanelOpen]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    try {
      setVehicleListPanelOpen(true);
      setPanelOpen(false);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFare(res.data);
    } catch (err) {
      console.error("Failed to fetch fare", err);
    }
  }

  async function createRide() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res.data);
    } catch (err) {
      console.error("Failed to create ride", err);
    }
  }

  return (
    <>
      <div className="h-screen relative overflow-hidden">
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
        <div className=" flex flex-col justify-end h-screen absolute w-full top-0">
          <div className="h-[31%] p-5 bg-white relative">
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false);
              }}
              className="absolute top-6 right-6 opacity-0 text-2xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <div className="line absolute h-16 top-[37%] w-1 left-8 bg-gray-700 rounded-full"></div>
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-2"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                placeholder="Add a pickup location"
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-2"
                type="text"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                placeholder="Enter your destination"
              />
            </form>

            <button
              disabled={!pickup || !destination}
              onClick={findTrip}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg  mt-2 w-full"
            >
              Find Trip
            </button>
          </div>

          <div ref={panelRef} className="bg-white h-0">
            {/* to enable set h-[70%] */}

            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPickup={setPickup}
              setDestination={setDestination}
              setVehicleListPanelOpen={setVehicleListPanelOpen}
              setPanelOpen={setPanelOpen}
              activeField={activeField}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12"
        >
          <VehiclePanel
            selectVehicle={setVehicleType}
            fare={fare}
            setVehicleListPanelOpen={setVehicleListPanelOpen}
            setConfirmRidePanel={setConfirmRidePanel}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
        >
          <ConfirmedRide createRide={createRide} fare={fare} vehicleType={vehicleType}
            pickup={pickup} destination = {destination}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
        >
          <LookingForDriver createRide={createRide} fare={fare} vehicleType={vehicleType}
            pickup={pickup} destination = {destination} setVehicleFound={setVehicleFound} />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed w-full  z-10 bottom-0 bg-white px-3 py-6 pt-12"
        >
          {/*  translate-y-full */}
          <WaitingForDriver waitingForDriver={waitingForDriver} />
        </div>
      </div>
    </>
  );
};

export default Home;
