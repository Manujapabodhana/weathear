# Weather App Frontend

A React-based weather application that displays current weather conditions for multiple cities.

## Features

- 🌤️ Beautiful weather cards with gradient backgrounds
- 🔍 Add cities by OpenWeather city ID
- 📱 Responsive design for all screen sizes
- 🎨 Animated UI with hover effects
- ❌ Remove cities functionality
- 📊 Detailed weather information on card click

## Getting Started

1. Install dependencies:
```bash
cd client
npm install
```

2. Start the development server:
```bash
npm start
```

3. Make sure your backend server is running on `http://localhost:4000`

## City IDs for Testing

- Colombo: 1248991
- Tokyo: 1850147
- Liverpool: 2644210
- Paris: 2988507
- Sydney: 2147714
- Boston: 4930956
- Shanghai: 1796236
- Oslo: 3143244

## File Structure

```
client/src/
├── App.jsx              # Main application component
├── App.css              # Global styles and component styles
├── index.js             # React DOM entry point
├── lib/
│   └── format.js        # Utility functions for formatting
└── components/
    ├── Header.jsx       # App header with title and icon
    ├── SearchBar.jsx    # City search and add functionality
    ├── WeatherGrid.jsx  # Grid layout for weather cards
    ├── WeatherCard.jsx  # Individual weather card component
    └── WeatherDetail.jsx # Detailed weather information
```

## API Integration

The app connects to your backend server at `http://localhost:4000` with these endpoints:

- `GET /api/weather` - Fetch all cities
- `GET /api/weather/:id` - Fetch specific city by ID