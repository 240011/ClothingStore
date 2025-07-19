"use client"

import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { User, History, MapPin, LogOut } from "lucide-react"

const ProfileLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const handleLogoutClick = () => {
    setShowLogoutPopup(true)
  }

  const confirmLogout = () => {
    // Dummy frontend logout: clear fake auth and redirect
    localStorage.removeItem("userToken") // or any frontend-only state cleanup
    navigate("/")
  }

  const cancelLogout = () => {
    setShowLogoutPopup(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex pt-[100px] min-h-screen">
        <aside className="w-[250px] bg-[#f0f4f4] p-5 flex flex-col shadow-md">
          <div className="flex items-center space-x-4 mb-10 mt-5">
            <div className="w-12 h-12 rounded-full bg-gray-400"></div>
            <p className="text-gray-700 text-sm">
              Hello
              <br />
              <strong>User</strong>
            </p>
          </div>

          <nav className="flex flex-col gap-4 text-left">
            <Link
              to="/profile"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/profile") ? "bg-teal-600 text-white" : "hover:bg-teal-600 hover:text-white"
              }`}
            >
              <User className="mr-3 w-4 h-4" /> Profile information
            </Link>

            <Link
              to="/manage-addresses"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/manage-addresses") ? "bg-teal-600 text-white" : "hover:bg-teal-600 hover:text-white"
              }`}
            >
              <MapPin className="mr-3 w-4 h-4" /> Manage Address
            </Link>

            <Link
              to="/order-history"
              className={`flex items-center px-4 py-2 rounded-md ${
                isActive("/order-history") || isActive("/profile/return-refund")
                  ? "bg-teal-600 text-white"
                  : "hover:bg-teal-600 hover:text-white"
              }`}
            >
              <History className="mr-3 w-4 h-4" /> History
            </Link>
          </nav>

          <div
            onClick={handleLogoutClick}
            className="mt-auto text-red-600 flex items-center cursor-pointer px-4 py-3 hover:bg-red-100 rounded-md"
          >
            <LogOut className="mr-2 w-4 h-4" /> Logout
          </div>
        </aside>

        <main className="flex-1 bg-white shadow-sm">{children}</main>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs">
            <p className="text-gray-700 text-base">Are you sure you want to log out?</p>
            <div className="mt-6 flex justify-around">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 font-semibold"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 font-semibold"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileLayout
