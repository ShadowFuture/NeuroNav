import React from 'react'
import clsx from 'clsx'

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-md font-medium transition'
  const variants = {
    primary: 'bg-neuronav-500 text-white hover:bg-neuronav-600',
    ghost: 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
  }
  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}
