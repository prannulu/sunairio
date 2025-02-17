import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import _ from 'lodash';
import { useState, useEffect } from 'react';
const Chart = ({ data, settings, percentiles }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.9,
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
      <LineChart width={dimensions.width} height={dimensions.height} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="timestamp" 
          height={50}
          tick={{ fontSize: 12 }}
          tickMargin={15}
          interval={settings.timeframe === 'hourly' ? 23*7 : settings.timeframe === 'daily' ? 7 : 0}
          label={{ value: "Time", position: "bottom" , fontSize: 14, dy: 10}}
        />
        <YAxis 
          domain={['auto', 'auto']} 
          tick={{ fontSize: 12 }}
          angle={-30}
          tickFormatter={(value) => value.toLocaleString()}
          label={{ value: "Load Average", angle: -90, position: "insideLeft", offset: 0, fontSize: 14}}
        />
        <Tooltip 
          labelFormatter={(label) => `Time: ${label}`}
          formatter={(value, name) => [`${name}: ${Math.round(value)}`]}
          itemSorter={(item) => -item.value}
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