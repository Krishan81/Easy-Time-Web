# Time — World Clock, Stopwatch & Timer

A React + Tailwind app with three tools in one:

- **World Clock** — shows your local time plus the current time in several
  cities around the world (New York, London, New Delhi, Tokyo, Sydney by
  default). Add or remove cities from a list of 18 timezones.
- **Stopwatch** — start, pause, resume, record laps, and reset.
- **Timer** — a countdown timer with presets (1/5/10/25 min), +/- 1 minute
  adjustment, and a progress bar.

## Setup

1. Unzip the project and open the folder in VS Code.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the printed localhost URL in your browser.

## Project structure

```
time-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Tab navigation between the 3 tools
    ├── index.css               # Tailwind directives
    └── components/
        ├── WorldClock.jsx      # Live clock + timezone list
        ├── Stopwatch.jsx       # Start/pause/lap/reset stopwatch
        └── Timer.jsx           # Countdown timer with presets
```

## Ideas to extend it

- Persist selected cities with `localStorage`
- Add an alarm clock tab
- Add a search box to filter the "add city" list
- Play a sound when the timer finishes
- Add a 12h/24h toggle for the World Clock
