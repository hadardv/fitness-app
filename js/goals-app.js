
document.addEventListener('DOMContentLoaded', () => {
  
  const inputBox = document.getElementById('input-box');
  const listContainer = document.getElementById('list-container');
  const addGoalButton = document.getElementById('add-goal-button');
  
  // Attach event listener to the Add button
  addGoalButton.addEventListener('click', addGoal);

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
  
  showGoals();
});
