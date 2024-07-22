import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateRangePickerControl from '../../components/DateRangePickerControl';
import { ChartsHeader, LineChartTraining } from '../../components';
import ExerciseSelect from '../../components/ExerciseSelect';
import fetchExercises from '../../utils/fetchExercises';
import WeightSelect from '../../components/WeightSelect';

const Line = () => {
    const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'));
    const [endDate, setEndDate] = useState(dayjs());
    const [allExercisesInInterval, setAllExercisesInInterval] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [availableWeights, setAvailableWeights] = useState([]);

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
      allExercises = allExercises.filter(exercise => exercise.sets && exercise.sets.length > 0);
      setAllExercisesInInterval(allExercises);
      };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    useEffect(() => {
      if (allExercisesInInterval.length > 0) {
          setSelectedExercise(allExercisesInInterval[0].name);
      }
      else{
          setSelectedExercise('');
      }
  }, [allExercisesInInterval]);

  useEffect(() => {
    if (selectedExercise) {
        const weights = allExercisesInInterval
            .filter(exercise => exercise.name === selectedExercise)
            .flatMap(exercise => exercise.sets.map(set => set.weight));

        const uniqueWeights = Array.from(new Set(weights)).sort((a, b) => b - a);
        setAvailableWeights(uniqueWeights);
        setSelectedWeight(uniqueWeights.length > 0 ? uniqueWeights[0] : '');
    } else {
        setAvailableWeights([]);
        setSelectedWeight('');
    }
}, [selectedExercise, allExercisesInInterval]);

    return (
    
        <div className="m-4 md:m-10 mt-14 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <DateRangePickerControl
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
            />
            <ExerciseSelect exercises={allExercisesInInterval} setSelectedExercise={setSelectedExercise} selectedExercise={selectedExercise}/>
            <WeightSelect 
            exercises={allExercisesInInterval}
            selectedExercise={selectedExercise}
            setSelectedWeight={setSelectedWeight}
            selectedWeight={selectedWeight}
            availableWeights={availableWeights} />
            <ChartsHeader category="Progressive Overload" title="Performance" />
            <div className="w-full">
                <LineChartTraining
                    startDate={startDate}
                    endDate={endDate}
                    allExercisesInInterval={allExercisesInInterval}
                    selectedExercise={selectedExercise}
                    selectedWeight={selectedWeight}
                    key= {selectedWeight}
                />
            </div>
        </div>
    );
};

export default Line;
