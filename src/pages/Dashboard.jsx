import { useState } from 'react'
import { useStore } from '../store/store'
import Layout from '../components/layout'
import { UtensilsCrossed, ClipboardList, TrendingUp, X } from 'lucide-react'

export default function Dashboard() {
  const { menuItems, categories } = useStore()
  const [selectedMetric, setSelectedMetric] = useState(null)

  // Sample orders data
  const ordersData = [
    { id: 1, orderNum: '#ORD-001', customer: 'John Doe', items: 3, total: 45.99, date: '2025-02-15', status: 'completed' },
    { id: 2, orderNum: '#ORD-002', customer: 'Jane Smith', items: 2, total: 32.5, date: '2025-02-15', status: 'pending' },
    { id: 3, orderNum: '#ORD-003', customer: 'Mike Johnson', items: 4, total: 58.99, date: '2025-02-14', status: 'completed' },
    { id: 4, orderNum: '#ORD-004', customer: 'Sarah Williams', items: 1, total: 14.99, date: '2025-02-14', status: 'cancelled' },
    { id: 5, orderNum: '#ORD-005', customer: 'Robert Brown', items: 5, total: 72.5, date: '2025-02-13', status: 'processing' },
    { id: 6, orderNum: '#ORD-006', customer: 'Emily Davis', items: 2, total: 28.75, date: '2025-02-13', status: 'completed' },
    { id: 7, orderNum: '#ORD-007', customer: 'David Lee', items: 3, total: 41.25, date: '2025-02-12', status: 'completed' },
    { id: 8, orderNum: '#ORD-008', customer: 'Lisa Anderson', items: 2, total: 35.5, date: '2025-02-12', status: 'processing' },
  ]

  const revenueData = [
    { date: '2025-02-15', orders: 12, revenue: 450, items: 45, avgOrderValue: 37.5, status: 'completed' },
    { date: '2025-02-14', orders: 10, revenue: 380, items: 38, avgOrderValue: 38, status: 'completed' },
    { date: '2025-02-13', orders: 11, revenue: 420, items: 42, avgOrderValue: 38.18, status: 'completed' },
    { date: '2025-02-12', orders: 9, revenue: 350, items: 35, avgOrderValue: 38.89, status: 'completed' },
    { date: '2025-02-11', orders: 15, revenue: 580, items: 58, avgOrderValue: 38.67, status: 'completed' },
    { date: '2025-02-10', orders: 13, revenue: 490, items: 49, avgOrderValue: 37.69, status: 'completed' },
  ]

  const stats = [
    {
      label: 'Total Menu Items',
      value: menuItems.length,
      icon: UtensilsCrossed,
      lightBg: 'bg-blue-100 dark:bg-blue-900/30',
      lightColor: 'text-blue-600 dark:text-blue-400',
      key: 'menuItems',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: TrendingUp,
      lightBg: 'bg-purple-100 dark:bg-purple-900/30',
      lightColor: 'text-purple-600 dark:text-purple-400',
      key: 'categories',
    },
    {
      label: 'Total Orders',
      value: ordersData.length,
      icon: ClipboardList,
      lightBg: 'bg-green-100 dark:bg-green-900/30',
      lightColor: 'text-green-600 dark:text-green-400',
      key: 'orders',
    },
    {
      label: 'Revenue',
      value: '$4,250',
      icon: TrendingUp,
      lightBg: 'bg-orange-100 dark:bg-orange-900/30',
      lightColor: 'text-orange-600 dark:text-orange-400',
      key: 'revenue',
    },
  ]

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      available: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      out_of_stock: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    }
    return colors[status] || colors.pending
  }

  const calculateTotal = (array, field) =>
    array.reduce((sum, item) => sum + (item[field] || 0), 0)

  const renderMetricModal = () => {
    if (!selectedMetric) return null

    const metric = stats.find((s) => s.key === selectedMetric)

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
          <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 p-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {metric.label} Details
            </h2>
            <button
              onClick={() => setSelectedMetric(null)}
              className="text-white hover:bg-slate-700 p-2 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400">
              Detailed view for <strong>{metric.label}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {renderMetricModal()}

      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here's an overview of your restaurant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <button
                  key={stat.key}
                  onClick={() => setSelectedMetric(stat.key)}
                  className="card p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 text-left cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.lightBg}`}>
                      <Icon size={24} className={stat.lightColor} />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </button>
              )
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}