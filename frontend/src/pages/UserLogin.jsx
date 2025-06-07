import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserContextData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserLogin = () => {
  // 2 way binding
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});


  const { user, setUser } = React.useContext(UserContextData);

  const navigate = useNavigate();


  const submitHandler = async(e) => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password,
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login-user`, userData);

    if(response.status===200){
      const data = response.data;
      setUser(data.user);
      // if the user refreshes the login page, the context data will get lost, so we give the token to the context.
      localStorage.setItem("token", data.token);
      navigate('/home');
      // This will redirect the user to the home page after successful login.
    }

    setEmail("");
    setPassword("");
    // This will reset/clear the email and password.
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
          New here?
          <Link to="/register-user" className="text-blue-600">
            Create new account
          </Link>
        </p>
      </div>

      <div>
        <Link
          to="/login-driver"
          className="bg-blue-500 flex justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign In as driver
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
