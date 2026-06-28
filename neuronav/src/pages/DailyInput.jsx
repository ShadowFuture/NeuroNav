import React, { useState, useContext } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { Slider } from '../components/ui/Input'
import Button from '../components/ui/Button'
import { AppContext } from '../context/AppContext'

export default function DailyInput() {
  const [productivity, setProductivity] = useState(5)
  const [energy, setEnergy] = useState(5)
  const [focus, setFocus] = useState(5)
  const { saveDailyInput } = useContext(AppContext)

  function handleSave() {
    const entry = { productivity, energy, focus, createdAt: new Date().toISOString() }
    saveDailyInput(entry)
    alert('Saved')
  }

  return (
    <div>
      <PageHeader title="Daily Input">Log daily state quickly</PageHeader>
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div>
          <label className="font-medium">Productivity</label>
          <Slider value={productivity} onChange={setProductivity} />
        </div>
        <div>
          <label className="font-medium">Energy</label>
          <Slider value={energy} onChange={setEnergy} />
        </div>
        <div>
          <label className="font-medium">Focus</label>
          <Slider value={focus} onChange={setFocus} />
        </div>
        <div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  )
}
