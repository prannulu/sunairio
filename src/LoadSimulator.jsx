import React, { useState, useEffect } from 'react';

const LoadSimulator = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const filePath = process.env.PUBLIC_URL + '/data/load_sims.csv';
        try {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}, statusText: ${response.statusText}`);
          }
          const data = await response.text();
          console.log('First 100 chars:', data.substring(0, 100));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Failed to load data file');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Load Simulator by Pavi</h2>
      
      {isLoading && <p>Loading data...</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      {!isLoading && !error && (
        <p>Data loaded!!! Check console for details.</p>
      )}
    </div>
  );
};

export default LoadSimulator;