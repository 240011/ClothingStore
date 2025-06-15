import React from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('background.png')" }}>
      <div className="bg-white bg-opacity-80 rounded-lg shadow-lg max-w-md w-full p-10 flex flex-col items-center">
        <h1 className="font-bold text-2xl text-purple-700 mb-5 text-center tracking-wide">Create Your Trendsmandu Account</h1>
        <form aria-label="Registration form" className="w-full flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name" className="font-semibold text-sm mb-1 text-gray-700">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your full name" required autoComplete="name" className="p-3 mb-5 border-2 border-gray-300 rounded-lg text-base focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />

          <label htmlFor="email" className="font-semibold text-sm mb-1 text-gray-700">Email address</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required autoComplete="email" className="p-3 mb-5 border-2 border-gray-300 rounded-lg text-base focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />

          <label htmlFor="password" className="font-semibold text-sm mb-1 text-gray-700">Password</label>
          <input type="password" id="password" name="password" placeholder="Create a password" required autoComplete="new-password" className="p-3 mb-5 border-2 border-gray-300 rounded-lg text-base focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />

          <label htmlFor="confirm-password" className="font-semibold text-sm mb-1 text-gray-700">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required autoComplete="new-password" className="p-3 mb-5 border-2 border-gray-300 rounded-lg text-base focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300" />

          <button type="submit" className="bg-purple-600 text-white font-bold text-lg py-3 rounded-lg shadow-md hover:bg-purple-500 transition duration-300">Sign Up</button>
        </form>
        <p className="mt-5 text-sm text-gray-600 text-center">Already have an account? <a href="login.html" className="text-purple-600 font-semibold hover:underline">Login here</a></p>
      </div>
    </div>
  );
}

export default Signup;

