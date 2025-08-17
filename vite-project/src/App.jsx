import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Buy from "./components/pages/Buy";
import AboutPage from "./components/pages/AboutPage";
import Orders from "./components/pages/Orders";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default App;
