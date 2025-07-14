"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { Users, Award, Truck, Heart, Star, ArrowRight } from "lucide-react"

// ✅ Import image from src/Image folder
import dhirajImg from "../Image/Dhiraj.jpg" 
import anuzImg from "../Image/Anuz.jpg" // Assuming you have an image for Anuz
import akhileshImg from "../Image/Akhilesh.jpg" // Assuming you have an image for Akhilesh
// adjust path if needed

const AboutUs = () => {
  const navigate = useNavigate()
  const [favorites, setFavorites] = useState([])
  const [cartItems, setCartItems] = useState([])

  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`)
  }

  const handleCategoryChange = (category) => {
    navigate(`/?category=${category}`)
  }

  const handleShowFavorites = () => {
    navigate("/?favorites=true")
  }

  const handleShowCart = () => {}

  const teamMembers = [
    {
      name: "Dhiraj Bam",
      role: "Founder & Creative Director",
      image: dhirajImg, // ✅ Using imported image here
      description: "With 15 years in fashion, Dhiraj brings his passion for sustainable style to TrendMandu.",
    },
    {
      name: "Anuz Bhandari",
      role: "Head of Design",
      image: anuzImg,
      description: "Anuz's innovative designs blend contemporary trends with timeless elegance.",
    },
    {
      name: "Akhilesh Saud",
      role: "Sustainability Manager",
      image: akhileshImg,
      description: "Akhilesh ensures our commitment to ethical fashion and environmental responsibility.",
    },
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Fashion",
      description: "We live and breathe fashion, constantly seeking the latest trends and timeless pieces.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality First",
      description: "Every piece in our collection is selected for its quality, durability, and style.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Focused",
      description: "We believe fashion is about self-expression and building a community of style-conscious individuals.",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast & Reliable",
      description: "Quick shipping and hassle-free returns because your satisfaction is our priority.",
    },
  ]

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
        <section className="bg-gradient-to-r from-rose-500 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">About TrendMandu</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're more than just a clothing brand – we're your style companions.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2020, TrendMandu began as a dream to make high-quality, trendy fashion accessible to everyone. 
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our name combines "Trend" and "Mandu" – reflecting love for fashion and our customers.
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-purple-700 transition-all duration-200"
                >
                  <span>Shop Our Collection</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <img
                  src={"../Image/team.jpg"} // Replace with your team image path
                  alt="Team"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2 text-rose-600 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900">5000+ Happy Customers</p>
                  <p className="text-sm text-gray-600">Trusted worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These values guide everything we do.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-rose-600 mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind TrendMandu.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-64 h-64 rounded-full mx-auto object-cover shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-rose-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TrendMandu</h3>
              <p className="text-gray-400">Premium fashion for the modern lifestyle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/")} className="hover:text-white">Home</button></li>
                <li><button onClick={() => navigate("/aboutus")} className="hover:text-white">About Us</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => handleCategoryChange("T-Shirts")} className="hover:text-white">T-Shirts</button></li>
                <li><button onClick={() => handleCategoryChange("Jeans")} className="hover:text-white">Jeans</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TrendMandu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AboutUs
