# Weather Dashboard

A beautiful weather application that allows you to search for cities and add them to your dashboard to view real-time weather information.

## Features

### 🔍 City Search
- Search for any city by name (e.g., "London", "Paris", "Tokyo")
- Real-time weather data from OpenWeatherMap API
- Automatic addition to dashboard upon successful search

### 🌤️ Weather Information
Each weather card displays:
- Current temperature (°C)
- Weather condition with icons
- Pressure (hPa)
- Humidity (%)
- Visibility (km)
- Wind speed and direction
- Sunrise and sunset times
- Min/Max temperatures

### 🎨 Beautiful Design
- Gradient backgrounds based on temperature
- Interactive weather cards
- Responsive grid layout
- Smooth animations and hover effects

## How to Use

### Adding Cities
1. Type a city name in the search bar (e.g., "London", "New York", "Mumbai")
2. Click "Add City" or press Enter
3. The city will be added to your dashboard with current weather data
4. Each city gets a unique color theme

### Managing Cities
- Click the ❌ button on any weather card to remove it from your dashboard
- Cities are automatically assigned random color themes
- Duplicate cities are prevented - you'll get a notification if the city already exists

### Weather Data
- All weather data is fetched in real-time from OpenWeatherMap
- Data is cached for 5 minutes to improve performance
- Failed searches will show appropriate error messages

## API Endpoints

### Backend (Port 4000)
- `GET /api/weather` - Get weather for default cities
- `GET /api/weather/:id` - Get weather by city ID
- `POST /api/weather/search` - Search for city by name
  ```json
  {
    "cityName": "London"
  }
  ```

### Frontend (Port 3000)
- Access the dashboard at `http://localhost:3000`

## Technical Details

### Backend
- Node.js with Express
- OpenWeatherMap API integration
- Response caching with node-cache
- CORS enabled for frontend communication

### Frontend
- React 18 with functional components
- Lucide React icons for weather conditions
- CSS-in-JS with inline styles
- Form validation and error handling

## Running the Application

1. **Start Backend Server:**
   ```bash
   cd Server
   npm run start
   ```

2. **Start Frontend:**
   ```bash
   cd client
   npm start
   ```

3. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## Environment Variables

Create a `.env` file in the Server directory:
```
PORT=4000
OWM_API_KEY=your_openweathermap_api_key
OWM_BASE_URL=http://api.openweathermap.org/data/2.5/weather
```

## Supported City Formats
- City name only: "London"
- City with country: "London, UK"
- Major international cities work best
- Use English city names for best results