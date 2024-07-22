import React, { useState, useEffect } from 'react';

import { BsCurrencyDollar } from 'react-icons/bs';
import { GoCircle } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { MdFitnessCenter } from 'react-icons/md';
import ExerciseChartDisplay from '../../components/Charts/ExerciseChartDisplay';
import { Stacked, Pie, Button, LineChart, SparkLine } from '../../components';
import {medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../../data/dummy';
import { useStateContext } from '../../context/ContextProvider';
import { BiRun, BiFoodMenu, BiPlus,BiBody, BiRuler , BiDumbbell, BiCalendar} from 'react-icons/bi';
import fetchExercises from '../../utils/fetchExercises';
import dayjs from 'dayjs';
import fetchCardioExercises from '../../utils/fetchCardioExercises';
import fetchFoods from '../../utils/fetchFoods';
import ChartDisplay from './ExerciseData';
import ExerciseSetsDisplay from '../../components/Charts/WorkingSetsChart';
import FoodChartDisplay from '../../components/Charts/FoodChartDisplay';
import fetchUserInfo from '../../utils/fetchUserInfo';
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);





const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();
  const { setUserInfo, userInfo, exercises, setExercises, cardioExercises, setCardioExercises, foods, setFoods } = useStateContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [weight, setWeight] = useState(70); // Default weight, fetch from context or a service if needed
  const [age, setAge] = useState(25); // Default age, update as needed
  const [height, setHeight] = useState(170); // Default height in cm, update as needed
  const [gender, setGender] = useState('');

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const userInfo = await fetchUserInfo(token);
      if (userInfo) {
        setUserInfo(userInfo); // Optionally update a context or state for userInfo
        setWeight(userInfo.weight);
        setAge(userInfo.age);
        setHeight(userInfo.height);
        setGender(userInfo.gender);
      } else {
        console.error('No user info returned');
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
    fetchExercises(sessionStorage.getItem('token'), dayjs(), setExercises, null);
    fetchCardioExercises(sessionStorage.getItem('token'), dayjs(), setCardioExercises, null);
    fetchFoods(sessionStorage.getItem('token'), dayjs(), setFoods);
  }, []);
  
  

  const calculateBMR = () => {
    const genderNormalized = gender;// Normalize the gender to lowercase
    if (genderNormalized === "male") {
      return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
    } else if (genderNormalized === "female") {
      return Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age));
    } else {
      // Handle unexpected gender value, perhaps set a default or throw an error
      return null; // or you could return a default value or handle the error as needed
    }
  
  };
  const totalWorkingSets = exercises.reduce((total, exercise) => {
    const workingSetsCount = exercise.sets.reduce((count, set) => {
      return set.isWorkingSet ? count + 1 : count;
    }, 0);
    return total + workingSetsCount;
  }, 0);

  const earningData = [
    {
      icon: <BiRun className="text-4xl" />,
      amount: cardioExercises.reduce((acc, exercise) => acc + parseInt(exercise.caloriesBurned || 0, 10), 0),
      title: 'Calories burned',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <MdFitnessCenter className="text-4xl" />,
      amount: totalWorkingSets,
      title: 'Working sets',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BiFoodMenu className="text-4xl" />,
      amount: foods.reduce((acc, food) => acc + parseInt(food.calories || 0, 10), 0),
      title: 'Calories Consumed',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BiRuler className="text-4xl" />,
      amount: calculateBMR(weight),
      title: 'Basal Metabolic Rate',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: '#E5FAFB',
  
      pcColor: 'green-600',
    },
    {
      icon: <BiDumbbell className="text-4xl" />,
      amount: weight,
      title: 'Weight (kg)',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BiCalendar className="text-4xl" />,
      amount: age,
      title: 'Age',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BiRuler className="text-4xl" />,
      amount: height,
      title: 'Height',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
  ];
  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl flex flex-col items-center justify-center">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>

        
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Sets per body part</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>

          <div className="mt-10 ">
              <ExerciseChartDisplay exercises={exercises} />
          </div>

        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
           <div className="flex justify-between">
            <p className="text-xl font-semibold">Nutrition</p>
            <button type="button" className="text-xl font-semibold text-gray-400">
              <IoIosMore />
            </button>
          </div>
          
          <div className='mt-5 flex justify-center'>
          <FoodChartDisplay foods={foods} style={{ width: '100%', maxWidth: '600px', margin: 'auto'}} />
          </div>
        </div>
        <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">Sets overview</p>
            <button type="button" className="text-xl font-semibold text-gray-500">
              <IoIosMore />
            </button>
          </div>
          <div className='mt-5 flex justify-center'>
          <ExerciseSetsDisplay exercises={exercises}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;