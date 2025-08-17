import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
// import legpic from "../../../public/legpic.jpg";
import sld8 from "../../../public/slid2.png";

import { useAuth } from "../../auth/AuthContext"; // ✅ IMPORT THIS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // const handleGoogleSuccess = async (response) => {
  //   try {
  //     const credential = response.credential;
  //     await axios.post(
  //       "http://localhost:5000/auth/google",
  //       { credential },
  //       { withCredentials: true }
  //     );
  //     alert("Google login successful");
  //     // login(res.data.user);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Google login error", error);
  //     alert("Google login failed");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log("User from backend:", res.data.user); 
        login({ ...res.data.user, token: res.data.token });

        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server error");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-yellow-50 p-4">
      <div className="flex flex-col-reverse md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-4xl font-bold text-red-600 text-center">
            Welcome to Chicken Fresh
          </h2>
          <p className="text-center text-gray-500">
            Sign in to order fresh, juicy chicken at your doorstep!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <span
              className="text-red-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register now
            </span>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="w-full md:w-1/2">
          <img
            // src={legpic}
            src={sld8}
            alt="Chicken Leg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
