// filepath: /C:/Users/mohit/Downloads/cricket-player/cricket-player/components/ui/input.tsx
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input {...props} className="px-4 py-2 border rounded w-full" />
  )
}

export { Input }