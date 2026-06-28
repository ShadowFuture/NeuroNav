import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

export async function sendBrainDump(text) {
  // Placeholder for AI integration
  return api.post('/ai/brain-dump', { text })
}

export async function getWeeklyReviewInsights(entries) {
  // Placeholder: send entries to AI and return insights
  return api.post('/ai/weekly-review', { entries })
}

export default api
