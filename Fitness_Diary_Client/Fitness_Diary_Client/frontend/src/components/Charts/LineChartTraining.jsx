import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../context/ContextProvider';

const LineChartTraining = ({ startDate, endDate, allExercisesInInterval, selectedExercise, selectedWeight }) => {
    const { currentMode } = useStateContext();
    const [chartData, setChartData] = useState({
        data: [],
        minDate: new Date(startDate),
        maxDate: new Date(endDate)
    });

useEffect(() => {
    const fetchData = async () => {
        const filteredExercises = allExercisesInInterval.filter(exercise => exercise.name === selectedExercise);

        const data = filteredExercises.map(exercise => {
            if (!exercise.date) return null;
            const matchingSets = exercise.sets.filter(set => set.weight === selectedWeight);
            const maxReps = matchingSets.reduce((acc, set) => Math.max(acc, set.reps), 0);
            return {
                date: new Date(exercise.date),
                reps: maxReps
            };
        }).filter(entry => entry && entry.reps !== 0);

        let minDate, maxDate;
        if (data.length > 1) {
            const dates = data.map(item => item.date.getTime());
            minDate = new Date(Math.min(...dates));
            maxDate = new Date(Math.max(...dates));
        } else {
            minDate = new Date(startDate);
            maxDate = new Date(endDate);
        }

        setChartData({ data, minDate, maxDate });
    };

    fetchData(); 
}, [startDate, endDate, allExercisesInInterval, selectedExercise, selectedWeight]);


    const { data, minDate, maxDate } = chartData;

    const linePrimaryXAxis = {
      valueType: 'DateTime',
      labelFormat: 'dd/MM',
      intervalType: 'Days',
      edgeLabelPlacement: 'Shift',
      majorGridLines: { width: 0 },
      background: 'white',
      interval: 1,
      minimum: minDate,
      maximum: maxDate,
      labelPlacement: 'OnTicks'
  };
  

    const LinePrimaryYAxis = {
        valueType: 'Double',
        labelFormat: '{value}',
        interval: 1,
        title: 'Repetitions Count',
    };

    if (data.length === 0) {
        return <div>No data available for the selected criteria.</div>;
    }

    return (
        <div>
            <ChartComponent
                id="line-chart"
                height="420px"
                primaryXAxis={linePrimaryXAxis}
                primaryYAxis={LinePrimaryYAxis}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                background={currentMode === 'Dark' ? '#33373E' : '#fff'}
                legendSettings={{ background: 'white' }}
            >
                <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
                <SeriesCollectionDirective>
                    <SeriesDirective
                        dataSource={data}
                        xName="date"
                        yName="reps"
                        type="Line"
                        fill="#00BFFF"

                        marker={{ visible: true, width: 10, height: 10 }}
                        width={2}
                    />
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    );
};

export default LineChartTraining;
