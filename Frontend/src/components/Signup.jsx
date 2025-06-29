"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, Lock, Mail, ArrowLeft } from "lucide-react"
import DataTable from "./DataTable"

const Signup = () => {
  const [state, setState] = useState({ message: "", success: false, errors: {} })
  const [pending, setPending] = useState(false)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const savedUserData = localStorage.getItem("registeredUsers")
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData))
      } catch (error) {
        console.error("Error loading user data from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (userData.length > 0) {
      localStorage.setItem("registeredUsers", JSON.stringify(userData))
    }
  }, [userData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPending(true)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    if (data.password !== data.confirmPassword) {
      setState({ message: "Passwords do not match.", success: false, errors: {} })
      setPending(false)
      return
    }

    try {
      const newUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString(),
      }

      setUserData((prevData) => [...prevData, newUser])
      e.target.reset()
      setState({ message: "Account created successfully!", success: true, errors: {} })
      setPending(false)
    } catch (error) {
      setState({ message: error.message || "Signup failed. Please try again.", success: false, errors: {} })
      setPending(false)
    }
  }

  const handleDeleteUser = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUserData = userData.filter((_, i) => i !== index)
      setUserData(updatedUserData)

      if (updatedUserData.length === 0) {
        localStorage.removeItem("registeredUsers")
      } else {
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUserData))
      }

      setState({ message: "User deleted successfully.", success: true, errors: {} })
    }
  }

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all registered users? This action cannot be undone.")) {
      setUserData([])
      localStorage.removeItem("registeredUsers")
      setState({ message: "All user data cleared successfully.", success: true, errors: {} })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link to="/userlogin" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Already have an account? Login</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join TrendMandu and start shopping</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {state.message && (
              <div
                className={`px-4 py-3 rounded-lg ${
                  state.success
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-rose-50 border border-rose-200 text-rose-700"
                }`}
                aria-live="polite"
              >
                {state.message}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Create a strong password"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {pending ? "Creating Account..." : "Create Account"}
            </button>

            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/userlogin" className="text-blue-600 hover:underline font-medium">
                Log in
              </Link>
            </p>
          </form>
        </div>

        {userData.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleClearAllData}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
            >
              Clear All Data
            </button>
          </div>
        )}

        <DataTable userData={userData} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  )
}

export default Signup
