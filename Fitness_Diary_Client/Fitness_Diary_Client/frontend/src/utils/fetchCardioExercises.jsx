const fetchCardioExercises = async (token, selectedDate, setCardioExercises, calculateTotals) => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    try {
      const url = `http://localhost:8080/cardio?date=${encodeURIComponent(formattedDate)}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const exercises = await response.json();
      const exercisesWithSets = exercises.map(exercise => ({
          ...exercise,
          notes: exercise.notes || []  // Ensure sets is always an array
        }));
      setCardioExercises(exercisesWithSets);
      if ( calculateTotals !== null){
        calculateTotals(exercisesWithSets);
      }

    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    }
  };
  export default fetchCardioExercises;
