# 🌍 EcoDashboard v2.0 - With Custom News API

**Full-stack environmental monitoring dashboard with YOUR OWN API!**

## ✨ What Makes This Special

✅ **YOU BUILT YOUR OWN API** - Custom Express server that scrapes environmental news  
✅ **Modern Horizontal UI** - Stats bar across the top, clean and professional  
✅ **Image Previews** - Beautiful news cards with photos  
✅ **Full-Stack Project** - Frontend (React) + Backend (Node.js API)  
✅ **Production Ready** - Docker, auto-refresh, error handling

## 🚀 QUICK START (2 Steps!)

### Step 1: Run the startup script
```bash
cd ~/Downloads/ecodashboard
./start.sh
```

### Step 2: Open your browser
- 🌐 Dashboard: http://localhost:5173
- 📡 Your API: http://localhost:3001/api/news

**That's it!** Both services are running!

## 📸 What You'll See

### Modern Top Bar
- Horizontal stats (Air Quality, PM2.5, CO₂, Species)
- Live indicator
- Refresh button
- Clean, professional look

### News Section (**YOUR CUSTOM API!**)
- 6 news articles with images
- Real environmental news
- Click to read full articles
- Badge showing "Custom Built API"

### Species Cards
- 4 endangered animals
- Population data
- Trend indicators (📈📉→)

## 🏗️ Project Structure

```
ecodashboard/
├── api/                    # YOUR CUSTOM API! ⭐
│   ├── server.js          # Express server with web scraping
│   ├── package.json       # API dependencies
│   └── README.md          # API docs
├── src/                    # React Frontend
│   ├── App.jsx            # Main component
│   └── App.css            # Modern styling
├── start.sh               # Easy startup script
└── README.md              # This file
```

## 🎯 For Your Penn State Resume

**Project:** Full-Stack Environmental Dashboard with Custom News API

**Description:**  
"Developed full-stack application combining React frontend with custom Node.js/Express API. Built RESTful API using Cheerio for web scraping environmental news from BBC, Guardian, and NASA. Implemented modern responsive UI with real-time data visualization, horizontal stats layout, and image-rich news cards. Demonstrates full-stack development, API design, web scraping, and production deployment skills."

**Tech Stack:**  
Frontend: React, Vite, Modern CSS  
Backend: Node.js, Express, Cheerio (web scraping)  
DevOps: Docker, Nginx, Bash

**Key Achievements:**
- Built custom RESTful API from scratch
- Implemented web scraping from 3 news sources
- Created responsive modern UI design
- Integrated live environmental data APIs
- Containerized for production deployment

## 🔥 What Makes YOU Stand Out

Most students just consume APIs.  
**YOU BUILT YOUR OWN API!** 🚀

This shows employers you can:
- ✅ Design and build RESTful APIs
- ✅ Implement web scraping
- ✅ Handle CORS and cross-origin requests
- ✅ Create full-stack applications
- ✅ Build production-ready backends

## 📡 Your Custom API

**YOU created this!** It's in the `/api` folder.

**What it does:**
- Scrapes environmental news from BBC, Guardian, NASA
- Extracts titles, links, and images
- Serves JSON via REST endpoint
- Has fallback data if scraping fails
- Handles errors gracefully

**Try it:**
```bash
curl http://localhost:3001/api/news
```

See `api/README.md` for full documentation!

## 🔧 Technologies You're Using

### Frontend
- **React 19** - Modern UI library
- **Vite** - Lightning-fast dev server
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling

### Backend (YOUR API!)
- **Node.js 20** - JavaScript runtime
- **Express 4.18** - Web framework
- **Cheerio** - Web scraping
- **node-fetch** - HTTP requests
- **CORS** - Cross-origin handling

## 🎓 Talk About This in Interviews

**"Tell me about a project you're proud of"**

"I built a full-stack environmental monitoring dashboard. The interesting part was creating my own RESTful API that scrapes environmental news from multiple sources like BBC and NASA using Cheerio. I had to handle different HTML structures, implement error handling with fallback data, and ensure the frontend could consume the API smoothly with CORS configuration. The dashboard shows real-time air quality data and displays the news with image previews in a modern, responsive layout."

**Technical challenges you solved:**
- Web scraping from multiple HTML structures
- Error handling and graceful degradation
- CORS configuration for API/frontend communication
- Responsive UI with horizontal stats layout
- Auto-refresh without memory leaks

## 🚢 Deployment

### Frontend → Vercel (FREE)
```bash
git push origin main
# Deploy on vercel.com
```

### API → Railway (FREE $5/mo)
```bash
cd api
# Deploy on railway.app
```

Update API URL in `src/App.jsx` after deploying:
```javascript
const CUSTOM_NEWS_API = 'https://your-api-url.railway.app/api/news';
```

## 🛠️ Development

### Run API Only
```bash
cd api
npm install
npm start
# API at http://localhost:3001
```

### Run Frontend Only
```bash
npm install
npm run dev
# UI at http://localhost:5173
```

### Run Both (Recommended)
```bash
./start.sh
```

## 🔧 Customization

### Change to Your City
Edit `src/App.jsx` line 11:
```javascript
const [location] = useState({ 
  lat: 39.9526,  // Your latitude
  lon: -75.1652  // Your longitude
});
```

### Add More News Sources
Edit `api/server.js`:
```javascript
NEWS_SOURCES.push({
  name: 'Your News Source',
  url: 'https://...',
  selector: '.article-class',
  // ...
});
```

## 💡 Extend the Project

Want to impress even more?

**API Enhancements:**
- Add `/api/news/search/:keyword` endpoint
- Add `/api/news/date/:date` filtering
- Add caching with Redis
- Add rate limiting

**Frontend Enhancements:**
- Add location search
- Add charts with historical data
- Add user preferences/favorites
- Add dark/light mode toggle

## 🆘 Troubleshooting

**API won't start?**
```bash
cd api
rm -rf node_modules
npm install
npm start
```

**Frontend can't connect to API?**
- Make sure API is running first (`cd api && npm start`)
- Check console for CORS errors
- Verify API URL in `src/App.jsx`

**Port conflicts?**
```bash
# Change API port in api/server.js
const PORT = 3002;

# Update in src/App.jsx
const CUSTOM_NEWS_API = 'http://localhost:3002/api/news';
```

## ✅ Checklist for Deployment

- [ ] API running locally
- [ ] Frontend connects to API
- [ ] News cards show images
- [ ] Air quality data loads
- [ ] Everything looks good on mobile
- [ ] Deploy API to Railway
- [ ] Deploy frontend to Vercel
- [ ] Update API URL in frontend
- [ ] Test live site
- [ ] Add to resume
- [ ] Add to LinkedIn

## 🌟 You're Ready!

You have:
✅ A modern, professional dashboard  
✅ YOUR OWN custom API  
✅ Full-stack project for your portfolio  
✅ Production-ready code  
✅ Docker containerization  
✅ Complete documentation

**Deploy it and add to your Penn State IST applications!** 🎓🚀

---

**Questions?** Check `/api/README.md` for API documentation!

**Built by Gabriel** - Showing employers I can build APIs, not just use them! 🔥
