import React, {createContext, useEffect} from 'react'
import {io} from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
  transports: ['websocket','polling'],
  withCredentials: true
});


const SocketProvider = ({children}) => {
  useEffect(()=>{
    socket.on('connect', ()=>{
        console.log('Connected to server')
    })

    socket.on('disconnect', ()=>{
        console.log('Disconnected from server')
    })

    // optional cleanup
    // return ()=> {
    //   socket.off('connect');
    //   socket.off('disconnect')
    //   socket.disconnect();
    // }
  }, []);

//   const sendMessage = (eventName, message)=>{
//     // console.log(`Sending message : ${message} to ${eventName}`)
//     socket.emit(eventName, message);
//   }

//   const receiveMessage= (eventName, callback)=>{
//     socket.on(eventName, callback);
//   }

  return (
    <SocketContext.Provider value = {{socket}}>
        {children}
    </SocketContext.Provider>
  )


}

export default SocketProvider;