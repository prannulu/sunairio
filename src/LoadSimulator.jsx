import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from './Chart';
import Controls from './Controls';
import Percentiles from './Percentiles';
import { processData } from './utils'
import BouncingLoader from './BouncingLoader';
import './styles.css';

const LoadSimulator = () => {
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); 
  const [settings, setSettings] = useState({
    timeframe: 'hourly',
    aggregationType: 'mean',
  });
  const [percentiles, setPercentiles] = useState([]);

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
    setIsProcessing(true);
    setTimeout(() => {
      const processed = processData(rawData, settings, percentiles);
      setProcessedData(processed);
      setIsProcessing(false);
    }, 0);
    
  }, [rawData, settings, percentiles]);

  if (isLoading) {
    return (
      <div className="center-screen">
        <h2 className="text-header">Brewing insights at Sunairio</h2>
        <BouncingLoader />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-header">Load Visualization Dashboard</h2>
      {processedData.length > 0 ? (
        <div className="main-container">
          <div className="input-container">
            <Percentiles 
              percentiles={percentiles}
              onPercentilesChange={setPercentiles}
            />
            <Controls 
              settings={settings} 
              onSettingsChange={setSettings} 
            />
          </div>
          <div className='bouncing-loader-container'>
            {isProcessing &&  <BouncingLoader />}
          </div>
          <Chart data={processedData} settings={settings} percentiles={percentiles} />
        </div>
      ) :<div className="text-header">No data found</div>}
      <div className='Outro'>
        All times are in UTC.
        <br />
        Please find repo <a href='https://github.com/prannulu/sunairio'>here</a>.
      </div>
    </div>
  );
};

export default LoadSimulator;