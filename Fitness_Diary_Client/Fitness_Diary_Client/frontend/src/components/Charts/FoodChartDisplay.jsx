import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

import 'chart.js/auto';

Chart.register({
    id: 'doughnutlabel',
    beforeDraw: function(chart) {
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 114).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "middle";
  
      // Access 'totals' from chart's dataset (you'll need to modify your chart data setup)
      const totals = chart.data.datasets[0].totals;
      if (totals) {
        const text = `${totals.calories} kcal`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
      }
      ctx.save();
    }
  });
  

// Function to aggregate data for charting
const aggregateNutrients = (foods) => {
    if (!foods) return null;
  
    const totals = { protein: 0, carbohydrates: 0, fats: 0, calories: 0 };
  
    foods.forEach(food => {
      totals.protein += parseInt(food.protein, 10) || 0;
      totals.carbohydrates += parseInt(food.carbohydrates, 10) || 0;
      totals.fats += parseInt(food.fats, 10) || 0;
      totals.calories += parseInt(food.calories, 10) || 0;
    });
  
    return totals;
  };

  const prepareNutrientChartData = (totals) => {
    if (!totals) return null;
  
    return {
      labels: ['Protein (g)', 'Carbohydrates (g)', 'Fats (g)'],
      datasets: [{
        data: [totals.protein, totals.carbohydrates, totals.fats],
        backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
        borderColor: 'white',
        borderWidth: 2,
      }],
      totals: totals // Include totals here for access in the plugin
    };
  };
  

  const FoodChartDisplay = ({ foods }) => {
    const totals = aggregateNutrients(foods);
    const chartData = prepareNutrientChartData(totals);
  
    const options = {
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      cutout: '70%',
      maintainAspectRatio: false
    };
  
    return (
      <div style={{ width: '300px', height: '300px', marginTop: '40px' }}>
        {chartData && <Doughnut data={chartData} options={options} />}
      </div>
    );
  };
  
export default FoodChartDisplay