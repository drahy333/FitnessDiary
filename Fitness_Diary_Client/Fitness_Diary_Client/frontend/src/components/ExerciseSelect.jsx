import {React , useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@mui/material';

const ExerciseSelect = ({ exercises , setSelectedExercise, selectedExercise}) => {

    const handleChange = (event) => {
        setSelectedExercise(event.target.value);
      };

    const uniqueExercises = Array.from(new Set(exercises.map(exercise => exercise.name)))
      .map(name => {
          return exercises.find(exercise => exercise.name === name);
      });

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    }}>
      <FormControl style={{ width: 250, marginTop: '30px' }}>
        <InputLabel id="exercise-select-label">Exercise</InputLabel>
        <Select
          labelId="exercise-select-label"
          id="exercise-select"
          value={selectedExercise}
          label="Exercise"
          onChange={handleChange}
        >
          {uniqueExercises.map((exercise) => (
            <MenuItem key={exercise.id} value={exercise.name}>
              {exercise.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ExerciseSelect;
