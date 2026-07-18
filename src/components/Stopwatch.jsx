import { useState, useEffect, useRef } from 'react'

function formatElapsed(ms) {
  const totalMs = Math.floor(ms)
  const minutes = Math.floor(totalMs / 60000)
  const seconds = Math.floor((totalMs % 60000) / 1000)
  const centis = Math.floor((totalMs % 1000) / 10)
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}.${String(centis).padStart(2, '0')}`
}

export default function Stopwatch() {
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState([])
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!running) return

    const tick = () => {
      setElapsed(Date.now() - startTimeRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  const handleStart = () => {
    startTimeRef.current = Date.now() - elapsed
    setRunning(true)
  }

  const handlePause = () => {
    setRunning(false)
  }

  const handleReset = () => {
    setRunning(false)
    setElapsed(0)
    setLaps([])
  }

  const handleLap = () => {
    setLaps((prev) => [elapsed, ...prev])
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Stopwatch</h2>

      <div className="bg-slate-900/60 rounded-xl p-8 border border-slate-700 text-center mb-4">
        <p className="text-5xl sm:text-6xl font-mono text-emerald-400 tabular-nums">
          {formatElapsed(elapsed)}
        </p>
      </div>

      <div className="flex gap-3 justify-center mb-6">
        {!running ? (
          <button
            onClick={handleStart}
            className="px-6 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 transition-colors"
          >
            {elapsed === 0 ? 'Start' : 'Resume'}
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
          onClick={handleLap}
          disabled={!running}
          className="px-6 py-2.5 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Lap
        </button>
        <button
          onClick={handleReset}
          disabled={elapsed === 0 && !running}
          className="px-6 py-2.5 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="bg-slate-900/60 rounded-xl border border-slate-700 max-h-56 overflow-y-auto">
          {laps.map((lap, i) => (
            <div
              key={laps.length - i}
              className="flex items-center justify-between px-4 py-2 border-b border-slate-800 last:border-0 text-sm"
            >
              <span className="text-slate-500">Lap {laps.length - i}</span>
              <span className="text-slate-200 font-mono">
                {formatElapsed(lap)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
