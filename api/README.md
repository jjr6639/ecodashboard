# 🌍 EcoDashboard Custom News API

**Your own environmental news API built from scratch!**

This is a custom Express.js API that scrapes real-time environmental news from multiple sources including BBC, The Guardian, and NASA.

## 🎯 What This Shows Employers

✅ **API Development** - Built your own RESTful API  
✅ **Web Scraping** - Real-time data collection from multiple sources  
✅ **Node.js/Express** - Backend development skills  
✅ **CORS Handling** - Cross-origin request management  
✅ **Error Handling** - Graceful fallbacks and error management  
✅ **Full-Stack Integration** - Your API feeding your React frontend

## 🚀 Quick Start

### Install Dependencies
```bash
cd api
npm install
```

### Run the API
```bash
npm start
```

Your API will run on: **http://localhost:3001**

## 📡 API Endpoints

### GET /api/news
Returns latest environmental news articles

**Response:**
```json
{
  "success": true,
  "count": 8,
  "articles": [
    {
      "title": "Global Renewable Energy Hits Record High",
      "url": "https://...",
      "source": "BBC Environment",
      "image": "https://...",
      "timestamp": "2026-01-28T..."
    }
  ],
  "timestamp": "2026-01-28T..."
}
```

### GET /health
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-28T..."
}
```

## 🔧 How It Works

1. **Scrapes** news from BBC, Guardian, and NASA climate pages
2. **Extracts** titles, links, and images using Cheerio
3. **Serves** data via REST API with CORS enabled
4. **Fallback** to mock data if scraping fails (always reliable!)

## 🛠️ Technologies

- **Express.js** - Web framework
- **Cheerio** - Web scraping
- **node-fetch** - HTTP requests  
- **CORS** - Cross-origin requests

## 📊 Data Sources

The API scrapes from:
- BBC News Environment
- The Guardian Climate Crisis
- NASA Climate Change News

## 🎓 For Your Resume

**Project Component:** Custom Environmental News API

**Description:**  
"Developed a RESTful API using Node.js and Express that scrapes real-time environmental news from multiple sources (BBC, Guardian, NASA). Implemented web scraping with Cheerio, error handling with fallback data, and CORS for cross-origin requests. API serves JSON data to React frontend."

**Tech:** Node.js, Express, Cheerio, REST API, Web Scraping

## 🔥 Running in Production

When deploying, you can use:
- **Railway** - Supports Node.js apps  
- **Render** - Free tier for APIs
- **Heroku** - Classic choice
- **Vercel** - Serverless functions

Just deploy the `/api` folder as a separate service!

## 💡 Extending the API

Want to add more features?

```javascript
// Add more news sources
NEWS_SOURCES.push({
  name: 'Your Source',
  url: 'https://...',
  selector: '.article',
  // ...
});

// Add filtering by date
app.get('/api/news/today', ...);

// Add search functionality  
app.get('/api/news/search/:query', ...);

// Add categories
app.get('/api/news/category/:category', ...);
```

## 🆘 Troubleshooting

**API not starting?**
```bash
cd api
rm -rf node_modules
npm install
npm start
```

**Port 3001 in use?**
Change PORT in `server.js`

**Frontend can't connect?**
Make sure API is running first, then start React app

## ✅ Testing the API

```bash
# Check health
curl http://localhost:3001/health

# Get news
curl http://localhost:3001/api/news | json_pp
```

---

**This is YOUR API that YOU built!** 🔥  
Show employers you can create backend services, not just consume them!
