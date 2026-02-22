import { useState } from 'react'
import { Upload, X } from 'lucide-react'

export default function ImageUpload({ onUpload, currentImage, initials, maxSize = 5 }) {
  const [preview, setPreview] = useState(currentImage)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const handleFileSelect = (file) => {
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file')
      return
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`Image size must be less than ${maxSize}MB`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const dataURL = e.target.result
      setPreview(dataURL)
      onUpload(dataURL)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleClearImage = () => {
    setPreview(null)
    onUpload(null)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileSelect(e.target.files[0])
            }
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-3">
          <Upload size={32} className="text-gray-400" />
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              PNG, JPG, GIF up to {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {preview ? (
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Image preview
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <div
            className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-400 dark:text-gray-500">
                {initials}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fallback Avatar
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
