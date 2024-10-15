import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Updated import
import { toast } from 'react-hot-toast';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
    });
    onLogout(); // Call the logout function passed as a prop
    toast.success("Logout Successfull");
    navigate("/login"); // Redirect to login page after logout
  };


  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company Logo"
            />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-lg font-semibold leading-6 text-gray-900 focus:outline-none"
            >
              Product
              <svg
                className="w-3 h-3 ml-1"
                fill="none"
                viewBox="0 0 10 6"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l4 4 4-4"
                />
              </svg>
            </button>

            {/* Dropdown menu for desktop */}
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white divide-y divide-gray-100">
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <NavLink
                      to="/product1"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Product 1
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/product2"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Product 2
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-semibold leading-6 text-gray-900 underline"
                : "text-lg font-semibold leading-6 text-gray-900"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              isActive
                ? "text-lg font-semibold leading-6 text-gray-900 underline"
                : "text-lg font-semibold leading-6 text-gray-900"
            }
          >
            About
          </NavLink>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <button
              onClick={handleLogout} // Create this function to handle logout
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log out
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-sm font-semibold leading-6 text-gray-900 underline"
                  : "text-sm font-semibold leading-6 text-gray-900"
              }
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50"></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Company logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={toggleMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 flex items-center justify-between w-full"
                    >
                      Product
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1l4 4 4-4"
                        />
                      </svg>
                    </button>

                    {/* Dropdown menu for mobile */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white divide-y divide-gray-100">
                        <ul
                          className="py-2 text-sm text-gray-700"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <NavLink
                              to="/product1"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Product 1
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/product2"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Product 2
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) =>
                      isActive
                        ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 underline"
                        : "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    }
                  >
                    Pricing
                  </NavLink>
                  <NavLink
                    to="/aboutus"
                    className={({ isActive }) =>
                      isActive
                        ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 underline"
                        : "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    }
                  >
                    About
                  </NavLink>
                </div>
                <div className="py-6">
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout} // Create this function to handle logout
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log out
                    </button>
                  ) : (
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 underline"
                          : "-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      }
                    >
                      Log in
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
