import React, { useState, useEffect } from "react"
import { Download } from "lucide-react"

const Orders = () => {
  const [cartItems, setCartItems] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCartData = async () => {
      const token = "demo-token" // admin demo token for authorization
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        if (response.ok) {
          const data = await response.json()
          if (data && data.data) {
            if (Array.isArray(data.data)) {
              const allItems = data.data.reduce((acc, cart) => {
                if (cart.items && Array.isArray(cart.items)) {
                  return acc.concat(cart.items)
                }
                return acc
              }, [])
              setCartItems(allItems)
            } else if (data.data.items) {
              setCartItems(data.data.items)
            } else {
              setCartItems([])
            }
          } else {
            setCartItems([])
          }
        } else {
          setError("Failed to fetch cart data")
        }
      } catch (error) {
        console.error("Error fetching cart data:", error)
        setError("Failed to fetch cart data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCartData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Cart Items</h2>
          <p className="text-gray-600">List of all items across user carts</p>
        </div>
        
      </div>

      <div className="mt-8">
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {isLoading && <div className="text-center mb-4">Loading cart data...</div>}
        {cartItems.length === 0 && !isLoading && <p className="text-center text-gray-500">No items in cart.</p>}
        {cartItems.length > 0 && (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={item.id || index} className="flex items-center space-x-4 border p-3 rounded-lg">
                <img
                  src={item.product?.image ? `http://localhost:3000/uploads/${item.product.image.split('/').pop()}` : 'https://placehold.co/100'}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {item.selectedSize || "N/A"}, Color: {item.selectedColor || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">Rs. {parseFloat(item.product?.price || item.price || 0).toFixed(2)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Orders

