import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { faWeightHanging, faWaveSquare, faRunning} from '@fortawesome/free-solid-svg-icons';

import dayjs from 'dayjs';
import { useStateContext } from '../context/ContextProvider';
import DatePickerControl from '../components/DatePickerControl';
import DataDisplay from '../components/DataDisplay';
import fetchExercises from '../utils/fetchExercises';
import Checkbox from '@mui/material/Checkbox';

function Row(props) {
  const { row, updateTotals, deleteExercise, deleteSet } = props;
  const [open, setOpen] = React.useState(false);
  const [subRows, setSubRows] = React.useState(row?.sets || []);
  const [newSubRow, setNewSubRow] = React.useState({
    reps: '',
    weight: '',
    isWorkingSet: false
  });

  useEffect(() => {
    setSubRows(row?.sets || []);
}, [row]);


  const handleAddSubRow = async () => {
    if (!newSubRow.reps || !newSubRow.weight) return;
      try {
        const setData = {
          exerciseId: row.id,
          Reps: newSubRow.reps,
          Weight: newSubRow.weight,
          IsWorkingSet: newSubRow.isWorkingSet
      };
        console.log(setData);
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:8080/set', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(setData),
        });
  
        if (response.ok) {
          const set = await response.json();
          props.onSetAdded(row.id, set);
          setSubRows(prevSubRows => [...prevSubRows, set]);
          setNewSubRow({ reps: '', weight: '' , isWorkingSet: false});
          console.log(set);
          updateTotals(1, setData.Reps, setData.Weight, setData.IsWorkingSet ? 1 : 0);
        } else {
          throw new Error('Failed to add the new set');
        }
      } catch (error) {
        console.error('Error submitting set data:', error);
        alert('Failed to add new set');
      }
  };
  


  const handleChange = (prop) => (event) => {
    setNewSubRow({ ...newSubRow, [prop]: event.target.value });
  };

  const totalSets = subRows.length;
  const totalReps = subRows.reduce((acc, curr) => acc + parseInt(curr.reps), 0);
  const totalWeight = subRows.reduce((acc, curr) => acc + parseInt(curr.weight), 0);
  const totalWorkingSets =  subRows.reduce((acc, curr) => acc + parseInt(curr.isWorkingSet ? 1 : 0), 0);

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked);
    setNewSubRow(prev => ({
      ...prev,
      isWorkingSet: event.target.checked
    }));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.bodyPart}</TableCell>
        <TableCell align="right">{totalSets}</TableCell>
        <TableCell align="right">{totalReps}</TableCell>
        <TableCell align="right">{totalWorkingSets}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => {
            updateTotals(-totalSets, -totalReps, -totalWeight, -totalWorkingSets);
            deleteExercise(row.id);
          }}><CloseIcon style={{ color: 'black' }}/></IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: open ? '10px' : '0' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sets History
              </Typography>
              <Table size="small" aria-label="sets history">
                <TableHead>
                  <TableRow>
                    <TableCell>Reps</TableCell>
                    <TableCell>Weight (kg)</TableCell>
                    <TableCell>Working Set</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subRows.map((set, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {set.reps}
                      </TableCell>
                      <TableCell>{set.weight}</TableCell>
                      <TableCell>
                        <Checkbox checked={set.isWorkingSet} disabled />
                      </TableCell>
                      <TableCell>
                        <IconButton 
                            onClick={() => {
                            deleteSet(set.id);
                            updateTotals(-1,-set.reps, -set.weight, - set.isWorkingSet ? 1 : 0)
                            setSubRows(prevSubRows => prevSubRows.filter(setX => setX.id !== set.id));
                            }}
                        >
                            <CloseIcon style={{ color: 'black' }}/>
                        </IconButton>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box display="flex" alignItems="center" mt={open ? 1 : 0}>
                <TableCell>
                  <TextField label="Reps" size="small" type="number" value={newSubRow.reps} onChange={handleChange('reps')} style={{ marginRight: '10px' }}/>
                </TableCell>
                <TableCell>
                  <TextField label="Weight" size="small" type="number" value={newSubRow.weight} onChange={handleChange('weight')} style={{ marginRight: '10px' }}/>
                </TableCell>              
              <TableCell className='ml-3'>
                <Checkbox checked={newSubRow.isWorkingSet} onChange={handleCheckboxChange}/>
              </TableCell>
                <IconButton aria-label="add subrow" size="small" onClick={handleAddSubRow}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function Training() {
  const [exerciseName, setExerciseName] = useState('');
  const [bodyPart, setBodyPart] = useState('');

  const [totalSets, setTotalSets] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalWorkingSets, setTotalWorkingSets] = useState(0);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { currentMode, exercises, setExercises } = useStateContext();
  const isDarkMode = currentMode === 'Dark';

  const handleSetAdded = (exerciseId, newSet) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === exerciseId
          ? { ...exercise, sets: [...exercise.sets, newSet] }
          : exercise
      )
    );
  };

  useEffect(() => {
    fetchExercises(sessionStorage.getItem('token'), selectedDate, setExercises, calculateTotals);
  }, [selectedDate]);
  

  const handleAddExercise = async () => {
    if (!exerciseName || !bodyPart) return;

    try {
      const exerciseData = {
        name: exerciseName,
        bodyPart: bodyPart,
      };
      const token = sessionStorage.getItem('token');
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      const url = `http://localhost:8080/training?date=${encodeURIComponent(formattedDate)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(exerciseData),
      });
      if (response.ok) {
        const responseData = await response.json();

        const newExercise = {
          ...exerciseData,
          id: responseData.id,
          sets: []
        };
        setExercises([...exercises, newExercise]);
        setExerciseName('');
        setBodyPart('');
      } else {
        throw new Error('Failed to add the new exercise');
      }
    } catch (error) {
      console.error('Error submitting exercise data:', error);
      alert('Failed to add new exercise');
    }
  };

  const calculateTotals = (exercises) => {
    let sets = 0, reps = 0, weight = 0, workingSets = 0;;

    exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            sets++;
            reps += set.reps;
            weight += set.weight;
            if (set.isWorkingSet) workingSets++;
        });
    });

    setTotalSets(sets);
    setTotalReps(reps);
    setTotalWeight(weight);
    setTotalWorkingSets(workingSets);
    console.log(totalSets);
};

const deleteExercise = async (exerciseId) => {
    try {
        const response = await fetch(`http://localhost:8080/deleteExercise/${exerciseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setExercises(prevExercises => {
              const updatedExercises = prevExercises.filter(exercise => exercise.id !== exerciseId);
              if (updatedExercises.length === 0) {
                  setTotalSets(0);
                  setTotalReps(0);
                  setTotalWeight(0);
                  setTotalWorkingSets(0);
              }
              return updatedExercises;
          });
        } else {
            throw new Error('Failed to delete the exercise.');
        }
    } catch (error) {
        console.error('Error deleting exercise:', error);
        alert('Failed to delete exercise.');
    }
  };

  const deleteSet = async (setId) => {
    try {
        const response = await fetch(`http://localhost:8080/deleteSet/${setId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setExercises(prevExercises => prevExercises.map(exercise => {
                return {
                    ...exercise,
                    sets: exercise.sets.filter(set => set.id !== setId)
                };
            }));
        } else {
            throw new Error('Failed to delete the set.');
        }
    } catch (error) {
        console.error('Error deleting set:', error);
        alert('Failed to delete set.');
    }
};

const updateTotals = (number, newReps, newWeight, newWorkingSets) => {
    setTotalSets(prevTotalSets => prevTotalSets + number);
    setTotalReps(prevTotalReps => prevTotalReps + parseInt(newReps));
    setTotalWeight(prevTotalWeight => prevTotalWeight + parseInt(newWeight));
    setTotalWorkingSets(prevTotalWorkingSets => prevTotalWorkingSets + parseInt(newWorkingSets));
    }


const trainingData = [
      { icon: <FontAwesomeIcon icon={faDumbbell} />, name: 'Total sets', amount: totalSets },
      { icon: <FontAwesomeIcon icon={faWaveSquare} />, name: 'Total reps', amount: totalReps },
      { icon: <FontAwesomeIcon icon={faRunning} />, name: 'Exercises', amount: exercises.length },
      { icon: <FontAwesomeIcon icon={faWeightHanging} />, name: 'Working sets', amount: totalWorkingSets }

  ];

  return (
<div className={`mt-2 ${isDarkMode ? 'dark' : ''}`}> {/* Apply dark mode class conditionally */}
    <div>
    <DatePickerControl selectedDate={selectedDate} setSelectedDate={setSelectedDate} label={'Select date'} />
    </div>
    <DataDisplay data={trainingData} bgColor={'orange'} />
    <h1 class=" p-5 text-3xl font-bold text-gray-400">Hypertrophy Training</h1>
    <div style={{ overflowX: 'hidden' }}>
    <TableContainer component={Paper} sx={{
          bgcolor: isDarkMode ? 'rgb(51 55 62)' : '#fff',
          color: isDarkMode ? '#fff' : 'inherit',
          borderRadius: '16px',
          marginX: '10px',
          maxHeight: '800px',
          overflow: 'auto',
        }}>
        <Box sx={{ display: 'flex', marginBottom: '10px', marginLeft: '5px', marginTop: '5px' }}>
            <TextField
                label="Exercise Name"
                size="small"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                style={{ margin: '10px' }}
            />
            <TextField
                label="Body Part"
                size="small"
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
                style={{ margin: '10px' }}
            />
            <IconButton aria-label="add exercise" onClick={handleAddExercise}>
                <AddIcon />
            </IconButton>
        </Box>
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Exercise</TableCell>
                    <TableCell>Body part</TableCell>
                    <TableCell align="right">Total Sets</TableCell>
                    <TableCell align="right">Total Reps</TableCell>
                    <TableCell align="right">Total Working Sets</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {exercises.map((exercise, index) => (
                <Row key={index} row={exercise} updateTotals={updateTotals} deleteExercise={deleteExercise} deleteSet= {deleteSet} onSetAdded={handleSetAdded}/>
              ))}
            </TableBody>
        </Table>
    </TableContainer>
</div>

    </div>
  );
}
