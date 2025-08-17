import React from "react";
import { Heart, Award, Truck } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-red-100">
      <div className="max-w-4xl mx-auto px-6 py-12 ">
        {/* Story */}
        <div className="text-center mb-12 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-black mb-4">Our Story</h2>
          <p className="text-lg text-black leading-relaxed max-w-2xl mx-auto">
            Hamzato is dedicated to providing families with the freshest,
            highest quality chicken meat. We source from trusted farms and
            deliver directly to your doorstep, ensuring every meal starts with
            premium ingredients.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-orange-50 rounded-lg">
            <Heart className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-600">
              Hand-selected chicken from certified farms
            </p>
          </div>

          <div className="text-center p-6 bg-red-50 rounded-lg">
            <Award className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Food Safety
            </h3>
            <p className="text-gray-600">
              Highest hygiene and safety standards
            </p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-lg">
            <Truck className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600">Fresh delivery right to your door</p>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-red-100 text-black rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Our Mission</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            To provide the freshest, highest quality chicken meat while
            maintaining exceptional service and supporting your family's healthy
            lifestyle.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-black mb-4">
            Ready to taste the difference?
          </h3>
          <button
            className="border-2 border-red-300 hover:bg-white text-black px-8 py-3 rounded-lg font-semibold text-lg transition-colors mr-4"
            onClick={() => (window.location.href = "/")}
          >
            Shop Now
          </button>
          <button
            className="border-2 border-red-300 text-black hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            onClick={() => (window.location.href = "/")}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};
export default AboutPage;
