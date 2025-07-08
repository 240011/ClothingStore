import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, ShoppingCart, User, Menu, X, Heart, Shield, LogOut } from 'lucide-react'
import AdminLogin from './AdminLogin'
import UserLogin from './UserLogin'

const Header = ({ onSearchChange, onCategoryChange, selectedCategory, onShowFavorites, favoritesCount, onShowCart, cartItemsCount }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const [isUserLoginOpen, setIsUserLoginOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()

  const categories = ["All", "T-Shirts", "Jeans", "Dresses", "Accessories"]

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchChange(query)
  }

  const handleAdminLoginSuccess = () => {
    setCurrentUser({ type: 'admin', email: "admin@trendmandu.com" })
    navigate('/admin')
  }

  const handleUserLoginSuccess = (userType, email) => {
    setCurrentUser({ type: userType, email })
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  const handleSwitchToSignup = () => {
    setIsUserLoginOpen(false)
    navigate("/signup")
  }

  const getUserInitials = (email) => {
    if (!email) return "U"
    return email.split('@')[0].substring(0, 2).toUpperCase()
  }

  const renderUserSection = () => {
    if (currentUser) {
      return (
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentUser.type === 'admin' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                : 'bg-gradient-to-r from-rose-500 to-purple-600'
            }`}>
              <span className="text-white font-medium text-xs">
                {getUserInitials(currentUser.email)}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {currentUser.type === 'admin' ? 'Admin' : 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-24">
                {currentUser.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsAdminLoginOpen(true)}
          className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
          title="Admin Access"
        >
          <Shield className="w-5 h-5" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>

        <button
          onClick={() => setIsUserLoginOpen(true)}
          className="flex items-center space-x-2 text-gray-700 hover:text-rose-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Login</span>
        </button>
      </div>
    )
  }

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <span className="text-xl font-bold text-gray-900">TrendMandu</span>
            </button>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for clothing..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-rose-100 text-rose-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Favorites */}
              <button
                onClick={onShowFavorites}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Heart className="w-6 h-6" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button 
                onClick={onShowCart}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              {/* User Section */}
              <div className="hidden md:flex">
                {renderUserSection()}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for clothing..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category)
                      setIsMenuOpen(false)
                    }}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-rose-100 text-rose-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 pt-4">
                {currentUser ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentUser.type === 'admin' 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600' 
                          : 'bg-gradient-to-r from-rose-500 to-purple-600'
                      }`}>
                        <span className="text-white font-medium text-xs">
                          {getUserInitials(currentUser.email)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {currentUser.type === 'admin' ? 'Admin' : 'User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setIsAdminLoginOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors w-full"
                    >
                      <Shield className="w-5 h-5" />
                      <span className="text-sm font-medium">Admin Access</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsUserLoginOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors w-full"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-sm font-medium">User Login</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Login Modals */}
      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      <UserLogin
        isOpen={isUserLoginOpen}
        onClose={() => setIsUserLoginOpen(false)}
        onLoginSuccess={handleUserLoginSuccess}
        onSwitchToSignup={handleSwitchToSignup}
        
      />
    </>
  )
}

export default Header