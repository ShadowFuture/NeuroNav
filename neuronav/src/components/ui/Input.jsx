import React from 'react'

export function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      className="w-full rounded-md border border-gray-200 p-2 resize-y"
      rows={8}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export function Slider({ value, onChange, min = 1, max = 10 }) {
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="text-sm text-gray-600 mt-1">{value}</div>
    </div>
  )
}

export function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      className="w-full rounded-md border border-gray-200 p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}
