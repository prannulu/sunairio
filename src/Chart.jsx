import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = ({ data, settings }) => {
  return (
    <div className="border border-gray-300 p-4">
      <LineChart width={1800} height={600} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              angle={-60}
              height={60}
              tick={{ fontSize: 12 }}
              tickMargin={30}
              interval={settings.timeframe === 'hourly' ? 23 : 0}  // Force show all ticks
            />
            <YAxis 
              domain={['auto', 'auto']}  // [min, max] - 'auto' calculates based on data
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              labelFormatter={(label) => `Time: ${label}`}
              formatter={(value) => [`Load: ${Math.round(value)}`]}
            />
            <Line 
              type="monotone" 
              dataKey="value"
              stroke="#8884d8" 
              dot={false}
            />
          </LineChart> 
          <div>{JSON.stringify(settings)}</div>
    </div>
  );
};

export default Chart;