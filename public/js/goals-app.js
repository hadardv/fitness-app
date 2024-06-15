document.addEventListener('DOMContentLoaded', () => {
  const inputBox = document.getElementById('input-box');
  const listContainer = document.getElementById('list-container');
  const addGoalButton = document.getElementById('add-goal-button');

  addGoalButton.addEventListener('click', addGoal);

  listContainer.addEventListener("click", function(e) {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
      deleteGoal(e.target.parentElement.getAttribute('data-id'));
    }
  }, false);

  async function fetchGoals() {
    try {
      const response = await fetch('/api/goals');
      const data = await response.json();
      listContainer.innerHTML = '';
      data.data.forEach(goal => {
        let li = document.createElement("li");
        li.innerHTML = goal.goal;
        li.setAttribute('data-id', goal.id);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      });
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  }

  async function addGoal() {
    if (inputBox.value == '') {
      alert('Enter A Goal');
    } else {
      try {
        const response = await fetch('/api/goals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ goal: inputBox.value })
        });
        const data = await response.json();
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.setAttribute('data-id', data.id);
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        inputBox.value = "";
      } catch (error) {
        console.error('Error adding goal:', error);
      }
    }
  }

  async function deleteGoal(id) {
    try {
      await fetch(`/api/goals/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }

  fetchGoals();
});
