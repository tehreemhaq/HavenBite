import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const NavAuthBtns = ({ isMobile = false }) => {
  const { loggedInUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  // Get initials from username e.g. "john_doe" → "J"
  const getInitial = (username) => username?.charAt(0).toUpperCase() ?? "?";

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
        {loggedInUser ? (
          <>
            {/* Profile row */}
            <Link
              to="/profile"
              className="flex items-center gap-3 text-gray-600 hover:text-[#2D5016] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#2D5016] text-white text-sm font-bold flex items-center justify-center">
                {getInitial(loggedInUser.username)}
              </div>
              <span className="text-sm font-medium capitalize">{loggedInUser.username}</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full text-left text-sm text-[#C8572B] hover:text-[#a0431f] transition-colors font-medium"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button className="w-full text-left text-gray-600 hover:text-gray-900">
              <Link to='/login'>Login</Link>
            </button>
            <button className="w-full bg-[#2D5016] hover:bg-green-800 text-white py-2 rounded-md">
              <Link to='/register'>Register</Link>
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center space-x-4">
      {loggedInUser ? (
        <>
         

          {/* Avatar — links to profile */}
          <Link to="/profile">
            <div className="w-9 h-9 rounded-full bg-[#2D5016] text-white text-sm font-bold flex items-center justify-center hover:bg-[#3a6b1e] transition-colors cursor-pointer">
              {getInitial(loggedInUser.username)}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button className="text-gray-600 hover:text-gray-900 transition">
            <Link to='/login'>Login</Link>
          </button>
          <button className="bg-[#2D5016] hover:bg-green-800 text-white px-5 py-1 rounded-md transition">
            <Link to='/register'>Register</Link>
          </button>
        </>
      )}
    </div>
  );
}

export default NavAuthBtns