// variable initialization
var date ;
var category ;
var amount;




// all the id or class based catech element
let category_box = document.getElementById("category_box");
const dropdown_content = document.getElementById("myDropdown");
const input_money = document.getElementById("money");
const input_money_container = document.getElementById("amount");
const confirm_amount = document.getElementById("btn-click");
const next_page = document.getElementById("next-page");
let  date_issued = document.getElementById("date");



category_box.addEventListener("click",function(){

  dropdown_content.style.display = "block"

});

function GetValue(val)
{
  
  category_box.value = val;
  dropdown_content.style.display = "none";
}

 input_money_container.addEventListener("click",function(){

  input_money.style.display = "block";

 
})

confirm_amount.addEventListener("click",function(){

  amount = document.getElementById("amount-data").value;
  amount = amount > 1500 || amount.toString().length == 0 || amount < 100  ? "100":amount;

  input_money_container.innerHTML = amount;
  input_money.style.display = "none";
})


next_page.addEventListener("click",function(){

   date =   date_issued.value.length !=0 ? date_issued.value : "";
   category =  category_box.value.length !=0 ? category_box.value : "";

   if(date && category)
   {
     //
   }else{

    alert("Field is empty")
   }
   

  //  console.log(date)
  //  console.log(category);
  // console.log(amount);

  // we will use this value for later purpose in server side 

})


