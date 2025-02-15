import React, { useState } from 'react';
const Controls = ({ settings, onSettingsChange }) => {

  
  const [tempSettings, setTempSettings] = useState(settings);

  const handleChange = (key, value) => {
    setTempSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applySettings = () => {
    onSettingsChange(tempSettings);
  };

  return (
    <div className="white-bg-container">
      <div className="timeframe-container">
        <label htmlFor="timeframe-select">Time Period</label>
        <select 
          id="timeframe-select"
          value={tempSettings.timeframe}
          onChange={(e) => handleChange('timeframe', e.target.value)}
          className="border p-2 rounded"
        >
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="aggregation-container">
        <label htmlFor="aggregationType-select">Aggregation Type</label>
        <select 
          id="aggregationType-select"
          value={tempSettings.aggregationType}
          onChange={(e) => handleChange('aggregationType', e.target.value)}
          className="border p-2 rounded"
          disabled={tempSettings.timeframe === 'hourly'}
        >
          <option value="min">Min</option>
          <option value="max">Max</option>
          <option value="mean">Mean</option>
        </select>
      </div>
      <button 
        onClick={applySettings}
        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Settings
      </button>
    </div>
  );
};

export default Controls;