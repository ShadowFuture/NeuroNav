import React from 'react'
import Card from './Card'

export default function Widget({ title, children, className = '' }) {
  return (
    <Card className={`p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      </div>
      <div>{children}</div>
    </Card>
  )
}
