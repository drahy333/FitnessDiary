const fetchSleeps = async (token, selectedDate, setSleeps, calculateTotals) => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    try {
      const url = `http://localhost:8080/sleep?date=${encodeURIComponent(formattedDate)}`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const sleeps = await response.json();
      console.log(sleeps);
      const sleepsWithNotes = sleeps.map(sleep => ({
          ...sleep,
          notes: sleep.notes || []  // Ensure sets is always an array
        }));
      setSleeps(sleepsWithNotes);
      if ( calculateTotals !== null){
        calculateTotals(sleepsWithNotes);
      }

    } catch (error) {
      console.error('Failed to fetch sleeps:', error);
    }
  };
  export default fetchSleeps;
