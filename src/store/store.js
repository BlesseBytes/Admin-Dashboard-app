import { create } from 'zustand'

export const useStore = create((set) => ({
  // Theme
  isDark: localStorage.getItem('theme') === 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = !state.isDark
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    return { isDark: newTheme }
  }),

  // Sidebar
  isSidebarOpen: localStorage.getItem('sidebarOpen') !== 'false',
  toggleSidebar: () => set((state) => {
    const newState = !state.isSidebarOpen
    localStorage.setItem('sidebarOpen', String(newState))
    console.log('Sidebar toggled to:', newState)
    return { isSidebarOpen: newState }
  }),

  // Auth
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  login: (user) => set(() => {
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('user', JSON.stringify(user))
    return { isLoggedIn: true, user }
  }),
  logout: () => set(() => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    return { isLoggedIn: false, user: null }
  }),

  // Menu Items
  menuItems: [
    {
      id: 1,
      name: 'Grilled Chicken Burger',
      category: 'Burgers',
      description: 'Delicious grilled chicken with fresh vegetables',
      price: 12.99,
      image: 'https://via.placeholder.com/300x200?text=Chicken+Burger',
      status: 'available',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
    },
    {
      id: 2,
      name: 'Classic Cheeseburger',
      category: 'Burgers',
      description: 'Beef patty with melted cheese and all the toppings',
      price: 10.99,
      image: 'https://via.placeholder.com/300x200?text=Cheeseburger',
      status: 'available',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
    },
    {
      id: 3,
      name: 'Margherita Pizza',
      category: 'Pizza',
      description: 'Fresh mozzarella, basil, and tomato sauce',
      price: 14.99,
      image: 'https://via.placeholder.com/300x200?text=Margherita+Pizza',
      status: 'available',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
    },
    {
      id: 4,
      name: 'Caesar Salad',
      category: 'Salads',
      description: 'Crisp romaine lettuce with parmesan and croutons',
      price: 9.99,
      image: 'https://via.placeholder.com/300x200?text=Caesar+Salad',
      status: 'available',
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
    },
  ],
  addMenuItem: (item) => set((state) => ({
    menuItems: [...state.menuItems, { ...item, id: Math.max(...state.menuItems.map(m => m.id), 0) + 1, createdAt: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString().split('T')[0] }]
  })),
  updateMenuItem: (id, updatedItem) => set((state) => ({
    menuItems: state.menuItems.map(item => item.id === id ? { ...item, ...updatedItem, updatedAt: new Date().toISOString().split('T')[0] } : item)
  })),
  deleteMenuItem: (id) => set((state) => ({
    menuItems: state.menuItems.filter(item => item.id !== id)
  })),

  // Categories
  categories: ['Burgers', 'Pizza', 'Salads', 'Desserts', 'Beverages'],
  addCategory: (category) => set((state) => ({
    categories: [...new Set([...state.categories, category])]
  })),
  updateCategory: (oldName, newName) => set((state) => ({
    categories: state.categories.map(cat => cat === oldName ? newName : cat)
  })),
  deleteCategory: (category) => set((state) => ({
    categories: state.categories.filter(cat => cat !== category)
  })),

  // Toast
  toasts: [],
  addToast: (message, type = 'info', duration = 3000) => set((state) => {
    const id = Math.random()
    const newToast = { id, message, type }
    const timeoutId = setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter(t => t.id !== id) }))
    }, duration)
    return { toasts: [...state.toasts, newToast] }
  }),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  })),

  // Users Management
  allUsers: localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : [
    {
      id: 1,
      fullName: 'John Admin',
      email: 'admin@example.com',
      phone: '123-456-7890',
      address: '123 Main St',
      role: 'admin',
      avatar: null,
      createdAt: '2025-01-15',
      updatedAt: '2025-01-15',
    },
  ],
  updateUser: (userData) => set((state) => {
    const updatedUser = { ...state.user, ...userData, updatedAt: new Date().toISOString().split('T')[0] }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    return { user: updatedUser }
  }),
  uploadUserPhoto: (photoData) => set((state) => {
    const updatedUser = { ...state.user, avatar: photoData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    return { user: updatedUser }
  }),
  getAllUsers: () => {
    const users = localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : []
    return users
  },
  createUser: (userData) => set((state) => {
    const users = localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : state.allUsers
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
    const updatedUsers = [...users, newUser]
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers))
    return { allUsers: updatedUsers }
  }),
  updateUserAsAdmin: (userId, userData) => set((state) => {
    const users = localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : state.allUsers
    const updatedUsers = users.map(u => u.id === userId ? { ...u, ...userData, updatedAt: new Date().toISOString().split('T')[0] } : u)
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers))
    return { allUsers: updatedUsers }
  }),
  deleteUser: (userId) => set((state) => {
    const users = localStorage.getItem('allUsers') ? JSON.parse(localStorage.getItem('allUsers')) : state.allUsers
    const updatedUsers = users.filter(u => u.id !== userId)
    localStorage.setItem('allUsers', JSON.stringify(updatedUsers))
    return { allUsers: updatedUsers }
  }),

  // Notifications
  notifications: localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications')) : [{
    id: '1',
    title: 'Welcome',
    message: 'Welcome to the Admin Dashboard',
    type: 'success',
    timestamp: new Date().toISOString(),
    read: false,
  }],
  addNotification: (notification) => set((state) => {
    const newNotif = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: notification.timestamp || new Date().toISOString(),
      read: false,
    }
    const updatedNotifs = [...state.notifications, newNotif]
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs))
    return { notifications: updatedNotifs }
  }),
  markNotificationAsRead: (notificationId) => set((state) => {
    const updatedNotifs = state.notifications.map(n => n.id === notificationId ? { ...n, read: true } : n)
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs))
    return { notifications: updatedNotifs }
  }),
  markAllNotificationsAsRead: () => set((state) => {
    const updatedNotifs = state.notifications.map(n => ({ ...n, read: true }))
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs))
    return { notifications: updatedNotifs }
  }),
  clearAllNotifications: () => set(() => {
    localStorage.removeItem('notifications')
    return { notifications: [] }
  }),
  deleteNotification: (notificationId) => set((state) => {
    const updatedNotifs = state.notifications.filter(n => n.id !== notificationId)
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs))
    return { notifications: updatedNotifs }
  }),
  getUnreadNotificationCount: () => {
    const notifs = localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications')) : []
    return notifs.filter(n => !n.read).length
  },
}))
