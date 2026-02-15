import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { useStore } from '../store/store'
import { Bell, Lock, Globe, Mail, Save } from 'lucide-react'

export default function Settings() {
  const { addToast } = useStore()
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    restaurantName: 'My Restaurant',
    email: 'contact@restaurant.com',
    phone: '+1 (234) 567-8900',
    address: '123 Main Street, City, State 12345',
    currency: 'USD',
    timezone: 'UTC-5',
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    },
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  }, [])

  const handleSave = () => {
    try {
      localStorage.setItem('appSettings', JSON.stringify(settings))
      addToast('Settings saved successfully!', 'success')
    } catch (error) {
      console.error('Failed to save settings:', error)
      addToast('Failed to save settings', 'error')
    }
  }

  const tabs = [
    { key: 'general', label: 'General', icon: Globe },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'security', label: 'Security', icon: Lock },
    { key: 'email', label: 'Email', icon: Mail },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your application settings
          </p>
        </div>

        {/* Settings Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-light dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-left'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-6">General Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Restaurant Name</label>
                    <input
                      type="text"
                      value={settings.restaurantName}
                      onChange={(e) =>
                        setSettings({ ...settings, restaurantName: e.target.value })
                      }
                      className="input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Currency</label>
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                        className="input"
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                        className="input"
                      >
                        <option value="UTC-5">UTC-5 (Eastern)</option>
                        <option value="UTC-6">UTC-6 (Central)</option>
                        <option value="UTC-7">UTC-7 (Mountain)</option>
                        <option value="UTC-8">UTC-8 (Pacific)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications' },
                    { key: 'smsNotifications', label: 'SMS Notifications' },
                    { key: 'pushNotifications', label: 'Push Notifications' },
                  ].map((notif) => (
                    <div key={notif.key} className="flex items-center justify-between p-4 bg-light dark:bg-gray-700 rounded-lg">
                      <label className="font-medium cursor-pointer">{notif.label}</label>
                      <input
                        type="checkbox"
                        checked={settings.notifications[notif.key]}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              [notif.key]: e.target.checked,
                            },
                          })
                        }
                        className="w-4 h-4 cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-blue-900 dark:text-blue-300">
                      Security settings allow you to manage your account security and access controls.
                    </p>
                  </div>
                  <button className="btn btn-primary">Change Password</button>
                  <button className="btn btn-secondary">Enable Two-Factor Authentication</button>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="card p-6">
                <h2 className="text-xl font-bold mb-6">Email Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="input"
                    />
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                    <p className="text-sm text-green-900 dark:text-green-300">
                      Email verified ✓
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <button onClick={handleSave} className="btn btn-primary">
                <Save size={20} /> Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
