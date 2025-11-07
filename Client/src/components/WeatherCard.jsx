import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, CloudFog, X } from 'lucide-react';

const WeatherCard = ({ city, onRemove }) => {

  const getWeatherIcon = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes('clear')) return <Sun style={{width: '32px', height: '32px'}} />;
    if (lower.includes('rain')) return <CloudRain style={{width: '32px', height: '32px'}} />;
    if (lower.includes('snow')) return <CloudSnow style={{width: '32px', height: '32px'}} />;
    if (lower.includes('mist') || lower.includes('fog')) return <CloudFog style={{width: '32px', height: '32px'}} />;
    return <Cloud style={{width: '32px', height: '32px'}} />;
  };

  const getGradientStyle = (color) => {
    const gradients = {
      blue: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)',
      purple: 'linear-gradient(to bottom right, #a855f7, #9333ea)',
      green: 'linear-gradient(to bottom right, #4ade80, #10b981)',
      orange: 'linear-gradient(to bottom right, #fb923c, #f97316)',
      red: 'linear-gradient(to bottom right, #f87171, #ef4444)'
    };
    return gradients[color] || gradients.blue;
  };

  const cardStyle = {
    position: 'relative',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const buttonStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 10,
    width: '32px',
    height: '32px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const topSectionStyle = {
    background: getGradientStyle(city.color),
    padding: '24px',
    position: 'relative',
    overflow: 'hidden'
  };

  const decorativeCircle1Style = {
    position: 'absolute',
    bottom: '-40px',
    left: '-40px',
    width: '160px',
    height: '160px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%'
  };

  const decorativeCircle2Style = {
    position: 'absolute',
    top: '-40px',
    right: '-40px',
    width: '160px',
    height: '160px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%'
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 10
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  };

  const cityNameStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '4px'
  };

  const dateStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px'
  };

  const temperatureStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    color: 'white'
  };

  const tempUnitStyle = {
    fontSize: '32px'
  };

  const conditionSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const conditionLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const conditionTextStyle = {
    color: 'white',
    fontWeight: '500'
  };

  const tempRangeStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    textAlign: 'right'
  };

  const bottomSectionStyle = {
    backgroundColor: '#1f2937',
    padding: '24px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px'
  };

  const detailStyle = {
    fontWeight: '600',
    marginBottom: '4px'
  };

  const windSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const windIndicatorStyle = {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const windDotStyle = {
    width: '8px',
    height: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '50%'
  };

  return (
    <div style={cardStyle}>
      {/* Close Button */}
      <button
        onClick={onRemove}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
      >
        <X style={{width: '20px', height: '20px'}} />
      </button>

      {/* Top Section - Gradient Background */}
      <div style={topSectionStyle}>
        {/* Decorative circles */}
        <div style={decorativeCircle1Style}></div>
        <div style={decorativeCircle2Style}></div>

        <div style={contentStyle}>
          {/* City and Temperature */}
          <div style={headerStyle}>
            <div>
              <h2 style={cityNameStyle}>{city.name}</h2>
              <p style={dateStyle}>9.19am, Feb 8</p>
            </div>
            <div style={temperatureStyle}>
              {city.temp}°<span style={tempUnitStyle}>C</span>
            </div>
          </div>

          {/* Weather Condition */}
          <div style={conditionSectionStyle}>
            <div style={conditionLeftStyle}>
              <div style={{color: 'white'}}>
                {getWeatherIcon(city.condition)}
              </div>
              <p style={conditionTextStyle}>{city.description}</p>
            </div>
            <div style={tempRangeStyle}>
              <p>Temp Min: {city.tempMin}°c</p>
              <p>Temp Max: {city.tempMax}°c</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Dark Details */}
      <div style={bottomSectionStyle}>
        <div style={gridStyle}>
          {/* Row 1 */}
          <div>
            <p style={detailStyle}>Pressure: <span style={{fontWeight: 'normal'}}>{city.pressure}hPa</span></p>
          </div>
          <div style={windSectionStyle}>
            <div style={windIndicatorStyle}>
              <div style={windDotStyle}></div>
            </div>
            <p>{city.windSpeed}m/s {city.windDeg} Degree</p>
          </div>
          <div>
            <p style={detailStyle}>Sunrise: <span style={{fontWeight: 'normal'}}>{city.sunrise}</span></p>
          </div>

          {/* Row 2 */}
          <div>
            <p style={detailStyle}>Humidity: <span style={{fontWeight: 'normal'}}>{city.humidity}%</span></p>
          </div>
          <div></div>
          <div>
            <p style={detailStyle}>Sunset: <span style={{fontWeight: 'normal'}}>{city.sunset}</span></p>
          </div>

          {/* Row 3 */}
          <div>
            <p style={detailStyle}>Visibility: <span style={{fontWeight: 'normal'}}>{city.visibility}km</span></p>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

const WeatherApp = () => {
  const [cities, setCities] = useState([
    {
      id: 1,
      name: 'Colombo, LK',
      temp: 27,
      condition: 'Few Clouds',
      description: 'Few Clouds',
      pressure: '1018',
      humidity: '78',
      visibility: '8.0',
      windSpeed: '4.0',
      windDeg: '120',
      sunrise: '6:05am',
      sunset: '6:05am',
      tempMin: 25,
      tempMax: 28,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Tokyo, JP',
      temp: 7,
      condition: 'Broken Clouds',
      description: 'Broken Clouds',
      pressure: '1018',
      humidity: '78',
      visibility: '8.0',
      windSpeed: '4.0',
      windDeg: '120',
      sunrise: '6:05am',
      sunset: '6:05am',
      tempMin: -7,
      tempMax: 7,
      color: 'purple'
    },
    {
      id: 3,
      name: 'Liverpool, GB',
      temp: -2,
      condition: 'Clear Sky',
      description: 'Clear Sky',
      pressure: '1018',
      humidity: '78',
      visibility: '8.0',
      windSpeed: '4.0',
      windDeg: '120',
      sunrise: '6:05am',
      sunset: '6:05am',
      tempMin: -2,
      tempMax: 5,
      color: 'green'
    },
    {
      id: 4,
      name: 'Sydney, AU',
      temp: 26,
      condition: 'Light Rain',
      description: 'Light Rain',
      pressure: '1018',
      humidity: '78',
      visibility: '8.0',
      windSpeed: '4.0',
      windDeg: '120',
      sunrise: '6:05am',
      sunset: '6:05am',
      tempMin: 20,
      tempMax: 30,
      color: 'orange'
    },
    {
      id: 5,
      name: 'Boston, US',
      temp: 13,
      condition: 'Mist',
      description: 'Mist',
      pressure: '1018',
      humidity: '78',
      visibility: '8.0',
      windSpeed: '4.0',
      windDeg: '120',
      sunrise: '6:05am',
      sunset: '6:05am',
      tempMin: 10,
      tempMax: 15,
      color: 'red'
    }
  ]);

  const [cityInput, setCityInput] = useState('');

  const getWeatherIcon = (condition) => {
    const lower = condition.toLowerCase();
    if (lower.includes('clear')) return <Sun style={{width: '32px', height: '32px'}} />;
    if (lower.includes('rain')) return <CloudRain style={{width: '32px', height: '32px'}} />;
    if (lower.includes('snow')) return <CloudSnow style={{width: '32px', height: '32px'}} />;
    if (lower.includes('mist') || lower.includes('fog')) return <CloudFog style={{width: '32px', height: '32px'}} />;
    return <Cloud style={{width: '32px', height: '32px'}} />;
  };

  const removeCity = (id) => {
    setCities(cities.filter(city => city.id !== id));
  };

  const getGradientStyle = (color) => {
    const gradients = {
      blue: 'linear-gradient(to bottom right, #60a5fa, #3b82f6)',
      purple: 'linear-gradient(to bottom right, #a855f7, #9333ea)',
      green: 'linear-gradient(to bottom right, #4ade80, #10b981)',
      orange: 'linear-gradient(to bottom right, #fb923c, #f97316)',
      red: 'linear-gradient(to bottom right, #f87171, #ef4444)'
    };
    return gradients[color] || gradients.blue;
  };

  const appStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #1e3a8a, #1e40af, #3730a3)',
    padding: '32px'
  };

  const containerStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    marginBottom: '32px'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px'
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white'
  };

  const searchContainerStyle = {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center'
  };

  const inputStyle = {
    padding: '12px 24px',
    width: '320px',
    borderRadius: '8px',
    backgroundColor: '#1f2937',
    color: 'white',
    border: 'none',
    outline: 'none'
  };

  const buttonStyle = {
    padding: '12px 32px',
    backgroundColor: '#7c3aed',
    color: 'white',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const gridStyle = {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '32px'
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '48px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px'
  };

  return (
    <div style={appStyle}>
      {/* Header */}
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={{fontSize: '36px'}}>🌤️</div>
          <h1 style={titleStyle}>Weather App</h1>
        </div>

        {/* Search Bar */}
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Enter a city"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            style={inputStyle}
          />
          <button 
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6d28d9'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            Add City
          </button>
        </div>
      </div>

      {/* Weather Cards Grid */}
      <div style={gridStyle}>
        {cities.map(city => (
          <div key={city.id} style={{position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            {/* Close Button */}
            <button
              onClick={() => removeCity(city.id)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              <X style={{width: '20px', height: '20px'}} />
            </button>

            {/* Top Section - Gradient Background */}
            <div style={{
              background: getGradientStyle(city.color),
              padding: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative circles */}
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                left: '-40px',
                width: '160px',
                height: '160px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '160px',
                height: '160px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{position: 'relative', zIndex: 10}}>
                {/* City and Temperature */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px'}}>
                  <div>
                    <h2 style={{fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '4px'}}>{city.name}</h2>
                    <p style={{color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px'}}>9.19am, Feb 8</p>
                  </div>
                  <div style={{fontSize: '60px', fontWeight: 'bold', color: 'white'}}>
                    {city.temp}°<span style={{fontSize: '32px'}}>C</span>
                  </div>
                </div>

                {/* Weather Condition */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{color: 'white'}}>
                      {getWeatherIcon(city.condition)}
                    </div>
                    <p style={{color: 'white', fontWeight: '500'}}>{city.description}</p>
                  </div>
                  <div style={{color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', textAlign: 'right'}}>
                    <p>Temp Min: {city.tempMin}°c</p>
                    <p>Temp Max: {city.tempMax}°c</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Dark Details */}
            <div style={{backgroundColor: '#1f2937', padding: '24px'}}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px'
              }}>
                {/* Row 1 */}
                <div>
                  <p style={{fontWeight: '600', marginBottom: '4px'}}>Pressure: <span style={{fontWeight: 'normal'}}>{city.pressure}hPa</span></p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '50%'
                    }}></div>
                  </div>
                  <p>{city.windSpeed}m/s {city.windDeg} Degree</p>
                </div>
                <div>
                  <p style={{fontWeight: '600', marginBottom: '4px'}}>Sunrise: <span style={{fontWeight: 'normal'}}>{city.sunrise}</span></p>
                </div>

                {/* Row 2 */}
                <div>
                  <p style={{fontWeight: '600', marginBottom: '4px'}}>Humidity: <span style={{fontWeight: 'normal'}}>{city.humidity}%</span></p>
                </div>
                <div></div>
                <div>
                  <p style={{fontWeight: '600', marginBottom: '4px'}}>Sunset: <span style={{fontWeight: 'normal'}}>{city.sunset}</span></p>
                </div>

                {/* Row 3 */}
                <div>
                  <p style={{fontWeight: '600', marginBottom: '4px'}}>Visibility: <span style={{fontWeight: 'normal'}}>{city.visibility}km</span></p>
                </div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={footerStyle}>
        2021 Fidenz Technologies
      </div>
    </div>
  );
};

export default WeatherApp;