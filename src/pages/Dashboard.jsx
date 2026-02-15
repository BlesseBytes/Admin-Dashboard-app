import { useStore } from '../store/store'
import Layout from '../components/layout'
import { UtensilsCrossed, ClipboardList, Users, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const { menuItems, categories } = useStore()

  const stats = [
    {
      label: 'Total Menu Items',
      value: menuItems.length,
      icon: UtensilsCrossed,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-100 dark:bg-blue-900/30',
      lightColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Categories',
      value: categories.length,
      icon: TrendingUp,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-100 dark:bg-purple-900/30',
      lightColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      label: 'Total Orders',
      value: 124,
      icon: ClipboardList,
      color: 'bg-green-500',
      lightBg: 'bg-green-100 dark:bg-green-900/30',
      lightColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Revenue',
      value: '$4,250',
      icon: TrendingUp,
      color: 'bg-orange-500',
      lightBg: 'bg-orange-100 dark:bg-orange-900/30',
      lightColor: 'text-orange-600 dark:text-orange-400',
    },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your restaurant.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card p-6 hover:shadow-soft-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.lightBg}`}>
                    <Icon size={24} className={stat.lightColor} />
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Recent Menu Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">Recent Menu Items</h2>
            <div className="space-y-3">
              {menuItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-light dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.category}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'available'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Available Items</span>
                <span className="text-2xl font-bold text-green-600">
                  {menuItems.filter((i) => i.status === 'available').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Out of Stock</span>
                <span className="text-2xl font-bold text-red-600">
                  {menuItems.filter((i) => i.status === 'out_of_stock').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Total Categories</span>
                <span className="text-2xl font-bold text-blue-600">{categories.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Avg Order Value</span>
                <span className="text-2xl font-bold text-purple-600">$34.29</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="card p-6">
          <h2 className="text-lg font-bold mb-6">Sales Trend</h2>
          <div className="h-64 bg-light dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
