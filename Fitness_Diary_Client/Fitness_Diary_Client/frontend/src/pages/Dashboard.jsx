import React, { useState, useEffect } from 'react';

import { IoIosMore } from 'react-icons/io';
import { MdFitnessCenter } from 'react-icons/md';
import { useStateContext } from '../context/ContextProvider';
import { BiRun, BiFoodMenu, BiPlus,BiBody, BiRuler , BiDumbbell, BiCalendar} from 'react-icons/bi';
import fetchExercises from '../utils/fetchExercises';
import dayjs from 'dayjs';
import fetchCardioExercises from '../utils/fetchCardioExercises';
import fetchFoods from '../utils/fetchFoods';
import ExerciseChartDisplay from '../components/Charts/ExerciseChartDisplay';
import FoodChartDisplay from '../components/Charts/FoodChartDisplay';
import fetchUserInfo from '../utils/fetchUserInfo';
import ExerciseSetsDisplay from '../components/Charts/WorkingSetsChart';
import { faUtensils, faSeedling, faFish, faOilCan, faDrumstickBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
  const { setUserInfo, userInfo, exercises, setExercises, cardioExercises, setCardioExercises, foods, setFoods } = useStateContext();
  const [weight, setWeight] = useState(0); 
  const [age, setAge] = useState(0); 
  const [height, setHeight] = useState(0); 
  const [gender, setGender] = useState('');

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const userInfo = await fetchUserInfo(token);
      if (userInfo) {
        setUserInfo(userInfo);
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
      icon: <FontAwesomeIcon icon={faUtensils} />, //<BiFoodMenu className="text-4xl" />,
      amount: foods.reduce((acc, food) => acc + parseInt(food.calories || 0, 10), 0),
      title: 'Calories Consumed',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BiFoodMenu className="text-4xl" />,
      amount: calculateBMR(weight),
      title: 'Basal Metabolic Rate',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
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
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
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
        {exercises && exercises.length > 0 && (
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
        )}

        {foods && foods.length > 0 && (
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
        )}

        {exercises && exercises.length > 0 && (
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
        </div>)}
        
      </div>
        
    </div>
  );
};

export default Dashboard;