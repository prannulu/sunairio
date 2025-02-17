import React, { useState, useEffect, useCallback } from 'react';
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
    const processAsync = async () => {
      setIsProcessing(true);
      try {
        const processed = await processData(rawData, settings, percentiles);
        setProcessedData(processed);
      } catch (error) {
        console.error('Error processing data:', error);
      } finally {
        setIsProcessing(false);
      }
    };
    processAsync();
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
    <div>
      <h2 className="text-header">Load Visualizer</h2>
        <div className="main-container">
          <div className="input-container">
          <Controls 
              settings={settings} 
              onSettingsChange={setSettings} 
            />
            <Percentiles 
              percentiles={percentiles}
              onPercentilesChange={setPercentiles}
            />
          </div>
          <div className='bouncing-loader-container'>
            {isProcessing && <BouncingLoader />}
          </div>
          {processedData.length > 0 && (
            <Chart data={processedData} settings={settings} percentiles={percentiles} />
          )}
        </div>
      <div className='Outro'>
        All times are in UTC.
        <br />
        Please find repo <a href='https://github.com/prannulu/sunairio'>here</a>.
      </div>
    </div>
  );
};

export default LoadSimulator;