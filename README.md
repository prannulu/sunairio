# Sunairio Load Visualizer

This project is a simple React app that visualizes load data from a CSV file. It is built with Create React App and uses the Recharts library to create the chart.

You can find the live demo [here](https://prannulu.github.io/sunairio/).

This project was created by Pavi R. as part of the interview process for Sunairio, in February 2025.

## Local Development

In the project directory, you can run `npm start` to start the development server. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

## Instructions provided by Sunairio

Build a web frontend that allows users to graph this data as a line chart either hourly, daily, or monthly, and any integer percentile they choose, between 1 and 99 (inclusive). For daily and monthly data, you will need to aggregate the data along each path (aka each column) first. Please make this a selection of either Min, Max, or Mean. For example, a P01 of Max Monthly would first find the max load of each path by month, and then it would calculate the first percentile of the 1000 values for each month.

The graph should be displayed in US/Central time, as should the daily/monthly percentiles. Preferably, they can plot multiple percentiles at once.

The data was provided in a CSV file, which is stored in the `data` folder.

## Features
- Visualize load data with interactive line charts
- Choose between hourly, daily, or monthly views
- Calculate and display any percentile between 1-99
- Aggregate data using Min, Max, or Mean methods
- Display multiple percentiles simultaneously
- All timestamps shown in UTC

## Technologies Used
- React
- Recharts

## Installation
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server

