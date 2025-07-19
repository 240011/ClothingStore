"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Eye, RotateCcw, Star } from "lucide-react"


const OrderHistory = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [filterStatus, setFilterStatus] = useState("All")

  // Sample order data - in a real app, this would come from an API
  const sampleOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 89.97,
      items: [
        {
          id: 1,
          name: "Classic White T-Shirt",
          price: 29.99,
          quantity: 2,
          image: "/placeholder.svg?height=80&width=80",
        },
        { id: 2, name: "Blue Denim Jeans", price: 59.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
      shippingAddress: "123 Main St, City, State 12345",
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-20",
      status: "Shipped",
      total: 149.98,
      items: [
        { id: 3, name: "Summer Floral Dress", price: 79.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { id: 4, name: "Leather Handbag", price: 69.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
      shippingAddress: "123 Main St, City, State 12345",
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-25",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-22",
      status: "Processing",
      total: 39.99,
      items: [
        { id: 5, name: "Casual Sneakers", price: 39.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
      shippingAddress: "123 Main St, City, State 12345",
      trackingNumber: null,
      estimatedDelivery: "2024-01-28",
    },
  ]

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("authToken")
    const userEmail = localStorage.getItem("userEmail")
    const userType = localStorage.getItem("userType")

    if (!token || !userEmail) {
      navigate("/signup")
      return
    }

    setCurrentUser({ email: userEmail, type: userType })

    // Load user orders (in a real app, this would come from an API)
    const savedOrders = localStorage.getItem(`orders_${userEmail}`)
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      // Set sample data and save it
      setOrders(sampleOrders)
      localStorage.setItem(`orders_${userEmail}`, JSON.stringify(sampleOrders))
    }
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

  const filteredOrders = filterStatus === "All" ? orders : orders.filter((order) => order.status === filterStatus)

  const handleReorder = (order) => {
    // In a real app, this would add items to cart and redirect to checkout
    alert(`Reordering ${order.items.length} items from order ${order.id}`)
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Shop</span>
            </button>
            <button onClick={() => navigate("/user-profile")} className="text-rose-600 hover:text-rose-700 font-medium">
              View Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["All", "Processing", "Shipped", "Delivered"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    filterStatus === status
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {status}
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {status === "All" ? orders.length : orders.filter((o) => o.status === status).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">
              {filterStatus === "All"
                ? "You haven't placed any orders yet."
                : `No ${filterStatus.toLowerCase()} orders found.`}
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                        <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Order Items Preview */}
                  <div className="flex items-center space-x-4 mb-4">
                    {order.items.slice(0, 3).map((item, index) => (
                      <img
                        key={index}
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">+{order.items.length - 3}</span>
                      </div>
                    )}
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                          <p className="text-sm text-gray-600">{order.trackingNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleReorder(order)}
                      className="flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Reorder</span>
                    </button>
                    {order.status === "Delivered" && (
                      <button className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors">
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
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-900">Order ID</p>
                  <p className="text-sm text-gray-600">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Order Date</p>
                  <p className="text-sm text-gray-600">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Status</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(selectedOrder.status)}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-sm text-gray-600">${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Items Ordered</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Address</h3>
                <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tracking Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                      <p className="text-sm text-gray-600">{selectedOrder.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Estimated Delivery</p>
                      <p className="text-sm text-gray-600">
                        {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderHistory
