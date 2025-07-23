import { useState, useEffect } from "react"
import Header from "../components/Header"
import ProductCard from "./ProductCard"
import ProductModal from "./ProductModal"
import Cart from "../Private/Cart"
import { getProducts } from "../Services/productService"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8) // NEW

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
    setVisibleCount(8) // reset count on search
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setShowFavorites(false)
    if (category === "All") {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.category === category)
      setFilteredProducts(filtered)
    }
    setVisibleCount(8) // reset count on category change
  }

  const handleAddToCart = (productOrCartItem) => {
    if (productOrCartItem.product) {
      setCartItems((prev) => [...prev, productOrCartItem])
      alert("Product added to cart!")
    } else {
      setSelectedProduct(productOrCartItem)
      setIsModalOpen(true)
    }
  }

  const handleViewDetails = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleToggleFavorite = (product) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === product.id)
      return isAlreadyFavorite
        ? prev.filter((fav) => fav.id !== product.id)
        : [...prev, product]
    })
  }

  const handleShowFavorites = () => {
    setShowFavorites(true)
    setSelectedCategory("Favorites")
    setFilteredProducts(favorites)
    setVisibleCount(8) // reset count for favorites
  }

  const handleUpdateCartQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(index)
      return
    }
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCheckout = (items, total) => {
    alert(`Checkout initiated for ${items.length} items. Total: $${(total * 1.08).toFixed(2)}`)
    setIsCartOpen(false)
  }

  const displayProducts = showFavorites ? favorites : filteredProducts

  return (
    <>
      <Header
        onSearchChange={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onShowFavorites={handleShowFavorites}
        favoritesCount={favorites.length}
        onShowCart={() => setIsCartOpen(true)}
        cartItemsCount={cartItems.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showFavorites && (
          <div className="bg-gradient-to-r from-rose-600 to-purple-600 rounded-3xl p-12 mb-12 text-white">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">Discover Your Perfect Style</h1>
              <p className="text-xl opacity-90 mb-8">
                Shop the latest trends in fashion with our curated collection of premium clothing and accessories.
              </p>
              <div className="flex space-x-4">
                <button onClick={() => navigate("/Contactus")}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
                  Contact Us
                </button>
                <button
                  onClick={() => navigate("/aboutus")}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  About Us
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {showFavorites ? "Your Favorites" : selectedCategory === "All" ? "All Products" : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {showFavorites
                  ? "No favorites yet. Start adding products to your favorites!"
                  : "No products found. Try adjusting your search or category filter."
                }
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {displayProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.some((fav) => fav.id === product.id)}
                  />
                ))}
              </div>

              {visibleCount < displayProducts.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleCount(displayProducts.length)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    View All Products
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedProduct ? favorites.some((fav) => fav.id === selectedProduct.id) : false}
        onAddToCart={handleAddToCart}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">TrendMandu</h3>
              <p className="text-gray-400">
                Premium fashion for the modern lifestyle. Quality clothing that makes you look and feel your best.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/aboutus" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">T-Shirts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jeans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dresses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest collections</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
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

export default Homepage