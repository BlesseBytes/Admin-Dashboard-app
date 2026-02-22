import { useState } from 'react'
import Layout from '../components/layout'
import ImageWithFallback from '../components/ImageWithFallback'
import { Plus, Edit2, Trash2, Eye, X } from 'lucide-react'

export default function Staff() {
  const [staff, setStaff] = useState([
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
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editData, setEditData] = useState({})
  const [newStaffData, setNewStaffData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    status: 'active',
  })

  const handleViewStaff = (member) => {
    setSelectedStaff(member)
    setEditData(member)
    setIsEditing(false)
  }

  const handleEditStaff = () => {
    setIsEditing(true)
  }

  const handleSaveStaff = () => {
    setStaff(staff.map(s => s.id === editData.id ? editData : s))
    setSelectedStaff(editData)
    setIsEditing(false)
  }

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id))
    setSelectedStaff(null)
  }

  const handleAddStaff = () => {
    if (!newStaffData.name || !newStaffData.role || !newStaffData.email || !newStaffData.phone) {
      alert('Please fill in all fields')
      return
    }
    const newStaff = {
      id: Math.max(...staff.map(s => s.id), 0) + 1,
      ...newStaffData,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: 'https://via.placeholder.com/40',
    }
    setStaff([...staff, newStaff])
    setNewStaffData({
      name: '',
      role: '',
      email: '',
      phone: '',
      status: 'active',
    })
    setIsAdding(false)
  }

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
          <button 
            onClick={() => setIsAdding(true)}
            className="btn btn-primary cursor-pointer">
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
                <button 
                  onClick={() => handleViewStaff(member)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
                  title="View details"
                >
                  <Eye size={16} /> View
                </button>
                <button 
                  onClick={() => {
                    handleViewStaff(member)
                    setIsEditing(true)
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer"
                  title="Edit staff"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button 
                  onClick={() => handleDeleteStaff(member.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium p-2 rounded-lg transition-colors cursor-pointer"
                  title="Delete staff"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Staff Details Modal */}
        {selectedStaff && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">
                  {isEditing ? 'Edit Staff' : 'Staff Details'}
                </h2>
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {!isEditing ? (
                  <>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                      <p className="text-lg font-semibold">{selectedStaff.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                      <p className="text-lg">{selectedStaff.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      <p className="text-lg">{selectedStaff.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="text-lg">{selectedStaff.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Join Date</p>
                      <p className="text-lg">{selectedStaff.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(selectedStaff.status)}`}>
                        {selectedStaff.status}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Name</label>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Role</label>
                      <input
                        type="text"
                        value={editData.role}
                        onChange={(e) => setEditData({...editData, role: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Email</label>
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Phone</label>
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 dark:text-gray-400">Status</label>
                      <select
                        value={editData.status}
                        onChange={(e) => setEditData({...editData, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                      >
                        <option value="active">Active</option>
                        <option value="on_leave">On Leave</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                {!isEditing ? (
                  <>
                    <button
                      onClick={handleEditStaff}
                      className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => setSelectedStaff(null)}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSaveStaff}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Staff Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">Add New Staff</h2>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Name *</label>
                  <input
                    type="text"
                    placeholder="Enter staff name"
                    value={newStaffData.name}
                    onChange={(e) => setNewStaffData({...newStaffData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Role *</label>
                  <input
                    type="text"
                    placeholder="e.g., Chef, Waiter"
                    value={newStaffData.role}
                    onChange={(e) => setNewStaffData({...newStaffData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Email *</label>
                  <input
                    type="email"
                    placeholder="email@restaurant.com"
                    value={newStaffData.email}
                    onChange={(e) => setNewStaffData({...newStaffData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 (234) 567-8901"
                    value={newStaffData.phone}
                    onChange={(e) => setNewStaffData({...newStaffData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Status</label>
                  <select
                    value={newStaffData.status}
                    onChange={(e) => setNewStaffData({...newStaffData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 dark:bg-gray-700"
                  >
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleAddStaff}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                >
                  Add Staff
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}