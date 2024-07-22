const fetchExercises = async (token, selectedDate, setExercises, calculateTotals) => {
    const formattedDate = selectedDate.format('YYYY-MM-DD'); 
    try {
        const url = `http://localhost:8080/exercise?date=${encodeURIComponent(formattedDate)}`;
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
            sets: exercise.sets || [] 
        }));
        setExercises(exercisesWithSets);
        if (calculateTotals !== null){
            calculateTotals(exercisesWithSets);
        }
    } catch (error) {
        console.error('Failed to fetch exercises:', error);
    }
};

export default fetchExercises;
