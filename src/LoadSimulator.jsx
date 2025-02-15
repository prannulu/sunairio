import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from './Chart';
import Controls from './Controls';

import { processData } from './utils'

const LoadSimulator = () => {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    timeframe: 'hourly',
    aggregationType: 'mean',
    percentile: 50
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const filePathToCSV = process.env.PUBLIC_URL + '/data/load_sims.csv';
        const response = await fetch(filePathToCSV);
        const csvText = await response.text();
        
        const result = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });
        setRawData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!rawData.length) return;
    const processed = processData(rawData, settings);
    setProcessedData(processed);
  }, [rawData, settings]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Load Simulation</h2>
      {processedData.length > 0 && (
        <div className="border border-gray-300 p-4">
          <Controls 
            settings={settings} 
            onSettingsChange={setSettings} 
          />
          <Chart data={processedData} settings={settings}/>
        </div>
      )}
    </div>
  );
};

export default LoadSimulator;