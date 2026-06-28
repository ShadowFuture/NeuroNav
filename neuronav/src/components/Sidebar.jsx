import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown } from './icons'

const items = [
  { id: 'home', label: 'Home', to: '/home' },
  { id: 'tasks', label: 'Tasks', to: '/tasks' },
  { id: 'projects', label: 'Projects', to: '/projects' },
  { id: 'calendar', label: 'Calendar', to: '/calendar' },
  { id: 'notes', label: 'Notes', to: '/notes' },
  { id: 'weekly-review', label: 'Weekly Review', to: '/weekly-review' },
  { id: 'goals', label: 'Goals', to: '/goals' },
  { id: 'focus-mode', label: 'Focus Mode', to: '/focus-mode' },
  { id: 'ai-assistant', label: 'AI Assistant', to: '/ai-assistant' },
  { id: 'ai-brain-dump', label: 'AI Brain Dump', to: '/ai-brain-dump' },
  { id: 'daily-input', label: 'Daily Input', to: '/daily-input' },
  { id: 'life-timeline', label: 'Life Timeline', to: '/life-timeline' },
  { id: 'cognitive-load', label: 'Cognitive Load Meter', to: '/cognitive-load' },
  { id: 'support', label: 'Support Hub', to: '/support' },
  { id: 'settings', label: 'Settings', to: '/settings' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const [openId, setOpenId] = useState(null)
  const [hovered, setHovered] = useState(false)

  function toggleOpen(id) {
    setOpenId(openId === id ? null : id)
  }

  const effectiveCollapsed = collapsed && !hovered

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-white border-r border-gray-100 transition-all duration-300 ${
        effectiveCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-neuronav-500" />
          {!effectiveCollapsed && <span className="font-semibold text-gray-800">NeuroNav</span>}
        </div>
        <button
          className="text-sm text-gray-500 hover:text-gray-800"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="px-2 py-4">
        {items.map((it) => (
          <div key={it.id} className="group">
            <NavLink
              to={it.to}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md text-sm transition-colors duration-150 hover:bg-neuronav-50 hover:text-neuronav-700 ${
                  isActive ? 'bg-neuronav-100 text-neuronav-700 font-semibold' : 'text-gray-600'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <div className="w-6 h-6 rounded bg-neuronav-300 group-hover:bg-neuronav-400" />
              {!effectiveCollapsed && <span>{it.label}</span>}
              {!effectiveCollapsed && it.children && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleOpen(it.id)
                  }}
                  className="ml-auto"
                >
                  <ChevronDown className={`transition-transform ${openId === it.id ? 'rotate-180' : ''}`} />
                </button>
              )}
            </NavLink>
            {!effectiveCollapsed && it.children && openId === it.id && (
              <div className="ml-8 mt-1 text-sm text-gray-600">
                {it.children.map((c) => (
                  <NavLink key={c.to} to={c.to} className="block p-1 hover:text-neuronav-700">
                    {c.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
