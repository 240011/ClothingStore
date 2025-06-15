import React from 'react';
import './Homepage.css'; 
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    // Sample product data
    const products = [
        {
            id: 1,
            name: 'Stylish Jacket',
            image: 'photo 7.png',
            price: '$49.99',
            description: 'A stylish jacket for all seasons.'
        },
        {
            id: 2,
            name: 'Classic Sneakers',
            image: 'photo 5.png',
            price: '$39.99',
            description: 'Comfortable for Summer.'
        },
        {
            id: 3,
            name: 'Elegant Watch',
            image: 'photo 9.png',
            price: '$99.99',
            description: 'Formal pant.'
        },
        // Add more products as needed
    ];

    return (
        <div className="font-Inter">
            {/* Header */}
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <a className="text-3xl font-bold text-gray-800" href="#">Homepage</a>
                    <button className="lg:hidden p-2" id="navbarToggle">
                        <i className="fas fa-bars"></i>
                    </button>
                    <nav className="hidden lg:flex space-x-4">
                        <a className="text-gray-700 hover:text-gray-900" href="#home">Home</a>
                        <a className="text-gray-700 hover:text-gray-900" href="#categories">Categories</a>
                        <a className="text-gray-700 hover:text-gray-900" href="#deals">Deals</a>
                        <a className="text-gray-700 hover:text-gray-900" href="#about">About</a>
                        <a className="text-gray-700 hover:text-gray-900" href="#contact">Contact</a>
                    </nav>
                    {/* Search Bar and Action Icons */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input type="text" className="border rounded-lg p-2" id="searchInput" placeholder="Search products..." />
                            <i className="fas fa-search absolute right-2 top-2 text-gray-500"></i>
                        </div>
                        <button className="text-gray-700">
                            <i className="fas fa-heart text-xl"></i> {/* Heart Icon */}
                        </button>
                        <button className="text-gray-700">
                            <i className="fas fa-user text-xl"></i> {/* User Icon */}
                        </button>
                        <button className="relative text-gray-700" id="cartBtn">
                            <i className="fas fa-shopping-cart text-xl"></i> {/* Shopping Cart Icon */}
                            <span className="absolute top-0 right-0 bg-yellow-400 text-white rounded-full px-2 text-xs" id="cartCount">0</span>
                        </button>
                        {/* New Login and Signup Buttons */}
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg" onClick={() => navigate('/Login')}>
                            Login
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded-lg" onClick={() => navigate('/Signup')}>
                            Signup
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center py-20 bg-gray-100">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2">
                        <div className="bg-yellow-200 p-3 rounded-full mb-4">
                            <i className="fas fa-star mr-2"></i>New Collection Available
                        </div>
                        <h1 className="text-5xl font-bold mb-4">
                            Discover Your
                            <span className="text-gradient">Perfect Style</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10">
                            Explore our curated collection of premium fashion, electronics, and lifestyle products.
                            Quality meets affordability in every purchase.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mb-5">
                            <button className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold">
                                Shop Now <i className="fas fa-arrow-right ml-2"></i>
                            </button>
                            <button className="bg-transparent border border-white text-white py-3 px-6 rounded-lg font-semibold">
                                View Catalog
                            </button>
                        </div>
                        <div className="flex justify-around text-center">
                            <div>
                                <div className="text-3xl font-bold">10K+</div>
                                <div className="text-gray-500">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">500+</div>
                                <div className="text-gray-500">Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold">4.9</div>
                                <div className="text-gray-500">Rating</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <img src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                 alt="Fashion Model" className="rounded-lg shadow-lg" />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                                <div className="text-4xl font-bold">50% OFF</div>
                                <div className="text-sm">Limited Time Offer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section id="categories" className="py-20 bg-gray-200">
                <div className="container mx-auto text-center mb-5">
                    <h2 className="text-4xl font-bold mb-3">Shop by Category</h2>
                    <p className="text-lg text-gray-600">Discover our wide range of products across different categories</p>
                </div>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="categoriesContainer">
                    {/* Example Categories */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold">Fashion</h3>
                        <p className="text-gray-500">Latest trends in fashion.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold">Electronics</h3>
                        <p className="text-gray-500">Top-notch electronic gadgets.</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-xl font-bold">Lifestyle</h3>
                        <p className="text-gray-500">Lifestyle products for everyday use.</p>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-20">
                <div className="container mx-auto text-center mb-5">
                    <h2 className="text-4xl font-bold mb-3">Featured Products</h2>
                    <p className="text-lg text-gray-600">Discover our handpicked selection of the best products</p>
                </div>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="productsContainer">
                    {products.map(product => (
                        <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <p className="text-gray-500">{product.description}</p>
                            <div className="mt-2">
                                <span className="text-lg font-semibold">{product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Special Offers Section */}
            <section className="py-20 bg-yellow-300">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <img src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=600" 
                                 alt="Special Offer" className="rounded-lg shadow-lg" />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
                                <div className="text-6xl font-bold">50%</div>
                                <div className="text-lg font-semibold">OFF EVERYTHING</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 lg:pl-10">
                        <h2 className="text-4xl font-bold mb-4">Limited Time Offer</h2>
                        <p className="text-lg mb-4">
                            Don't miss out on our biggest sale of the year! Get up to 50% off on all items. 
                            From fashion to electronics, everything is on sale for a limited time only.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="text-3xl font-bold text-yellow-500">Free</div>
                                <div className="text-gray-500">Shipping</div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <div className="text-3xl font-bold text-yellow-500">24/7</div>
                                <div className="text-gray-500">Support</div>
                            </div>
                        </div>
                        <button className="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold">
                            Shop Sale Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-blue-600">
                <div className="container mx-auto flex justify-center">
                    <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-10 text-center text-white">
                        <i className="fas fa-envelope text-4xl mb-4"></i>
                        <h2 className="text-3xl font-bold mb-3">Stay in the Loop</h2>
                        <p className="mb-4">
                            Get exclusive deals, new product announcements, and style tips delivered to your inbox.
                        </p>
                        <form id="newsletterForm" className="flex flex-col sm:flex-row justify-center">
                            <input type="email" className="border rounded-lg p-2 mb-4 sm:mb-0 sm:mr-2" id="emailInput" 
                                   placeholder="Enter your email address" required />
                            <button type="submit" className="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold">
                                Subscribe
                            </button>
                        </form>
                        <p className="text-sm mt-3 opacity-75">No spam, unsubscribe at any time.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                    <div>
                        <h3 className="font-bold mb-4">TrendMandu</h3>
                        <p className="text-gray-400">
                            Your premier destination for fashion, electronics, and lifestyle products. 
                            Quality and style in every purchase.
                        </p>
                        <div className="flex space-x-3 mt-4">
                            <a href="#" className="text-gray-400 hover:text-yellow-400"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-gray-400 hover:text-yellow-400"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Quick Links</h5>
                        <ul className="list-none">
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Categories</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">New Arrivals</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Sale</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Customer Service</h5>
                        <ul className="list-none">
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Shipping Info</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Returns</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Size Guide</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Get in Touch</h5>
                        <div className="flex items-center mb-2">
                            <i className="fas fa-map-marker-alt text-yellow-400 mr-2"></i>
                            <span className="text-gray-400">123 Fashion Street, NY 10001</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <i className="fas fa-phone text-yellow-400 mr-2"></i>
                            <span className="text-gray-400">+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-envelope text-yellow-400 mr-2"></i>
                            <span className="text-gray-400">hello@stylehub.com</span>
                        </div>
                    </div>
                </div>
                <hr className="my-4 border-gray-600" />
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 mb-0">© 2024 TrendMandu. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-3">
                        <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
