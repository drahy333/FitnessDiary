
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateRangePickerControl from '../../components/DateRangePickerControl';
import { ChartsHeader, StackedChart } from '../../components';
import fetchExercises from '../../utils/fetchExercises';
const Stacked = () => { 
  
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [allExercisesInInterval, setAllExercisesInInterval] = useState([]);


  const fetchData = async () => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    let allExercises = [];
    let dates = [];
    for (let currentDate = start; currentDate <= end; currentDate = currentDate.add(1, 'day')) {
        dates.push(currentDate);
    }
    for (const date of dates) {
        await fetchExercises(sessionStorage.getItem('token'), date, (exercises) => {
            allExercises.push(...exercises);
        }, null);
    }
    setAllExercisesInInterval(allExercises);
    console.log(allExercisesInInterval);
};

  useEffect(() => {
      fetchData();
  }, [startDate, endDate]);
  
  return (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
                <DateRangePickerControl
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />

    <ChartsHeader category="Volume" title="Sets Breakdown" />
    <div className="w-full">

      <StackedChart allExercisesInInterval={allExercisesInInterval} />
    </div>
  </div>
);
}

export default Stacked;