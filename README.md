# Admin Dashboard - Digital Menu System

A modern, production-ready Admin Dashboard Web Application with an integrated Digital Menu System built with React, Vite, and Tailwind CSS.

## Features

### Admin Dashboard
- 📊 Beautiful dashboard with key statistics and metrics
- 🎯 Real-time overview of menu items, orders, and revenue
- 📈 Interactive charts and quick stats

### Digital Menu Management
- ➕ Add, edit, and delete menu items with ease
- 🏷️ Manage menu categories
- 🖼️ Image upload support for menu items
- 💰 Set prices and manage stock status
- 🔍 Search and filter by category
- 📄 Pagination support

### User Interface
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- 🎨 Modern, minimal design with professional SaaS styling
- 🎯 Clean, intuitive navigation

### Additional Features
- 👤 User authentication with demo credentials
- 🔔 Notification system with toast messages
- 📋 Orders management page
- 👥 Staff member management
- 📊 Detailed reports and analytics
- ⚙️ Comprehensive settings panel
- 🖱️ Collapsible sidebar with smooth animations
- ✅ Confirmation dialogs for destructive actions

## Tech Stack

- **Frontend Framework**: React 18.3+
- **Build Tool**: Vite 5.2+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Zustand
- **Routing**: React Router DOM 6.28+
- **Icons**: Lucide React
- **CSS Processing**: PostCSS & Autoprefixer

## Project Structure

```
admin-dashboard/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── index.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── index.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   └── ConfirmDialog.jsx
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MenuManagement.jsx
│   │   ├── Categories.jsx
│   │   ├── Orders.jsx
│   │   ├── Staff.jsx
│   │   ├── Reports.jsx
│   │   └── Settings.jsx
│   ├── store/
│   │   └── store.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm 7+

### Quick Start

1. **Clone or Download the Project**
   ```bash
   cd admin-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will open automatically at `http://localhost:5173`

4. **Login with Demo Credentials**
   - Email: `admin@example.com`
   - Password: `password123`

5. **Build for Production**
   ```bash
   npm run build
   ```

## Color Palette

- **Primary Color**: Blue (`#2563EB`)
- **Secondary Color**: Dark Gray (`#1F2937`)
- **Light Background**: White (`#F9FAFB`)
- **Dark Background**: Very Dark Gray (`#111827`)
- **Accent Colors**: Green, Purple, Orange, Red

## Key Pages

### 1. **Dashboard** (`/dashboard`)
- Overview statistics with card components
- Recent menu items display
- Quick stats summary
- Sales trend chart placeholder

### 2. **Menu Management** (`/menu`)
- Full CRUD operations for menu items
- Search and filter functionality
- Image preview support
- Status management (Available/Out of Stock)
- Pagination with navigation

### 3. **Categories** (`/categories`)
- Add, edit, and delete categories
- Grid view of all categories
- Direct management without page navigation

### 4. **Orders** (`/orders`)
- View all customer orders
- Track order status (Completed, Pending, Processing, Cancelled)
- Order details with customer information
- Pagination support

### 5. **Staff** (`/staff`)
- Manage staff members
- Display staff details (role, contact, join date)
- Status indicators (Active, On Leave)
- Edit and delete functionality

### 6. **Reports** (`/reports`)
- Revenue and sales analytics
- Customer statistics
- Growth metrics
- Top menu items by sales

### 7. **Settings** (`/settings`)
- Restaurant information management
- Currency and timezone configuration
- Notification preferences
- Email, SMS, and push notification settings

## State Management with Zustand

The app uses Zustand for state management with the following stores:

```javascript
// Theme Management
- isDark: Boolean for dark mode status
- toggleTheme(): Toggle dark/light mode

// Sidebar
- isSidebarOpen: Boolean for sidebar visibility
- toggleSidebar(): Toggle sidebar

// Authentication
- isLoggedIn: Boolean for login status
- user: User object with profile data
- login(user): Login user
- logout(): Logout user

// Menu Items
- menuItems: Array of menu items
- addMenuItem(item): Add new menu item
- updateMenuItem(id, data): Update menu item
- deleteMenuItem(id): Delete menu item

// Categories
- categories: Array of categories
- addCategory(name): Add new category
- updateCategory(oldName, newName): Update category
- deleteCategory(name): Delete category

// Notifications
- toasts: Array of toast notifications
- addToast(message, type, duration): Show notification
- removeToast(id): Remove notification
```

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

Features:
- Auto-collapsing sidebar on mobile
- Stack-based grid layouts
- Touch-friendly buttons and inputs
- Optimized font sizes for all screen sizes

## Dark Mode

Toggle dark mode from the header button. The preference is saved in localStorage and persists across sessions.

## Customization

### Change Primary Color
1. Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YourColor', // Change this
    }
  }
}
```

### Modify Dashboard Statistics
Edit `src/pages/Dashboard.jsx` to add/remove statistics cards or change data sources.

### Add New Pages
1. Create new file in `src/pages/`
2. Add route in `App.jsx`
3. Add sidebar menu item in `src/components/layout/Sidebar.jsx`

## Mock API Structure

The app is ready for API integration. To connect to a real backend:

1. Create services in `src/services/api.js`
2. Replace Zustand state actions with API calls
3. Update components to handle loading/error states

Example service structure:
```javascript
// src/services/api.js
export const menuAPI = {
  getMenuItems: () => fetch('/api/menu').then(r => r.json()),
  addMenuItem: (item) => fetch('/api/menu', { method: 'POST', body: JSON.stringify(item) }),
  updateMenuItem: (id, item) => fetch(`/api/menu/${id}`, { method: 'PUT', body: JSON.stringify(item) }),
  deleteMenuItem: (id) => fetch(`/api/menu/${id}`, { method: 'DELETE' }),
}
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: All modern versions

## Performance Optimization

- Image optimization with placeholder URLs
- CSS-in-JS with Tailwind for efficient styling
- Component-based architecture for code reuse
- Lazy loading ready (can add React.lazy)
- LocalStorage for theme and user preferences

## WebView Support

The application is fully optimized for WebView embedding:
- Responsive touch-friendly interface
- Fast loading with optimized assets
- Mobile-first design approach
- No external dependencies that require special permissions

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## License

This project is open source and available for educational and commercial use.

## Support

For issues, questions, or feature requests, please refer to the documentation or create an issue in the repository.

---

**Version**: 1.0.0
**Last Updated**: February 2025
**Built with ❤️ using React & Tailwind CSS**
