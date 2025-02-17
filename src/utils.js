import _ from 'lodash';

export const processData = (rawData, settings, percentiles) => {
  const { timeframe, aggregationType } = settings;

  // Helper to format date
  const formatDate = (date) => {
    const d = new Date(date);
    const formats = {
      'monthly': { month: 'short', year: 'numeric' },
      'daily': { month: 'short', day: 'numeric' },
      'hourly': { month: 'short', day: 'numeric', hour: 'numeric', hour12: true }
    };
    return d.toLocaleString('en-US', { 
      timeZone: 'America/Chicago',
      ...formats[timeframe]
    });
  };

  const getPercentileValue = async (data, percentile) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const sortedValues = _.sortBy(data);
        const index = Math.floor(sortedValues.length * (percentile / 100));
        resolve(sortedValues[index]);
      }, 0);
    });
  };

  const groupedData = _.groupBy(rawData, row => {
    const date = new Date(row.sim_datetime);
    return formatDate(date);
  });

  // Process each group
  return Promise.all(Object.entries(groupedData).map(async ([timestamp, rows]) => {
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
    const percentileEntries = await Promise.all(percentiles.map(async p => [ 
      `p${p.value}`,
      await getPercentileValue(pathValues, p.value)
    ]));
    return {
      timestamp: timestamp,
      ...Object.fromEntries(percentileEntries)
    };
  }));
};