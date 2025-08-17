import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-red-100 text-gray-800  pt-12 w-full max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 pb-12">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-red-600 mb-4">
            Hen²Home
          </h2>
          <p className="text-sm leading-6">
            We deliver premium quality, fresh and hygienic chicken to your
            doorstep. Trusted by thousands of families every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-1 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-red-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-1 mb-4">
            Contact
          </h3>
          <ul className="space-y-3 text-sm">
            <li>Email: kfaiz3361@gmail.com</li>
            <li>Phone: +91 9125529669</li>
            <li>Address: Nadi Chandauli, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-red-500 inline-block pb-1 mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 mt-2">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 hover:bg-red-500 hover:text-white transition"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-red-100 text-center text-sm text-gray-700 py-4">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-red-600">Hen²Home</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
