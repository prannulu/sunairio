import _ from 'lodash';

export const processData = (rawData, settings) => {
  const { timeframe, aggregationType, percentile } = settings;

  // Group data based on timeframe
  const groupedData = _.groupBy(rawData, row => {
    const date = new Date(row.sim_datetime);
    if (timeframe === 'monthly') {
      return `${date.getFullYear()}-${date.getMonth() + 1}`;
    } else if (timeframe === 'daily') {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    } else {
      // For hourly, include hours in grouping key
      return date.toISOString(); // This will keep each hour separate
    }
  });

  // Process each group
  return Object.entries(groupedData).map(([timestamp, rows]) => {
    // For hourly, rows will have only one entry
    // Get all path values for this timestamp
    const pathValues = _.range(0, 1000).map(pathIndex => {
      if (timeframe === 'hourly') {
        // For hourly, just get the single value
        return rows[0][pathIndex.toString()];
      } else {
        // For daily/monthly, aggregate the values
        const pathData = rows.map(row => row[pathIndex.toString()]);
        switch (aggregationType) {
          case 'max':
            return _.max(pathData);
          case 'min':
            return _.min(pathData);
          default: // mean
            return _.mean(pathData);
        }
      }
    });

    // Calculate percentile across all paths
    const sortedValues = _.sortBy(pathValues);
    const index = Math.floor(sortedValues.length * (percentile / 100));
    
    // Format timestamp for display
    const date = new Date(timestamp);
    let displayDate;
    const centralDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    
    if (timeframe === 'monthly') {
      displayDate = centralDate.toLocaleString('en-US', { 
        month: 'short', 
        year: 'numeric',
        timeZone: 'America/Chicago'
      });
    } else if (timeframe === 'daily') {
      displayDate = centralDate.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric',
        timeZone: 'America/Chicago'
      });
    } else {
      displayDate = centralDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
      });
    }

    return {
      timestamp: displayDate,
      value: sortedValues[index]
    };
  });
};