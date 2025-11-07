import React, { useState } from 'react';

const SearchBar = ({ onAddCity }) => {
  const [cityId, setCityId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityId.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await onAddCity(cityId.trim());
      setCityId('');
    } catch (error) {
      console.error('Error adding city:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-container">
      <input
        type="text"
        value={cityId}
        onChange={(e) => setCityId(e.target.value)}
        placeholder="Enter a city ID (e.g., 1248991 for Colombo)"
        className="search-input"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="add-button"
        disabled={!cityId.trim() || isLoading}
      >
        {isLoading ? 'Adding...' : 'Add City'}
      </button>
    </form>
  );
};

export default SearchBar;