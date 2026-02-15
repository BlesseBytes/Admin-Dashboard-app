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
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

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
}))
