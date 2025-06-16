import { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import UserSignup from "./UserSignup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DriverContextData } from "../context/DriverContext";
import { toast } from "react-toastify";

const DriverLogin = () => {
  // 2 way binding
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [captainData, setCaptainData] = useState({});

  const { driver, setDriver } = useContext(DriverContextData);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const driver = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/drivers/login-driver`,
        driver
      );

      if (response.status == 200) {
        const data = response.data;
        setDriver(data.driver);
        localStorage.setItem("token", data.token);
        navigate("/driver-home");
        toast.success("Login successful!"); // Optional
      }
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error while logging Driver:", error);
      toast.error("Invalid credentials!");
    }
  };
  return (
    <div className="p-7 flex h-screen flex-col justify-between">
      <div>
        <img className="w-16 mb-4" src="/src/assets/Logo.png" alt="logo"></img>
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-white mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Want to join our fleet?
          {/* <br/> */}
          <Link to="/register-driver" className="text-blue-600">
            Register as a driver
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login-user"
          className="bg-orange-400 flex justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign In as user
        </Link>
      </div>
    </div>
  );
};

export default DriverLogin;
