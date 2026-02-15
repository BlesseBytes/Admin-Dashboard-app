import { useStore } from '../store/store'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast() {
  const { toasts, removeToast } = useStore()

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )
}

function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />,
    warning: <AlertTriangle size={20} className="text-yellow-500" />,
  }

  const bgClasses = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
  }

  return (
    <div
      className={`card border p-4 flex items-center gap-3 animate-slide-in-right ${
        bgClasses[toast.type] || bgClasses.info
      }`}
    >
      {icons[toast.type] || icons.info}
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  )
}
