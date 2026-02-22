import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { Mail, Lock, LogIn, X, Eye, EyeOff, RotateCcw, User, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [forgotStep, setForgotStep] = useState(1)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  
  // Signup form states
  const [fullName, setFullName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('')
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isSigningUp, setIsSigningUp] = useState(false)

  const { login, addToast } = useStore()
  const navigate = useNavigate()

  // Get registered users from localStorage (with default admin user if none exist)
  const getRegisteredUsers = () => {
    const users = localStorage.getItem('registeredUsers')
    if (users) {
      return JSON.parse(users)
    }

    // Create default admin user if no users exist
    const defaultAdminUser = {
      id: 1,
      fullName: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      createdAt: new Date().toISOString(),
    }

    const defaultUsers = [defaultAdminUser]
    localStorage.setItem('registeredUsers', JSON.stringify(defaultUsers))
    return defaultUsers
  }

  // Save user to localStorage
  const saveUserToLocalStorage = (user) => {
    const users = getRegisteredUsers()
    users.push(user)
    localStorage.setItem('registeredUsers', JSON.stringify(users))
  }

  // Check if user exists
  const userExists = (userEmail) => {
    const users = getRegisteredUsers()
    return users.some(user => user.email === userEmail)
  }

  // Find user by email and password
  const findUser = (userEmail, userPassword) => {
    const users = getRegisteredUsers()
    return users.find(user => user.email === userEmail && user.password === userPassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (email && password) {
        // Basic validation
        if (!email.includes('@')) {
          addToast('Please enter a valid email address', 'error')
          setIsLoading(false)
          return
        }
        if (password.length < 6) {
          addToast('Password must be at least 6 characters', 'error')
          setIsLoading(false)
          return
        }

        // Check if user is registered
        const user = findUser(email, password)
        if (user) {
          const loginUser = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: 'user',
            avatar: null,
          }
          login(loginUser)
          addToast('Logged in successfully!', 'success')
          navigate('/dashboard')
        } else {
          addToast('Invalid email or password', 'error')
        }
      } else {
        addToast('Please fill in all fields', 'error')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsSigningUp(true)

    setTimeout(() => {
      // Validation
      if (!fullName || !signupEmail || !signupPassword || !signupConfirmPassword) {
        addToast('Please fill in all fields', 'error')
        setIsSigningUp(false)
        return
      }

      if (!signupEmail.includes('@')) {
        addToast('Please enter a valid email address', 'error')
        setIsSigningUp(false)
        return
      }

      if (signupPassword.length < 6) {
        addToast('Password must be at least 6 characters', 'error')
        setIsSigningUp(false)
        return
      }

      if (signupPassword !== signupConfirmPassword) {
        addToast('Passwords do not match', 'error')
        setIsSigningUp(false)
        return
      }

      if (!agreeTerms) {
        addToast('Please agree to the terms and conditions', 'error')
        setIsSigningUp(false)
        return
      }

      if (userExists(signupEmail)) {
        addToast('Email already registered. Please login instead', 'error')
        setIsSigningUp(false)
        return
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        fullName: fullName,
        email: signupEmail,
        password: signupPassword,
        createdAt: new Date().toISOString(),
      }

      // Save to localStorage
      saveUserToLocalStorage(newUser)
      addToast('Account created successfully! Please login', 'success')

      // Auto-fill login form
      setEmail(signupEmail)
      setPassword(signupPassword)
      setIsLoginMode(true)

      // Reset signup form
      setFullName('')
      setSignupEmail('')
      setSignupPassword('')
      setSignupConfirmPassword('')
      setAgreeTerms(false)
      setIsSigningUp(false)
    }, 1000)
  }

  const handleForgotPasswordStep1 = (e) => {
    e.preventDefault()
    if (!forgotEmail) {
      addToast('Please enter your email address', 'error')
      return
    }
    if (!forgotEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error')
      return
    }
    addToast('Reset code sent to ' + forgotEmail, 'success')
    setForgotStep(2)
  }

  const handleForgotPasswordStep2 = (e) => {
    e.preventDefault()
    if (!resetCode) {
      addToast('Please enter the reset code', 'error')
      return
    }
    if (resetCode.length < 4) {
      addToast('Reset code must be at least 4 characters', 'error')
      return
    }
    addToast('Code verified! Now set your new password', 'success')
    setForgotStep(3)
  }

  const handleForgotPasswordStep3 = (e) => {
    e.preventDefault()
    setIsResettingPassword(true)

    if (!newPassword || !confirmPassword) {
      addToast('Please fill in all password fields', 'error')
      setIsResettingPassword(false)
      return
    }
    if (newPassword.length < 6) {
      addToast('Password must be at least 6 characters', 'error')
      setIsResettingPassword(false)
      return
    }
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error')
      setIsResettingPassword(false)
      return
    }

    setTimeout(() => {
      // Update user password in localStorage
      const users = getRegisteredUsers()
      const userIndex = users.findIndex(user => user.email === forgotEmail)
      if (userIndex !== -1) {
        users[userIndex].password = newPassword
        localStorage.setItem('registeredUsers', JSON.stringify(users))
      }

      addToast('Password reset successfully! Please login with your new password', 'success')
      setEmail(forgotEmail)
      setPassword(newPassword)
      setForgotStep(1)
      setShowForgotPassword(false)
      setForgotEmail('')
      setResetCode('')
      setNewPassword('')
      setConfirmPassword('')
      setIsResettingPassword(false)
      setIsLoginMode(true)
    }, 1500)
  }

  const handleExitApp = () => {
    if (window.confirm('Are you sure you want to exit the application?')) {
      addToast('Closing application...', 'info')
      setTimeout(() => {
        window.close()
      }, 1000)
    }
  }

  const closeForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotStep(1)
    setForgotEmail('')
    setResetCode('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Exit Button */}
      <button
        onClick={handleExitApp}
        className="fixed top-4 right-4 p-2 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors"
        title="Exit Application"
      >
        <X size={24} />
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card p-8 shadow-soft-lg">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-3xl font-bold">
              AD
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">Admin Dashboard</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Digital Menu System
          </p>

          {/* Tab Switcher */}
          {!showForgotPassword && (
            <div className="flex gap-2 mb-6 bg-light dark:bg-gray-700 p-1 rounded-lg">
              <button
                onClick={() => setIsLoginMode(true)}
                className={`flex-1 py-2 px-3 rounded transition-colors font-medium text-sm ${
                  isLoginMode
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <LogIn size={16} className="inline mr-1" />
                Login
              </button>
              <button
                onClick={() => setIsLoginMode(false)}
                className={`flex-1 py-2 px-3 rounded transition-colors font-medium text-sm ${
                  !isLoginMode
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <User size={16} className="inline mr-1" />
                Sign Up
              </button>
            </div>
          )}

          {/* Login Form */}
          {isLoginMode && !showForgotPassword && (
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input pr-10 w-full"
                      required
                    />
                    {email && (
                      <button
                        type="button"
                        onClick={() => setEmail('')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input pr-10 w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-primary py-3 text-base font-medium disabled:opacity-50"
              >
                <LogIn size={20} />
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {!isLoginMode && !showForgotPassword && (
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="flex items-center gap-2">
                  <User size={18} className="text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input pr-10 w-full"
                      required
                    />
                    {fullName && (
                      <button
                        type="button"
                        onClick={() => setFullName('')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="input pr-10 w-full"
                      required
                    />
                    {signupEmail && (
                      <button
                        type="button"
                        onClick={() => setSignupEmail('')}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      className="input pr-10 w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-gray-400 flex-shrink-0" />
                  <div className="relative flex-1">
                    <input
                      type={showSignupConfirmPassword ? 'text' : 'password'}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      className="input pr-10 w-full"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showSignupConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded" 
                />
                <span>I agree to the </span>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  terms and conditions
                </button>
              </label>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isSigningUp}
                className="w-full btn btn-primary py-3 text-base font-medium disabled:opacity-50"
              >
                <ArrowRight size={20} />
                {isSigningUp ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {showForgotPassword && (
            <form onSubmit={
              forgotStep === 1 ? handleForgotPasswordStep1 :
              forgotStep === 2 ? handleForgotPasswordStep2 :
              handleForgotPasswordStep3
            } className="space-y-4">
              <h2 className="text-lg font-bold mb-4">Reset Password</h2>

              {/* Step 1: Email */}
              {forgotStep === 1 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="input pl-10"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    We'll send you a code to reset your password
                  </p>
                </div>
              )}

              {/* Step 2: Verify Code */}
              {forgotStep === 2 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Reset Code</label>
                  <input
                    type="text"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="input"
                    placeholder="Enter 6-digit code"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Code sent to {forgotEmail}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setResetCode('')
                      addToast('New code sent to ' + forgotEmail, 'success')
                    }}
                    className="text-xs text-blue-500 hover:text-blue-600 mt-2"
                  >
                    Resend code
                  </button>
                </div>
              )}

              {/* Step 3: New Password */}
              {forgotStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="input pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input pl-10"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isResettingPassword}
                  className="w-full btn btn-primary py-3 text-base font-medium disabled:opacity-50"
                >
                  <RotateCcw size={20} />
                  {forgotStep === 1 ? 'Send Code' : forgotStep === 2 ? 'Verify Code' : isResettingPassword ? 'Resetting...' : 'Reset Password'}
                </button>
                <button
                  type="button"
                  onClick={closeForgotPassword}
                  className="w-full btn btn-secondary py-3 text-base font-medium"
                >
                  Back to Login
                </button>
              </div>
            </form>
          )}

          {/* Demo Credentials */}
          {!showForgotPassword && isLoginMode && (
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-xs font-medium mb-2 text-gray-600 dark:text-gray-400">
                Demo Credentials:
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Email: <span className="font-mono">admin@example.com</span>
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Password: <span className="font-mono">password123</span>
              </p>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
            © 2025 Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="card p-6 shadow-soft-lg max-w-2xl max-h-[80vh] overflow-auto animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Terms and Conditions</h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">1. User Agreement</h3>
                <p>
                  By accessing and using this Admin Dashboard application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">2. Use License</h3>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on the Admin Dashboard for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the application</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">3. Disclaimer</h3>
                <p>
                  The materials on the Admin Dashboard are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">4. Limitations</h3>
                <p>
                  In no event shall the Admin Dashboard or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Admin Dashboard, even if authorized representatives have been notified orally or in writing of the possibility of such damage.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">5. Accuracy of Materials</h3>
                <p>
                  The materials appearing on the Admin Dashboard could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">6. Links</h3>
                <p>
                  We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">7. Modifications</h3>
                <p>
                  We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">8. Governing Law</h3>
                <p>
                  These terms and conditions are governed by and construed in accordance with the laws of [Your Country], and you irrevocably submit to the exclusive jurisdiction of the courts located in that location.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">9. User Responsibilities</h3>
                <p>
                  Users are responsible for maintaining the confidentiality of their passwords and accounts. You agree to accept responsibility for all activities that occur under your account. You agree not to use the application for any illegal or unauthorized purpose.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">10. Termination</h3>
                <p>
                  We reserve the right to terminate or suspend your access to the Admin Dashboard at any time, with or without cause, and without notice. Upon termination, your right to use the website will immediately cease.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-300">
                  Last Updated: February 15, 2026 • By using this application, you acknowledge that you have read, understood, and agree to be bound by all of the terms and conditions outlined above.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowTermsModal(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setAgreeTerms(true)
                  setShowTermsModal(false)
                  addToast('Terms accepted', 'success')
                }}
                className="btn btn-primary"
              >
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
