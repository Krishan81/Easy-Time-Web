import { useState, useEffect } from 'react'

const ALL_ZONES = [
  { city: 'New York', country: 'USA', tz: 'America/New_York' },
  { city: 'Los Angeles', country: 'USA', tz: 'America/Los_Angeles' },
  { city: 'London', country: 'UK', tz: 'Europe/London' },
  { city: 'Paris', country: 'France', tz: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', tz: 'Europe/Berlin' },
  { city: 'Moscow', country: 'Russia', tz: 'Europe/Moscow' },
  { city: 'Dubai', country: 'UAE', tz: 'Asia/Dubai' },
  { city: 'New Delhi', country: 'India', tz: 'Asia/Kolkata' },
  { city: 'Bangkok', country: 'Thailand', tz: 'Asia/Bangkok' },
  { city: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore' },
  { city: 'Hong Kong', country: 'China', tz: 'Asia/Hong_Kong' },
  { city: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
  { city: 'Sydney', country: 'Australia', tz: 'Australia/Sydney' },
  { city: 'Auckland', country: 'New Zealand', tz: 'Pacific/Auckland' },
  { city: 'Sao Paulo', country: 'Brazil', tz: 'America/Sao_Paulo' },
  { city: 'Johannesburg', country: 'South Africa', tz: 'Africa/Johannesburg' },
  { city: 'Cairo', country: 'Egypt', tz: 'Africa/Cairo' },
  { city: 'Istanbul', country: 'Turkey', tz: 'Europe/Istanbul' },
]

const DEFAULT_SELECTED = ['New York', 'London', 'New Delhi', 'Tokyo', 'Sydney']

function formatTime(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(date)
}

function formatDate(date, tz) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

function getOffsetLabel(date, tz) {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  })
  const parts = dtf.formatToParts(date)
  const offset = parts.find((p) => p.type === 'timeZoneName')
  return offset ? offset.value : ''
}

export default function WorldClock() {
  const [now, setNow] = useState(new Date())
  const [selectedCities, setSelectedCities] = useState(DEFAULT_SELECTED)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const selectedZones = ALL_ZONES.filter((z) => selectedCities.includes(z.city))
  const availableToAdd = ALL_ZONES.filter((z) => !selectedCities.includes(z.city))

  const removeCity = (city) => {
    setSelectedCities((prev) => prev.filter((c) => c !== city))
  }

  const addCity = (city) => {
    setSelectedCities((prev) => [...prev, city])
    setShowAdd(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">World Clock</h2>
          <p className="text-slate-400 text-sm mt-1">Your local time</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono text-emerald-400">
            {formatTime(now, Intl.DateTimeFormat().resolvedOptions().timeZone)}
          </p>
          <p className="text-slate-400 text-sm">
            {formatDate(now, Intl.DateTimeFormat().resolvedOptions().timeZone)}
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {selectedZones.map((zone) => (
          <div
            key={zone.city}
            className="bg-slate-900/60 rounded-xl p-4 border border-slate-700 relative group"
          >
            <button
              onClick={() => removeCity(zone.city)}
              className="absolute top-2 right-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm"
              aria-label={`Remove ${zone.city}`}
            >
              ✕
            </button>
            <p className="text-white font-medium">{zone.city}</p>
            <p className="text-slate-500 text-xs mb-2">
              {zone.country} · {getOffsetLabel(now, zone.tz)}
            </p>
            <p className="text-2xl font-mono text-emerald-400">
              {formatTime(now, zone.tz)}
            </p>
            <p className="text-slate-400 text-xs">{formatDate(now, zone.tz)}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {!showAdd ? (
          <button
            onClick={() => setShowAdd(true)}
            disabled={availableToAdd.length === 0}
            className="text-sm text-emerald-400 hover:text-emerald-300 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            + Add a city
          </button>
        ) : (
          <div className="bg-slate-900/60 rounded-xl border border-slate-700 p-3 max-h-48 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-400">Choose a city</p>
              <button
                onClick={() => setShowAdd(false)}
                className="text-slate-500 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-1">
              {availableToAdd.map((z) => (
                <button
                  key={z.city}
                  onClick={() => addCity(z.city)}
                  className="text-left px-2 py-1.5 rounded-lg text-slate-200 hover:bg-slate-800 text-sm transition-colors"
                >
                  {z.city}{' '}
                  <span className="text-slate-500">· {z.country}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
