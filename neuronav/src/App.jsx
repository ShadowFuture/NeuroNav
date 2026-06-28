import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import Projects from './pages/Projects'
import CalendarPage from './pages/Calendar'
import Notes from './pages/Notes'
import WeeklyReview from './pages/WeeklyReview'
import Goals from './pages/Goals'
import FocusMode from './pages/FocusMode'
import AIAssistant from './pages/AIAssistant'
import AIBrainDump from './pages/AIBrainDump'
import DailyInput from './pages/DailyInput'
import LifeTimeline from './pages/LifeTimeline'
import CognitiveLoadMeter from './pages/CognitiveLoadMeter'
import SupportHub from './pages/SupportHub'
import Settings from './pages/Settings'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/weekly-review" element={<WeeklyReview />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/focus-mode" element={<FocusMode />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/ai-brain-dump" element={<AIBrainDump />} />
        <Route path="/daily-input" element={<DailyInput />} />
        <Route path="/life-timeline" element={<LifeTimeline />} />
        <Route path="/cognitive-load" element={<CognitiveLoadMeter />} />
        <Route path="/support" element={<SupportHub />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MainLayout>
  )
}
