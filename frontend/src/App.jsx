import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import DriverLogin from "./pages/DriverLogin";
import DriverSignup from "./pages/DriverSignup";
import { UserContextData } from "./context/UserContext";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import DriverHome from "./pages/DriverHome";
import DriverProtectWrapper from "./pages/DriverProtectWrapper";
import DriverLogout from "./pages/DriverLogout";
import Riding from "./pages/Riding";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />

        <Route
          path = '/driver-home' element={<DriverProtectWrapper>
            <DriverHome/>
          </DriverProtectWrapper>}
        />

        <Route path="/login-user" element={<UserLogin />} />

        <Route path='/riding' element = {<Riding />} />

        <Route path="/register-user" element={<UserSignup />} />

        <Route path="/login-driver" element={<DriverLogin />} />

        <Route path="/register-driver" element={<DriverSignup />} />

        <Route
          path="/users/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/drivers/logout"
          element={
            <DriverProtectWrapper>
              <DriverLogout />
            </DriverProtectWrapper>
          }
        />
              

        
      </Routes>
    </div>
  );
};

export default App;
