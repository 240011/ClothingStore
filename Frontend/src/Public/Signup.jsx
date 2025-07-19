import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { User, Lock, Mail, Phone, Home, X, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import axios from "axios"
import { createUser  } from "../Services/userApi"
import DataTable from "./DataTable"

const Signup = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({ message: "", success: false, errors: {} })
  const [pending, setPending] = useState(false)
  const [userData, setUserData] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users")
        setUserData(response.data.data)
      } catch (error) {
        console.error("Failed to fetch users from backend:", error)
      }
    }
    fetchUsers()
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (state.message) setState({ message: "", success: false, errors: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setPending(true)

    if (formData.password !== formData.confirmPassword) {
      setState({ message: "Passwords do not match.", success: false, errors: {} })
      setPending(false)
      return
    }

    try {
      const { name, email, phone, address, gender, password } = formData

      // CreateUser API call
      const response = await createUser ({
        name,
        email,
        password,
        phone,
        address,
        gender,
      })

      // Update userData state with new user from backend response
      setUserData((prevData) => [...prevData, response.data.data])

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        password: "",
        confirmPassword: "",
      })
      setState({ message: "Account created successfully!", success: true, errors: {} })
      setPending(false)

      // Navigate to user login page after successful registration
      setTimeout(() => navigate("/userlogin"), 1000)
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Registration failed. Please try again."
      setState({ message: errMsg, success: false, errors: {} })
      setPending(false)
    }
  }

  const handleDeleteUser  = async (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const userToDelete = userData[index]
        await axios.delete(`http://localhost:3000/api/users/${userToDelete.id}`)
        const updatedUserData = userData.filter((_, i) => i !== index)
        setUserData(updatedUserData)
        setState({ message: "User deleted successfully.", success: true, errors: {} })
      } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Failed to delete user."
        setState({ message: errMsg, success: false, errors: {} })
      }
    }
  }

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all registered users? This action cannot be undone.")) {
      // Optionally, implement backend API to delete all users if needed
      setUserData([])
      setState({ message: "All user data cleared successfully.", success: true, errors: {} })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 mb-6 font-medium"
          >
            <User className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User  className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join TrendMandu and start shopping</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {state.message && (
              <div
                className={`p-4 rounded-lg flex items-center space-x-2 ${
                  state.success
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
                aria-live="polite"
              >
                {state.success ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span className="text-sm">{state.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                    placeholder="9842123456"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                  placeholder="Kathmandu, Nepal"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-colors text-sm"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-rose-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <User  className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>

             <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/userlogin" className="text-rose-600 hover:text-rose-700 font-medium">
                  Log in
                </Link>
              </p>
            </div>
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
              <CheckCircle className="w-3 h-3" />
              <span>Secure registration with data encryption</span>
            </div>
          </form>
        </div>

        {/* Data Management */}
        {userData.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleClearAllData}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Clear All Data</span>
            </button>
          </div>
        )}

        <DataTable userData={userData} onDeleteUser ={handleDeleteUser } />
      </div>
    </div>
  )
}

export default Signup
