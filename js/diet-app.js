document.addEventListener('DOMContentLoaded', () => {

  
  const calcForm = document.getElementById('calculator');

  calcForm.addEventListener('submit',(event)=>{
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
   
   alert(`The number of calories you should consume a day is ${bmr}`);
 
   calcForm.reset();
  });


});