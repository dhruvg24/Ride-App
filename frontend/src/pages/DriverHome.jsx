import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DriverDetails from "../components/DriverDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { DriverContextData } from "../context/DriverContext";
import axios from "axios";

const DriverHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const { socket } = useContext(SocketContext);
  const { driver } = useContext(DriverContextData);

  useEffect(() => {
    socket.emit("join", {
      userId: driver._id,
      userType: "driver",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log({
          //   userId: driver._id,
          //   location : {
          //     ltd: position.coords.latitude,
          //     lng: position.coords.longitude
          //   }
          // })
          socket.emit("update-driver-location", {
            userId: driver._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 15000);
    // after 15 seconds location is fetched.
    // To be updated.
    updateLocation();
    // return ()=>clearInterval(locationInterval)
    // this is to avoid memory leakage when the component unmounts.
  }, [socket, driver]);

  // need to listen to the socket event i.e. new-ride (refer ride.controller)
  useEffect(() => {
    if (!socket) return;

    const handleNewRide = (data) => {
      console.log('New ride received:', data);
      setRide(data);
      setRidePopupPanel(true);
    };

    // FIXED: Use addEventListener pattern for socket events
    socket.on("new-ride", handleNewRide);

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket]);

  async function confirmRide() {
    console.log('Confirming ride:', ride, 'Driver:', driver);

    const token = localStorage.getItem('token')
    if(!token){
      console.error('Token not found, Driver may not be auth.')
      return;
    }
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm-ride`,
      {
        rideId: ride._id,
        // driverId: driver._id,
        
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log('Ride confirmed: ',res.data);
    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  }

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopupPanel) {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="src/assets/Logo.png"
          alt="driver-home-image"
        />
        <Link
          to="/driver-home"
          className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line" />
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1200/1*hpuwAa_brbyYGZusWhzuIQ.gif"
          alt="maps-image"
        ></img>
      </div>
      <div className="h-2/5 p-6">
        <DriverDetails />
      </div>

      <div
        ref={ridePopupPanelRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12"
      >
        <RidePopup
          ride={ride}
          confirmRide={confirmRide}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-screen translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopup
          ride= {ride} 
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default DriverHome;
