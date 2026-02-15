import { useState } from 'react'
import Layout from '../components/layout'
import ImageWithFallback from '../components/ImageWithFallback'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default function Staff() {
  const [staff] = useState([
    {
      id: 1,
      name: 'Chef Maria',
      role: 'Head Chef',
      email: 'maria@restaurant.com',
      phone: '+1 (234) 567-8901',
      joinDate: '2024-01-15',
      status: 'active',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 2,
      name: 'James Wilson',
      role: 'Line Cook',
      email: 'james@restaurant.com',
      phone: '+1 (234) 567-8902',
      joinDate: '2024-02-20',
      status: 'active',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      name: 'Sarah Lee',
      role: 'Waiter',
      email: 'sarah@restaurant.com',
      phone: '+1 (234) 567-8903',
      joinDate: '2024-03-10',
      status: 'active',
      avatar: 'https://via.placeholder.com/40',
    },
    {
      id: 4,
      name: 'Tom Brown',
      role: 'Cashier',
      email: 'tom@restaurant.com',
      phone: '+1 (234) 567-8904',
      joinDate: '2024-04-05',
      status: 'on_leave',
      avatar: 'https://via.placeholder.com/40',
    },
  ])

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Staff</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage staff members
            </p>
          </div>
          <button className="btn btn-primary">
            <Plus size={20} /> Add Staff
          </button>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {staff.map((member) => (
            <div key={member.id} className="card p-6 hover:shadow-soft-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <ImageWithFallback
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <p>Email: {member.email}</p>
                <p>Phone: {member.phone}</p>
                <p>Joined: {member.joinDate}</p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 btn btn-secondary">
                  <Edit2 size={16} /> Edit
                </button>
                <button className="btn btn-danger">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
