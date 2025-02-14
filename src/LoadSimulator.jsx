import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Papa from 'papaparse';

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
        const formattedData = result.data.map(row => ({
          ...row,
          // Just show the hour
          hour: new Date(row.sim_datetime).getHours() + ':00'
        }));
        setData(formattedData);
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
          <LineChart width={1200} height={500} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 12 }}
              interval={0}  // Force show all ticks
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(label) => `Time: ${label}`}
              formatter={(value) => [`Load: ${Math.round(value)}`, 'Path 0']}
            />
            <Line 
              type="monotone" 
              dataKey="0"
              stroke="#8884d8" 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="2"
              stroke="red" 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="3"
              stroke="green" 
              dot={false}
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default LoadSimulator;