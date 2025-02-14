import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from './Chart';


const LoadSimulator = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Load Simulation</h2>
      {data.length > 0 && (
        <div className="border border-gray-300 p-4">
          <Chart data={data} />
        </div>
      )}
    </div>
  );
};

export default LoadSimulator;