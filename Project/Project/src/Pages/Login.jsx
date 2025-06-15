   import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
     return (
       <div
         className="flex items-center justify-center h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('login.png')" }}>
         <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-8">
           <h1 className="font-bold text-2xl text-purple-800 mb-6 text-center">Welcome Back to Trendmandu</h1>
           <form aria-label="Login form" onSubmit={handleSubmit}>
             <div className="mb-2">
               <label className="font-semibold text-sm mb-2 text-gray-700" htmlFor="email">Email address</label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 placeholder="Enter your E-mail"
                 required
                 autoComplete="email"
                 className="p-3 mb-5 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-300"
               />
             </div>

             <div className="mb-4">
               <label className="font-semibold text-sm mb-2 text-gray-700" htmlFor="password">Password</label>
               <input
                 type="password"
                 id="password"
                 name="password"
                 placeholder="Enter your password"
                 required
                 autoComplete="current-password"
                 className="p-3 mb-5 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-300"
               />
             </div>

             <button type="submit" className="bg-purple-600 text-white font-bold text-lg py-2 rounded-lg w-full hover:bg-purple-700 transition duration-300">Login</button>
           </form>
           <p className="mt-4 text-sm text-gray-600 text-center">Don't have an account? <a href="/signup" className="text-purple-600 font-semibold hover:underline">Create one</a></p>
         </div>
       </div>
     );
   }

   export default Login;
   