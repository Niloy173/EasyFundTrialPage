// in this function we will get the remainig days which user defined
// project should be valid 

let ProjectValidity;

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

  return  ProjectValidity;

  
}


module.exports = GetDays;