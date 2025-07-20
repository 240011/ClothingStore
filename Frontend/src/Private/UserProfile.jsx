"use client"

import { useState, useEffect } from "react"
import ProfileLayout from "../components/ProfileLayout"
import { Pencil, Save, User, Mail, Phone, MapPin } from "lucide-react"
import { getUserById, updateUser } from "../Services/userApi"

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
    address: "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId")
        if (!userId) {
          setError("User not logged in")
          setLoading(false)
          return
        }

        const response = await getUserById(userId)
        const userData = response.data.data

        setUserInfo({
          name: userData.name || "",
          gender: userData.gender || "",
          email: userData.email || "",
          mobile: userData.phone || "",
          address: userData.address || "",
        })
        setLoading(false)
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to fetch user data")
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleEdit = () => setIsEditing(true)

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId")
      if (!userId) {
        alert("User not logged in")
        return
      }

      const updateData = {
        name: userInfo.name,
        gender: userInfo.gender,
        email: userInfo.email,
        phone: userInfo.mobile,
        address: userInfo.address,
      }

      await updateUser(userId, updateData)
      alert("Profile saved successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("Failed to save profile. Please try again.")
    }
  }

  if (loading) {
    return (
      <ProfileLayout>
        <div className="min-h-screen flex items-center justify-center">Loading user data...</div>
      </ProfileLayout>
    )
  }

  if (error) {
    return (
      <ProfileLayout>
        <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>
      </ProfileLayout>
    )
  }

  return (
    <ProfileLayout>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 py-10 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Personal Information</h1>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-lg text-sm hover:from-rose-600 hover:to-purple-700 transition-all duration-200"
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
                placeholder="Name"
                className={`pl-10 py-3 w-full border rounded-lg text-sm ${
                  isEditing
                    ? "bg-white border-gray-300 focus:ring-2 focus:ring-rose-500"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={userInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={!isEditing}
                placeholder="Address"
                className={`pl-10 py-3 w-full border rounded-lg text-sm ${
                  isEditing
                    ? "bg-white border-gray-300 focus:ring-2 focus:ring-rose-500"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Gender</h3>
              <div className="flex gap-6">
                {["male", "female"].map((gender) => (
                  <label
                    key={gender}
                    className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={userInfo.gender === gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      disabled={!isEditing}
                      className="text-rose-500 focus:ring-rose-500"
                    />
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                placeholder="Email Address"
                className={`pl-10 py-3 w-full border rounded-lg text-sm ${
                  isEditing
                    ? "bg-white border-gray-300 focus:ring-2 focus:ring-rose-500"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="tel"
                value={userInfo.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                disabled={!isEditing}
                placeholder="Mobile Number"
                className={`pl-10 py-3 w-full border rounded-lg text-sm ${
                  isEditing
                    ? "bg-white border-gray-300 focus:ring-2 focus:ring-rose-500"
                    : "bg-gray-100 border-gray-200"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  )
}

export default UserProfile
