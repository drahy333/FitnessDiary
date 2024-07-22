import React, { useState, useEffect } from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, StackingColumnSeries, Category, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

const StackedChart = ({ width = 'auto', height = '420px', allExercisesInInterval }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (allExercisesInInterval.length > 0) {
      const dataMap = allExercisesInInterval.reduce((acc, curr) => {
        const bodyPart = curr.bodyPart;
        acc[bodyPart] = acc[bodyPart] || { workingSets: 0, warmupSets: 0 };
        curr.sets.forEach(set => {
          if (set.isWorkingSet) {
            acc[bodyPart].workingSets += 1;
          } else {
            acc[bodyPart].warmupSets += 1;
          }
        });
        return acc;
      }, {});

      const formattedData = Object.keys(dataMap).map(key => ({
        category: key,
        workingSets: dataMap[key].workingSets,
        warmupSets: dataMap[key].warmupSets
      }));

      setChartData(formattedData);
    }
  }, [allExercisesInInterval]);

  if (!chartData.length) {
    return <div>No data available for the selected criteria.</div>;
  }

  const series = [
    { dataSource: chartData, xName: 'category', yName: 'workingSets', name: 'Working Sets', type: 'StackingColumn' },
    { dataSource: chartData, xName: 'category', yName: 'warmupSets', name: 'Warmup Sets', type: 'StackingColumn' }
  ];

  return (
    <ChartComponent id="charts" primaryXAxis={{ valueType: 'Category' }} primaryYAxis={{ minimum: 0 }}
      width={width} height={height} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true }} legendSettings={{ background: 'white' }}>
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {series.map((item, index) => <SeriesDirective key={index} {...item} />)}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default StackedChart;
