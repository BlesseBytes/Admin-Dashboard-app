import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${
          fallbackClassName || className
        }`}
      >
        <ImageIcon size={32} className="text-gray-400 dark:text-gray-600" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  )
}
