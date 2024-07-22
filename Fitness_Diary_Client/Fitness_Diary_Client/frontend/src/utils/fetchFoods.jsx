const fetchFoods = async (token, selectedDate, setFoods) => {
    const formattedDate = selectedDate.format('YYYY-MM-DD');
    const url = `http://localhost:8080/food?date=${encodeURIComponent(formattedDate)}`;
    await fetch(url, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setFoods(data);
    })
    .catch(error => console.error('Error fetching foods:', error));
}
export default fetchFoods;