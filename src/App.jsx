import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useStore } from './store/store'

// Pages
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import MenuManagement from './pages/MenuManagement'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Staff from './pages/Staff'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

// Components
import Toast from './components/Toast'

function App() {
  const { isDark, isLoggedIn } = useStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <Router>
      <Toast />
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
