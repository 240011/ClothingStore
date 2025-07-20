import React, { useState, useEffect } from "react"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"
import { Settings } from "lucide-react"
import { getContacts } from "../Services/contactApi"

const Dashboard = () => {
  const [dashboardStats] = useState({})
  const [contactQueries, setContactQueries] = useState([])

  useEffect(() => {
    const fetchContactQueries = async () => {
      try {
        const response = await getContacts()
        setContactQueries(response.data.data)
      } catch (error) {
        console.error("Failed to fetch contact queries:", error)
      }
    }
    fetchContactQueries()
  }, [])

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
      {/* Add StatCard components here if needed */}

      {/* Contact Queries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Queries</h3>
        {contactQueries.length === 0 ? (
          <p className="text-gray-500">No customer queries found.</p>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {contactQueries.map((query) => (
              <li key={query.id} className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900">{query.name} ({query.email})</p>
                <p className="text-gray-700 mt-2 whitespace-pre-wrap">{query.message}</p>
                <p className="text-xs text-gray-500 mt-2">Submitted on: {new Date(query.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
