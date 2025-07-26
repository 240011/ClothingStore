"use client"

import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Eye,
  RotateCcw,
  Star,
} from "lucide-react"

const OrderHistory = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [filterStatus, setFilterStatus] = useState("All")

  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sampleOrders = []

  useEffect(() => {
    if (typeof window === "undefined") return

    const fetchCartData = async () => {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("Please login to view your cart.")
        setIsLoading(false)
        return
      }
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("http://localhost:3000/cart", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        if (response.ok) {
          const data = await response.json()
          if (data && data.data && data.data.items) {
            setCartItems(data.data.items)
          }
        } else {
          setError("Failed to fetch cart data")
        }
      } catch (error) {
        console.error("Error in fetchCartData:", error)
        setError("Failed to fetch cart data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartData()
  }, [navigate])

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0)

  const handleUpdateQuantity = async (index, newQuantity) => {
    if (newQuantity <= 0) return
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("Please login to update cart.")
        return
      }
      const updatedItems = cartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
      const total = calculateTotal(updatedItems)
      const response = await fetch("http://localhost:3000/cart", {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: updatedItems, total }),
      })
      if (response.ok) {
        setCartItems(updatedItems)
        setError(null)
      } else {
        setError("Failed to update cart")
      }
    } catch (error) {
      console.error("Error updating cart:", error)
      setError("Failed to update cart")
    }
  }

  const handleRemoveItem = async (itemId, index) => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("Please login to update cart.")
        return
      }
      const response = await fetch(`http://localhost:3000/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      if (response.ok) {
        const updatedItems = cartItems.filter((_, i) => i !== index)
        setCartItems(updatedItems)
        setError(null)
      } else {
        setError("Failed to remove item")
      }
    } catch (error) {
      console.error("Error removing item:", error)
      setError("Failed to remove item")
    }
  }

  const handleCheckout = async () => {
    try {
      const total = calculateTotal(cartItems)
      alert(`Checkout initiated for ${cartItems.length} items. Total: $${total.toFixed(2)}`)
      const token = localStorage.getItem("authToken")
      if (!token) {
        setError("Please login to checkout.")
        return
      }
      const response = await fetch("http://localhost:3000/cart/checkout", {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems, total }),
      })
      if (response.ok) {
        alert("Checkout successful!")
        setCartItems([])
        setError(null)
      } else {
        setError("Checkout failed. Please try again.")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setError("Checkout failed. Please try again.")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus)

  const handleReorder = (order) => {
    alert(`Reordering ${order.items.length} items from order ${order.id}`)
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </button>
          <button
            onClick={() => navigate("/user-profile")}
            className="text-rose-600 hover:text-rose-700 font-medium"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Cart Data Section */}
        {error && (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        )}
        {isLoading && (
          <div className="text-center mb-4">Loading cart data...</div>
        )}
        {cartItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Cart Items</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center space-x-4 border p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.selectedSize || "N/A"}, Color:{" "}
                      {item.selectedColor || "N/A"}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(index, item.quantity - 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(index, item.quantity + 1)
                        }
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${parseFloat(item.price).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemoveItem(item.id, index)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                ${calculateTotal(cartItems).toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="mt-4 w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 disabled:bg-gray-300"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <nav className="flex space-x-8 border-b px-6">
            {["All", "Processing", "Shipped", "Delivered"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  filterStatus === status
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {status}
                <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                  {status === "All"
                    ? orders.length
                    : orders.filter((o) => o.status === status).length}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-lg shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-6">
              {filterStatus === "All"
                ? "You haven't placed any orders yet."
                : `No ${filterStatus.toLowerCase()} orders found.`}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-sm space-y-4"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order {order.id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        +{order.items.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={() => handleReorder(order)}
                      className="text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reorder</span>
                    </button>
                    {order.status === "Delivered" && (
                      <button className="text-yellow-600 hover:text-yellow-700 flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>Review</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium">Order ID</p>
                <p className="text-sm text-gray-600">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm text-gray-600">
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(selectedOrder.status)}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-sm text-gray-600">
                  ${selectedOrder.total.toFixed(2)}
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Items</h3>
            <div className="space-y-4 mb-6">
              {selectedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border p-3 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p className="text-gray-600 mb-6">{selectedOrder.shippingAddress}</p>

            {selectedOrder.trackingNumber && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Tracking Information
                </h3>
                <p className="text-sm">
                  Tracking Number: {selectedOrder.trackingNumber}
                </p>
                <p className="text-sm">
                  Estimated Delivery:{" "}
                  {new Date(
                    selectedOrder.estimatedDelivery
                  ).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
