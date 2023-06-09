import React, { useContext, useState } from "react";

import { UserContext } from "@/contexts/UserContext";
import Authentication from "../Authentication";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export const scrollToSection = (sectionName) => {
  const section = document.querySelector(`#${sectionName}`);
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

const handleLogOut = (event) => {
  event.preventDefault();
  localStorage.removeItem("userSession");
  window.location.reload();
};

const Navbar = () => {
  const { u, token, loggingIn } = useContext(UserContext);
  const [user] = u;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar p-3">
      {loggingIn ? (
        <div className="navbar-start">
          <label
            tabIndex={0}
            className="btn btn-ghost normal-case text-lg md:text-3xl"
          >
            <span
              className="logo-gradient"
              onClick={() => scrollToSection("home")}
            >
              summary
            </span>
          </label>
        </div>
      ) : (
        <>
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex="0" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex="0"
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => scrollToSection("steps")}>
                    How Summary Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("pricing")}>
                    Pricing Plans
                  </button>
                </li>
              </ul>
            </div>
            <label
              tabIndex={0}
              className="btn btn-ghost normal-case text-lg md:text-3xl invisible lg:visible"
            >
              <span
                className="logo-gradient"
                onClick={() => scrollToSection("home")}
              >
                summary
              </span>
            </label>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal p-0">
              <li>
                <button
                  onClick={() => scrollToSection("steps")}
                  className="btn btn-ghost rounded-full"
                >
                  How Summary Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="btn btn-ghost rounded-full"
                >
                  Pricing Plans
                </button>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border-blue-500"
                >
                  <div className="avatar placeholder">
                    <div className="bg-white bg-opacity-10 text-neutral-content rounded-full w-10">
                      <span className="text-lg">
                        {user?.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="text-gradient">
                    <span className="hover:cursor-default hover:bg-inherit">
                      Your Credit Balance: {user.credits}
                    </span>
                    <div className="menu-title hover:bg-inherit hover:cursor-default">
                      <button
                        className="btn bg-transparent hover:border-blue-300 text-gradient border-blue-500 btn-sm shadow-md shadow-blue-500"
                        onClick={() => {
                          scrollToSection("pricing");
                        }}
                      >
                        Add Credits
                      </button>
                    </div>
                  </li>
                  <div className="divider my-0" />
                  <li>
                    <label htmlFor="reset" className="active:bg-blue-500">
                      Change Password
                    </label>
                  </li>
                  <li>
                    <span
                      onClick={(event) => handleLogOut(event)}
                      className="active:bg-blue-500"
                    >
                      Log Out
                    </span>
                  </li>
                </ul>
                <ChangePasswordForm token={token} />
              </div>
            ) : (
              <>
                <label
                  className="btn btn-ghost rounded-full"
                  onClick={() => setIsOpen(true)}
                >
                  SIGN UP / LOG IN
                </label>
                <Authentication isOpen={isOpen} setIsOpen={setIsOpen} />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
