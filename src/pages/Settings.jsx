import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { useStore } from '../store/store'
import { Bell, Lock, Globe, Mail, Save, X, Check, Copy, Eye, EyeOff } from 'lucide-react'

export default function Settings() {
  const { addToast } = useStore()
  const [activeTab, setActiveTab] = useState('general')
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [twoFactorStep, setTwoFactorStep] = useState(1)
  const [passwordStep, setPasswordStep] = useState(1) // 1: enter new password, 2: email verification
  const [verificationCode, setVerificationCode] = useState('')
  const [emailVerificationCode, setEmailVerificationCode] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [qrCodeData] = useState('https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=otpauth://totp/AdminDashboard:admin@restaurant.com?secret=JBSWY3DPEBLW64TMMQ%3D%3D%3D%3D%3D%3D')
  const [settings, setSettings] = useState({
    restaurantName: 'My Restaurant',
    email: 'contact@restaurant.com',
    phone: '+1 (234) 567-8900',
    address: '123 Main Street, City, State 12345',
    currency: 'USD',
    timezone: 'UTC-5',
    twoFactorEnabled: false,
    twoFactorSecret: 'JBSWY3DPEBLW64TMMQ======',
    backupCodes: [
      '1234-5678-9012',
      '2345-6789-0123',
      '3456-7890-1234',
      '4567-8901-2345',
      '5678-9012-3456',
    ],
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

  const handleEnable2FA = () => {
    setTwoFactorStep(1)
    setVerificationCode('')
    setShow2FAModal(true)
  }

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      addToast('Please enter a 6-digit code', 'error')
      return
    }
    setTwoFactorStep(2)
  }

  const handleConfirm2FA = () => {
    setSettings({ ...settings, twoFactorEnabled: true })
    setShow2FAModal(false)
    setVerificationCode('')
    setTwoFactorStep(1)
    handleSave()
    addToast('2FA enabled successfully!', 'success')
  }

  const handleDisable2FA = () => {
    setSettings({ ...settings, twoFactorEnabled: false })
    handleSave()
    addToast('2FA disabled', 'success')
  }

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const handleOpenPasswordModal = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setEmailVerificationCode('')
    setPasswordStep(1)
    setShowPasswordModal(true)
  }

  const handleVerifyPassword = () => {
    if (!passwordData.currentPassword) {
      addToast('Please enter your current password', 'error')
      return
    }
    if (passwordData.newPassword.length < 6) {
      addToast('New password must be at least 6 characters', 'error')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addToast('Passwords do not match', 'error')
      return
    }
    // Send code to email
    addToast(`Verification code sent to ${settings.email}`, 'info')
    setPasswordStep(2)
  }

  const handleConfirmPasswordChange = () => {
    if (!emailVerificationCode || emailVerificationCode.length !== 6) {
      addToast('Please enter a valid 6-digit code', 'error')
      return
    }
    // Password changed
    addToast('Password changed successfully!', 'success')
    setShowPasswordModal(false)
    setPasswordStep(1)
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setEmailVerificationCode('')
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
                  <button 
                    onClick={handleOpenPasswordModal}
                    className="btn btn-primary"
                  >
                    <Lock size={18} className="inline mr-2" />
                    Change Password
                  </button>
                  
                  {/* 2FA Toggle */}
                  <div className="p-4 bg-light dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Two-Factor Authentication (2FA)</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {settings.twoFactorEnabled 
                            ? '✓ 2FA is enabled on your account' 
                            : 'Add an extra layer of security to your account'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!settings.twoFactorEnabled ? (
                          <button 
                            onClick={handleEnable2FA}
                            className="btn btn-primary"
                          >
                            Enable 2FA
                          </button>
                        ) : (
                          <button 
                            onClick={handleDisable2FA}
                            className="btn btn-danger"
                          >
                            Disable 2FA
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
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

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Set Up Two-Factor Authentication</h2>
              <button
                onClick={() => {
                  setShow2FAModal(false)
                  setTwoFactorStep(1)
                  setVerificationCode('')
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {twoFactorStep === 1 ? (
                <>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Step 1: Scan this QR code with your authenticator app (Google Authenticator, Authy, Microsoft Authenticator, etc.)
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <img 
                          src={qrCodeData}
                          alt="2FA QR Code"
                          className="w-40 h-40 rounded-lg mb-2"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">Scan with your authenticator app</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Or enter this secret key manually:</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 p-3 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm break-all">
                        {settings.twoFactorSecret}
                      </code>
                      <button
                        onClick={() => handleCopyCode(settings.twoFactorSecret)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                        title="Copy secret"
                      >
                        <Copy size={18} className={copiedCode === settings.twoFactorSecret ? 'text-green-600' : ''} />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                    <p className="text-xs text-yellow-800 dark:text-yellow-200">
                      <strong>Important:</strong> Save your secret key in a safe place. You'll need it if you lose access to your authenticator app.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Enter 6-digit code from your app:</label>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength="6"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="input text-center text-2xl tracking-widest font-mono"
                    />
                  </div>

                  <button
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Verify Code
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Code Verified!</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Your 2FA setup is almost complete. Save these backup codes in a safe place.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Backup Codes (Save these!)</label>
                    <div className="space-y-2 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {settings.backupCodes.map((code, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <code className="font-mono text-sm">{code}</code>
                          <button
                            onClick={() => handleCopyCode(code)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                            title="Copy code"
                          >
                            <Copy size={14} className={copiedCode === code ? 'text-green-600' : ''} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> You can use these backup codes to access your account if you lose your authenticator device. Each code can only be used once.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirm2FA}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    <Check size={18} className="inline mr-2" />
                    Complete Setup
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Change Password</h2>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPasswordStep(1)
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                  })
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {passwordStep === 1 ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your current password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="input pr-10"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password (min 6 characters)"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="input pr-10"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="input"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      After you change your password, we'll send a verification code to your email for security confirmation.
                    </p>
                  </div>

                  <button
                    onClick={handleVerifyPassword}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Verify Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      We sent a 6-digit verification code to:
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mt-1">
                      {settings.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Enter Verification Code</label>
                    <input
                      type="text"
                      placeholder="000000"
                      maxLength="6"
                      value={emailVerificationCode}
                      onChange={(e) => setEmailVerificationCode(e.target.value.replace(/\D/g, ''))}
                      className="input text-center text-2xl tracking-widest font-mono"
                    />
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
                    <p className="text-xs text-green-800 dark:text-green-200">
                      <strong>Security:</strong> Your password will only be changed after email verification. Your session will remain active.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmPasswordChange}
                    disabled={emailVerificationCode.length !== 6}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    <Check size={18} className="inline mr-2" />
                    Confirm Password Change
                  </button>

                  <button
                    onClick={() => {
                      setPasswordStep(1)
                      setEmailVerificationCode('')
                    }}
                    className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
