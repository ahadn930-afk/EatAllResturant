// src/components/layouts/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-1 py-4 lg:py-6">
      <footer className="bg-neutral-primary-soft shadow-md border-t border-gray-100 shadow-[0px_0px_5px_2px_rgba(0,0,0,0.1)]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-7 me-3"
                  alt="FlowBite Logo"
                />
                <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">
                  EatAll
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <Link to="/about">
                  <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                    About Us
                  </h2>
                </Link>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <Link to="/contact" className="">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <Link to="/auth/login">
                  <h2 className="mb-6 text-sm font-semibold text-heading uppercase">
                    Sign In
                  </h2>
                </Link>
                <ul className="text-body font-medium">
                  <li className="mb-4">
                    <Link to="/auth/register" className="">
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-default sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-body sm:text-center">
              © 2026 <Link to="/" className="hover:underline">
                EatAll™
              </Link>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;