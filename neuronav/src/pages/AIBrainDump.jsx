import React, { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import { TextArea } from '../components/ui/Input'
import { sendBrainDump } from '../services/api'

export default function AIBrainDump() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState(null)

  async function handleSend() {
    setStatus('sending')
    try {
      const res = await sendBrainDump(text)
      setStatus('sent')
    } catch (e) {
      setStatus('error')
    }
  }

  return (
    <div>
      <PageHeader title="AI Brain Dump">Send thoughts to your AI workspace</PageHeader>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <TextArea value={text} onChange={setText} placeholder="Write anything..." />
        <div className="mt-3 flex gap-2">
          <button onClick={handleSend} className="px-3 py-2 bg-neuronav-500 text-white rounded-md">
            Send to AI
          </button>
          {status === 'sending' && <div>Sending...</div>}
          {status === 'sent' && <div>Sent</div>}
          {status === 'error' && <div className="text-red-600">Error</div>}
        </div>
      </div>
    </div>
  )
}
