const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
});

app.use(cors());
app.use(express.json());

// Working RSS feeds
const NEWS_SOURCES = [
  {
    name: 'Phys.org Environment',
    url: 'https://phys.org/rss-feed/earth-news/environment/',
    category: 'Environment'
  },
  {
    name: 'ScienceDaily Environment',
    url: 'https://www.sciencedaily.com/rss/earth_climate/environmental_issues.xml',
    category: 'Science'
  },
  {
    name: 'EcoWatch',
    url: 'https://www.ecowatch.com/feed',
    category: 'Climate'
  },
  {
    name: 'Carbon Brief',
    url: 'https://www.carbonbrief.org/feed/',
    category: 'Climate'
  }
];

let newsCache = [];
let lastFetch = null;
const CACHE_DURATION = 30 * 60 * 1000;

function extractImage(content, link, enclosure) {
  // Check for media:content or enclosure first
  if (enclosure && enclosure.url) {
    return enclosure.url;
  }
  
  if (!content) {
    // Default environmental images
    return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop';
  }
  
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const match = imgRegex.exec(content);
  
  if (match && match[1]) {
    return match[1];
  }
  
  const lowerContent = (content + link).toLowerCase();
  
  if (lowerContent.includes('forest') || lowerContent.includes('tree')) {
    return 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=250&fit=crop';
  } else if (lowerContent.includes('ocean') || lowerContent.includes('sea')) {
    return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop';
  } else if (lowerContent.includes('solar') || lowerContent.includes('renewable')) {
    return 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop';
  } else if (lowerContent.includes('wildlife') || lowerContent.includes('animal')) {
    return 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=250&fit=crop';
  } else if (lowerContent.includes('ice') || lowerContent.includes('arctic')) {
    return 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop';
  } else {
    return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop';
  }
}

async function fetchEnvironmentalNews() {
  const now = Date.now();
  
  if (newsCache.length > 0 && lastFetch && (now - lastFetch) < CACHE_DURATION) {
    console.log('📦 Returning cached news');
    return newsCache;
  }
  
  console.log('🔄 Fetching fresh environmental news...');
  const allNews = [];
  
  for (const source of NEWS_SOURCES) {
    try {
      console.log(`   Fetching from ${source.name}...`);
      const feed = await parser.parseURL(source.url);
      
      feed.items.slice(0, 4).forEach(item => {
        allNews.push({
          title: item.title,
          description: item.contentSnippet || item.content || 'Read more...',
          link: item.link,
          source: source.name,
          category: source.category,
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          image: extractImage(item.content || item.contentSnippet, item.link, item.enclosure)
        });
      });
      console.log(`   ✅ Got ${feed.items.slice(0, 4).length} articles from ${source.name}`);
    } catch (error) {
      console.error(`   ❌ Error from ${source.name}: ${error.message}`);
    }
  }
  
  allNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  newsCache = allNews.slice(0, 16);
  lastFetch = now;
  
  console.log(`📰 Total articles cached: ${newsCache.length}\n`);
  return newsCache;
}

app.get('/api/news', async (req, res) => {
  try {
    const news = await fetchEnvironmentalNews();
    res.json({
      success: true,
      count: news.length,
      articles: news,
      lastUpdated: new Date(lastFetch).toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/news/latest', async (req, res) => {
  try {
    const news = await fetchEnvironmentalNews();
    res.json({
      success: true,
      count: 6,
      articles: news.slice(0, 6),
      lastUpdated: new Date(lastFetch).toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Environmental News API by Gabriel',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    cachedArticles: newsCache.length,
    lastUpdate: lastFetch ? new Date(lastFetch).toISOString() : null
  });
});

app.get('/', (req, res) => {
  res.json({
    message: '🌍 Environmental News API',
    author: 'Gabriel - Penn State IST',
    endpoints: {
      '/api/news': 'Get all environmental news',
      '/api/news/latest': 'Get latest 6 articles',
      '/api/health': 'Health check'
    },
    sources: NEWS_SOURCES.map(s => s.name)
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🌍 Environmental News API running on port ${PORT}`);
  console.log(`📰 Fetching news from ${NEWS_SOURCES.length} sources`);
  console.log(`🔗 Try: http://localhost:${PORT}/api/news\n`);
  
  fetchEnvironmentalNews().then(() => {
    console.log('✅ API ready!\n');
  });
});

module.exports = app;
