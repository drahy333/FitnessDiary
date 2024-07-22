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
import {faClock, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import ChartDisplay from './Charts/ExerciseData';
import dayjs from 'dayjs'; 
import { useStateContext } from '../context/ContextProvider';
import DatePickerControl from '../components/DatePickerControl';
import DataDisplay from '../components/DataDisplay';
import fetchSleeps from '../utils/fetchSleeps';

function SleepRow(props) {
  const { row, updateTotals, deleteSleep, deleteNote } = props;
  const [open, setOpen] = React.useState(false);
  const [subRows, setSubRows] = React.useState(row?.notes || []);
  const [newSubRow, setNewSubRow] = React.useState({ Note: '' });

  useEffect(() => {
    setSubRows(row?.notes || []);
  }, [row]);

  const handleAddSubRow = async () => {
    if (!newSubRow.Note) return;
    try {
      const noteData = {
        sleepId: row.id,
        note: newSubRow.Note
      };
      const token = sessionStorage.getItem('token');
      const response = await fetch('http://localhost:8080/addSleepNote', {
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
        console.log(note);
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
        <TableCell align="right">{row.sleepStart}</TableCell>
        <TableCell align="right">{row.sleepStop}</TableCell>
        <TableCell align="right">{row.duration}</TableCell>
        <TableCell align="right">{row.energy}</TableCell>
        <TableCell align="right">
          <IconButton onClick={() => {
            deleteSleep(row.id);
          }}><CloseIcon style={{ color: 'black' }} /></IconButton>
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
                            setSubRows(prevSubRows => prevSubRows.filter(setX => setX.id !== set.id));
                          }}
                        >
                          <CloseIcon style={{ color: 'black' }} />
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

export default function Sleep() {
  const [sleepStart, setSleepStart] = useState('');
  const [sleepStop, setSleepStop] = useState('');
  const [energy, setEnergy] = useState('');

  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalNotes, setTotalNotes] = useState(0);
  const [totalSleepTime, setTotalSleepTime] = useState('00:00');


  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { currentMode, sleeps, setSleeps } = useStateContext();
  const isDarkMode = currentMode === 'Dark';

  useEffect(() => {
    calculateTotals(sleeps);
  }, [sleeps]);

  const handleNoteAdded = (sleepId, newNote) => {
    setSleeps(prevSleeps =>
      prevSleeps.map(sleep =>
        sleep.id === sleepId
          ? { ...sleep, notes: [...sleep.notes, newNote] }
          : sleep
      )
    );
  };

  useEffect(() => {
    fetchSleeps(sessionStorage.getItem('token'), selectedDate, setSleeps, calculateTotals);
  }, [selectedDate]);


  const handleAddSleep = async () => {
    if (!sleepStart || !sleepStop || !energy) return;

    if (!isValidDuration(sleepStart)) {
      alert('Sleep start must be in HH:MM format');
      return;
  }

    if (!isValidDuration(sleepStop)) {
      alert('Sleep stop must be in HH:MM format');
      return;
  }
    if (isNaN(energy)) {
      alert('Energy must be a number from 1 - 10');
      return;
    }

    if (Number(energy) > 10 || Number(energy) < 0){
      alert('Energy must be a number from 1 - 10');
      return;
    }

    try {
      const sleepData = {
        sleep_start: sleepStart,
        sleep_stop: sleepStop,
        energy: energy
      };
      const token = sessionStorage.getItem('token'); // Or localStorage.getItem('token');
      const formattedDate = selectedDate.format('YYYY-MM-DD');  // Format the date to 'YYYY-MM-DD'
      const url = `http://localhost:8080/addSleep?date=${encodeURIComponent(formattedDate)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sleepData),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(response);
        console.log(responseData);
        const newSleep = {
          ...responseData,
          id: responseData.id,
          notes: []
        };
        setSleeps([...sleeps, newSleep]);
        setSleepStart('');
        setSleepStop('');
        setEnergy('');
      } else {
        throw new Error('Failed to add the new sleep');
      }
    } catch (error) {
      console.error('Error submitting sleep data:', error);
      alert('Failed to add new sleep');
    }
  };
  const isValidDuration = (duration) => {
    return /^\d{2}:\d{2}$/.test(duration);
};

  function updateTotals() {
    calculateTotals(sleeps);
  }


function calculateTotals(sleeps) {
  let totalMinutes = 0;
  let notesCount = 0;

  sleeps.forEach(sleep => {
    if (sleep.duration) {
      const [hours, minutes] = sleep.duration.split(':').map(Number);
      totalMinutes += hours * 60 + minutes;
    }
    notesCount += sleep.notes.length;
  });

  setTotalMinutes(totalMinutes);
  setTotalNotes(notesCount);
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  setTotalSleepTime(`${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`);
}


  const deleteSleep = async (sleepId) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteSleep/${sleepId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSleeps(prevSleeps => {
          const updatedSleeps = prevSleeps.filter(sleep => sleep.id !== sleepId);
          if (updatedSleeps.length === 0) {
            setTotalMinutes(0);
            setTotalNotes(0);
          }
          return updatedSleeps;
        });
      } else {
        throw new Error('Failed to delete the sleep.');
      }
    } catch (error) {
      console.error('Error deleting sleep:', error);
      alert('Failed to delete sleep.');
    }
  };

  const deleteNote = async (sleepNoteId) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteSleepNote/${sleepNoteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response);
      if (response.ok) {
        setSleeps(prevSleeps => prevSleeps.map(sleep => {
          return {
            ...sleep,
            notes: sleep.notes ? sleep.notes.filter(note => note.id !== sleepNoteId) : []
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
    { icon: <FontAwesomeIcon icon={faClock} />, name: 'Total Sleep Time', amount: totalSleepTime }, 
    { icon: <FontAwesomeIcon icon={faClock} />, name: 'Total Minutes Sleeping', amount: totalMinutes },
    { icon: <FontAwesomeIcon icon={faStickyNote} />, name: 'Total Notes', amount: totalNotes }
  ];
  

  return (
    <div className={`mt-2 ${isDarkMode ? 'dark' : ''}`}> {/* Apply dark mode class conditionally */}
      <div>
        <DatePickerControl selectedDate={selectedDate} setSelectedDate={setSelectedDate} label={'Select date'} />
      </div>
      <DataDisplay data={trainingData} bgColor={'lightblue'} />
      <h1 class="p-5 text-3xl font-bold text-gray-400">Sleep</h1>
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
              label="Sleep Start"
              size="small"
              value={sleepStart}
              onChange={(e) => setSleepStart(e.target.value)}
              placeholder="HH:MM"
              style={{ margin: '10px' }}
              inputProps={{
                maxLength: 5
              }}
            />
            <TextField
              label="Sleep Stop"
              size="small"
              value={sleepStop}
              onChange={(e) => setSleepStop(e.target.value)}
              placeholder="HH:MM"
              style={{ margin: '10px' }}
              inputProps={{
                maxLength: 5
              }}
            />
            <TextField
              label="Energy levels"
              size="small"
              value={energy}
              placeholder="1-10"
              onChange={(e) => setEnergy(e.target.value)}
              style={{ margin: '10px' }}
              type='number'
            />
            <IconButton aria-label="add sleep" onClick={handleAddSleep}>
              <AddIcon />
            </IconButton>
          </Box>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">Sleep Start</TableCell>
                <TableCell align="right">Sleep Stop</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Energy levels</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sleeps.map((sleep, index) => (
                <SleepRow key={index} row={sleep} updateTotals={updateTotals} deleteSleep={deleteSleep} deleteNote={deleteNote} onNoteAdded={handleNoteAdded} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ChartDisplay sleeps={sleeps} key={sleeps.length} />
    </div>
  );
}
