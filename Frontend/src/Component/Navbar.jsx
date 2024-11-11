import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice"; // Assuming you have a userSlice to update user data
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const handleUserPosts = () => {
    navigate(`/user-posts/${user.id}`);
  };

  const handleAddPost = () => {
    navigate("/add-post");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          BlogPost
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu for Desktop */}
        <div className="hidden md:flex md:items-center md:space-x-6 ml-auto">
          {/* Conditional rendering for Login/Logout */}
          <div className="flex items-center space-x-6">
            {!user ? (
              <button
                onClick={() => navigate("/login")} // Add logic to redirect to login page
                className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            ) : (
              <>
                {/* Add Post button */}
                <button
                  onClick={() => navigate("/newpost")}
                  className="text-white hover:text-gray-400 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Post
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden mt-4 space-y-4`}
      >
        <div className="flex flex-col items-center">
          {/* Conditional rendering for Login/Logout */}
          {!user ? (
            <button
              onClick={() => navigate("/login")} // Add logic to redirect to login page
              className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <>
              {/* User's Posts button */}
              {/* Add Post button */}
              <button
                onClick={() => navigate("/newpost")}
                className="text-white hover:text-gray-400 bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Add Post
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
