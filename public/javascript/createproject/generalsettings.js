//require packages



//module scaffolding or variables
var AmountToCover = 100;
var ProjectValidity = 0;
var CategorySection = "";

// Below this two variable ensures that Field is empty or not
let date;
let category;







//  click event goes here

const  category_box = document.getElementById("category_box");
const dropdown_content = document.getElementById("myDropdown");
const input_money = document.getElementById("money");
const input_money_container = document.getElementById("amount");
const confirm_amount = document.getElementById("btn-click");
let  date_issued = document.getElementById("demo");



// dropdown category
category_box.addEventListener("click",function(){

  dropdown_content.style.display = "block"

});

// amount container opening
input_money_container.addEventListener("click",function(){

  input_money.style.display = "block";

 
})


// amount container ok button click listener
confirm_amount.addEventListener("click",function(){

  AmountToCover = document.getElementById("amount-data").value;
  AmountToCover = AmountToCover > 1500 || AmountToCover.toString().length == 0 || AmountToCover < 100  ? 100:AmountToCover;

  input_money_container.innerHTML = AmountToCover;
  input_money.style.display = "none";
})








// working on preventing past date selection 

let dateobj = new Date();
let CurrDate = dateobj.getDate();
let currMonth = dateobj.getMonth()+1;
let currYear = dateobj.getUTCFullYear();

if(CurrDate < 10)
{
  CurrDate = '0' + CurrDate;
}

if(currMonth < 10)
{
  currMonth = '0' + currMonth
}

let Today = currYear + "-" + currMonth + "-" + CurrDate;
//console.log(Today);

document.getElementById("demo").setAttribute('min',Today);

/********************************************************** */



// in this function we will get the remainig days which user defined
// project should be valid 

function GetDays(date)
{

  // todays time
  let CurrentDate = new Date().getTime();

  // difference time between user defined time and current time
  let Difference_in_time = CurrentDate - new Date(date).getTime();

  // 1000 - milisecond
  // 1 hour - 3600 second 
  // 1 days = 24 hour
  // so we are dividing (hour per days * second per hour * milisecond per second)
  ProjectValidity = Math.floor(Math.abs(Difference_in_time / (1000 * 3600 * 24))); 

  console.log(ProjectValidity);
}

/**************************** */


// In this function we're getting the selected category value from option 
function GetValue(val)
{
  
  category_box.value = val;
  CategorySection = val;
  dropdown_content.style.display = "none";
}


document.getElementById("next-page").addEventListener("click",()=>{

 

  localStorage.setItem("amount",AmountToCover);
})