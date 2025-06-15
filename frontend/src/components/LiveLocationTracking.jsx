import React, { useEffect, useState } from 'react'
import {LoadScript, Marker, GoogleMap} from '@react-google-maps/api'

const containerStyle = {
    width : '100%', 
    height: '100%'
}

const center = {
    lat: -3.745, 
    lng: -38.523
}

const LiveLocationTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center)

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude} = position.coords;
            setCurrentPosition({
                lat: latitude, 
                lng: longitude
            })
        })

        const watchId = navigator.geolocation.watchPosition((position)=>{
            const {latitude, longitude} = position.coords;
            setCurrentPosition({
                lat: latitude, 
                lng: longitude
            })
        })

        return ()=> navigator.geolocation.clearWatch(watchId)
    }, []);

    useEffect(()=>{
        const updatePosition = ()=>{
            navigator.geolocation.getCurrentPosition((position)=>{
                const {latitude, longitude} = position.coords;

                console.log('Position updated: ', latitude, longitude);

                setCurrentPosition({
                    lat: latitude, 
                    lng: longitude
                })
            })
        }
        updatePosition();
        // initial update pos
        const intervalId = setInterval(updatePosition, 3000); //after every 3 secs

        // return ()=> clearInterval(intervalId)
    })
  return (
    <LoadScript googleMapsApiKey = {import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle}
        center = {currentPosition} zoom = {15}>
            <Marker position = {currentPosition} />
        </GoogleMap>
    </LoadScript>
  )
}

export default LiveLocationTracking