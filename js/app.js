// all the event listeners on the doc
document.addEventListener('DOMContentLoaded', () => {
  const workoutForm = document.getElementById('workout-form');
  const workoutTable = document.getElementById('workout-table').getElementsByTagName('tbody')[0];

  // what happens when pressing submit :
  workoutForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const date = document.getElementById('date').value;
    // check if the date is valid
    if(!isValidDate(date))
      {
        alert('Invalid input. Enter a valid date')
        return;
      }

    const type = document.getElementById('type').value;
    const duration = document.getElementById('duration').value;

    const row = workoutTable.insertRow();
    row.insertCell(0).textContent = date;
    row.insertCell(1).textContent = type;
    row.insertCell(2).textContent = duration;

    // Create and append delete button
    const deleteOptionCell = row.insertCell(3); // creates anothe cell in index 3 (Action)
    const deleteButton = document.createElement('button'); // creates an element button
    deleteButton.textContent = 'Delete'; //naming the button delete
    deleteButton.addEventListener('click', () => { 
        workoutTable.deleteRow(row.rowIndex - 1);
    }); // adds an event listener when clicking to delete the row from the workout table
    deleteOptionCell.appendChild(deleteButton); //append the button to the cell

    workoutForm.reset();
    });
  
    function isValidDate(dateStr)
    {

      // parse each section from str to int
      const splited = dateStr.split("/");
      const year = parseInt(splited[0],10);
      const month = parseInt(splited[1],10);
      const day = parseInt(splited[2],10);

      // check the range
      if (year != 2024)
        {
          return false;
        }
      
      // number of the days in each month starting from january to december
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if(day > 0 && day <= daysInMonth[month-1]){
        return true;
      }
      return false;
    }


    
});