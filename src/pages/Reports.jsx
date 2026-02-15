import Layout from '../components/layout'
import { BarChart, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function Reports() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View detailed reports and analytics
          </p>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              title: 'Total Revenue',
              value: '$12,450',
              change: '+12%',
              icon: DollarSign,
              color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
            },
            {
              title: 'Total Orders',
              value: '324',
              change: '+8%',
              icon: BarChart,
              color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            },
            {
              title: 'Total Customers',
              value: '1,242',
              change: '+15%',
              icon: Users,
              color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
            },
            {
              title: 'Growth Rate',
              value: '23%',
              change: '+5%',
              icon: TrendingUp,
              color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
            },
          ].map((report, index) => {
            const Icon = report.icon
            return (
              <div key={index} className="card p-6 hover:shadow-soft-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${report.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-green-600 font-medium text-sm">{report.change}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                  {report.title}
                </p>
                <p className="text-2xl font-bold">{report.value}</p>
              </div>
            )
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold mb-6">Revenue Trend</h2>
            <div className="h-64 bg-light dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-bold mb-6">Top Menu Items</h2>
            <div className="space-y-3">
              {[
                { name: 'Grilled Chicken Burger', sales: 145 },
                { name: 'Margherita Pizza', sales: 128 },
                { name: 'Caesar Salad', sales: 98 },
                { name: 'Classic Cheeseburger', sales: 87 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-light dark:bg-gray-700 rounded-lg"
                >
                  <span>{item.name}</span>
                  <span className="font-bold text-blue-600">{item.sales} sales</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
