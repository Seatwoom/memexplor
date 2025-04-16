import React from "react";
import { Navbar, NavbarBrand, Link } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemes } from "../hooks/useMemes";

const NavbarComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetLikes } = useMemes();

  const isActive = (path) => location.pathname === path;

  const handleResetData = () => {
    resetLikes();
  };

  return (
    <Navbar
      className="bg-navy-900 py-3 fixed top-0 z-50 w-full"
      maxWidth="full"
      style={{ backgroundColor: "#0a1128" }}
    >
      <div className="w-full flex items-center px-4">
        <div className="flex-1">
          <NavbarBrand>
            <p className="font-bold text-2xl text-white tracking-wider">
              memexplor
            </p>
          </NavbarBrand>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="flex gap-6">
            <Link
              className={`text-white transition-all duration-300 ${
                isActive("/") ? "font-bold scale-105" : "hover:scale-105"
              }`}
              href="/"
              onPress={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <div className="hidden sm:flex items-center justify-center text-lg px-2 whitespace-nowrap">
                Table View
              </div>
              <span className="sm:hidden flex items-center justify-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
            </Link>

            <Link
              className={`text-white transition-all duration-300 ${
                isActive("/cards") ? "font-bold scale-105" : "hover:scale-105"
              }`}
              href="/cards"
              onPress={(e) => {
                e.preventDefault();
                navigate("/cards");
              }}
            >
              <div className="hidden sm:flex items-center justify-center text-lg px-2 whitespace-nowrap">
                Card View
              </div>
              <span className="sm:hidden flex items-center justify-center p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <Link
            className="text-white transition-all duration-300 hover:scale-105"
            href="#"
            onPress={handleResetData}
          >
            <div className="hidden sm:flex items-center justify-center text-lg px-2 whitespace-nowrap">
              Reset Data
            </div>
            <span className="sm:hidden flex items-center justify-center p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
