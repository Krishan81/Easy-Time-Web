import { useState } from 'react'
import WorldClock from './components/WorldClock.jsx'
import Stopwatch from './components/Stopwatch.jsx'
import Timer from './components/Timer.jsx'

const TABS = [
  { id: 'clock', label: 'World Clock' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'timer', label: 'Timer' },
]

function App() {
  const [activeTab, setActiveTab] = useState('clock')

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Time</h1>
          <p className="text-slate-400 mt-1">
            World clock, stopwatch, and timer in one place
          </p>
        </div>

        <div className="flex justify-center gap-1 mb-6 bg-slate-800/60 p-1 rounded-xl w-fit mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-700">
          {activeTab === 'clock' && <WorldClock />}
          {activeTab === 'stopwatch' && <Stopwatch />}
          {activeTab === 'timer' && <Timer />}
        </div>
      </div>
    </div>
  )
}

export default App
