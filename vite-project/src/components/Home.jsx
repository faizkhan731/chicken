import React from "react";
import Navigation from "./pages/Navigation";
import Carousel from "./pages/Carousel";
import OurProducts from "./pages/OurProducts";
import Products from "./pages/Products";
import Footer from "./pages/Footer";

const Home = () => {
  return (
    <>
     
      <Navigation />

      <Carousel />

      <OurProducts />
      <Products />
      <Footer />
    </>
  );
};

export default Home;
