import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

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

        const totals = chart.data.datasets[0].totals;
        if (totals) {
            const text = `${totals.workingSets} Working Sets`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;
            ctx.fillText(text, textX, textY);
        }
        ctx.save();
    }
});

const aggregateSets = (exercises) => {
    if (!exercises) return null;

    const totals = { workingSets: 0, warmupSets: 0 };
    const bodyParts = { workingSets: {}, warmupSets: {} };

    exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            const setKey = set.isWorkingSet ? 'workingSets' : 'warmupSets';
            totals[setKey] += 1;
            if (bodyParts[setKey][exercise.bodyPart]) {
                bodyParts[setKey][exercise.bodyPart] += 1;
            } else {
                bodyParts[setKey][exercise.bodyPart] = 1;
            }
        });
    });

    return { totals, bodyParts };
};

const prepareSetChartData = (aggregateData) => {
    const { totals, bodyParts } = aggregateData;
    if (!totals) return null;

    return {
        labels: ['Working Sets', 'Warm-up Sets'],
        datasets: [{
            data: [totals.workingSets, totals.warmupSets],
            backgroundColor: ['#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
            borderColor: 'white',
            borderWidth: 2,
        }],
        totals: totals,
        bodyParts: bodyParts
    };
};

const ExerciseSetsDisplay = ({ exercises }) => {
    const aggregateData = aggregateSets(exercises);
    const chartData = prepareSetChartData(aggregateData);

    const options = {
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {

                        const count = tooltipItem.raw;
                        return `${count}`;
                    },
                    footer: function(tooltipItems) {
                        const tooltipItem = tooltipItems[0];
                        const setKey = tooltipItem.label.toLowerCase().replace(' ', '');
                        const bodyPartData = chartData.bodyParts[setKey];
                        let result = [];
                        if (bodyPartData) {
                            Object.entries(bodyPartData).forEach(([bodyPart, count]) => {
                                result.push(`${bodyPart}: ${count}`);
                            });
                        }
                        return result;
                    }
                }
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

export default ExerciseSetsDisplay;
