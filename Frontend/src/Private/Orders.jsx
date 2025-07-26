import React, { useState, useEffect } from "react"
import { ShoppingCart, Download, Eye, Edit, CheckCircle, Clock, Package, Settings } from "lucide-react"

const Orders = () => {
  const [recentOrders] = React.useState([
    { id: "#ORD-001", customer: "John Doe", amount: 1299, status: "completed", date: "2024-01-15" },
    { id: "#ORD-002", customer: "Jane Smith", amount: 89.5, status: "pending", date: "2024-01-15" },
    { id: "#ORD-003", customer: "Mike Johnson", amount: 199.99, status: "shipped", date: "2024-01-14" },
    { id: "#ORD-004", customer: "Sarah Wilson", amount: 75.25, status: "completed", date: "2024-01-14" },
    { id: "#ORD-005", customer: "Tom Brown", amount: 156.8, status: "processing", date: "2024-01-13" },
  ])

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
            // If admin, data.data is an array of carts
            if (Array.isArray(data.data)) {
              // Flatten all items from all carts
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

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "processing": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />
      case "pending": return <Clock className="w-4 h-4" />
      case "shipped": return <Package className="w-4 h-4" />
      case "processing": return <Settings className="w-4 h-4" />
      default: return <CheckCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Orders</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rs. {order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Current Cart Items</h3>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {isLoading && <div className="text-center mb-4">Loading cart data...</div>}
        {cartItems.length === 0 && !isLoading && <p className="text-center text-gray-500">No items in cart.</p>}
        {cartItems.length > 0 && (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={item.id || index} className="flex items-center space-x-4 border p-3 rounded-lg">
                <img src={item.product && item.product.image ? `http://localhost:3000/uploads/${item.product.image.split('/').pop()}` : 'https://placehold.co/100'} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Size: {item.selectedSize || "N/A"}, Color: {item.selectedColor || "N/A"}</p>
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
