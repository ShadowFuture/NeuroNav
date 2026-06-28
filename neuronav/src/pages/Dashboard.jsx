import React from 'react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Widget from '../components/ui/Widget'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard">Overview and quick actions</PageHeader>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Hero</h3>
            <p className="text-gray-600">Welcome to NeuroNav — your cognitive wellness hub.</p>
            <div className="mt-4 flex gap-3">
              <Button>Start Focus Mode</Button>
              <Button variant="ghost">New Daily Input</Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Widget title="Focus Trend">Placeholder chart</Widget>
            <Widget title="Recent Notes">Placeholder notes</Widget>
          </div>
        </div>

        <aside>
          <Widget title="Quick Actions">
            <div className="flex flex-col gap-2">
              <Button variant="ghost">Add Task</Button>
              <Button variant="ghost">Log Entry</Button>
              <Button variant="ghost">Run Weekly Review</Button>
            </div>
          </Widget>
        </aside>
      </section>
    </div>
  )
}
