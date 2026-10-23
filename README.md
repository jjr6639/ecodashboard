# EcoDashboard

A full-stack environmental dashboard that brings live air quality readings, environmental news from RSS feeds, and a reference list of critically endangered species together on one page.

The front end is a React 19 + Vite single-page app. The back end is a small Express API that aggregates and caches environmental news from four RSS feeds.

---

## Features

### Air quality (live)

- Fetches hourly US AQI, PM2.5, and PM10 data from the [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api) (no API key required)
- Shows the AQI value with a status label: Good (0–50), Moderate (51–100), or Unhealthy (above 100)
- Shows the PM2.5 concentration in µg/m³
- Location is currently fixed to New York City (40.7128, −74.0060)

### Environmental news (live, via custom API)

- The Express API pulls the 4 most recent items from each of these feeds:
  - Phys.org Environment
  - ScienceDaily Environmental Issues
  - EcoWatch
  - Carbon Brief
- Articles are sorted by publish date and cached in memory for 30 minutes
- Each article gets an image from the feed, or a topic-matched Unsplash placeholder if the feed has none
- The dashboard shows the 6 newest articles
- If the API can't be reached, the dashboard shows a built-in set of placeholder articles instead of an empty panel

### Endangered species (static reference data)

Displays a fixed list of four critically endangered species with an estimated population and trend:

| Species | Population shown | Trend |
|---|---|---|
| Sumatran Orangutan | 13,846 | Decreasing |
| Javan Rhino | 76 | Stable |
| Vaquita | ~10 | Decreasing |
| Amur Leopard | ~100 | Increasing |

These values are hardcoded in `src/App.jsx`; they are not pulled from a live source.

### Dashboard behavior

- Auto-refreshes all data every 5 minutes
- Manual refresh button
- Last-updated timestamp
- Global CO₂ indicator (a static value of 36.8 Gt)
- Responsive layout that stacks into a single column on narrow screens

---

## Tech Stack

| Layer | Tools |
|---|---|
| Front end | React 19, Vite 7, CSS, Lucide React icons, Fetch API |
| Back end | Node.js, Express 4, CORS, rss-parser |
| Containers | Docker (multi-stage build), Docker Compose, Nginx |
| Tooling | ESLint, nodemon |

---

## Project Structure

```text
ecodashboard/
├── src/
│   ├── App.jsx              # Dashboard: data fetching, refresh logic, layout
│   ├── App.css              # Styles
│   ├── main.jsx             # React entry point
│   └── components/          # Card components (not yet used by App.jsx)
├── public/
├── api/
│   ├── server.js            # Express news API
│   ├── package.json
│   └── Dockerfile
├── Dockerfile               # Builds the front end and serves it with Nginx
├── docker-compose.yml       # Runs the API and front end together
├── nginx.conf
├── start.sh                 # Starts the API and front end locally in one step
├── vite.config.js
└── package.json
```

---

## API Endpoints

The news API runs on port 3001 by default (set `PORT` to change it).

| Endpoint | Returns |
|---|---|
| `GET /` | API info, endpoint list, and source names |
| `GET /api/news` | Up to 16 cached articles |
| `GET /api/news/latest` | The 6 newest articles |
| `GET /api/health` | Status, uptime, cached article count, last fetch time |

Each article has `title`, `description`, `link`, `source`, `category`, `pubDate`, and `image`.

---

## Getting Started

Requires Node.js 20 or later.

```bash
git clone https://github.com/jjr6639/ecodashboard.git
cd ecodashboard
npm install
cd api && npm install && cd ..
```

### Run locally (quick start)

```bash
./start.sh
```

This starts the API on `http://localhost:3001` and the dashboard on `http://localhost:5173`. Press Ctrl+C to stop both.

### Run locally (separately)

```bash
# Terminal 1: API
cd api
npm run dev     # auto-reloads with nodemon; use npm start for plain node

# Terminal 2: front end
npm run dev
```

### Run with Docker Compose

```bash
docker-compose up --build     # build and start
docker-compose up -d          # start in the background
docker-compose down           # stop
```

| Service | URL |
|---|---|
| Dashboard | http://localhost:8080 |
| News API | http://localhost:3002 |

**Note:** the front end calls the API at `http://localhost:3001`, so under Docker Compose the news panel currently shows placeholder articles. See Known Limitations.

---

## Scripts

| Location | Command | What it does |
|---|---|---|
| root | `npm run dev` | Start the Vite dev server |
| root | `npm run build` | Build production assets to `dist/` |
| root | `npm run preview` | Preview the production build |
| root | `npm run lint` | Run ESLint |
| `api/` | `npm start` | Start the API |
| `api/` | `npm run dev` | Start the API with auto-reload |

---

## Known Limitations

- **Fixed location:** air quality is always for New York City.
- **Static data:** the species list and the global CO₂ value are hardcoded.
- **Docker networking:** the API URL is hardcoded to `localhost:3001`, and Nginx does not proxy `/api` requests, so live news does not load in the Docker Compose setup.
- **No persistence:** there is no database; news is cached in memory and nothing is stored between restarts.
- **No automated tests in this repository.**

---

## Author

**Jordan J. Runyon**

---

## License

MIT
