const fetchUserInfo = async (token) => {
    const url = `http://localhost:8080/getUser`;
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched userInfo:', data);
      return data;
    } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
    }
  }
export default fetchUserInfo;