import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/UserLogin';
import Cart from './components/Cart';
import Productmodal from './components/ProductModal';
import ProductCard from './components/ProductCard';
import AdminLogin from './components/AdminLogin'; 
import AboutUs from './components/AboutUs'; 
import ContactUs from './components/ContactUs'; // Importing the AboutUs component
// Importing the AboutUs component


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Productmodal />} />
          <Route path="/product-card" element={<ProductCard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          {/* Adding the About Us route */}
          <Route path="/contactus" element={<ContactUs />} />
          {/* Adding the Contact Us route */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;