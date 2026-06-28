import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [dailyInputs, setDailyInputs] = useState([])

  function saveDailyInput(entry) {
    setDailyInputs((s) => [entry, ...s])
  }

  return (
    <AppContext.Provider value={{ dailyInputs, saveDailyInput }}>
      {children}
    </AppContext.Provider>
  )
}
