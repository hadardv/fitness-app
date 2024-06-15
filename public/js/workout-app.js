document.addEventListener('DOMContentLoaded', () => {
  const workoutForm = document.getElementById('workout-form');
  const workoutTable = document.getElementById('workout-table').getElementsByTagName('tbody')[0];

  const weightsForm = document.getElementById('weights-form');
  const weightsTable = document.getElementById('weights-table').getElementsByTagName('tbody')[0];

  fetchWorkouts();
  fetchWeights();

  workoutForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const date = document.getElementById('date').value;
    if (!isValidDate(date)) {
      alert('Invalid input. Enter a valid date');
      return;
    }
    const type = document.getElementById('type').value;
    const duration = document.getElementById('duration').value;

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, type, duration })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const row = workoutTable.insertRow();
      row.insertCell(0).textContent = date;
      row.insertCell(1).textContent = type;
      row.insertCell(2).textContent = duration;

      const deleteOptionCell = row.insertCell(3);
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-thin', 'fa-trash-can');
      deleteButton.appendChild(deleteIcon);

      deleteButton.addEventListener('click', () => {
        workoutTable.deleteRow(row.rowIndex - 1);
        deleteWorkout(data.id);
      });

      deleteOptionCell.appendChild(deleteButton);
      workoutForm.reset();
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  });

  weightsForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const exercise = document.getElementById('add-exrcise').value;
    const warmupWeight = document.getElementById('add-WarmpupWeight').value;
    const peakWeight = document.getElementById('add-PeekWeight').value;
    const sets = document.getElementById('add-sets').value;

    try {
      const response = await fetch('/api/weights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exercise, warmupWeight, peakWeight, sets })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const row = weightsTable.insertRow();
      row.insertCell(0).textContent = exercise;
      row.insertCell(1).textContent = warmupWeight;
      row.insertCell(2).textContent = peakWeight;
      row.insertCell(3).textContent = sets;

      const deleteOptionCell = row.insertCell(4);
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fa', 'fa-thin', 'fa-trash-can');
      deleteButton.appendChild(deleteIcon);

      deleteButton.addEventListener('click', () => {
        weightsTable.deleteRow(row.rowIndex - 1);
        deleteWeight(data.id);
      });

      deleteOptionCell.appendChild(deleteButton);
      weightsForm.reset();
    } catch (error) {
      console.error('Error adding weight:', error);
    }
  });

  async function fetchWorkouts() {
    try {
      const response = await fetch('/api/workouts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      workoutTable.innerHTML = '';
      data.data.forEach(workout => {
        const row = workoutTable.insertRow();
        row.insertCell(0).textContent = workout.date;
        row.insertCell(1).textContent = workout.type;
        row.insertCell(2).textContent = workout.duration;

        const deleteOptionCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-thin', 'fa-trash-can');
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener('click', () => {
          workoutTable.deleteRow(row.rowIndex - 1);
          deleteWorkout(workout.id);
        });

        deleteOptionCell.appendChild(deleteButton);
      });
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  }

  async function fetchWeights() {
    try {
      const response = await fetch('/api/weights');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      weightsTable.innerHTML = '';
      data.data.forEach(weight => {
        const row = weightsTable.insertRow();
        row.insertCell(0).textContent = weight.exercise;
        row.insertCell(1).textContent = weight.warmupWeight;
        row.insertCell(2).textContent = weight.peakWeight;
        row.insertCell(3).textContent = weight.sets;

        const deleteOptionCell = row.insertCell(4);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-thin', 'fa-trash-can');
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener('click', () => {
          weightsTable.deleteRow(row.rowIndex - 1);
          deleteWeight(weight.id);
        });

        deleteOptionCell.appendChild(deleteButton);
      });
    } catch (error) {
      console.error('Error fetching weights:', error);
    }
  }

  async function deleteWorkout(id) {
    try {
      const response = await fetch(`/api/workouts/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  }

  async function deleteWeight(id) {
    try {
      const response = await fetch(`/api/weights/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error deleting weight:', error);
    }
  }

  function isValidDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year !== 2024 || month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
      return false;
    }
    return true;
  }
});
