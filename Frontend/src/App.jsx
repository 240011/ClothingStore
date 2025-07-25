import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Public/Homepage';
import Signup from './Public/Signup';
import AdminDashboard from './Private/AdminDashboard';
import UserLogin from './Public/UserLogin';
import Cart from './Private/Cart';
import Productmodal from './Public/ProductModal';
import ProductCard from './Public/ProductCard';
import AdminLogin from './Private/AdminLogin'; 
import AboutUs from './Public/AboutUs'; 
import UserProfile from './Private/UserProfile';
import OrderHistory from './Private/OrderHistory';
import ContactUs from './Public/ContactUs';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleUpdateCart = (items) => {
    setCartItems(items);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = (items, total) => {
    // Implement checkout logic here
    alert(`Checkout initiated for ${items.length} items. Total: Rs. ${total.toFixed(2)}`);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onUpdateCart={handleUpdateCart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleCheckout}
                isOpen={true}
                onClose={() => {}}
              />
            }
          />
          <Route path="/product/:id" element={<Productmodal />} />
          <Route path="/product-card" element={<ProductCard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/order-history" element={<OrderHistory />} />
          {/* Add more
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
