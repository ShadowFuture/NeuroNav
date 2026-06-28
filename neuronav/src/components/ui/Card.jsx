import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-lg shadow-sm p-4 ${className}`}>
      {children}
    </div>
  )
}
