import React from 'react'

export default function PageHeader({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      {children && <p className="text-gray-600 mt-1">{children}</p>}
    </div>
  )
}
