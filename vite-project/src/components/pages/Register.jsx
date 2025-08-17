import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!name || !phone || !email || !password) {
      alert("All fields are required");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/register", {
        name,
        phone,
        email,
        password,
      });

      if (res.data.success) {
        alert("Registration successful");
        navigate("/Login");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-red-50">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md mt-10 mx-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-red-700">
            Register
          </h2>

          <label className="block mb-2 font-semibold">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mb-4 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full mb-4 p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0-9]{10}"
            maxLength="10"
            required
          />

          <label className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mb-4 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block mb-2 font-semibold">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            className="w-full mb-4 p-2 border rounded"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-all"
            onClick={handleSubmit}
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right: Text Section (hidden on small screens) */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-red-50 p-16">
        <div className="text-center md:text-left max-w-md space-y">
          <h1 className="text-4xl font-bold text-black">
            Join <span className="text-red-600">Hen²Home</span>
          </h1>
          <p className="text-lg text-gray-800 font-medium">
            Experience the finest quality fresh chicken delivered straight from
            our farm to your table with guaranteed freshness and taste.
          </p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Same-day fast & hygienic delivery</li>
            <li>100% Fresh, Antibiotic-free Chicken</li>
            <li>Cold-chain packed for maximum hygiene</li>
            <li>Trusted by 10,000+ happy households</li>
            <li>Easy returns & customer-first support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
