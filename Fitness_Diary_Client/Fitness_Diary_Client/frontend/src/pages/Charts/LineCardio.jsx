import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateRangePickerControl from '../../components/DateRangePickerControl';
import { ChartsHeader, LineChartTraining } from '../../components';
import fetchCardioExercises from '../../utils/fetchCardioExercises';
import LineChart from '../../components/Charts/LineChart';

const LineCardio = () => {
    const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [allExercisesInInterval, setAllExercisesInInterval] = useState([]);
    const [exercisesData, setExercisesData] = useState([]);

    const fetchData = async () => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        let allExercises = [];
        let dates = [];
        for (let currentDate = start; currentDate.isBefore(end) || currentDate.isSame(end); currentDate = currentDate.add(1, 'day')) {
            dates.push(currentDate);
        }
        for (const date of dates) {
            await fetchCardioExercises(sessionStorage.getItem('token'), date, (exercises) => {
                allExercises.push(...exercises);
            }, null);
        }
        console.log(allExercises[0]);
        const initialCalorieData = {};
        let currentDate = dayjs(startDate);
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
            initialCalorieData[currentDate.format('YYYY-MM-DD')] = 0;
            currentDate = currentDate.add(1, 'day');
        }
    
        allExercises.forEach(exercise => {
            const date = dayjs(exercise.date).format('YYYY-MM-DD');
            if (initialCalorieData.hasOwnProperty(date)) {
                initialCalorieData[date] += exercise.caloriesBurned;
            }
        });
    
        const formattedData = Object.keys(initialCalorieData).map(date => ({
            date: dayjs(date).toDate(),
            caloriesBurned: initialCalorieData[date]
        }));
    
        setAllExercisesInInterval(allExercises);
        setExercisesData(formattedData);
        console.log(formattedData);
    };
    

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    return (
        <div className="m-4 md:m-10 mt-14 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <DateRangePickerControl
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <ChartsHeader category="Calories Burned" title="Cardio Performance" />
            <div className="w-full">
                <LineChart
                    startDate={startDate}
                    endDate={endDate}
                    exerciseData={exercisesData}
                    yName= 'caloriesBurned'
                    title= 'Calories burned'
                    interval={100}
                />
            </div>
        </div>
    );
};

export default LineCardio;
