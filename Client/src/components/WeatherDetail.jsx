import React from 'react';
import { getMockWeatherDetails } from '../lib/format';

const WeatherDetail = ({ city }) => {
  const details = getMockWeatherDetails();

  return (
    <div className="weather-details">
      <div className="detail-item">
        <span className="detail-icon">🌡️</span>
        <span className="detail-text">Pressure: {details.pressure}</span>
      </div>
      
      <div className="detail-item">
        <span className="detail-icon">🌅</span>
        <span className="detail-text">Sunrise: {details.sunrise}</span>
      </div>
      
      <div className="detail-item">
        <span className="detail-icon">💧</span>
        <span className="detail-text">Humidity: {details.humidity}</span>
      </div>
      
      <div className="detail-item">
        <span className="detail-icon">🌇</span>
        <span className="detail-text">Sunset: {details.sunset}</span>
      </div>
      
      <div className="detail-item">
        <span className="detail-icon">👁️</span>
        <span className="detail-text">Visibility: {details.visibility}</span>
      </div>
      
      <div className="detail-item">
        <span className="detail-icon">💨</span>
        <span className="detail-text">{details.windSpeed}</span>
      </div>
    </div>
  );
};

export default WeatherDetail;