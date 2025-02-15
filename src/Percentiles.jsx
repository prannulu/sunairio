import React, { useState } from 'react';
import './styles.css';
const Percentiles = ({ percentiles, onPercentilesChange }) => {

  const [inputValue, setInputValue] = useState('');
  const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

  return (
    <div className="percentile-container">
      <div className="percentile-input-container white-bg-container ">
        <label htmlFor="percentile-input">Enter percentile value to display on graph</label>
        <input 
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          placeholder="0-99"
          min="0"
          max="99"
          style={{ 
            border: (inputValue < 0 || inputValue > 99) ? '2px solid red' : '' 
          }}
        />
        <button 
          onClick={() => {
            if (inputValue < 0 || inputValue > 99) return;
            setInputValue('');
            const usedColors = new Set(percentiles.map(p => p.color));
            const availableColor = colors.find(color => !usedColors.has(color));
            onPercentilesChange([...percentiles, { value: inputValue, color: availableColor }]);
          }}
          disabled={percentiles.length > colors.length-1}
        >
          Add
        </button>
      </div>
      <div className="percentile-list">
        {percentiles.map((p, index) => (
          <div key={index} className="percentile-tag">
            <div 
              className="color-indicator" 
              style={{ backgroundColor: p.color }}
            ></div>
            <span>P{p.value}</span>
            <button 
              onClick={() => onPercentilesChange(percentiles.filter((_, i) => i !== index))}
              className="delete-button"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Percentiles;