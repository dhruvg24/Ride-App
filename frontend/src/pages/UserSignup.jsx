import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import UserSignup from "./UserSignup";
import axios from "axios";
import { UserContextData } from "../context/UserContext";
import { toast } from "react-toastify";
const UserSignup = () => {
  // 2 way binding
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const { user, setUser } = React.useContext(UserContextData);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register-user`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        toast.success("Signup successful!");
        // if the user refreshes the signup page, the context data will get lost, so we give the token to the context.
        navigate("/home");
      }

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      // This will reset/clear the email, password, firstName and lastName.
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Signup failed, pls try again"
      );

      console.error("Signup error:", err);
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
          <h3 className="text-base font-medium mb-2">What's your Name</h3>
          <div className="flex gap-3 mb-5">
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="first name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
              type="text"
              placeholder="last name"
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-base mb-2 font-medium">Enter Password</h3>
          <input
            className="bg-white mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm">
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/login-user" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        {/* terms/policy */}
        <p className="text-xs text-gray-500 text-center leading-tight">
          By proceeding you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
