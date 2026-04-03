// src/components/layouts/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full h-12 bg-red-600 text-white p-2">
      <button className="bg-red-600 p-2 list-none rounded hover:bg-gray-800">
        <Link to="/">
          <li>Eat All</li>
        </Link>
      </button>
      <div className="flex gap-10 list-none">
        <Link to="/">
          <li className="hover:text-black">Home</li>
        </Link>
        <Link to="/about">
          <li className="hover:text-black">About</li>
        </Link>
        <Link to="/contact">
          <li className="hover:text-black">Contact Us</li>
        </Link>
      </div>
      <div className="flex gap-5 list-none">
        <Link to="/auth/login">
          <li className="hover:text-black">Sign In</li>
        </Link>
        <Link to="/auth/register">
          <li className="hover:text-black">Sign Up</li>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;