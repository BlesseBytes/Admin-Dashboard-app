import { useState } from 'react'
import Layout from '../components/layout'
import { BarChart, TrendingUp, Users, DollarSign, X } from 'lucide-react'

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState(null)

  // Sample data for calculations
  const reportsData = {
    'Total Revenue': {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+12%',
      icon: DollarSign,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      details: [
        { date: '2025-02-15', amount: 450, items: 12 },
        { date: '2025-02-14', amount: 380, items: 10 },
        { date: '2025-02-13', amount: 520, items: 15 },
        { date: '2025-02-12', amount: 410, items: 11 },
        { date: '2025-02-11', amount: 560, items: 16 },
        { date: '2025-02-10', amount: 490, items: 13 },
        { date: '2025-02-09', amount: 530, items: 14 },
        { date: '2025-02-08', amount: 510, items: 12 },
      ],
    },
    'Total Orders': {
      title: 'Total Orders',
      value: '324',
      change: '+8%',
      icon: BarChart,
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      details: [
        { date: '2025-02-15', orders: 12, completed: 10, pending: 2 },
        { date: '2025-02-14', orders: 10, completed: 9, pending: 1 },
        { date: '2025-02-13', orders: 15, completed: 14, pending: 1 },
        { date: '2025-02-12', orders: 11, completed: 10, pending: 1 },
        { date: '2025-02-11', orders: 16, completed: 15, pending: 1 },
        { date: '2025-02-10', orders: 13, completed: 12, pending: 1 },
        { date: '2025-02-09', orders: 14, completed: 13, pending: 1 },
        { date: '2025-02-08', orders: 12, completed: 11, pending: 1 },
      ],
    },
    'Total Customers': {
      title: 'Total Customers',
      value: '1,242',
      change: '+15%',
      icon: Users,
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      details: [
        { date: '2025-02-15', newCustomers: 12, returning: 45, total: 57 },
        { date: '2025-02-14', newCustomers: 8, returning: 38, total: 46 },
        { date: '2025-02-13', newCustomers: 15, returning: 52, total: 67 },
        { date: '2025-02-12', newCustomers: 10, returning: 40, total: 50 },
        { date: '2025-02-11', newCustomers: 18, returning: 60, total: 78 },
        { date: '2025-02-10', newCustomers: 13, returning: 48, total: 61 },
        { date: '2025-02-09', newCustomers: 14, returning: 55, total: 69 },
        { date: '2025-02-08', newCustomers: 11, returning: 42, total: 53 },
      ],
    },
    'Growth Rate': {
      title: 'Growth Rate',
      value: '23%',
      change: '+5%',
      icon: TrendingUp,
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      details: [
        { period: 'This Week', growth: 23, revenue: 3450, customers: 285, orders: 78 },
        { period: 'Last Week', growth: 18, revenue: 2980, customers: 248, orders: 72 },
        { period: 'Two Weeks Ago', growth: 15, revenue: 2520, customers: 210, orders: 65 },
        { period: 'This Month', growth: 21, revenue: 11200, customers: 1242, orders: 324 },
      ],
    },
  }

  const reports = [
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
  ]

  const handleReportClick = (title) => {
    setSelectedReport(title)
  }

  const calculateTotal = () => {
    if (!selectedReport || !reportsData[selectedReport]) return 0
    const data = reportsData[selectedReport]

    if (selectedReport === 'Total Revenue') {
      return data.details.reduce((sum, item) => sum + item.amount, 0)
    } else if (selectedReport === 'Total Orders') {
      return data.details.reduce((sum, item) => sum + item.orders, 0)
    } else if (selectedReport === 'Total Customers') {
      return data.details.reduce((sum, item) => sum + item.total, 0)
    }
    return 0
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View detailed reports and analytics (Click any card to see details)
          </p>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reports.map((report, index) => {
            const Icon = report.icon
            return (
              <div
                key={index}
                onClick={() => handleReportClick(report.title)}
                className="card p-6 hover:shadow-soft-lg transition-all cursor-pointer hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
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
          })}        </div>

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

      {/* Detailed Report Modal */}
      {selectedReport && reportsData[selectedReport] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
              <h2 className="text-2xl font-bold">{selectedReport} - Detailed Breakdown</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Main Metric</p>
                  <p className="text-3xl font-bold text-blue-600">{reportsData[selectedReport].value}</p>
                  <p className="text-sm text-green-600 mt-2 font-semibold">{reportsData[selectedReport].change} from last period</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total (Auto-Calculated)</p>
                  {selectedReport === 'Total Revenue' && (
                    <>
                      <p className="text-3xl font-bold text-green-600">${calculateTotal()}</p>
                      <p className="text-xs text-gray-500 mt-2">Sum of all daily revenues</p>
                    </>
                  )}
                  {selectedReport === 'Total Orders' && (
                    <>
                      <p className="text-3xl font-bold text-green-600">{calculateTotal()}</p>
                      <p className="text-xs text-gray-500 mt-2">Sum of all daily orders</p>
                    </>
                  )}
                  {selectedReport === 'Total Customers' && (
                    <>
                      <p className="text-3xl font-bold text-green-600">{calculateTotal()}</p>
                      <p className="text-xs text-gray-500 mt-2">Sum of all daily customers</p>
                    </>
                  )}
                </div>
              </div>

              {/* Excel-like Table */}
              <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                      {selectedReport === 'Total Revenue' && (
                        <>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Date</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Items Sold</th>
                        </>
                      )}
                      {selectedReport === 'Total Orders' && (
                        <>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Date</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Total Orders</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Completed</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Pending</th>
                        </>
                      )}
                      {selectedReport === 'Total Customers' && (
                        <>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Date</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">New Customers</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Returning</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Total</th>
                        </>
                      )}
                      {selectedReport === 'Growth Rate' && (
                        <>
                          <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Period</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Growth %</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Revenue</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Customers</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">Orders</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {reportsData[selectedReport].details.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {selectedReport === 'Total Revenue' && (
                          <>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.date}</td>
                            <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">${row.amount}</td>
                            <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-400">{row.items}</td>
                          </>
                        )}
                        {selectedReport === 'Total Orders' && (
                          <>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.date}</td>
                            <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">{row.orders}</td>
                            <td className="px-4 py-3 text-right text-green-600">{row.completed}</td>
                            <td className="px-4 py-3 text-right text-yellow-600">{row.pending}</td>
                          </>
                        )}
                        {selectedReport === 'Total Customers' && (
                          <>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.date}</td>
                            <td className="px-4 py-3 text-right text-blue-600">{row.newCustomers}</td>
                            <td className="px-4 py-3 text-right text-purple-600">{row.returning}</td>
                            <td className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">{row.total}</td>
                          </>
                        )}
                        {selectedReport === 'Growth Rate' && (
                          <>
                            <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{row.period}</td>
                            <td className="px-4 py-3 text-right font-medium text-green-600">{row.growth}%</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">${row.revenue}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{row.customers}</td>
                            <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{row.orders}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer Info */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  💡 <strong>Auto-Calculation:</strong> All totals are automatically calculated from the detailed data below. Changes in individual rows will update the summary automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}