
// On click enent
const remaining_days = document.getElementById("project_validity");

// getting actual number
const days = parseInt(remaining_days.innerText);


const interval = setInterval(function () {
  remaining_days.innerHTML = parseInt(remaining_days.innerText) - 1;
  
  if (remaining_days.innerText == 0) {

      remaining_days.innerHTML = "0";
      clearInterval(interval);

  }
}, (600000)); // days per hour  * seconds per hour * 1000 for converting into miliseconds


/* story should be read only not editable */
function myFunction() {
  document.getElementById("mainStory").readOnly = "true";
}
myFunction();