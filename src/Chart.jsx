import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from 'lodash';
import { useState, useEffect } from 'react';
const Chart = ({ data, settings, percentiles }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.9 - 64,
    height: Math.min(600, window.innerHeight * 0.7)
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.9,
        height: Math.min(600, window.innerHeight * 0.7)
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="white-bg-container">
      <LineChart width={dimensions.width} height={Math.min(600, window.innerHeight * 0.7)} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              height={60}
              tick={{ fontSize: 12 }}
              tickMargin={30}
              interval={settings.timeframe === 'hourly' ? 23*7 : settings.timeframe === 'daily' ? 7 : 0}
            />
            <YAxis 
              domain={['auto', 'auto']}  // [min, max] - 'auto' calculates based on data
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              labelFormatter={(label) => `Time: ${label}`}
              formatter={(value, name) => [`${name}: ${Math.round(value)}`]}
            />
           {percentiles.map((p) => (
            <Line 
              key={`p${p.value}`}
              type="monotone" 
              dataKey={`p${p.value}`}
              stroke={p.color}
              dot={false}
              name={`P${p.value}`}
            />
            ))}
          </LineChart> 
    </div>
  );
};

export default Chart;