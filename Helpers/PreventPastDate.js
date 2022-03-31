//working on preventing past date selection 

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

module.exports ={

  Today,
}

/********************************************************** */
