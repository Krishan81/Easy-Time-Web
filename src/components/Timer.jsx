import { useState, useEffect, useRef } from 'react'

function formatRemaining(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0'
  )}:${String(seconds).padStart(2, '0')}`
}

const PRESETS = [
  { label: '1 min', seconds: 60 },
  { label: '5 min', seconds: 300 },
  { label: '10 min', seconds: 600 },
  { label: '25 min', seconds: 1500 },
]

export default function Timer() {
  const [durationSec, setDurationSec] = useState(300)
  const [remaining, setRemaining] = useState(300000)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const endTimeRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return

    intervalRef.current = setInterval(() => {
      const left = endTimeRef.current - Date.now()
      if (left <= 0) {
        setRemaining(0)
        setRunning(false)
        setFinished(true)
        clearInterval(intervalRef.current)
      } else {
        setRemaining(left)
      }
    }, 250)

    return () => clearInterval(intervalRef.current)
  }, [running])

  const handleStart = () => {
    setFinished(false)
    endTimeRef.current = Date.now() + remaining
    setRunning(true)
  }

  const handlePause = () => {
    setRunning(false)
  }

  const handleReset = () => {
    setRunning(false)
    setFinished(false)
    setRemaining(durationSec * 1000)
  }

  const setPreset = (seconds) => {
    setRunning(false)
    setFinished(false)
    setDurationSec(seconds)
    setRemaining(seconds * 1000)
  }

  const adjust = (deltaSec) => {
    if (running) return
    setFinished(false)
    setDurationSec((prev) => {
      const next = Math.max(0, prev + deltaSec)
      setRemaining(next * 1000)
      return next
    })
  }

  const progress =
    durationSec > 0 ? 1 - remaining / (durationSec * 1000) : 0

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Timer</h2>

      <div
        className={`bg-slate-900/60 rounded-xl p-8 border text-center mb-4 transition-colors ${
          finished ? 'border-red-500' : 'border-slate-700'
        }`}
      >
        <p
          className={`text-5xl sm:text-6xl font-mono tabular-nums ${
            finished ? 'text-red-400' : 'text-emerald-400'
          }`}
        >
          {formatRemaining(remaining)}
        </p>
        {finished && (
          <p className="text-red-400 text-sm mt-2 font-medium">Time's up!</p>
        )}
        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${Math.min(100, progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => setPreset(p.seconds)}
            disabled={running}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-sm hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => adjust(-60)}
          disabled={running}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-sm hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          -1 min
        </button>
        <button
          onClick={() => adjust(60)}
          disabled={running}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-sm hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          +1 min
        </button>
      </div>

      <div className="flex gap-3 justify-center">
        {!running ? (
          <button
            onClick={handleStart}
            disabled={remaining === 0}
            className="px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-2.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-400 transition-colors"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
