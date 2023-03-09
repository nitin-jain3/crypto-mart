import React from 'react';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

const Chart = ({ arr=[],  currency, days }) => {
  const prices = [];
  const date = [];
  arr.forEach((chartEl, i) => {
    prices.push(chartEl[1]);
    if (days === '24h') {
      date.push(new Date(chartEl[0]).toLocaleTimeString());
      return;
    }
    date.push(new Date(chartEl[0]).toLocaleDateString());
  })
  const data = {
    labels: date,
    datasets: [{
      label: `Price in ${currency}`,
      data: prices,
      borderColor: 'rgb(255,99,132)',
      backgroundColor: 'rgba(255,99,132,0.5)',
    }]
  };
	return <Line  options={{
    responsive: true,
  }}
  data={data} />;
};

export default Chart;
