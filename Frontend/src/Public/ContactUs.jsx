"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const ContactUs = () => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Placeholder functions for Header props
  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  const handleCategoryChange = (category) => {
    navigate(`/?category=${category}`)
  }

  const handleShowFavorites = () => {
    navigate("/?favorites=true")
  }

  const handleShowCart = () => {
    // Cart functionality would be handled here
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <>
      <Header
        onSearchChange={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory="All"
        onShowFavorites={handleShowFavorites}
        favoritesCount={favorites.length}
        onShowCart={handleShowCart}
        cartItemsCount={cartItems.length}
      />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-rose-500 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-90">Get in touch with our team for any questions or support.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      placeholder="Your Email"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                      placeholder="Your Message"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Info & Location */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Store</h2>

                {/* Contact Details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    <div>
                      <p className="font-medium text-gray-900">New Baneshwor</p>
                      <p className="text-gray-600">Kathmandu, Nepal</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-rose-600" />
                    <div>
                      <p className="text-gray-900">+977 1-123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-rose-600" />
                    <div>
                      <p className="text-gray-900">hello@trendmandu.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-rose-600" />
                    <div>
                      <p className="text-gray-900">Mon-Fri: 9AM-8PM</p>
                      <p className="text-gray-600">Sat-Sun: 10AM-6PM</p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Store Location</p>
                    <p className="text-sm text-gray-500">New Baneshwor, Kathmandu, Nepal</p>
                  </div>
                </div>

                <button
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                  className="w-full mt-4 border-2 border-rose-500 text-rose-600 px-6 py-3 rounded-lg font-semibold hover:bg-rose-50 transition-colors"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TrendMandu</h3>
              <p className="text-gray-400">Premium fashion for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => navigate("/")} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/aboutus")} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/contact")} className="hover:text-white transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => handleCategoryChange("T-Shirts")}
                    className="hover:text-white transition-colors"
                  >
                    T-Shirts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryChange("Jeans")} className="hover:text-white transition-colors">
                    Jeans
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleCategoryChange("Dresses")}
                    className="hover:text-white transition-colors"
                  >
                    Dresses
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrendMandu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default ContactUs
