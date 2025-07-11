import { useState } from "react"
import { Shield, Lock, Mail, Settings, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      if (credentials.email === "admin@trendmandu.com" && credentials.password === "admin123") {
        // Store login info
        localStorage.setItem("authToken", "demo-token")
        localStorage.setItem("userType", "admin")
        localStorage.setItem("userEmail", credentials.email)

        navigate("/admin") // Redirect to homepage or admin dashboard
      } else {
        setError("Invalid admin credentials. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (error) setError("")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Admin Access</h3>
            <p className="text-sm text-gray-500">Secure administrative login</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="admin@trendmandu.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Enter admin password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Access Admin Panel</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 flex items-center space-x-2">
          <Settings className="w-3 h-3" />
          <span>Demo credentials: admin@trendmandu.com / admin123</span>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
