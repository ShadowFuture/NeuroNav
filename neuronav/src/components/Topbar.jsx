import React from 'react'

export default function Topbar() {
  return (
    <header className="border-b border-gray-200 bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-gray-800">NeuroNav</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-600 hover:text-gray-900">Profile</button>
      </div>
    </header>
  )
}
