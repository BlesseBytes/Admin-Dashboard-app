import { useStore } from '../../store/store'
import { Menu, Moon, Sun, LogOut, Settings, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationCenter from '../NotificationCenter'

export default function Header() {
  const { isDark, toggleTheme, toggleSidebar, user, logout } = useStore()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()

  const getInitials = (fullName) => {
    if (!fullName) return 'A'
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleMenuClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Toggle sidebar clicked')
    toggleSidebar()
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleMenuClick}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle sidebar menu"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold">Admin Dashboard</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Digital Menu System</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Notification Center */}
          <NotificationCenter />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.fullName || user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {getInitials(user?.fullName || user?.name)}
                </div>
              )}
              <span className="hidden sm:block text-sm font-medium">
                {user?.fullName || user?.name || 'Admin'}
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-soft-lg border border-gray-200 dark:border-gray-600 py-2 animate-fade-in">
                <button
                  onClick={() => {
                    navigate('/profile')
                    setShowProfileMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
                >
                  <User size={16} /> Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/settings')
                    setShowProfileMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors"
                >
                  <Settings size={16} /> Settings
                </button>
                <hr className="my-2 dark:border-gray-600" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
