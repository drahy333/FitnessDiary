const calculateTotalsExercises = (exercises, setTotalSets, setTotalReps) => {
    let sets = 0, reps = 0, weight = 0;

    exercises.forEach(exercise => {
        exercise.sets.forEach(set => {
            sets++;
            reps += set.reps;
            weight += set.weight;
        });
    });

    setTotalSets(sets);
    setTotalReps(reps);
};
export default calculateTotalsExercises;