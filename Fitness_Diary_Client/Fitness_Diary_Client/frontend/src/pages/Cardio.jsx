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
import { faFire, faClock, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import ChartDisplay from './Charts/ExerciseData';
import dayjs from 'dayjs';  // Make sure dayjs is imported
import { useStateContext } from '../context/ContextProvider';
import DatePickerControl from '../components/DatePickerControl';
import DataDisplay from '../components/DataDisplay';
import fetchCardioExercises from '../utils/fetchCardioExercises';
function CardioRow(props) {
  const { row, updateTotals, deleteCardioExercise, deleteNote } = props;
  const [open, setOpen] = React.useState(false);
  const [subRows, setSubRows] = React.useState(row?.notes || []);
  const [newSubRow, setNewSubRow] = React.useState({ Note: ''});

  useEffect(() => {
    setSubRows(row?.notes || []);
}, [row]);




  const handleAddSubRow = async () => {
    if (!newSubRow.Note) return;
      try {
        const noteData = {
            cardioExerciseId: row.id,
            note: newSubRow.Note
        };
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:8080/addNote', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(noteData),
        });
  
        if (response.ok) {
          const note = await response.json(); 
          props.onNoteAdded(row.id, note);
          setSubRows(prevSubRows => [...prevSubRows, note]);
          setNewSubRow({ Note: '' });
        } else {
          throw new Error('Failed to add the new note');
        }
      } catch (error) {
        console.error('Error submitting note data:', error);
        alert('Failed to add new note');
      }
  };
  


  const handleChange = (prop) => (event) => {
    setNewSubRow({ ...newSubRow, [prop]: event.target.value });
  };


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.duration}</TableCell>
        <TableCell align="right">{row.caloriesBurned}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => {
            // updateTotals(-totalSets, -totalReps, -totalWeight);
            deleteCardioExercise(row.id);
          }}><CloseIcon style={{ color: 'black' }}/></IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: open ? '10px' : '0' }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Notes
              </Typography>
              <Table size="small" aria-label="sets history">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subRows.map((set, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" style={{ wordBreak: 'break-all' }}>
                        <Typography variant="body2">
                          {set.note}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                            onClick={() => {
                            deleteNote(set.id);
                            updateTotals(-1,-set.reps, -set.weight)
                            setSubRows(prevSubRows => prevSubRows.filter(setX => setX.id !== set.id));  // Update state
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
              <TextField
                  label="Additional information"
                  size="large"
                  multiline={true}
                  rows={3}
                  value={newSubRow.Note}
                  onChange={handleChange('Note')}
                  style={{ marginRight: '10px', width: '50%' }}
                />
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

export default function Cardio() {
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const [totalCalories, setTotalCalories] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalFormattedTime, setTotalFormattedTime] = useState("00:00:00");


  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { currentMode, cardioExercises, setCardioExercises } = useStateContext();
  const isDarkMode = currentMode === 'Dark';

  useEffect(() => {
    calculateTotals(cardioExercises);
}, [cardioExercises]);

  const handleNoteAdded = (cardioExerciseId, newNote) => {
    setCardioExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === cardioExerciseId
          ? { ...exercise, notes: [...exercise.notes, newNote] }
          : exercise
      )
    );
  };

  useEffect(() => {
    fetchCardioExercises(sessionStorage.getItem('token'), selectedDate, setCardioExercises, calculateTotals);
  }, [selectedDate]);
  

  const handleAddCardioExercise = async () => {
    if (!exerciseName || !duration || !calories) return;
    console.log(calories);

    if (isNaN(calories)){
      alert('Calories burned must be a number');
      return;
  }

    if (!isValidDuration(duration)) {
      alert('Duration must be in HH:MM:SS format');
      return; 
  }

    try {
      const exerciseData = {
        name: exerciseName,
        duration: duration,
        caloriesBurned: calories
      };
      const token = sessionStorage.getItem('token');
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      const url = `http://localhost:8080/addCardio?date=${encodeURIComponent(formattedDate)}`;
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
        console.log(response);
        const newExercise = {
          ...exerciseData,
          id: responseData.id,
          notes: []
        };
        setCardioExercises([...cardioExercises, newExercise]);
        setExerciseName('');
        setDuration('');
        setCalories('');
      } else {
        throw new Error('Failed to add the new cardio exercise');
      }
    } catch (error) {
      console.error('Error submitting cardio exercise data:', error);
      alert('Failed to add new cardio exercise');
    }
  };

  const isValidDuration = (duration) => {
    return /^\d{2}:\d{2}:\d{2}$/.test(duration);
};
function updateTotals() {
  calculateTotals(cardioExercises);
}

function durationToSeconds(duration) {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

function calculateTotals(cardioExercises) {
  let calories = 0;
  let totalSeconds = 0;
  let notesCount = 0;

  cardioExercises.forEach(exercise => {
      calories += parseInt(exercise.caloriesBurned || 0, 10);
      totalSeconds += durationToSeconds(exercise.duration);
      notesCount += exercise.notes.length;
  });

  const totalMinutesCalculated = totalSeconds / 60;
  setTotalCalories(calories);
  setTotalMinutes(totalMinutesCalculated.toFixed(2));
  setTotalFormattedTime(formatSecondsToHHMMSS(totalSeconds));
  setTotalNotes(notesCount);
}

function formatSecondsToHHMMSS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return [hours, minutes, remainingSeconds]
      .map(val => val < 10 ? `0${val}` : val)
      .join(':');
}




const deleteCardioExercise = async (cardioExerciseId) => {
    try {
        const response = await fetch(`http://localhost:8080/deleteCardioExercise/${cardioExerciseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            setCardioExercises(prevExercises => {
              const updatedExercises = prevExercises.filter(exercise => exercise.id !== cardioExerciseId);
              if (updatedExercises.length === 0) {
                  setTotalCalories(0);
                  setTotalMinutes(0);
                  setTotalNotes(0);
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

  const deleteNote = async (noteId) => {
    try {
        const response = await fetch(`http://localhost:8080/deleteNote/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (response.ok) {
            setCardioExercises(prevExercises => prevExercises.map(exercise => {
              return {
                  ...exercise,
                  notes: exercise.notes ? exercise.notes.filter(note => note.id !== noteId) : []
              };
          }));
        } else {
            throw new Error('Failed to delete the note.');
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note.');
    }
};



const trainingData = [
  { icon: <FontAwesomeIcon icon={faFire} />, name: 'Total Calories Burned', amount: totalCalories },
  { icon: <FontAwesomeIcon icon={faClock} />, name: 'Total Minutes Spent', amount: totalMinutes },
  { icon: <FontAwesomeIcon icon={faClock} />, name: 'Total Time Spent', amount: totalFormattedTime },
  { icon: <FontAwesomeIcon icon={faStickyNote} />, name: 'Total Notes', amount: totalNotes }
];

  
  return (
<div className={`mt-2 ${isDarkMode ? 'dark' : ''}`}> {/* Apply dark mode class conditionally */}
    <div>
    <DatePickerControl selectedDate={selectedDate} setSelectedDate={setSelectedDate} label = {'Select date'} />
    </div>
    <DataDisplay data={trainingData} bgColor={'red'} />
    <h1 class=" p-5 text-3xl font-bold text-gray-400">Cardio Training</h1>
    <div style={{ overflowX: 'hidden' }}>
    <TableContainer component={Paper} sx={{
          bgcolor: isDarkMode ? 'rgb(51 55 62)' : '#fff',
          color: isDarkMode ? '#fff' : 'inherit',
          borderRadius: '16px',
          marginX: '10px',
          maxHeight: '700px',
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
              label="Duration"
              size="small"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="HH:MM:SS"
              style={{ margin: '10px' }}
              inputProps={{
                  maxLength: 8 
              }}
          />
            <TextField
                label="Calories burned"
                size="small"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                style={{ margin: '10px' }}
                type='number'
            />
            <IconButton aria-label="add exercise" onClick={handleAddCardioExercise}>
                <AddIcon />
            </IconButton>
        </Box>
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Exercise</TableCell>
                    <TableCell align="right" >Exercises Duration</TableCell>
                    <TableCell align="right">Calories burned</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {cardioExercises.map((exercise, index) => (
                <CardioRow key={index} row={exercise} updateTotals={updateTotals} deleteCardioExercise={deleteCardioExercise} deleteNote= {deleteNote} onNoteAdded={handleNoteAdded}/>
              ))}
            </TableBody>
        </Table>
    </TableContainer>
</div>

    <ChartDisplay cardioExercises={cardioExercises} key={cardioExercises.length}/>
    </div>
  );
}
