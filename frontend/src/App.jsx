import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import DriverLogin from "./pages/DriverLogin";
import DriverSignup from "./pages/DriverSignup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login-user" element={<UserLogin />} />

        <Route path="/register-user" element={<UserSignup />} />

        <Route path="/login-driver" element={<DriverLogin />} />

        <Route path="/register-driver" element={<DriverSignup />} />

      </Routes>
    </div>
  );
};

export default App;
