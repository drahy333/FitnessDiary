import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
const prepareExerciseChartData = (totalsByBodyPart) => {
    if (!totalsByBodyPart) return null;

    const labels = Object.keys(totalsByBodyPart);
    const data = Object.values(totalsByBodyPart);

    return {
        labels: labels,
        datasets: [{
            data: data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
            borderColor: 'white',
            borderWidth: 2,
        }]
    };
};

const aggregateExerciseSets = (exercises) => {
    if (!exercises) return null;

    const totalsByBodyPart = {};

    exercises.forEach(exercise => {
        const setsCount = exercise.sets.length;
        if (totalsByBodyPart[exercise.bodyPart]) {
            totalsByBodyPart[exercise.bodyPart] += setsCount;
        } else {
            totalsByBodyPart[exercise.bodyPart] = setsCount;
        }
    });

    return totalsByBodyPart;
};


const ExerciseChartDisplay = ({ exercises }) => {
    const totalsByBodyPart = aggregateExerciseSets(exercises);
    const chartData = prepareExerciseChartData(totalsByBodyPart);

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

export default ExerciseChartDisplay;
