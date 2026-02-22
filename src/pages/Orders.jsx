import { useState } from 'react'
import Layout from '../components/layout'
import { Eye, Trash2, CheckCircle, Clock, X } from 'lucide-react'

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: '#ORD-001',
      customer: 'John Doe',
      items: 3,
      total: 45.99,
      status: 'completed',
      date: '2025-02-14',
    },
    {
      id: 2,
      orderNumber: '#ORD-002',
      customer: 'Jane Smith',
      items: 2,
      total: 32.50,
      status: 'pending',
      date: '2025-02-15',
    },
    {
      id: 3,
      orderNumber: '#ORD-003',
      customer: 'Mike Johnson',
      items: 4,
      total: 58.99,
      status: 'completed',
      date: '2025-02-15',
    },
    {
      id: 4,
      orderNumber: '#ORD-004',
      customer: 'Sarah Williams',
      items: 1,
      total: 14.99,
      status: 'cancelled',
      date: '2025-02-14',
    },
    {
      id: 5,
      orderNumber: '#ORD-005',
      customer: 'Robert Brown',
      items: 5,
      total: 72.50,
      status: 'processing',
      date: '2025-02-15',
    },
  ])
  const itemsPerPage = 10

  const handleCompleteOrder = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'completed' } : order
    ))
    setSelectedOrder(null)
  }

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id))
    setSelectedOrder(null)
  }

  const totalPages = Math.ceil(orders.length / itemsPerPage)
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    }
    return colors[status] || colors.pending
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all orders
          </p>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-light dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Order #</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Items</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-light dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                    <td className="px-6 py-4">{order.customer}</td>
                    <td className="px-6 py-4">{order.items} items</td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors cursor-pointer"
                          title="View order"
                        >
                          <Eye size={16} />
                        </button>
                        {order.status !== 'completed' && (
                          <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 rounded-lg transition-colors cursor-pointer"
                            title="Mark as completed"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors text-sm font-medium"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 transition-colors text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Order Number</p>
                  <p className="text-lg font-semibold">{selectedOrder.orderNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Customer</p>
                  <p className="text-lg">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Items</p>
                  <p className="text-lg">{selectedOrder.items} items</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-blue-600">${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-lg">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                {selectedOrder.status !== 'completed' && (
                  <button
                    onClick={() => handleCompleteOrder(selectedOrder.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    <CheckCircle size={16} />
                    Complete
                  </button>
                )}
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
