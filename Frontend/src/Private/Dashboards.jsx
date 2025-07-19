import React from "react"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import { CheckCircle, Clock, Settings } from "lucide-react"

const Dashboard = () => {
  const [dashboardStats] = React.useState({
  
  })

  const [recentOrders] = React.useState([
    { id: "#ORD-001", customer: "John Doe", amount: 1299, status: "completed", date: "2024-01-15" },
    { id: "#ORD-002", customer: "Jane Smith", amount: 89.5, status: "pending", date: "2024-01-15" },
    { id: "#ORD-003", customer: "Mike Johnson", amount: 199.99, status: "shipped", date: "2024-01-14" },
    { id: "#ORD-004", customer: "Sarah Wilson", amount: 75.25, status: "completed", date: "2024-01-14" },
    { id: "#ORD-005", customer: "Tom Brown", amount: 156.8, status: "processing", date: "2024-01-13" },
  ])

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

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
     
      
      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentOrders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">Rs. {order.amount}</p>
                <p className="text-xs text-gray-500">{order.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
