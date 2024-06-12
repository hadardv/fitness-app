document.addEventListener('DOMContentLoaded', () => {
  const workoutForm = document.getElementById('workout-form');
  console.log(document.getElementById('workout-table'))
  const workoutTable = document.getElementById('workout-table').getElementsByTagName('tbody')[0];

  const weightsForm = document.getElementById('weights-form');
  const weightsTable = document.getElementById('weights-table').getElementsByTagName('tbody')[0];

  const calcForm = document.getElementById('calculator');

  // Load workouts from localStorage when the page is loaded
  showWorkouts();
  showWeights();
  
  document.getElementById('testButton').addEventListener('click', () => {
    alert('JavaScript is working');
  });
  // what happens when pressing submit :
  workoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const date = document.getElementById('date').value;
    // check if the date is valid
    if (!isValidDate(date)) {
      alert('Invalid input. Enter a valid date');
      return;
    }

    const type = document.getElementById('type').value;
    const duration = document.getElementById('duration').value;

    const row = workoutTable.insertRow();
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = type;
    row.insertCell(2).textContent = duration;

    // Create and append delete button
    const deleteOptionCell = row.insertCell(3); // creates another cell in index 3 (Action)
    const deleteButton = document.createElement('button'); // creates an element button
    deleteButton.classList.add('delete-btn'); // adding a class to style the button if needed

    const deleteIcon = document.createElement('i'); // creates an element i for the icon
    deleteIcon.classList.add('fa', 'fa-thin', 'fa-trash-can'); // adds FontAwesome classes to the icon
    deleteButton.appendChild(deleteIcon); // appends the icon to the button

    deleteButton.addEventListener('click', () => { 
      workoutTable.deleteRow(row.rowIndex - 1);
      saveWorkoutsData(); // save data after deletion
    }); // adds an event listener when clicking to delete the row from the workout table

    deleteOptionCell.appendChild(deleteButton); // append the button to the cell
    saveWorkoutsData(); //save data after adding a row
    workoutForm.reset();
  });

  weightsForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const name = document.getElementById('add-exrcise').value;
    const warmup = document.getElementById('add-WarmpupWeight').value;
    const peek = document.getElementById('add-PeekWeight').value;
    const sets = document.getElementById('add-sets').value;

    const row = weightsTable.insertRow();
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = warmup;
    row.insertCell(2).textContent = peek;
    row.insertCell(3).textContent = sets;

    const deleteOptionCell = row.insertCell(4); 
    const deleteButton = document.createElement('button'); 
    deleteButton.classList.add('delete-btn'); 
    const deleteIcon = document.createElement('i'); 
    deleteIcon.classList.add('fa', 'fa-thin', 'fa-trash-can'); 
    deleteButton.appendChild(deleteIcon); 
    deleteButton.addEventListener('click', () => { 
    weightsTable.deleteRow(row.rowIndex - 1);
    saveWeightsData();
    }); 

    deleteOptionCell.appendChild(deleteButton);
    saveWeightsData(); 
    weightsForm.reset();

  });

 

  calcForm.addEventListener('dsubmit',(event)=>{
    event.preventDefault();
    const age = parseInt(document.getElementById('age').value,10);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activity = document.getElementById('activity').value;

    let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else if (gender === 'female') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

   // Adjust BMR based on activity level
   let activityMultiplier;
   switch (activity) {
     case '0':
       activityMultiplier = 1.2;
       break;
     case '12':
       activityMultiplier = 1.375;
       break;
     case '34':
       activityMultiplier = 1.55;
       break;
     default:
       activityMultiplier = 1.2; // Default to sedentary if something goes wrong
   }
 
   const tdee = bmr * activityMultiplier;

   console.log('Age:', age);
  console.log('Gender:', gender);
  console.log('Height:', height);
  console.log('Weight:', weight);
  console.log('Activity:', activity);
  console.log('BMR:', bmr);
  console.log('Activity Multiplier:', activityMultiplier);
  console.log('TDEE:', tdee);
   
   alert(`Calculated BMR: ${bmr}\nCalculated TDEE (Total Daily Energy Expenditure): ${tdee}`);
 
   calcForm.reset();
  });

  function isValidDate(dateStr) {
    // parse each section from str to int
    const splited = dateStr.split("-");
    const year = parseInt(splited[0], 10);
    const month = parseInt(splited[1], 10);
    const day = parseInt(splited[2], 10);

    // check the range
    if (year != 2024) {
      return false;
    }

    // number of the days in each month starting from January to December
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > 0 && day <= daysInMonth[month - 1]) {
      return true;
    }
    return false;
  }

  function saveWorkoutsData() {
    localStorage.setItem("workoutsData", workoutTable.innerHTML);
  }

  
  function saveWeightsData() {
    localStorage.setItem("weightsData", weightsTable.innerHTML);
  }

  function showWeights() {
    const savedWeights = localStorage.getItem("weightsData");
    if (savedWeights) {
      weightsTable.innerHTML = savedWeights;
      // Add event listeners to delete buttons of the loaded weights
      Array.from(weightsTable.getElementsByClassName('delete-btn')).forEach((button) => {
        button.addEventListener('click', (event) => {
          weightsTable.deleteRow(event.target.closest('tr').rowIndex - 1);
          saveWeightsData(); // Save data after deletion
        });
      });
    }
  }


  function showWorkouts() {
    const savedWorkouts = localStorage.getItem("workoutsData");
    if (savedWorkouts) {
      workoutTable.innerHTML = savedWorkouts;
      // Add event listeners to delete buttons of the loaded workouts
      Array.from(workoutTable.getElementsByClassName('delete-btn')).forEach((button) => {
        button.addEventListener('click', (event) => {
          workoutTable.deleteRow(event.target.closest('tr').rowIndex - 1);
          saveWorkoutsData(); // Save data after deletion
        });
      });
    }
  }
});

const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addGoal() {
  if (inputBox.value == '') {
    alert('Enter A Goal');
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveGoalsData();
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName == "LI") {
    e.target.classList.toggle("checked");
    saveGoalsData();
  } else if (e.target.tagName == "SPAN") {
    e.target.parentElement.remove();
    saveGoalsData();
  }
}, false);

function saveGoalsData() {
  localStorage.setItem("goalsData", listContainer.innerHTML);
}

function showGoals() {
  listContainer.innerHTML = localStorage.getItem("goalsData");
}
showGoals();

