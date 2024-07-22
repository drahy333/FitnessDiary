import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateRangePickerControl from '../../components/DateRangePickerControl';
import { ChartsHeader, LineChartTraining } from '../../components';
import fetchCardioExercises from '../../utils/fetchCardioExercises';
import LineChart from '../../components/Charts/LineChart';
import fetchSleeps from '../../utils/fetchSleeps';

const LineSleep = () => {
    const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [allSleepsInInterval, setAllSleepsInInterval] = useState([]);
    const [sleepsData, setSleepData] = useState([]);

    const fetchData = async () => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        let allSleeps = [];
        let dates = [];
        for (let currentDate = start; currentDate.isBefore(end) || currentDate.isSame(end); currentDate = currentDate.add(1, 'day')) {
            dates.push(currentDate);
        }
        for (const date of dates) {
            await fetchSleeps(sessionStorage.getItem('token'), date, (sleeps) => {
                allSleeps.push(...sleeps);
            }, null);
        }
    
        const initialDurationData = {};
        let currentDate = dayjs(startDate);
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
            initialDurationData[currentDate.format('YYYY-MM-DD')] = 0;
            currentDate = currentDate.add(1, 'day');
        }
    
        allSleeps.forEach(sleep => {
            const date = dayjs(sleep.date).format('YYYY-MM-DD');
            if (initialDurationData.hasOwnProperty(date)) {
                const time = sleep.duration;
                const [hours, minutes] = time.split(':').map(Number);
                const timeDecimal =  hours + (minutes / 60);
                initialDurationData[date] += timeDecimal;
            }
        });
        
        const formattedData = Object.keys(initialDurationData).map(date => ({
            date: dayjs(date).toDate(),
            duration: initialDurationData[date]
        }));
    
        setAllSleepsInInterval(allSleeps);
        setSleepData(formattedData);
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
            <ChartsHeader title="Hours slept" />
            <div className="w-full">
                <LineChart
                    startDate={startDate}
                    endDate={endDate}
                    exerciseData={sleepsData}
                    yName='duration'
                    title= 'Hours slept'
                    interval= {1}
                />
            </div>
        </div>
    );
};

export default LineSleep;
