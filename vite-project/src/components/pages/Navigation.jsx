import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
  FaHome,
  FaInfoCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AuthContext } from "../../auth/AuthContext";

const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="bg-red-200 shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/h2h.png"
              alt="Hen2Home Logo"
              className="h-15 w-15 rounded-full border border-red-500"
            />
            <span>
              {" "}
              {/* Stylized H2H Text */}
              <div className="mb-1">
                <h1 className="text-2xl sm:text-1xl font-black text-white tracking-wider relative">
                  <span className="relative inline-block">
                    H
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </span>
                  <span className="text-red-500 mx-1 text-3xl sm:text-4xl">
                    2
                  </span>
                  <span className="relative inline-block">
                    H
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </span>
                </h1>
                <div className="h-1 w-20 bg-black mx-auto rounded-full mt-2"></div>
              </div>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <NavLink to="/" icon={<FaHome />} text="Home" />
            <NavLink to="/about" icon={<FaInfoCircle />} text="About" />
            {isAuthenticated ? (
              <>
                {/* <NavLink to="/cart" icon={<FaShoppingCart />} text="Cart" /> */}
                <NavLink to="/orders" icon={<FaBoxOpen />} text="My Orders" />
                <button
                  onClick={logout}
                  className="flex items-center gap-1 text-black hover:text-red-500 transition"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" icon={<FaSignInAlt />} text="Login" />
                <NavLink to="/register" icon={<FaUserPlus />} text="Register" />
              </>
            )}
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {menuOpen ? (
                <FaTimes size={22} className="text-red-600" />
              ) : (
                <FaBars size={22} className="text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-3 text-sm pt-4 pb-6 bg-red-200 border-t font-medium">
            <NavLink
              to="/"
              icon={<FaHome />}
              text="Home"
              onClick={toggleMenu}
            />
            <NavLink
              to="/about"
              icon={<FaInfoCircle />}
              text="About"
              onClick={toggleMenu}
            />
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/orders"
                  icon={<FaBoxOpen />}
                  text="My Orders"
                  onClick={toggleMenu}
                />
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 px-2 text-black hover:text-red-500"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  icon={<FaSignInAlt />}
                  text="Login"
                  onClick={toggleMenu}
                />
                <NavLink
                  to="/register"
                  icon={<FaUserPlus />}
                  text="Register"
                  onClick={toggleMenu}
                />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-1 px-2 text-black hover:text-red-500 transition"
  >
    {icon} {text}
  </Link>
);

export default Navigation;
