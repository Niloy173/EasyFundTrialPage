
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


window.setTimeout(function(){

  document.getElementById("mainStory").style.height = document.getElementById("mainStory").scrollHeight;

 })


 
 /* this function is used for copy url which is already inside the input box */
 function CopyLink()
 {
   const checker =  document.getElementById("copy-btn").innerHTML.toLowerCase.toString();

   let link_box = document.getElementById("project-link");
   link_box.select();
   navigator.clipboard.writeText(link_box.value);

   if(checker !="copied")
   {
     document.getElementById("copy-btn").innerHTML = "copied"
   }
 
  

 }


 /* this functionality determines how much amount the selected project already gained */

 const target_amount = parseInt(document.getElementById("goal").innerHTML);
//  console.log(target_amount)// 1100
 const curr_amount = document.getElementById("curr_amount").innerHTML;
//  console.log(curr_amount) // 560

 const Getting_percentage = ( curr_amount / target_amount ) * 100;
  document.getElementById("progress").value += Getting_percentage;

//  console.log(Getting_percentage);

 /*---------------------------------*/



