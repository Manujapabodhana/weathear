import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherGrid from './components/WeatherGrid';

function App() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/weather');
      const data = await response.json();
      setCities(data.cities || []);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCity = async (cityId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/weather/${cityId}`);
      const cityData = await response.json();
      
      // Check if city already exists
      if (!cities.find(city => city.id === cityData.id)) {
        setCities(prev => [...prev, cityData]);
      }
    } catch (error) {
      console.error('Error adding city:', error);
    }
  };

  const removeCity = (cityId) => {
    setCities(prev => prev.filter(city => city.id !== cityId));
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <SearchBar onAddCity={addCity} />
      <WeatherGrid cities={cities} onRemoveCity={removeCity} />
      <footer className="footer">
        2021 Fidenz Technologies
      </footer>
    </div>
  );
}

export default App;