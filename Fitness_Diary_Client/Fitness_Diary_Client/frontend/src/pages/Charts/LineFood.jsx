import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateRangePickerControl from '../../components/DateRangePickerControl';
import { ChartsHeader, LineChartTraining } from '../../components';
import LineChart from '../../components/Charts/LineChart';
import fetchFoods from '../../utils/fetchFoods';

const LineFood = () => {
    const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [allFoodsInInterval, setAllFoodsInInterval] = useState([]);
    const [foodsData, setFoodsData] = useState([]);

    const fetchData = async () => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        let allFoods = [];
        let dates = [];
        for (let currentDate = start; currentDate.isBefore(end) || currentDate.isSame(end); currentDate = currentDate.add(1, 'day')) {
            dates.push(currentDate);
        }
        for (const date of dates) {
            await fetchFoods(sessionStorage.getItem('token'), date, (exercises) => {
                allFoods.push(...exercises);
            }, null);
        }
    
        const initialCalorieData = {};
        let currentDate = dayjs(startDate);
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
            initialCalorieData[currentDate.format('YYYY-MM-DD')] = 0;
            currentDate = currentDate.add(1, 'day');
        }
    
        allFoods.forEach(food => {
            const date = dayjs(food.date).format('YYYY-MM-DD');
            if (initialCalorieData.hasOwnProperty(date)) {
                initialCalorieData[date] += parseInt(food.calories, 10);
            }
        });
        
        const formattedData = Object.keys(initialCalorieData).map(date => ({
            date: dayjs(date).toDate(),
            calories: initialCalorieData[date]
        }));
    
        setAllFoodsInInterval(allFoods); 
        setFoodsData(formattedData);
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
            <ChartsHeader title="Calories consumed" />
            <div className="w-full">
                <LineChart
                    startDate={startDate}
                    endDate={endDate}
                    exerciseData={foodsData}
                    yName='calories'
                    title= 'Calories consumed'
                    interval= {100}
                />
            </div>
        </div>
    );
};

export default LineFood;
