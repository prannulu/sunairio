import React, { useState } from 'react';
import './styles.css';
const Percentiles = ({ percentiles, onPercentilesChange }) => {

  const [inputValue, setInputValue] = useState();
  const colors = ['red', 'blue', 'green',  'orange','turquoise', 'magenta', 'pink',  'lime', 'brown', 'gray'];

  return (
    <div className="percentile-container">
      <div className="percentile-input-container white-bg-container ">
        <label htmlFor="percentile-input">Percentile value to display</label>
        <input 
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="1-99"
          min="1"
          max="99"
          style={{ 
            border: (inputValue < 1 || inputValue > 99) ? '2px solid red' : '' 
          }}
        />
        <button 
          onClick={() => {
            if (inputValue < 1 || inputValue > 99) return;
            setInputValue();
            const usedColors = new Set(percentiles.map(p => p.color));
            const availableColor = colors.find(color => !usedColors.has(color));
            onPercentilesChange([...percentiles, { value: inputValue, color: availableColor }]);
          }}
          disabled={percentiles.length > colors.length-1 || !inputValue}
        >
          Add
        </button>
        {percentiles.length > colors.length-1 && 
          <div className="error-message">Limit of {colors.length} percentiles reached.</div>
        }
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