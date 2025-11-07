// Date formatting utilities
export const formatDate = (date = new Date()) => {
  const options = { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Temperature formatting
export const formatTemperature = (temp) => {
  return Math.round(temp);
};

// Weather condition formatting
export const formatWeatherCondition = (condition) => {
  if (!condition) return '';
  return condition.toLowerCase().replace(/\s+/g, '-');
};

// Get weather icon class
export const getWeatherIcon = (condition, description) => {
  if (!condition) return 'clear';
  
  const cond = condition.toLowerCase();
  const desc = (description || '').toLowerCase();
  
  if (cond === 'clear') return 'clear';
  if (cond === 'clouds') {
    if (desc.includes('few')) return 'few-clouds';
    if (desc.includes('broken')) return 'broken-clouds';
    return 'clouds';
  }
  if (cond === 'rain') return 'rain';
  if (cond === 'mist' || cond === 'fog') return 'mist';
  if (cond === 'snow') return 'snow';
  
  return 'clear';
};

// Get city color class
export const getCityColorClass = (cityName) => {
  if (!cityName) return '';
  
  const name = cityName.toLowerCase();
  if (name.includes('colombo')) return 'colombo';
  if (name.includes('tokyo')) return 'tokyo';
  if (name.includes('liverpool')) return 'liverpool';
  if (name.includes('sydney')) return 'sydney';
  if (name.includes('boston')) return 'boston';
  if (name.includes('paris')) return 'paris';
  if (name.includes('oslo')) return 'oslo';
  if (name.includes('shanghai')) return 'shanghai';
  
  return '';
};

// Mock pressure, humidity, visibility data (since OpenWeather basic plan might not include all)
export const getMockWeatherDetails = () => ({
  pressure: '1018Pa',
  humidity: '78%',
  visibility: '5.0km',
  windSpeed: '4.0m/s 120 Degree',
  sunrise: '6:05am',
  sunset: '6:05am'
});