const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://fitness-mrjr61nmy-hadar-davids-projects.vercel.app' 
  : 'http://localhost:3000';

// Function to fetch and display data
function fetchData(endpoint, elementId) {
  fetch(`${API_URL}${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      document.getElementById(elementId).innerText = JSON.stringify(data.data, null, 2); // Display data
    })
    .catch(error => console.error('Error:', error));
}

// Fetch and display goals data
fetchData('/api/goals', 'goalsData');

// Fetch and display workouts data
fetchData('/api/workouts', 'workoutsData');

// Fetch and display weights data
fetchData('/api/weights', 'weightsData');
