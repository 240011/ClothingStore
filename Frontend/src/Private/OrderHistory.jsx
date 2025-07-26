"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  ArrowLeft,
} from "lucide-react"

const OrderHistory = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const userEmail = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")
    if (!userEmail) {
      setError("Please login to view your Order History.")
      setIsLoading(false)
      return
    }
    setCurrentUser({ email: userEmail, type: userType })

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
        const response = await fetch("http://localhost:3000/api/cart", {
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
          try {
            const errorData = await response.json()
            setError(errorData.message || "Failed to fetch cart data")
          } catch {
            setError("Failed to fetch cart data")
          }
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

  const calculateTotal = (items) =>
    items.reduce((total, item) => {
      const price = parseFloat(item.product?.price ?? item.price ?? 0)
      const quantity = parseInt(item.quantity ?? 0)
      return total + price * quantity
    }, 0)

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
      alert(`Checkout initiated for ${cartItems.length} items. Total: Rs. ${total.toFixed(2)}`)
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
        {/* Cart Data Section */}
        {error && (
          <div className="text-red-500 mb-4 text-center">{error}</div>
        )}
        {isLoading && (
          <div className="text-center mb-4">Loading cart data...</div>
        )}
        {cartItems.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <h2 className="text-2xl font-semibold mb-4">Current Cart Items</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center space-x-4 border p-3 rounded-lg"
                >
                  <img
                    src={
                      item.product && item.product.image
                        ? `http://localhost:3000/uploads/${item.product.image.split("/").pop()}`
                        : "https://placehold.co/100"
                    }
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
                      <span className="mx-2">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      Rs. {parseFloat(item.product?.price || item.price || 0).toFixed(2)}
                    </p>
                    {/* Removed remove button as user should not modify cart in order history */}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="font-medium text-gray-900">Total</span>
              <span className="font-bold text-gray-900">
                Rs. {calculateTotal(cartItems).toFixed(2)}
              </span>
            </div>
            {/* Removed Proceed to Checkout button as per user request */}
          </div>
        ) : (
          <div className="text-center text-gray-500">No cart items found.</div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
