import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = ({ data }) => {
  return (
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
  );
};

export default Chart;