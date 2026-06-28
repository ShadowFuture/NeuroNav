import React, { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Widget from '../components/ui/Widget'
import { getWeeklyReviewInsights } from '../services/api'

export default function WeeklyReview() {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)

  async function runReview() {
    setLoading(true)
    try {
      const resp = await getWeeklyReviewInsights({})
      setInsights(resp.data)
    } catch (e) {
      setInsights({ error: 'Not connected' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader title="Weekly Review">AI-generated summary of your week</PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Widget title="Insights">
            {loading ? <div>Loading...</div> : insights ? <pre>{JSON.stringify(insights, null, 2)}</pre> : <div>No insights yet</div>}
            <div className="mt-3">
              <button onClick={runReview} className="px-3 py-2 bg-neuronav-500 text-white rounded-md">
                Run Weekly Review
              </button>
            </div>
          </Widget>
        </div>

        <aside>
          <Widget title="Context">Contextual data placeholder</Widget>
        </aside>
      </div>
    </div>
  )
}
