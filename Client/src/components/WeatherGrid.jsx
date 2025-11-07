import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherGrid = ({ cities, onRemoveCity }) => {
  if (!cities || cities.length === 0) {
    return (
      <div className="weather-grid">
        <div style={{ 
          textAlign: 'center', 
          gridColumn: '1 / -1', 
          padding: '40px',
          opacity: 0.7 
        }}>
          No cities to display. Add a city using the search bar above.
        </div>
      </div>
    );
  }

  return (
    <div className="weather-grid">
      {cities.map((city) => (
        <WeatherCard
          key={city.id}
          city={city}
          onRemove={() => onRemoveCity(city.id)}
        />
      ))}
    </div>
  );
};

export default WeatherGrid;