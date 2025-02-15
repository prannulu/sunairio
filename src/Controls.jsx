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
    <div className="mb-4 flex space-x-4">
      <div className="flex flex-col">
        <label htmlFor="timeframe-select" className="mb-1">Time Period</label>
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
      <div className="flex flex-col">
        <label htmlFor="aggregationType-select" className="mb-1">Aggregation Type</label>
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
      <div className="flex flex-col">
        <label htmlFor="percentile-select" className="mb-1">Percentile (between 0 and 999)</label>
        <input 
          type="number"
          id="percentile-select"
          value={tempSettings.percentile}
          onChange={(e) => handleChange('percentile', Math.min(999, Math.max(0, parseInt(e.target.value) || 0)))}
          min="0"
          max="999"
          className="border p-2 rounded w-24"
          placeholder="0-999"
        />
      </div>
      <button 
        onClick={applySettings}
        className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Settings
      </button>
      {/* ... more controls coming soon ... */}
    </div>
  );
};

export default Controls;