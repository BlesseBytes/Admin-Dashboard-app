import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Trash2, Plus, Lock, LogOut } from 'lucide-react'
import Layout from '../components/layout'
import ImageUpload from '../components/ImageUpload'
import UserForm from '../components/UserForm'
import { useStore } from '../store/store'

export default function UserProfile() {
  const navigate = useNavigate()
  const {
    user,
    updateUser,
    uploadUserPhoto,
    allUsers,
    createUser,
    updateUserAsAdmin,
    deleteUser,
    logout,
    addToast,
    addNotification,
  } = useStore()

  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingUser, setIsAddingUser] = useState(false)
  const [editingUserId, setEditingUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const isAdmin = user?.role === 'admin'

  // Get user initials
  const getInitials = (fullName) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle profile photo upload
  const handlePhotoUpload = (photoData) => {
    uploadUserPhoto(photoData)
    addToast('Profile photo updated successfully', 'success')
    addNotification({
      title: 'Profile Updated',
      message: 'Your profile photo has been updated',
      type: 'success',
    })
  }

  // Handle user form submission
  const handleUserFormSubmit = (formData) => {
    setIsLoading(true)

    setTimeout(() => {
      if (isEditingProfile) {
        // Update current user profile
        updateUser(formData)
        addToast('Your profile has been updated', 'success')
        addNotification({
          title: 'Profile Updated',
          message: `Your profile information has been saved`,
          type: 'success',
        })
        setIsEditingProfile(false)
      } else if (editingUserId) {
        // Update another user as admin
        updateUserAsAdmin(editingUserId, formData)
        addToast('User updated successfully', 'success')
        addNotification({
          title: 'User Updated',
          message: `${formData.fullName} has been updated`,
          type: 'success',
        })
        setEditingUserId(null)
      } else {
        // Create new user
        createUser({
          ...formData,
          avatar: null,
        })
        addToast('User created successfully', 'success')
        addNotification({
          title: 'User Created',
          message: `${formData.fullName} has been added`,
          type: 'success',
        })
        setIsAddingUser(false)
      }

      setIsLoading(false)
    }, 1000)
  }

  // Handle password change
  const handleChangePassword = () => {
    setPasswordError('')

    if (!newPassword || !confirmPassword) {
      setPasswordError('Both password fields are required')
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      updateUser({ password: newPassword })
      addToast('Password changed successfully', 'success')
      addNotification({
        title: 'Password Changed',
        message: 'Your password has been updated',
        type: 'success',
      })
      setShowChangePassword(false)
      setNewPassword('')
      setConfirmPassword('')
      setIsLoading(false)
    }, 1000)
  }

  // Handle delete user
  const handleDeleteUser = (userId) => {
    deleteUser(userId)
    addToast('User deleted successfully', 'success')
    addNotification({
      title: 'User Deleted',
      message: 'The user account has been removed',
      type: 'info',
    })
    setShowDeleteConfirm(null)
  }

  // Handle delete own account
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      deleteUser(user.id)
      logout()
      navigate('/')
      addToast('Your account has been deleted', 'info')
    }
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        {!isAddingUser && !editingUserId && (
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-6">
              <div className="text-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-32 h-32 rounded-lg mx-auto mb-4 object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-lg mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-blue-500">
                    <span className="text-5xl font-bold text-white">
                      {getInitials(user.fullName)}
                    </span>
                  </div>
                )}
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user.email}
                </p>
                <div className="mt-4 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium rounded-full">
                  {user.role}
                </div>

                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full btn btn-primary mt-6 flex items-center justify-center gap-2"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={isAddingUser || editingUserId ? 'lg:col-span-3' : 'lg:col-span-2 space-y-6'}>
          {/* Edit Profile Section */}
          {isEditingProfile && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Edit Your Profile
              </h3>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Profile Photo
                </h4>
                <ImageUpload
                  currentImage={user?.avatar}
                  initials={getInitials(user.fullName)}
                  onUpload={handlePhotoUpload}
                  maxSize={5}
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h4>
                <UserForm
                  user={user}
                  onSubmit={handleUserFormSubmit}
                  onCancel={() => setIsEditingProfile(false)}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {/* Change Password Section */}
          {!isEditingProfile && !showChangePassword && (
            <div className="card p-6">
              <button
                onClick={() => setShowChangePassword(true)}
                className="w-full btn btn-secondary flex items-center justify-center gap-2"
              >
                <Lock size={18} />
                Change Password
              </button>
            </div>
          )}

          {showChangePassword && (
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Change Password
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="input w-full"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input w-full"
                    placeholder="••••••••"
                  />
                </div>

                {passwordError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
                    {passwordError}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleChangePassword}
                    disabled={isLoading}
                    className="flex-1 btn btn-primary py-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Updating...' : 'Update Password'}
                  </button>
                  <button
                    onClick={() => {
                      setShowChangePassword(false)
                      setNewPassword('')
                      setConfirmPassword('')
                      setPasswordError('')
                    }}
                    className="flex-1 btn btn-secondary py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Management Section (Admin Only) */}
          {isAdmin && !isEditingProfile && !showChangePassword && (
            <>
              {!isAddingUser && !editingUserId && (
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      User Management
                    </h3>
                    <button
                      onClick={() => setIsAddingUser(true)}
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Plus size={18} />
                      Add User
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">
                            Name
                          </th>
                          <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">
                            Email
                          </th>
                          <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">
                            Role
                          </th>
                          <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map((u) => (
                          <tr
                            key={u.id}
                            className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          >
                            <td className="py-3">
                              <div className="flex items-center gap-3">
                                {u.avatar ? (
                                  <img
                                    src={u.avatar}
                                    alt={u.fullName}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                    {getInitials(u.fullName)}
                                  </div>
                                )}
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {u.fullName}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 text-gray-600 dark:text-gray-400">
                              {u.email}
                            </td>
                            <td className="py-3">
                              <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium rounded">
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingUserId(u.id)}
                                  className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(u.id)}
                                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
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
                </div>
              )}

              {/* Add User Form */}
              {isAddingUser && (
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Add New User
                  </h3>
                  <UserForm
                    onSubmit={handleUserFormSubmit}
                    onCancel={() => setIsAddingUser(false)}
                    isLoading={isLoading}
                  />
                </div>
              )}

              {/* Edit User Form */}
              {editingUserId && (
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Edit User
                  </h3>
                  <UserForm
                    user={allUsers.find((u) => u.id === editingUserId)}
                    onSubmit={handleUserFormSubmit}
                    onCancel={() => setEditingUserId(null)}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </>
          )}

          {/* Danger Zone */}
          {!isAddingUser && !editingUserId && !isEditingProfile && (
            <div className="card p-6 border-2 border-red-200 dark:border-red-900">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">
                Danger Zone
              </h3>
              <button
                onClick={handleDeleteAccount}
                className="w-full btn btn-danger py-2"
              >
                Delete My Account
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="card p-6 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Delete User
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                className="flex-1 btn btn-danger py-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 btn btn-secondary py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
