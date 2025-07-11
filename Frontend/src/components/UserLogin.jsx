// import { useState } from "react"
// import { User, Lock, Mail, X, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'
// import axios from "axios"

// const UserLogin = ({ isOpen, onClose, onLoginSuccess, onSwitchToSignup }) => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       // API call to authenticate user and get token
//       const response = await axios.post("http://localhost:3000/api/auth/userlogin", {
//         email: credentials.email,
//         password: credentials.password,
//       })

//       // Assuming the token is returned in response.data.token
//       const token = response.data.token;
//       localStorage.setItem("authToken", token); // Store token in local storage

//       onLoginSuccess("user", credentials.email)
//       setCredentials({ email: "", password: "" })
//       onClose()
//     } catch (err) {
//       setError("Invalid email or password. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleInputChange = (field, value) => {
//     setCredentials(prev => ({
//       ...prev,
//       [field]: value
//     }))
//     if (error) setError("")
//   }

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
//                 <User  className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900">Welcome Back</h3>
//                 <p className="text-sm text-gray-500">Sign in to your account</p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
//               <AlertCircle className="w-4 h-4 text-red-600" />
//               <span className="text-sm text-red-700">{error}</span>
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="email"
//                   value={credentials.email}
//                   onChange={(e) => handleInputChange("email", e.target.value)}
//                   className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={credentials.password}
//                   onChange={(e) => handleInputChange("password", e.target.value)}
//                   className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
//                   placeholder="Enter your password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center">
//                 <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
//                 <span className="ml-2 text-gray-600">Remember me</span>
//               </label>
//               <button type="button" className="text-rose-600 hover:text-rose-700 font-medium">
//                 Forgot password?
//               </button>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-rose-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Signing in...</span>
//                 </>
//               ) : (
//                 <>
//                   <User  className="w-4 h-4" />
//                   <span>Sign In</span>
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="mt-6 pt-4 border-t border-gray-200 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 onClick={onSwitchToSignup}
//                 className="text-rose-600 hover:text-rose-700 font-medium"
//               >
//                 Signup
//               </button>
//             </p>
//           </div>

//           <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
//             <CheckCircle className="w-3 h-3" />
//             <span>Secure login with end-to-end encryption</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserLogin
import { useState } from "react"
import { User, Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react'

const UserLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation
      if (credentials.email === "test@example.com" && credentials.password === "password") {
        localStorage.setItem("authToken", "mock-token")
        alert("Login successful!")
        // In your actual app, you would navigate to dashboard
        navigate("/dashboard")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 mb-6 font-medium"
          >
            <User className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm"
                  placeholder="Enter your password"
                  required
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-rose-600 hover:text-rose-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-rose-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => window.history.back()}
                className="text-rose-600 hover:text-rose-700 font-medium"
              >
                Signup
              </button>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <CheckCircle className="w-3 h-3" />
            <span>Secure login with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLogin