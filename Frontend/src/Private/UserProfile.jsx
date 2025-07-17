"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react"
 // Ensure this import path is correct

const UserProfile = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchUserInfo = async () => {
    try {
      const response = await userapi.get("/api/auth/init")
      setProfileData(response.data.data)
    } catch (error) {
      console.error("Failed to fetch user info", error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const userEmail = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!token || !userEmail) {
      navigate("/signup")
      return
    }

    setCurrentUser({ email: userEmail, type: userType })
    fetchUserInfo()
  }, [navigate])

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      await userapi.put(`/api/users/${profileData.id}`, profileData)
      setIsEditing(false)
      fetchUserInfo()
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Profile update failed:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }

    setLoading(true)
    try {
      // Replace this with your API call when ready
      alert("Password updated successfully!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setShowPasswordForm(false)
    } catch (error) {
      alert("Failed to update password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 ${
                  isEditing ? "border-gray-300 bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent" : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 ${
                  isEditing ? "border-gray-300 bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent" : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={profileData.gender === "male"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  disabled={!isEditing}
                  className="mr-2 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={profileData.gender === "female"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  disabled={!isEditing}
                  className="mr-2 text-rose-600 focus:ring-rose-500"
                />
                <span className="text-gray-700">Female</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={profileData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm text-gray-700 ${
                  isEditing ? "border-gray-300 bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent" : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
                placeholder="Enter your mobile number"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            {isEditing && (
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700"
              >
                Save
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Password & Security</span>
            </h3>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordForm && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  onClick={handlePasswordChange}
                  disabled={
                    loading ||
                    !passwordData.currentPassword ||
                    !passwordData.newPassword ||
                    !passwordData.confirmPassword
                  }
                  className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
