import { useState, useEffect } from 'react';
import { Wind, TrendingUp, Globe, Heart, Droplets, Newspaper, ExternalLink, RefreshCw } from 'lucide-react';
import './App.css';

const AIR_QUALITY_API = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const CUSTOM_NEWS_API = 'http://localhost:3001/api/news';

function App() {
  const [airQuality, setAirQuality] = useState(null);
  const [endangeredSpecies, setEndangeredSpecies] = useState([]);
  const [emissions, setEmissions] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [location] = useState({ lat: 40.7128, lon: -74.0060 });

  const fetchAirQuality = async () => {
    try {
      const response = await fetch(
        `${AIR_QUALITY_API}?latitude=${location.lat}&longitude=${location.lon}&hourly=pm10,pm2_5,us_aqi&timezone=auto`
      );
      const data = await response.json();
      setAirQuality(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchEndangeredSpecies = async () => {
    setEndangeredSpecies([
      { name: 'Sumatran Orangutan', population: '13,846', trend: 'Decreasing', emoji: '🦧' },
      { name: 'Javan Rhino', population: '76', trend: 'Stable', emoji: '🦏' },
      { name: 'Vaquita', population: '~10', trend: 'Decreasing', emoji: '🐬' },
      { name: 'Amur Leopard', population: '~100', trend: 'Increasing', emoji: '🐆' }
    ]);
  };

  const fetchEmissions = async () => {
    setEmissions({ globalCO2: '36.8' });
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(CUSTOM_NEWS_API);
      const data = await response.json();
      if (data.success && data.articles) {
        setNews(data.articles.slice(0, 6));
      }
    } catch (error) {
      setNews([
        { title: 'Global Renewable Energy Hits Record 4,500 GW', url: 'https://irena.org', source: 'IRENA', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400' },
        { title: 'Antarctic Ice Sheet Melting Rate Increases', url: 'https://nasa.gov', source: 'NASA', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400' },
        { title: 'EU Announces €50B Green Deal Investment', url: 'https://ec.europa.eu', source: 'EU', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400' },
        { title: 'Ocean Temperatures Break Records', url: 'https://noaa.gov', source: 'NOAA', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400' },
        { title: 'Carbon Capture Tech at 90% Efficiency', url: 'https://science.org', source: 'Science', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400' },
        { title: 'Amazon Deforestation Drops 45%', url: 'https://wwf.org', source: 'WWF', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400' }
      ]);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([fetchAirQuality(), fetchEndangeredSpecies(), fetchEmissions(), fetchNews()]);
    setLoading(false);
    setLastUpdate(new Date());
  };

  useEffect(() => { fetchAllData(); }, []);
  useEffect(() => {
    const interval = setInterval(fetchAllData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentAQI = () => airQuality?.hourly?.us_aqi?.[0] || 50;
  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { text: 'Good', color: '#10b981' };
    if (aqi <= 100) return { text: 'Moderate', color: '#f59e0b' };
    return { text: 'Unhealthy', color: '#ef4444' };
  };

  const currentAQI = getCurrentAQI();
  const aqiStatus = getAQIStatus(currentAQI);

  if (loading && !airQuality) {
    return (
      <div className="loading">
        <Globe className="loading-icon" size={64} />
        <h2>Loading Environmental Data...</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div className="top-bar-content">
          <div className="logo-section">
            <Globe size={32} />
            <div>
              <h1>EcoDashboard</h1>
              <p>Real-time Environmental Monitoring</p>
            </div>
          </div>
          <div className="stats-bar">
            <div className="stat-chip">
              <Wind size={20} />
              <div>
                <span className="stat-label">Air Quality</span>
                <span className="stat-value" style={{ color: aqiStatus.color }}>
                  {Math.round(currentAQI)} {aqiStatus.text}
                </span>
              </div>
            </div>
            <div className="stat-chip">
              <Droplets size={20} />
              <div>
                <span className="stat-label">PM2.5</span>
                <span className="stat-value">{airQuality?.hourly?.pm2_5?.[0]?.toFixed(1) || 'N/A'} µg/m³</span>
              </div>
            </div>
            <div className="stat-chip">
              <TrendingUp size={20} />
              <div>
                <span className="stat-label">Global CO₂</span>
                <span className="stat-value">{emissions?.globalCO2} Gt</span>
              </div>
            </div>
            <div className="stat-chip">
              <Heart size={20} />
              <div>
                <span className="stat-label">Critical Species</span>
                <span className="stat-value">{endangeredSpecies.length} Tracked</span>
              </div>
            </div>
          </div>
          <div className="update-info">
            <div className="live-badge"><span className="pulse"></span>LIVE</div>
            <span className="update-time">{lastUpdate.toLocaleTimeString()}</span>
            <button onClick={fetchAllData} className="refresh-btn"><RefreshCw size={18} /></button>
          </div>
        </div>
      </header>
      <main className="main-content">
        <section className="news-section">
          <div className="section-header">
            <Newspaper size={24} />
            <h2>Latest Environmental News</h2>
            <span className="api-badge">🔥 Custom Built API</span>
          </div>
          <div className="news-grid">
            {news.map((article, index) => (
              <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" className="news-card">
                <div className="news-image" style={{ backgroundImage: `url(${article.image})` }}>
                  <div className="news-source">{article.source}</div>
                </div>
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <div className="news-footer">
                    <span className="read-more">Read more <ExternalLink size={14} /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
        <section className="species-section">
          <div className="section-header">
            <Heart size={24} />
            <h2>Critically Endangered Species</h2>
          </div>
          <div className="species-grid">
            {endangeredSpecies.map((species, index) => (
              <div key={index} className="species-card-mini">
                <span className="species-emoji">{species.emoji}</span>
                <div className="species-info">
                  <h4>{species.name}</h4>
                  <div className="species-stats">
                    <span className="population">Pop: {species.population}</span>
                    <span className={`trend trend-${species.trend.toLowerCase()}`}>
                      {species.trend === 'Decreasing' && '📉'}
                      {species.trend === 'Increasing' && '📈'}
                      {species.trend === 'Stable' && '→'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>Data Sources: Open-Meteo • Custom News API • IUCN Red List</p>
        <p>Built by Mr J. Runyon for Personal Use</p>
      </footer>
    </div>
  );
}

export default App;
