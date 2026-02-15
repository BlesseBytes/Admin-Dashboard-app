export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 px-4 md:px-6 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <h3 className="font-bold mb-2">Admin Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Digital Menu System for restaurants and cafes.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-2">Contact</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Phone: +1 (234) 567-8900
              <br />
              Email: support@admindash.com
            </p>
          </div>

          {/* Version */}
          <div>
            <h3 className="font-bold mb-2">Version</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              v1.0.0
              <br />
              © 2025 Admin Dashboard. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
