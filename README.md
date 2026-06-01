# EcoDashboard

A full-stack environmental monitoring dashboard that aggregates real-time environmental data, climate news, air quality metrics, and endangered species information into a single modern web application.

EcoDashboard combines a React-based front end with a custom Express API to provide users with a centralized view of current environmental conditions and conservation-related information.

---

## Features

### Real-Time Air Quality Monitoring

- Retrieves live air quality data from the Open-Meteo Air Quality API
- Displays:
  - US AQI (Air Quality Index)
  - PM2.5 concentrations
  - Air quality status indicators
- Automatically refreshes data every 5 minutes

### Environmental News Feed

- Custom-built Express API for environmental news aggregation
- Displays recent environmental and climate-related articles
- External links to original sources
- Fallback content available if API services are unavailable

### Endangered Species Tracking

Displays information for critically endangered species, including:

- Species name
- Estimated population
- Population trend
- Visual status indicators

Current tracked species include:

- Sumatran Orangutan
- Javan Rhino
- Vaquita
- Amur Leopard

### Environmental Metrics Dashboard

Provides key environmental indicators such as:

- Air Quality Index (AQI)
- PM2.5 levels
- Global CO₂ emissions data
- Number of tracked endangered species

### Live Dashboard Experience

- Auto-refreshing environmental data
- Manual refresh functionality
- Live status indicators
- Responsive dashboard layout

---

## Tech Stack

### Front End

- React 19
- Vite
- CSS3
- Lucide React Icons

### Data Visualization

- Recharts

### HTTP & Data Fetching

- Fetch API
- Axios

### Back End

- Node.js
- Express
- CORS

### News Aggregation

- RSS Parser

### Containerization

- Docker
- Docker Compose
- Nginx

---

## Project Structure

```text
ecodashboard/
│
├── src/
│   ├── components/
│   │   ├── AirQualityCard.jsx
│   │   └── EndangeredSpeciesCard.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── public/
│
├── api/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
│
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── vite.config.js
└── package.json
```

---

## Architecture

### Front End

The React application serves as the primary dashboard interface and handles:

- Air quality data retrieval
- Dashboard rendering
- News display
- Species tracking visualization
- Automatic refresh cycles

### Back End

The Express API provides:

- Environmental news aggregation
- RSS feed processing
- Unified API endpoint for dashboard consumption
- CORS-enabled communication with the React client

### External Data Sources

#### Open-Meteo Air Quality API

Provides:

- AQI values
- PM2.5 data
- Air quality forecasts

#### RSS News Sources

Aggregated through the custom API to provide:

- Environmental news
- Climate updates
- Conservation stories
- Sustainability developments

#### IUCN Red List (Reference Data)

Used as a source for endangered species information and conservation status tracking.

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd ecodashboard
```

---

## Install Front-End Dependencies

```bash
npm install
```

---

## Install API Dependencies

```bash
cd api
npm install
```

---

## Running the Application

### Start the API Server

From the API directory:

```bash
npm run dev
```

or

```bash
npm start
```

The API will run on:

```text
http://localhost:3001
```

---

### Start the Front End

From the project root:

```bash
npm run dev
```

The React application will run on:

```text
http://localhost:5173
```

---

## Docker Deployment

Build and run the complete application stack:

```bash
docker-compose up --build
```

Run in detached mode:

```bash
docker-compose up -d
```

Stop containers:

```bash
docker-compose down
```

---

## Available Scripts

### Front End

Start development server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

---

### API

Start production server:

```bash
npm start
```

Run with automatic reload:

```bash
npm run dev
```

---

## Environmental Data Displayed

| Metric | Description |
|----------|-------------|
| AQI | Air Quality Index |
| PM2.5 | Fine particulate pollution |
| Global CO₂ | Global carbon emissions indicator |
| Species Tracking | Critically endangered species monitoring |
| News Feed | Environmental and climate news updates |

---

## Key Learning Objectives

This project demonstrates:

- Full-stack web development
- React state management
- REST API integration
- Express server development
- RSS feed aggregation
- Real-time data updates
- Docker containerization
- Environmental data visualization
- Responsive UI development

---

## Future Improvements

Potential enhancements include:

- Interactive environmental charts
- Historical AQI trends
- Geographic location selection
- User authentication
- Database integration
- Species search functionality
- Carbon footprint calculator
- Weather data integration
- Advanced analytics dashboard
- CI/CD pipeline deployment

---

## Author

**Jordan Runyon**

Developed as a personal environmental monitoring dashboard to explore full-stack development, API integration, real-time data visualization, and environmental data aggregation.

---

## License

This project is licensed under the MIT License.
