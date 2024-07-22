import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';



const aggregateData = (exercises, type) => {
  const dataMap = {};
  if (!exercises) return [];

  exercises.forEach(exercise => {
    const bodyPart = exercise.bodyPart || 'Unknown';
    dataMap[bodyPart] = dataMap[bodyPart] || { sets: 0, reps: 0, count: 0, workingSets: 0};
    dataMap[bodyPart].count += 1;
    
    if (Array.isArray(exercise.sets)) {
      exercise.sets.forEach(set => {
        dataMap[bodyPart].sets += 1;
        dataMap[bodyPart].reps += parseInt(set.reps, 10);
        dataMap[bodyPart].isWorkingSet += parseInt(set.isWorkingSet ? 1 : 0, 10);
      });
    }
  });

  return Object.entries(dataMap).map(([key, value]) => ({
    label: key,
    value: value[type]
  }));
};


const ChartDisplay = ({ exercises, part }) => {
  if (!exercises) return null;

  const setsData = prepareChartData(exercises, 'sets');
  const repsData = prepareChartData(exercises, 'reps');
  const exercisesData = prepareChartData(exercises, 'count');
  const workingSetData = prepareChartData(exercises, 'working_sets');
  let d = null;
  if (part === 'sets'){
    d = setsData;
  }else if(part === 'reps'){
    d = repsData;
  }
  else if (part === 'count'){
    d = exercisesData;
  }
  else{
    d = workingSetData;
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minHeight: '400px', alignItems: 'center' }}>
      {setsData.datasets[0].data.length > 0 && <DoughnutChart data={d} />}

    </div>
  );
};
const prepareChartData = (exercises, type) => ({
  labels: aggregateData(exercises, type).map(data => data.label),
  datasets: [{
    label: `${type.charAt(0).toUpperCase() + type.slice(1)} per Body Part`,
    data: aggregateData(exercises, type).map(data => data.value),
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'],
    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0']
    
  }]
});

const DoughnutChart = ({ title, data }) => (
  <div>
    <h3>{title}</h3>
    <Doughnut data={data} />
  </div>
);

export default ChartDisplay;
