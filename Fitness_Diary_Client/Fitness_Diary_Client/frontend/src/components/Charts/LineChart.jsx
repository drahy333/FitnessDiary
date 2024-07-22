import React, { useEffect, useState } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';
import { useStateContext } from '../../context/ContextProvider';
import dayjs from 'dayjs';

const LineChart = ({ startDate, endDate, exerciseData, yName, title, interval}) => {
    const { currentMode } = useStateContext();

    const [chartData, setChartData] = useState({
        data: [],
        minDate: dayjs(startDate).toDate(),
        maxDate: dayjs(endDate).toDate()
    });

    useEffect(() => {
        if (exerciseData && exerciseData.length) {
            setChartData({
                data: exerciseData,
                minDate: dayjs(startDate).toDate(),
                maxDate: dayjs(endDate).toDate()
            });
        } else {
            console.log('No data or empty data received');
        }
    }, [exerciseData, startDate, endDate]);

    const linePrimaryXAxis = {
        valueType: 'DateTime',
        labelFormat: 'dd/MM',
        intervalType: 'Days',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 1 },
        background: 'white',
        minimum: chartData.minDate,
        maximum: chartData.maxDate,
        labelPlacement: 'OnTicks'
    };

    const LinePrimaryYAxis = {
        valueType: 'Double',
        labelFormat: '{value}',
        interval: interval,
        title: title,
    };

    if (!chartData.data || chartData.data.length === 0) {
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
                        dataSource={chartData.data}
                        xName="date"
                        yName= {yName}
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

export default LineChart;
